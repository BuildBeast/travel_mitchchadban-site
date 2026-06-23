import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import * as cheerio from 'cheerio';
import { decode } from 'html-entities';

const cloneRoot = '/Users/mitchchadban/Desktop/travel-site-migration/travel.mitchchadban.com';
const projectRoot = '/Users/mitchchadban/Desktop/travel-mitchchadban-site';
const pagesRoot = path.join(projectRoot, 'src/pages');
const stylesPath = path.join(projectRoot, 'src/styles/global.css');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function normaliseSlugFromFile(filePath) {
  const rel = path.relative(cloneRoot, filePath);
  const parts = rel.split(path.sep);

  if (parts.length === 1 && parts[0] === 'index.html') return '';

  if (parts.at(-1) === 'index.html') {
    return parts.slice(0, -1).join('/');
  }

  return rel.replace(/\.html$/i, '').replace(/\/index$/i, '');
}

function pageOutPath(slug) {
  if (!slug) return path.join(pagesRoot, 'index.astro');
  return path.join(pagesRoot, slug, 'index.astro');
}

function getPreloadedState(html) {
  const match = html.match(/window\.__PRELOADED_STATE__\s*=\s*({[\s\S]*?});?\s*<\/script>/);
  if (!match) return null;

  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function collectMediaMetadata(value, map = new Map()) {
  if (!value || typeof value !== 'object') return map;

  if (Array.isArray(value)) {
    value.forEach((item) => collectMediaMetadata(item, map));
    return map;
  }

  const hash =
    value.hash ||
    value.media_hash ||
    value.mediaHash ||
    value.id ||
    value.key;

  const filename =
    value.filename ||
    value.file_name ||
    value.original_filename ||
    value.originalFilename ||
    value.name;

  const width = value.width || value.w || value.original_width;
  const height = value.height || value.h || value.original_height;

  if (hash && filename) {
    map.set(String(hash), {
      hash: String(hash),
      filename: String(filename),
      width,
      height
    });
  }

  for (const child of Object.values(value)) {
    collectMediaMetadata(child, map);
  }

  return map;
}

function cargoImageUrl(meta) {
  const safeFilename = encodeURIComponent(meta.filename).replace(/%2F/g, '/');
  return `https://freight.cargo.site/w/${meta.width || 1600}/q/75/i/${meta.hash}/${safeFilename}`;
}

function extractTitle($) {
  return (
    $('meta[property="og:title"]').attr('content') ||
    $('title').text() ||
    'There & Back Again'
  ).trim();
}

function extractDescription($) {
  return (
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    'A literary travel chronicle by Mitch Chadban.'
  ).trim();
}

function rewriteLinks($) {
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;

    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    let clean = href
      .replace(/\.html$/i, '/')
      .replace(/index\.html$/i, '')
      .replace(/\/+/g, '/');

    if (!clean.startsWith('/')) {
      clean = '/' + clean;
    }

    $(el).attr('href', clean);
  });
}

function convertMediaItems($, mediaMap) {
  $('media-item').each((_, el) => {
    const $el = $(el);

    const hash =
      $el.attr('hash') ||
      $el.attr('data-hash') ||
      $el.attr('media-hash') ||
      $el.attr('data-media-hash') ||
      $el.attr('id');

    const meta = hash ? mediaMap.get(String(hash)) : null;

    const captionHtml = $el.find('figcaption').first().html();
    const captionText = $el.find('figcaption').first().text().trim();

    const alt =
      $el.attr('alt') ||
      $el.attr('caption') ||
      captionText ||
      '';

    if (!meta) {
      $el.replaceWith(captionHtml ? `<figure><figcaption>${captionHtml}</figcaption></figure>` : '');
      return;
    }

    const widthAttr = meta.width ? ` width="${meta.width}"` : '';
    const heightAttr = meta.height ? ` height="${meta.height}"` : '';

    const img = `<img src="${cargoImageUrl(meta)}" alt="${alt.replace(/"/g, '&quot;')}" loading="lazy" decoding="async"${widthAttr}${heightAttr}>`;

    if (captionHtml) {
      $el.replaceWith(`<figure>${img}<figcaption>${captionHtml}</figcaption></figure>`);
    } else {
      $el.replaceWith(img);
    }
  });
}

