#!/usr/bin/env node

import fs from 'node:fs/promises';
import { load } from 'cheerio';

const BASE_URL = process.env.SITE_AUDIT_BASE_URL || 'https://travel.mitchchadban.com';
const ORIGIN = new URL(BASE_URL).origin;
const failures = [];
const warnings = [];
const pageCache = new Map();
const checkedInternal = new Map();
const checkedImages = new Map();

function fail(message) { failures.push(message); }
function warn(message) { warnings.push(message); }
function absolute(value, base = BASE_URL) { return new URL(value, base); }
function normalizePageUrl(value) {
  const url = absolute(value);
  url.hash = '';
  return url.href;
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, {
        signal: AbortSignal.timeout(20000),
        headers: {
          'user-agent': 'there-and-back-again-production-audit/1.0',
          ...(options.headers || {}),
        },
        ...options,
      });
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError;
}

function xmlLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/gis)].map((match) => match[1].trim().replaceAll('&amp;', '&'));
}

async function collectSitemapPages(url, seen = new Set()) {
  if (seen.has(url)) return [];
  seen.add(url);
  const response = await fetchWithRetry(url, { redirect: 'manual' });
  if (response.status !== 200) {
    fail(`Sitemap ${url}: expected 200, got ${response.status}`);
    return [];
  }
  const xml = await response.text();
  const locs = xmlLocs(xml);
  const pages = [];
  for (const loc of locs) {
    if (/\.xml(?:$|\?)/i.test(loc)) pages.push(...await collectSitemapPages(loc, seen));
    else pages.push(loc);
  }
  return pages;
}

async function getPage(url) {
  if (pageCache.has(url)) return pageCache.get(url);
  const promise = (async () => {
    const response = await fetchWithRetry(url, { redirect: 'manual' });
    const body = response.status === 200 ? await response.text() : '';
    return { response, body };
  })();
  pageCache.set(url, promise);
  return promise;
}

async function checkInternalUrl(url, sourcePage) {
  const key = url.href;
  if (checkedInternal.has(key)) return checkedInternal.get(key);
  const promise = (async () => {
    try {
      const response = await fetchWithRetry(key, { redirect: 'manual' });
      if (response.status >= 300 && response.status < 400) {
        fail(`Internal link redirects instead of linking directly: ${sourcePage} -> ${key} (${response.status} -> ${response.headers.get('location') || 'missing Location'})`);
      } else if (response.status < 200 || response.status >= 300) {
        fail(`Broken internal link: ${sourcePage} -> ${key} returned ${response.status}`);
      }
    } catch (error) {
      fail(`Internal link request failed: ${sourcePage} -> ${key}: ${error.message}`);
    }
  })();
  checkedInternal.set(key, promise);
  return promise;
}

async function checkImage(url, sourcePage) {
  const key = url.href;
  if (checkedImages.has(key)) return checkedImages.get(key);
  const promise = (async () => {
    try {
      const response = await fetchWithRetry(key, {
        redirect: 'follow',
        headers: { Range: 'bytes=0-0' },
      });
      if (!(response.status === 200 || response.status === 206)) {
        fail(`Broken image: ${sourcePage} -> ${key} returned ${response.status}`);
        return;
      }
      const type = response.headers.get('content-type') || '';
      if (!type.toLowerCase().startsWith('image/')) {
        fail(`Image URL did not return an image content type: ${sourcePage} -> ${key} (${type || 'missing'})`);
      }
    } catch (error) {
      fail(`Image request failed: ${sourcePage} -> ${key}: ${error.message}`);
    }
  })();
  checkedImages.set(key, promise);
  return promise;
}

