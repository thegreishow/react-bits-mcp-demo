import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = 'https://diggynation.com';
const OUT = path.resolve('public/media');
const USER_AGENT = 'DiggyNationMigration/1.0 (+https://github.com/thegreishow/react-bits-mcp-demo)';

const seedPages = [
  '/',
  '/products',
  '/mr-lexx-media/mr-lexx-media-gallery',
  '/meet-mr-lexx/mr-lexx-aka-dag-diggy',
  '/mr-lexx-in-the-news',
  '/events',
  '/about-us'
];

const allowedPath = /^\/(?:products(?:\/|$)|mr-lexx-media(?:\/|$)|meet-mr-lexx(?:\/|$)|mr-lexx-in-the-news(?:\/|$)|events(?:\/|$)|about-us(?:\/|$))/i;
const mediaHost = /(^|\.)uenicdn\.com$/i;
const imageExt = /\.(?:jpe?g|png|webp|gif|avif)(?:$|\?)/i;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const slugify = (value) => value
  .toLowerCase()
  .replace(/^https?:\/\/[^/]+/i, '')
  .replace(/[?#].*$/, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 110) || 'asset';

function decodeHtml(s = '') {
  return s
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return await res.text();
}

function absoluteUrl(raw, base) {
  try {
    const cleaned = decodeHtml(raw).trim();
    if (!cleaned || cleaned.startsWith('data:')) return null;
    return new URL(cleaned, base).href;
  } catch {
    return null;
  }
}

function extractLinks(html, base) {
  const links = new Set();
  for (const m of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
    const u = absoluteUrl(m[1], base);
    if (!u) continue;
    const parsed = new URL(u);
    if (parsed.origin === ROOT && allowedPath.test(parsed.pathname)) {
      parsed.hash = '';
      parsed.search = '';
      links.add(parsed.href);
    }
  }
  return [...links];
}

function extractOgImage(html, base) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["'][^>]*>/i
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return absoluteUrl(m[1], base);
  }
  return null;
}

function extractImages(html, base) {
  const urls = new Set();
  const add = (raw) => {
    const u = absoluteUrl(raw, base);
    if (!u) return;
    const parsed = new URL(u);
    if (!mediaHost.test(parsed.hostname)) return;
    if (/favicon|icon|sprite|payment|social/i.test(parsed.pathname)) return;
    if (imageExt.test(parsed.href) || /\/image\/upload\//i.test(parsed.pathname)) urls.add(parsed.href);
  };

  for (const m of html.matchAll(/<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi)) add(m[1]);
  for (const m of html.matchAll(/(?:srcset|data-srcset)\s*=\s*["']([^"']+)["']/gi)) {
    for (const item of m[1].split(',')) add(item.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/(?:data-src|data-lazy-src)\s*=\s*["']([^"']+)["']/gi)) add(m[1]);
  for (const m of html.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) add(m[1]);
  const og = extractOgImage(html, base);
  if (og) add(og);
  return [...urls];
}

function categoryFor(pageUrl) {
  const p = new URL(pageUrl).pathname.toLowerCase();
  if (p.includes('/products/')) {
    if (p.includes('/ladies-tops/')) return 'products/ladies-tops';
    if (p.includes('/ladies-bottoms/')) return 'products/ladies-bottoms';
    if (p.includes('/tumblers/')) return 'products/tumblers';
    return 'products/men';
  }
  if (p.includes('/mr-lexx-media/') || p.includes('/meet-mr-lexx/')) return 'mr-lexx';
  if (p.includes('/mr-lexx-in-the-news/')) return 'press';
  if (p.includes('/events/')) return 'events';
  return 'brand';
}

function extensionFor(url, contentType = '') {
  const pathname = new URL(url).pathname.toLowerCase();
  const match = pathname.match(/\.(jpe?g|png|webp|gif|avif)$/i);
  if (match) return match[1].replace('jpeg', 'jpg');
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  if (contentType.includes('avif')) return 'avif';
  return 'jpg';
}

async function discoverPages() {
  const pages = new Set(seedPages.map(p => new URL(p, ROOT).href));

  // Prefer sitemap discovery when available.
  for (const sitemapPath of ['/sitemap.xml', '/sitemap_index.xml']) {
    try {
      const xml = await fetchText(new URL(sitemapPath, ROOT));
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
        const u = absoluteUrl(m[1], ROOT);
        if (!u) continue;
        const parsed = new URL(u);
        if (parsed.origin === ROOT && allowedPath.test(parsed.pathname)) pages.add(parsed.href.split(/[?#]/)[0]);
      }
    } catch (error) {
      console.log(`Sitemap ${sitemapPath} unavailable: ${error.message}`);
    }
  }

  // Crawl index pages to pick up dynamic pages that may not be present in a sitemap.
  const queue = [...pages];
  for (let i = 0; i < queue.length && pages.size < 220; i++) {
    const page = queue[i];
    try {
      const html = await fetchText(page);
      for (const link of extractLinks(html, page)) {
        if (!pages.has(link)) {
          pages.add(link);
          queue.push(link);
        }
      }
    } catch (error) {
      console.warn(`Discovery skipped ${page}: ${error.message}`);
    }
    if (i < 15) await sleep(120);
  }
  return [...pages].sort();
}

async function downloadImage(url, localPath) {
  const res = await fetch(url, { headers: { 'user-agent': USER_AGENT, accept: 'image/avif,image/webp,image/*,*/*;q=0.8' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) throw new Error(`not an image (${contentType})`);
  const bytes = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, bytes);
  return { bytes: bytes.length, contentType };
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const pages = await discoverPages();
  console.log(`Discovered ${pages.length} candidate pages.`);

  const records = [];
  const seenMedia = new Map();
  const failures = [];

  for (let index = 0; index < pages.length; index++) {
    const pageUrl = pages[index];
    let html;
    try {
      html = await fetchText(pageUrl);
    } catch (error) {
      failures.push({ pageUrl, error: error.message });
      continue;
    }

    const pathname = new URL(pageUrl).pathname;
    const isProduct = pathname.includes('/products/');
    const og = extractOgImage(html, pageUrl);
    const candidates = isProduct && og ? [og] : extractImages(html, pageUrl);
    const category = categoryFor(pageUrl);
    const pageSlug = slugify(pathname);

    for (let j = 0; j < candidates.length; j++) {
      const sourceUrl = candidates[j];
      if (!sourceUrl) continue;
      const parsed = new URL(sourceUrl);
      if (!mediaHost.test(parsed.hostname)) continue;

      // Reuse a prior local copy if the exact remote asset appears on multiple pages.
      if (seenMedia.has(sourceUrl)) {
        records.push({ pageUrl, sourceUrl, localPath: seenMedia.get(sourceUrl), reused: true });
        continue;
      }

      const hash = crypto.createHash('sha1').update(sourceUrl).digest('hex').slice(0, 8);
      let ext = extensionFor(sourceUrl);
      let rel = `media/${category}/${pageSlug}${candidates.length > 1 ? `-${String(j + 1).padStart(2, '0')}` : ''}-${hash}.${ext}`;
      let abs = path.resolve('public', rel);

      try {
        const result = await downloadImage(sourceUrl, abs);
        // Correct extension if URL had none and content-type says otherwise.
        const actualExt = extensionFor(sourceUrl, result.contentType);
        if (actualExt !== ext) {
          const corrected = abs.replace(/\.[^.]+$/, `.${actualExt}`);
          await fs.rename(abs, corrected);
          abs = corrected;
          rel = rel.replace(/\.[^.]+$/, `.${actualExt}`);
          ext = actualExt;
        }
        seenMedia.set(sourceUrl, `/${rel}`);
        records.push({ pageUrl, sourceUrl, localPath: `/${rel}`, bytes: result.bytes, contentType: result.contentType, reused: false });
        console.log(`✓ ${category}: ${sourceUrl} -> /${rel}`);
      } catch (error) {
        failures.push({ pageUrl, sourceUrl, error: error.message });
        console.warn(`✗ ${sourceUrl}: ${error.message}`);
      }
      await sleep(100);
    }
    await sleep(80);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: ROOT,
    pageCount: pages.length,
    uniqueAssetCount: seenMedia.size,
    references: records.length,
    failureCount: failures.length,
    records,
    failures
  };
  await fs.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Finished: ${seenMedia.size} unique assets, ${failures.length} failures.`);
  if (seenMedia.size === 0) process.exitCode = 2;
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
