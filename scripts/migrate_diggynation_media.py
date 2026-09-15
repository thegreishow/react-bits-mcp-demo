#!/usr/bin/env python3
import hashlib
import json
import mimetypes
import os
import re
import sys
import time
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag
from urllib.request import Request, urlopen

ROOT = "https://diggynation.com/"
OUT = Path("public/media/original")
MANIFEST = OUT / "manifest.json"
MAX_PAGES = 220
MAX_MEDIA = 1200
PAGE_DELAY = 0.08
MEDIA_DELAY = 0.03
UA = "Mozilla/5.0 (compatible; DiggyNationMediaMigration/1.0; +https://github.com/thegreishow/react-bits-mcp-demo)"

MEDIA_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".bmp", ".ico"}
MEDIA_HOST_HINTS = ("uenicdn.com", "diggynation.com", "cloudfront.net", "amazonaws.com")
SKIP_PAGE_EXTS = {".pdf", ".zip", ".mp3", ".mp4", ".mov", ".webm", ".avi"}


def clean_url(url, base):
    if not url:
        return None
    url = url.strip().strip('"\'')
    if not url or url.startswith(("data:", "javascript:", "mailto:", "tel:", "#")):
        return None
    abs_url = urljoin(base, url)
    abs_url, _ = urldefrag(abs_url)
    return abs_url


class Grabber(HTMLParser):
    def __init__(self, base):
        super().__init__(convert_charrefs=True)
        self.base = base
        self.links = set()
        self.media = set()
        self.css_urls = set()

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and d.get("href"):
            u = clean_url(d.get("href"), self.base)
            if u:
                self.links.add(u)
        for key in ("src", "data-src", "data-lazy-src", "poster"):
            if d.get(key):
                u = clean_url(d[key], self.base)
                if u:
                    self.media.add(u)
        for key in ("srcset", "data-srcset"):
            if d.get(key):
                for part in d[key].split(","):
                    candidate = part.strip().split(" ")[0]
                    u = clean_url(candidate, self.base)
                    if u:
                        self.media.add(u)
        if tag == "meta" and d.get("content"):
            prop = (d.get("property") or d.get("name") or "").lower()
            if prop in {"og:image", "og:image:url", "twitter:image", "twitter:image:src"}:
                u = clean_url(d["content"], self.base)
                if u:
                    self.media.add(u)
        style = d.get("style") or ""
        for raw in re.findall(r"url\(([^)]+)\)", style, flags=re.I):
            u = clean_url(raw, self.base)
            if u:
                self.media.add(u)


def fetch(url, binary=False, timeout=25):
    req = Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urlopen(req, timeout=timeout) as r:
        body = r.read()
        return body if binary else body.decode(r.headers.get_content_charset() or "utf-8", errors="replace"), r.headers


def is_same_site_page(url):
    p = urlparse(url)
    if p.netloc not in {"diggynation.com", "www.diggynation.com"}:
        return False
    ext = Path(p.path).suffix.lower()
    return ext not in MEDIA_EXTS | SKIP_PAGE_EXTS


def looks_like_media(url):
    p = urlparse(url)
    ext = Path(p.path).suffix.lower()
    if ext in MEDIA_EXTS:
        return True
    host = p.netloc.lower()
    path = p.path.lower()
    return any(h in host for h in MEDIA_HOST_HINTS) and any(k in path for k in ("image", "img", "media", "upload", "asset", "cdn"))


def ext_from(url, content_type):
    ext = Path(urlparse(url).path).suffix.lower()
    if ext in MEDIA_EXTS:
        return ".jpg" if ext == ".jpeg" else ext
    ct = (content_type or "").split(";")[0].strip().lower()
    guess = mimetypes.guess_extension(ct) or ""
    if guess == ".jpe":
        guess = ".jpg"
    return guess if guess in MEDIA_EXTS else ".bin"