// Infrastructure contracts.
const robotsUrl = `${ORIGIN}/robots.txt`;
const robotsResponse = await fetchWithRetry(robotsUrl, { redirect: 'manual' });
if (robotsResponse.status !== 200) fail(`robots.txt expected 200, got ${robotsResponse.status}`);
const robotsText = robotsResponse.status === 200 ? await robotsResponse.text() : '';
if (!/User-agent:\s*\*/i.test(robotsText)) fail('robots.txt is missing User-agent: *');
if (!/Allow:\s*\//i.test(robotsText)) fail('robots.txt is missing Allow: /');
if (!robotsText.includes(`${ORIGIN}/sitemap-index.xml`)) fail('robots.txt does not reference the canonical sitemap index');
if (/Disallow:\s*\//i.test(robotsText)) fail('robots.txt contains a sitewide Disallow: /');

const sitemapIndexUrl = `${ORIGIN}/sitemap-index.xml`;
const sitemapPagesRaw = await collectSitemapPages(sitemapIndexUrl);
const sitemapPages = [...new Set(sitemapPagesRaw.map(normalizePageUrl))];
if (sitemapPagesRaw.length !== sitemapPages.length) fail(`Sitemap contains duplicate page URLs (${sitemapPagesRaw.length - sitemapPages.length} duplicate entries)`);
if (sitemapPages.length !== 41) fail(`Expected 41 indexable sitemap URLs, found ${sitemapPages.length}`);
if (sitemapPages.some((url) => new URL(url).origin !== ORIGIN)) fail('Sitemap contains URL(s) outside the production origin');
if (sitemapPages.some((url) => url.includes('/coming-soon'))) fail('coming-soon is present in the canonical sitemap');

// Temporary recovery sitemap must stay a strict subset while the diagnostic is active.
const recoveryUrl = `${ORIGIN}/sitemap-recovery.xml`;
const recoveryResponse = await fetchWithRetry(recoveryUrl, { redirect: 'manual' });
if (recoveryResponse.status === 200) {
  const recoveryLocs = xmlLocs(await recoveryResponse.text()).map(normalizePageUrl);
  if (recoveryLocs.length !== 7) fail(`Recovery sitemap expected 7 URLs, found ${recoveryLocs.length}`);
  for (const url of recoveryLocs) if (!sitemapPages.includes(url)) fail(`Recovery sitemap URL is not in canonical sitemap: ${url}`);
} else {
  warn(`Recovery sitemap returned ${recoveryResponse.status}; acceptable only if the temporary GSC recovery test has intentionally been retired.`);
}

const titles = new Map();
const descriptions = new Map();
const sitemapPathSet = new Set(sitemapPages.map((url) => new URL(url).pathname));
const pageAnalyses = new Map();

for (const pageUrl of sitemapPages) {
  const { response, body } = await getPage(pageUrl);
  if (response.status !== 200) {
    fail(`Canonical sitemap URL expected direct 200: ${pageUrl} -> ${response.status}${response.headers.get('location') ? ` -> ${response.headers.get('location')}` : ''}`);
    continue;
  }
  const type = response.headers.get('content-type') || '';
  if (!type.toLowerCase().includes('text/html')) fail(`Canonical page has non-HTML content type: ${pageUrl} (${type || 'missing'})`);
  const xRobots = response.headers.get('x-robots-tag') || '';
  if (/noindex/i.test(xRobots)) fail(`Canonical sitemap page has X-Robots-Tag noindex: ${pageUrl}`);

  const $ = load(body);
  const canonicalNodes = $('link[rel="canonical"]');
  if (canonicalNodes.length !== 1) {
    fail(`${pageUrl}: expected exactly one canonical tag, found ${canonicalNodes.length}`);
  } else {
    const canonical = normalizePageUrl(canonicalNodes.attr('href'));
    if (canonical !== pageUrl) fail(`${pageUrl}: self-canonical mismatch -> ${canonical}`);
  }

  const robotsMeta = $('meta[name="robots"]').attr('content') || '';
  if (/noindex/i.test(robotsMeta)) fail(`${pageUrl}: canonical sitemap page has meta robots noindex`);

  const title = $('title').first().text().trim();
  if (!title) fail(`${pageUrl}: missing <title>`);
  else {
    const list = titles.get(title) || [];
    list.push(pageUrl);
    titles.set(title, list);
  }

  const description = $('meta[name="description"]').attr('content')?.trim() || '';
  if (!description) fail(`${pageUrl}: missing meta description`);
  else {
    const list = descriptions.get(description) || [];
    list.push(pageUrl);
    descriptions.set(description, list);
  }

  const h1s = $('h1');
  if (h1s.length !== 1) fail(`${pageUrl}: expected exactly one H1, found ${h1s.length}`);

  const ogUrl = $('meta[property="og:url"]').attr('content');
  if (!ogUrl) fail(`${pageUrl}: missing og:url`);
  else if (normalizePageUrl(ogUrl) !== pageUrl) fail(`${pageUrl}: og:url mismatch -> ${normalizePageUrl(ogUrl)}`);

  const jsonLdNodes = $('script[type="application/ld+json"]');
  if (!jsonLdNodes.length) fail(`${pageUrl}: missing JSON-LD`);
  jsonLdNodes.each((_, node) => {
    const raw = $(node).html()?.trim();
    if (!raw) return fail(`${pageUrl}: empty JSON-LD block`);
    try { JSON.parse(raw); }
    catch (error) { fail(`${pageUrl}: malformed JSON-LD: ${error.message}`); }
  });

  const internalLinks = new Set();
  $('a[href]').each((_, node) => {
    const href = $(node).attr('href')?.trim();
    if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/i.test(href)) return;
    try {
      const url = absolute(href, pageUrl);
      url.hash = '';
      if (url.origin !== ORIGIN) return;
      if (url.pathname === '/coming-soon/' || url.pathname === '/coming-soon') fail(`${pageUrl}: links to noindex coming-soon page`);
      internalLinks.add(url.href);
    } catch {
      fail(`${pageUrl}: invalid internal href ${href}`);
    }
  });

  const imageUrls = new Set();
  $('img[src], source[src]').each((_, node) => {
    const src = $(node).attr('src')?.trim();
    if (!src || src.startsWith('data:')) return;
    try { imageUrls.add(absolute(src, pageUrl).href); }
    catch { fail(`${pageUrl}: invalid image src ${src}`); }
  });
  $('img[srcset], source[srcset]').each((_, node) => {
    const srcset = $(node).attr('srcset') || '';
    for (const candidate of srcset.split(',')) {
      const src = candidate.trim().split(/\s+/)[0];
      if (!src || src.startsWith('data:')) continue;
      try { imageUrls.add(absolute(src, pageUrl).href); }
      catch { fail(`${pageUrl}: invalid srcset candidate ${src}`); }
    }
  });

  pageAnalyses.set(pageUrl, { internalLinks, imageUrls });
}

for (const [title, urls] of titles) if (urls.length > 1) warn(`Duplicate page title across ${urls.length} canonicals: ${title}`);
for (const [description, urls] of descriptions) if (urls.length > 1) warn(`Duplicate meta description across ${urls.length} canonicals: ${description}`);

// Internal links must point directly at live 200 resources, never through our redirect layer.
for (const [pageUrl, analysis] of pageAnalyses) {
  for (const href of analysis.internalLinks) await checkInternalUrl(absolute(href), pageUrl);
  for (const src of analysis.imageUrls) await checkImage(absolute(src), pageUrl);
}

// Mandatory publishing contract: every one of the 37 article pages appears on both hubs.
const corePaths = new Set(['/', '/chronicles/', '/by-region/', '/about-the-traveller/']);
const articlePaths = [...sitemapPathSet].filter((path) => !corePaths.has(path));
if (articlePaths.length !== 37) fail(`Expected 37 article paths after excluding four core pages, found ${articlePaths.length}`);
for (const hubPath of ['/chronicles/', '/by-region/']) {
  const hubUrl = `${ORIGIN}${hubPath}`;
  const analysis = pageAnalyses.get(hubUrl);
  if (!analysis) {
    fail(`Missing hub analysis for ${hubUrl}`);
    continue;
  }
  const linkedPaths = new Set([...analysis.internalLinks].map((href) => new URL(href).pathname));
  for (const articlePath of articlePaths) if (!linkedPaths.has(articlePath)) fail(`${hubPath} is missing required article link: ${articlePath}`);
}

// coming-soon must be available to users but explicitly excluded from indexing.
const comingSoonUrl = `${ORIGIN}/coming-soon/`;
const comingSoon = await getPage(comingSoonUrl);
if (comingSoon.response.status !== 200) fail(`/coming-soon/ expected 200, got ${comingSoon.response.status}`);
else {
  const $ = load(comingSoon.body);
  const meta = $('meta[name="robots"]').attr('content') || '';
  const xRobots = comingSoon.response.headers.get('x-robots-tag') || '';
  if (!/noindex/i.test(`${meta} ${xRobots}`)) fail('/coming-soon/ is not explicitly noindex');
}

// A definitely nonexistent route must be a real 404, not a soft-404 200.
const missingUrl = `${ORIGIN}/__there-and-back-again-audit-does-not-exist-9f4c2d/`;
const missing = await fetchWithRetry(missingUrl, { redirect: 'manual' });
if (missing.status !== 404) fail(`Nonexistent route expected 404, got ${missing.status}`);

// Every configured redirect, historical and normalization, must be one hop to its exact final 200 destination.
const vercel = JSON.parse(await fs.readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const redirects = vercel.redirects || [];
const redirectSources = new Set();
for (const rule of redirects) {
  if (redirectSources.has(rule.source)) fail(`Duplicate redirect source in vercel.json: ${rule.source}`);
  redirectSources.add(rule.source);
  const sourceUrl = `${ORIGIN}${rule.source}`;
  try {
    const response = await fetchWithRetry(sourceUrl, { redirect: 'manual' });
    if (response.status !== rule.statusCode) {
      fail(`Redirect ${rule.source}: expected ${rule.statusCode}, got ${response.status}`);
      continue;
    }
    const location = response.headers.get('location');
    const actual = location ? absolute(location, ORIGIN).href : '';
    const expected = absolute(rule.destination, ORIGIN).href;
    if (actual !== expected) fail(`Redirect ${rule.source}: expected Location ${expected}, got ${location || '(missing)'}`);
    const final = await fetchWithRetry(expected, { redirect: 'manual' });
    if (final.status !== 200) fail(`Redirect destination is not direct 200: ${rule.source} -> ${expected} -> ${final.status}`);
  } catch (error) {
    fail(`Redirect request failed for ${rule.source}: ${error.message}`);
  }
}

// HTTP must upgrade to HTTPS.
try {
  const insecure = await fetchWithRetry(`http://${new URL(BASE_URL).host}/`, { redirect: 'manual' });
  if (!(insecure.status >= 300 && insecure.status < 400)) fail(`HTTP homepage expected redirect to HTTPS, got ${insecure.status}`);
  else {
    const location = insecure.headers.get('location');
    if (!location || !location.startsWith('https://')) fail(`HTTP homepage redirect does not target HTTPS: ${location || '(missing)'}`);
  }
} catch (error) {
  fail(`HTTP->HTTPS check failed: ${error.message}`);
}

console.log(`AUDIT SUMMARY`);
console.log(`- Canonical sitemap pages: ${sitemapPages.length}`);
console.log(`- Article pages: ${articlePaths.length}`);
console.log(`- Unique internal URLs checked: ${checkedInternal.size}`);
console.log(`- Unique image URLs checked: ${checkedImages.size}`);
console.log(`- Configured redirects checked: ${redirects.length}`);
console.log(`- Failures: ${failures.length}`);
console.log(`- Warnings: ${warnings.length}`);

if (warnings.length) {
  console.log('\nWARNINGS');
  for (const message of warnings) console.log(`- ${message}`);
}

if (failures.length) {
  console.error('\nFAILURES');
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log('\nPASS: production technical SEO/runtime audit found 0 failures.');
