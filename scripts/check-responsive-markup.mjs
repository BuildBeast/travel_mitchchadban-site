#!/usr/bin/env node
/**
 * Validate the responsive-image markup in a production build.
 *
 * The companion to `generate-responsive-images.mjs --check`, which validates
 * the derivative *files*. This one validates what the pages actually render,
 * because a correct file on disk is useless if the `srcset` points elsewhere
 * or the `sizes` value belongs to a different article architecture.
 *
 * Legacy articles carry their `sizes` as literal text inside large escaped
 * HTML strings — those strings are deliberately not converted into template
 * literals, so this script is what proves the literals still match
 * `src/lib/responsive-image-config.mjs`.
 *
 * For every rendered article <img> it checks:
 *   - architecture and orientation, inferred from the figure class and from
 *     whether the page loads `legacy-gutter.css`
 *   - `sizes` matches the shared config for that architecture + orientation
 *   - every `srcset` URL exists in the build output
 *   - each descriptor matches the file's real pixel width
 *   - descriptors ascend, with no duplicates
 *   - the original is the last candidate, at its true intrinsic width
 *   - `src` still points at the original, and no candidate reaches its width
 *   - no aspect-ratio drift
 *   - `width`/`height` match the original's real dimensions
 *   - `loading="lazy"`, `decoding="async"`, no `fetchpriority`
 *   - no duplicate attributes on the tag
 * and, across the build, that no image is preloaded.
 *
 * Usage:  node scripts/check-responsive-markup.mjs [distDir]
 */

import sharp from 'sharp';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { SIZES_BY_ARCHITECTURE } from '../src/lib/responsive-image-config.mjs';

const DIST = process.argv[2] || 'dist';

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : null;
};

const metaCache = new Map();
async function imageMeta(url) {
  if (metaCache.has(url)) return metaCache.get(url);
  const path = join(DIST, decodeURIComponent(url));
  let value = null;
  try {
    await stat(path);
    const m = await sharp(path).metadata();
    value = { width: m.width, height: m.height, format: m.format };
  } catch {
    value = null; // missing or unreadable
  }
  metaCache.set(url, value);
  return value;
}

const problems = [];
let imagesChecked = 0;
let candidatesChecked = 0;
const byArchitecture = {};

for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const route = file.replace(new RegExp(`^${DIST}/?`), '/').replace(/index\.html$/, '');

  if (/<link[^>]*rel="preload"[^>]*as="image"/.test(html)) {
    problems.push(`${route}: page preloads an image`);
  }

  // A page is 'legacy-gutter' when it loads legacy-gutter.css; legacy figures
  // on any other page take their gutter from the .post-body wrapper.
  const usesGutter = /legacy-gutter[.\w-]*\.css/.test(html);

  // Walk <figure> blocks so each <img> is tied to the class that sizes it.
  for (const figMatch of html.matchAll(/<figure\s+class="([^"]*)"[^>]*>([\s\S]*?)<\/figure>/g)) {
    const [, figClass, inner] = figMatch;
    const imgMatch = inner.match(/<img\b[^>]*>/);
    if (!imgMatch) continue;
    const tag = imgMatch[0];
    const src = attr(tag, 'src');
    if (!src || !src.includes('/images/')) continue;

    imagesChecked += 1;
    const where = `${route} ${src.split('/').pop()}`;
    const fail = (m) => problems.push(`${where}: ${m}`);

    const architecture = figClass.includes('chronicle-figure')
      ? 'modern'
      : usesGutter
        ? 'legacy-gutter'
        : 'legacy-postbody';
    const orientation = figClass.includes('--portrait') ? 'portrait' : 'landscape';
    const key = `${architecture}/${orientation}`;
    byArchitecture[key] = (byArchitecture[key] || 0) + 1;

    if (figClass.includes('--narrow')) {
      fail('narrow variant has no measured sizes formula');
    }

    // ── loading behaviour ──
    if (attr(tag, 'loading') !== 'lazy') fail('loading is not "lazy"');
    if (attr(tag, 'decoding') !== 'async') fail('decoding is not "async"');
    if (/\sfetchpriority=/.test(tag)) fail('has fetchpriority');

    for (const a of ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding']) {
      const n = (tag.match(new RegExp(`\\s${a}=`, 'g')) || []).length;
      if (n > 1) fail(`duplicate attribute ${a}`);
    }

    // ── original ──
    const original = await imageMeta(src);
    if (!original) {
      fail(`src file missing from the build: ${src}`);
      continue;
    }
    const declaredW = Number(attr(tag, 'width'));
    const declaredH = Number(attr(tag, 'height'));
    if (declaredW !== original.width || declaredH !== original.height) {
      fail(
        `width/height ${declaredW}x${declaredH} != real ${original.width}x${original.height}`,
      );
    }
    if (!attr(tag, 'alt')) fail('alt attribute missing or empty');

    const srcset = attr(tag, 'srcset');
    const sizes = attr(tag, 'sizes');
    if (!srcset) {
      fail('no srcset');
      continue;
    }
    if (!sizes) fail('srcset present but no sizes');

    // ── sizes must match the shared config exactly ──
    const wanted = SIZES_BY_ARCHITECTURE[architecture][orientation];
    if (sizes !== wanted) {
      fail(`sizes does not match shared config for ${key}\n      got:      ${sizes}\n      expected: ${wanted}`);
    }

    // ── srcset ──
    if (/,\s*,/.test(srcset) || /,\s*$/.test(srcset.trim())) fail('malformed commas in srcset');
    const candidates = srcset.split(',').map((c) => {
      const parts = c.trim().split(/\s+/);
      return { url: parts[0], descriptor: Number((parts[1] || '').replace(/w$/, '')) };
    });

    const widths = candidates.map((c) => c.descriptor);
    if (widths.some((w) => !Number.isInteger(w) || w <= 0)) fail('non-integer width descriptor');
    if (widths.some((w, i) => i && w <= widths[i - 1])) fail(`descriptors not ascending: ${widths}`);
    if (new Set(widths).size !== widths.length) fail(`duplicate descriptor: ${widths}`);

    const last = candidates[candidates.length - 1];
    if (last.url !== src) fail(`largest candidate is ${last.url}, not the original`);
    if (last.descriptor !== original.width) {
      fail(`original descriptor ${last.descriptor}w != real width ${original.width}`);
    }

    const sourceRatio = original.width / original.height;
    for (const c of candidates) {
      candidatesChecked += 1;
      const meta = await imageMeta(c.url);
      if (!meta) {
        fail(`srcset file missing from the build: ${c.url}`);
        continue;
      }
      if (meta.width !== c.descriptor) {
        fail(`${c.url} descriptor ${c.descriptor}w != actual ${meta.width}px`);
      }
      if (c.url !== src && meta.width >= original.width) {
        fail(`${c.url} is not narrower than the original`);
      }
      if (Math.abs(meta.width / meta.height - sourceRatio) > 0.005) {
        fail(`${c.url} aspect ratio drifted from the original`);
      }
    }
  }
}

console.log(`build:      ${DIST}`);
console.log(`images:     ${imagesChecked}`);
console.log(`candidates: ${candidatesChecked}`);
console.log('by architecture / orientation:');
for (const [k, v] of Object.entries(byArchitecture).sort()) console.log(`  ${k.padEnd(26)} ${v}`);

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\nAll responsive-markup checks passed.');
