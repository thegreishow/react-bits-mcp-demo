#!/usr/bin/env python3
import hashlib, json, mimetypes, re, sys, time
from collections import deque
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag
from urllib.request import Request, urlopen

ROOT = "https://diggynation.com/"
OUT = Path("public/media/original")
MANIFEST = OUT / "manifest.json"
MAX_PAGES = 90
MAX_MEDIA = 800
UA = "Mozilla/5.0 (compatible; DiggyNationMediaMigration/2.0; +https://github.com/thegreishow/react-bits-mcp-demo)"
MEDIA_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".bmp", ".ico"}
ALLOWED_PREFIXES = (
    "/products", "/about-us", "/meet-mr-lexx", "/mr-lexx-in-the-news",
    "/events", "/reviews"
)


def clean_url(url, base):
    if not url: return None
    url = url.strip().strip('"\'')
    if not url or url.startswith(("data:", "javascript:", "mailto:", "tel:", "#")): return None
    u, _ = urldefrag(urljoin(base, url.replace("\\/", "/")))
    return u


def fetch(url, binary=False, timeout=6):
    req = Request(url, headers={"User-Agent": UA, "Accept": "*/*", "Referer": ROOT})
    with urlopen(req, timeout=timeout) as r:
        data = r.read()
        if binary: return data, r.headers
        return data.decode(r.headers.get_content_charset() or "utf-8", errors="replace"), r.headers


def allowed_page(url):
    p = urlparse(url)
    if p.netloc not in {"diggynation.com", "www.diggynation.com"}: return False
    if p.path == "/": return True
    if Path(p.path).suffix.lower() in MEDIA_EXTS: return False
    return any(p.path.startswith(x) for x in ALLOWED_PREFIXES)


class Grabber(HTMLParser):
    def __init__(self, base):
        super().__init__(convert_charrefs=True); self.base=base; self.links=set(); self.media=set()
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if tag == "a" and d.get("href"):
            u=clean_url(d["href"], self.base)
            if u: self.links.add(u)
        for k in ("src","data-src","data-lazy-src","poster"):
            if d.get(k):
                u=clean_url(d[k], self.base)
                if u: self.media.add(u)
        for k in ("srcset","data-srcset"):
            if d.get(k):
                for bit in d[k].split(","):
                    u=clean_url(bit.strip().split(" ")[0], self.base)
                    if u: self.media.add(u)
        if tag == "meta" and d.get("content"):
            prop=(d.get("property") or d.get("name") or "").lower()
            if prop in {"og:image","og:image:url","twitter:image","twitter:image:src"}:
                u=clean_url(d["content"], self.base)
                if u: self.media.add(u)
        for raw in re.findall(r"url\(([^)]+)\)", d.get("style") or "", flags=re.I):
            u=clean_url(raw, self.base)
            if u: self.media.add(u)


def add_embedded(html, base, bucket):
    pats=[
        r'https?:\\?/\\?/[^"\'<> ]+?\.(?:jpe?g|png|webp|gif|svg|avif)(?:\?[^"\'<> ]*)?',
        r'//[A-Za-z0-9.-]*uenicdn\.com/[^"\'<> ]+',
    ]
    for pat in pats:
        for raw in re.findall(pat, html, flags=re.I):
            u=clean_url(raw, base)
            if u: bucket.add(u)


def ext_for(url, ct):
    ext=Path(urlparse(url).path).suffix.lower()
    if ext in MEDIA_EXTS: return ".jpg" if ext==".jpeg" else ext
    guess=mimetypes.guess_extension((ct or "").split(";")[0].strip().lower()) or ".bin"
    return ".jpg" if guess in {".jpe",".jpeg"} else guess


def download_one(pair):
    url, sources = pair
    try:
        data, h = fetch(url, binary=True)
        ct=h.get("Content-Type","")
        ext=Path(urlparse(url).path).suffix.lower()
        if not ct.lower().startswith("image/") and ext not in MEDIA_EXTS: return None
        digest=hashlib.sha256(data).hexdigest()
        stem=re.sub(r"[^A-Za-z0-9._-]+","-",Path(urlparse(url).path).stem or "media").strip("-._")[:70] or "media"
        name=f"{stem}-{hashlib.sha1(url.encode()).hexdigest()[:12]}{ext_for(url,ct)}"
        return {"url":url,"sources":sorted(sources),"data":data,"sha256":digest,"name":name,"content_type":ct}
    except Exception as e:
        return {"url":url,"error":str(e)}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    seeds=[ROOT, urljoin(ROOT,"products"), urljoin(ROOT,"about-us"), urljoin(ROOT,"meet-mr-lexx"), urljoin(ROOT,"mr-lexx-in-the-news"), urljoin(ROOT,"events"), urljoin(ROOT,"reviews")]
    q=deque(seeds); seen=set(); media={}; errors=[]
    while q and len(seen)<MAX_PAGES:
        url=q.popleft()
        if url in seen or not allowed_page(url): continue
        seen.add(url)
        try:
            html,_=fetch(url)
            g=Grabber(url); g.feed(html); add_embedded(html,url,g.media)
            for link in g.links:
                if allowed_page(link) and link not in seen: q.append(link)
            for m in g.media: media.setdefault(m,set()).add(url)
            print(f"PAGE {len(seen):03d}: {url} -> {len(g.media)}")
        except Exception as e:
            errors.append({"url":url,"stage":"page","error":str(e)})
            print("PAGE ERROR",url,e,file=sys.stderr)

    pairs=list(media.items())[:MAX_MEDIA]
    downloaded=[]
    with ThreadPoolExecutor(max_workers=16) as ex:
        futs=[ex.submit(download_one,p) for p in pairs]
        for fut in as_completed(futs):
            r=fut.result()
            if not r: continue
            if r.get("error"):
                errors.append({"url":r["url"],"stage":"media","error":r["error"]}); continue
            downloaded.append(r)

    by_hash={}; items=[]
    for r in downloaded:
        if r["sha256"] in by_hash:
            local=by_hash[r["sha256"]]; dup=True
        else:
            path=OUT/r["name"]; path.write_bytes(r["data"]); local="/media/original/"+r["name"]; by_hash[r["sha256"]]=local; dup=False
        items.append({"source_url":r["url"],"local_path":local,"source_pages":r["sources"],"sha256":r["sha256"],"bytes":len(r["data"]),"content_type":r["content_type"],"duplicate":dup})

    manifest={"source":ROOT,"generated_at_utc":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),"pages_crawled":len(seen),"media_candidates":len(media),"media_records":len(items),"unique_files":len(by_hash),"pages":sorted(seen),"items":sorted(items,key=lambda x:x["local_path"]),"errors":errors}
    MANIFEST.write_text(json.dumps(manifest,indent=2),encoding="utf-8")
    print(json.dumps({k:manifest[k] for k in ("pages_crawled","media_candidates","media_records","unique_files")},indent=2))

if __name__ == "__main__": main()