def local_name(url, content_type):
    p = urlparse(url)
    stem = Path(p.path).stem or "media"
    stem = re.sub(r"[^A-Za-z0-9._-]+", "-", stem).strip("-._")[:80] or "media"
    digest = hashlib.sha1(url.encode()).hexdigest()[:12]
    return f"{stem}-{digest}{ext_from(url, content_type)}"


def add_embedded_urls(html, base, media):
    # Catch UENI URLs that live inside JSON/script/CSS rather than img tags.
    patterns = [
        r'https?:\\?/\\?/[^"]+?\\.(?:jpe?g|png|webp|gif|svg|avif)(?:\\?[^"\'<> ]*)?',
        r'//[A-Za-z0-9.-]*uenicdn\.com/[^"\'<> ]+',
    ]
    for pat in patterns:
        for raw in re.findall(pat, html, flags=re.I):
            raw = raw.replace("\\/", "/")
            u = clean_url(raw, base)
            if u:
                media.add(u)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    seeds = [
        ROOT,
        urljoin(ROOT, "products"),
        urljoin(ROOT, "about-us"),
        urljoin(ROOT, "meet-mr-lexx"),
        urljoin(ROOT, "mr-lexx-in-the-news"),
        urljoin(ROOT, "events"),
        urljoin(ROOT, "reviews"),
    ]
    q = deque(seeds)
    seen_pages = set()
    media_sources = {}
    errors = []

    while q and len(seen_pages) < MAX_PAGES:
        url = q.popleft()
        if url in seen_pages or not is_same_site_page(url):
            continue
        seen_pages.add(url)
        try:
            html, headers = fetch(url)
            parser = Grabber(url)
            parser.feed(html)
            add_embedded_urls(html, url, parser.media)

            for link in parser.links:
                if is_same_site_page(link) and link not in seen_pages:
                    q.append(link)
                if looks_like_media(link):
                    parser.media.add(link)

            for m in parser.media:
                media_sources.setdefault(m, set()).add(url)
            print(f"PAGE {len(seen_pages):03d}: {url} -> {len(parser.media)} media candidates")
        except Exception as e:
            errors.append({"url": url, "stage": "page", "error": str(e)})
            print(f"PAGE ERROR {url}: {e}", file=sys.stderr)
        time.sleep(PAGE_DELAY)

    items = []
    dedupe_by_hash = {}
    for i, (url, sources) in enumerate(list(media_sources.items())[:MAX_MEDIA], 1):
        try:
            data, headers = fetch(url, binary=True)
            ct = headers.get("Content-Type", "")
            if not ct.lower().startswith("image/") and Path(urlparse(url).path).suffix.lower() not in MEDIA_EXTS:
                continue
            sha256 = hashlib.sha256(data).hexdigest()
            if sha256 in dedupe_by_hash:
                items.append({
                    "source_url": url,
                    "local_path": dedupe_by_hash[sha256],
                    "source_pages": sorted(sources),
                    "sha256": sha256,
                    "duplicate": True,
                })
                continue
            filename = local_name(url, ct)
            path = OUT / filename
            path.write_bytes(data)
            local_path = "/media/original/" + filename
            dedupe_by_hash[sha256] = local_path
            items.append({
                "source_url": url,
                "local_path": local_path,
                "source_pages": sorted(sources),
                "sha256": sha256,
                "bytes": len(data),
                "content_type": ct,
                "duplicate": False,
            })
            print(f"MEDIA {i:03d}: {url} -> {local_path}")
        except Exception as e:
            errors.append({"url": url, "stage": "media", "error": str(e)})
            print(f"MEDIA ERROR {url}: {e}", file=sys.stderr)
        time.sleep(MEDIA_DELAY)

    manifest = {
        "source": ROOT,
        "generated_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "pages_crawled": len(seen_pages),
        "media_candidates": len(media_sources),
        "media_records": len(items),
        "unique_files": len(dedupe_by_hash),
        "pages": sorted(seen_pages),
        "items": items,
        "errors": errors,
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps({k: manifest[k] for k in ("pages_crawled", "media_candidates", "media_records", "unique_files")}, indent=2))


if __name__ == "__main__":
    main()