function cleanCargoRuntime($) {
  $('script').remove();
  $('noscript').remove();
  $('link[rel="preload"]').remove();

  // BaseLayout owns SEO tags. Strip any Cargo leftovers from migrated content.
  $('link[rel="canonical"]').remove();
  $('meta[name="description"]').remove();
  $('meta[property^="og:"]').remove();
  $('meta[name^="twitter:"]').remove();
}

function extractUsefulBody($) {
  // Remove runtime-only / non-content cruft before choosing content.
  $('script, style, noscript, link[rel="preload"]').remove();

  // Cargo pages can hide the useful article body inside odd wrappers.
  // Prefer the element with the most meaningful text, not the first .page/body shell.
  const skipSelectors = [
    'html',
    'head',
    'body',
    'nav',
    'header',
    'footer'
  ];

  let best = null;

  $('body *').each((_, el) => {
    const $el = $(el);
    const tag = (el.tagName || '').toLowerCase();

    if (skipSelectors.includes(tag)) return;

    const html = $el.html() || '';
    const text = $el.text().replace(/\s+/g, ' ').trim();

    if (text.length < 200) return;
    if (html.length < 200) return;

    const linkText = $el.find('a').text().replace(/\s+/g, ' ').trim().length;
    const linkRatio = text.length ? linkText / text.length : 0;

    // Avoid picking menus/index lists where nearly everything is links.
    if (linkRatio > 0.75) return;

    const mediaBonus =
      $el.find('img, media-item, figure, picture, video').length * 250;

    const score = text.length + mediaBonus;

    if (!best || score > best.score) {
      best = {
        score,
        html,
        textLength: text.length,
        tag,
        className: $el.attr('class') || '',
        id: $el.attr('id') || ''
      };
    }
  });

  if (best) {
    console.log(
      `Selected content block: <${best.tag}> #${best.id} .${best.className} text=${best.textLength} score=${best.score}`
    );
    return best.html;
  }

  return $('body').html() || '';
}

function relativeLayoutImport(outPath) {
  const rel = path.relative(path.dirname(outPath), path.join(projectRoot, 'src/layouts/BaseLayout.astro'));
  return rel.startsWith('.') ? rel : `./${rel}`;
}

function writeAstroPage({ slug, title, description, content }) {
  const outPath = pageOutPath(slug);
  ensureDir(path.dirname(outPath));

  const canonical = `https://travel.mitchchadban.com/${slug ? `${slug}/` : ''}`;
  const layoutImport = relativeLayoutImport(outPath).replaceAll(path.sep, '/');

  const astro = `---
import BaseLayout from ${JSON.stringify(layoutImport)};

const pageContent = ${JSON.stringify(content)};
---

<BaseLayout
  title=${JSON.stringify(title)}
  description=${JSON.stringify(description)}
  canonical=${JSON.stringify(canonical)}
>
  <Fragment set:html={pageContent} />
</BaseLayout>
`;

  fs.writeFileSync(outPath, astro);
}


function cleanCss(css) {
  return decode(css)
    .replace(/\u00a0/g, ' ')
    .replace(/\u2007/g, ' ')
    .replace(/\u202f/g, ' ')
    .replace(/\ufeff/g, '')
    .replace(/font-family:\s*'Cormorant Garamond', serif;/g, 'font-family: "Cormorant Garamond", serif;');
}

function extractCss(files) {
  const css = new Set();

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);

    $('style').each((_, el) => {
      const text = $(el).html();
      if (text) css.add(cleanCss(text.trim()));
    });
  }

  const base = `
:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}

img,
video {
  max-width: 100%;
  height: auto;
}
`;

  fs.writeFileSync(stylesPath, cleanCss(`${base}\n\n${[...css].join('\n\n')}\n`));
}

function main() {
  ensureDir(pagesRoot);

  const files = fg.sync('**/*.html', {
    cwd: cloneRoot,
    absolute: true,
    ignore: [
      '**/wp-admin/**',
      '**/cdn-cgi/**'
    ]
  });

  extractCss(files);

  let generated = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const state = getPreloadedState(html);
    const mediaMap = collectMediaMetadata(state);

    const $ = cheerio.load(html, { decodeEntities: false });

    const title = extractTitle($);
    const description = extractDescription($);
    const slug = normaliseSlugFromFile(file);

    convertMediaItems($, mediaMap);
    rewriteLinks($);
    cleanCargoRuntime($);

    const content = extractUsefulBody($);

    writeAstroPage({
      slug,
      title,
      description,
      content
    });

    generated++;
  }

  console.log(`Generated ${generated} Astro pages.`);
}

main();
