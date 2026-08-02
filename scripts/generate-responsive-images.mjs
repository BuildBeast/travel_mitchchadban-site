#!/usr/bin/env node
/**
 * Generate and validate responsive JPEG derivatives beside an original image.
 *
 * WHY THIS EXISTS
 * ---------------
 * Article images are served straight from `public/images/<slug>/` as
 * byte-identical JPEGs. A 2048px-wide file is roughly 300–470 kB, and on a
 * 390px phone the browser was downloading all of it to paint a ~360px box.
 * This script produces narrower siblings so `srcset` can offer the browser a
 * candidate that matches the rendered size.
 *
 * Derivatives are committed to the repository. Nothing is generated at build
 * or deploy time, so every URL a `srcset` names exists in Git and the
 * Cloudflare build never has to run a native binary.
 *
 * NON-NEGOTIABLE: originals are never touched. The script refuses to write to
 * any path that is not `<basename>-<width>w.jpg`, so an original cannot be
 * resized, re-encoded, renamed, moved or overwritten by it. Derivatives are
 * additional files only.
 *
 * CANDIDATE LADDER
 * ----------------
 * `RESPONSIVE_WIDTHS` from `src/lib/responsive-image-config.mjs` — the single
 * source of truth shared with the articles and the components. A width is
 * skipped when it is greater than or equal to the original's true pixel width,
 * so nothing is ever upscaled and no derivative duplicates the original. The
 * original itself is the largest `srcset` candidate, at its real intrinsic
 * width; this script does not produce it, it only reports it.
 *
 * ENCODING
 * --------
 * MozJPEG at quality 70, progressive — one standard for every image, no
 * per-file exceptions. Height is derived from the width so the aspect ratio
 * and orientation are preserved exactly. No crop, no rotation, no sharpening,
 * no colour adjustment. Derivative metadata is dropped (sharp's default);
 * originals keep theirs because they are never rewritten.
 *
 * USAGE
 * -----
 *   node scripts/generate-responsive-images.mjs <image.jpg> [more.jpg ...]
 *   node scripts/generate-responsive-images.mjs --force   <image.jpg>
 *   node scripts/generate-responsive-images.mjs --dry-run <image.jpg>
 *   node scripts/generate-responsive-images.mjs --check   <image.jpg>
 *
 * or via npm:  npm run images:responsive -- <paths>
 *              npm run images:responsive:check -- <paths>
 *
 * Existing derivatives are left alone unless `--force` is passed. Paths
 * containing spaces work because arguments are read from argv, never a shell
 * string. Exits non-zero on any failure, so a partial run cannot look like a
 * successful one.
 *
 * CHECK MODE
 * ----------
 * `--check` writes nothing. For each supplied original it verifies that every
 * expected derivative exists, that no unexpected derivative width is present,
 * that each file's real pixel width matches its `-<n>w` descriptor, that the
 * aspect ratio matches the source within rounding, that no candidate reaches
 * the original's width, that every file decodes as a progressive JPEG, and —
 * using Git, which is the repository's own hash store — that no original has
 * been modified.
 */

import sharp from 'sharp';
import { readFile, writeFile, stat, readdir } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  RESPONSIVE_WIDTHS,
  DERIVATIVE_QUALITY,
} from '../src/lib/responsive-image-config.mjs';

const execFileAsync = promisify(execFile);

/** `photo.jpg` + 768 -> `photo-768w.jpg`, alongside the original. */
function derivativePath(originalPath, width) {
  const ext = extname(originalPath);
  return join(dirname(originalPath), `${basename(originalPath, ext)}-${width}w${ext}`);
}

/** Guard: only ever write a path this script is allowed to own. */
function assertIsDerivativePath(candidate, originalPath) {
  if (candidate === originalPath || !/-\d+w\.jpe?g$/i.test(candidate)) {
    throw new Error(`refusing to write non-derivative path: ${candidate}`);
  }
}

/** True when the path is itself a derivative rather than an original. */
const isDerivative = (p) => /-\d+w\.jpe?g$/i.test(p);

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

const fmtBytes = (n) => `${(n / 1024).toFixed(1)} kB`;

/** Candidate widths strictly narrower than the source. */
const wantedWidths = (sourceWidth) => RESPONSIVE_WIDTHS.filter((w) => w < sourceWidth);

// ── generate ────────────────────────────────────────────────────────────────

async function generate(originalPath, { force, dryRun }) {
  const originalBytes = (await stat(originalPath)).size;
  // Read once and reuse the buffer, so the original file handle is only ever
  // opened for reading.
  const input = await readFile(originalPath);
  const { width, height, format } = await sharp(input).metadata();

  if (format !== 'jpeg') throw new Error(`${originalPath}: expected a JPEG, found ${format}`);
  if (!width || !height) throw new Error(`${originalPath}: could not determine pixel dimensions`);

  console.log(`\n${originalPath}`);
  console.log(`  source: ${width}x${height}  ${fmtBytes(originalBytes)}`);

  const wanted = wantedWidths(width);
  const skipped = RESPONSIVE_WIDTHS.filter((w) => w >= width);
  if (skipped.length) console.log(`  skipped (>= source width): ${skipped.join('w, ')}w`);
  console.log(`  largest srcset candidate is the original itself at ${width}w`);

  for (const targetWidth of wanted) {
    const outPath = derivativePath(originalPath, targetWidth);
    assertIsDerivativePath(outPath, originalPath);

    if ((await exists(outPath)) && !force) {
      const bytes = (await stat(outPath)).size;
      const meta = await sharp(outPath).metadata();
      console.log(
        `  = ${basename(outPath)}  ${meta.width}x${meta.height}  ${fmtBytes(bytes)}  (exists, kept — pass --force to regenerate)`,
      );
      continue;
    }

    if (dryRun) {
      console.log(`  · ${basename(outPath)}  ${targetWidth}w  (dry run, not written)`);
      continue;
    }

    // `withoutEnlargement` is belt-and-braces: `wanted` already excludes any
    // width >= the source. Height omitted so the ratio is derived, not forced.
    const buffer = await sharp(input)
      .resize({ width: targetWidth, withoutEnlargement: true, fit: 'inside' })
      .jpeg({ quality: DERIVATIVE_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();

    await writeFile(outPath, buffer);

    const meta = await sharp(buffer).metadata();
    if (meta.width !== targetWidth) {
      throw new Error(`${outPath}: wrote ${meta.width}w but asked for ${targetWidth}w`);
    }

    const reduction = (100 * (1 - buffer.length / originalBytes)).toFixed(1);
    console.log(
      `  + ${basename(outPath)}  ${meta.width}x${meta.height}  ${fmtBytes(originalBytes)} -> ${fmtBytes(buffer.length)}  (-${reduction}%)`,
    );
  }
}

// ── check ───────────────────────────────────────────────────────────────────

async function check(originalPath, problems) {
  const fail = (msg) => problems.push(`${originalPath}: ${msg}`);

  const source = await sharp(originalPath).metadata();
  if (source.format !== 'jpeg') return fail(`expected a JPEG, found ${source.format}`);
  if (!source.width || !source.height) return fail('could not determine pixel dimensions');

  const expected = wantedWidths(source.width);
  const dir = dirname(originalPath);
  const stem = basename(originalPath, extname(originalPath));

  // Every derivative actually sitting beside this original.
  const siblings = (await readdir(dir)).filter((f) => {
    const m = f.match(/^(.*)-(\d+)w\.jpe?g$/i);
    return m && m[1] === stem;
  });
  const present = siblings
    .map((f) => ({ file: f, width: Number(f.match(/-(\d+)w\.jpe?g$/i)[1]) }))
    .sort((a, b) => a.width - b.width);

  for (const w of expected) {
    if (!present.some((p) => p.width === w)) fail(`missing expected derivative ${w}w`);
  }
  for (const p of present) {
    if (!expected.includes(p.width)) fail(`unexpected derivative width ${p.width}w (${p.file})`);
  }

  const sourceRatio = source.width / source.height;
  for (const p of present) {
    const path = join(dir, p.file);
    let meta;
    try {
      meta = await sharp(path).metadata();
    } catch (error) {
      fail(`${p.file} is not a readable image (${error.message})`);
      continue;
    }
    if (meta.format !== 'jpeg') fail(`${p.file} is ${meta.format}, expected jpeg`);
    if (meta.width !== p.width) fail(`${p.file} descriptor ${p.width}w != actual ${meta.width}px`);
    if (meta.width >= source.width) {
      fail(`${p.file} is ${meta.width}px, not narrower than the ${source.width}px original`);
    }
    // One pixel of rounding either way is inherent to integer dimensions.
    const expectedHeight = Math.round((p.width * source.height) / source.width);
    if (Math.abs(meta.height - expectedHeight) > 1) {
      fail(`${p.file} is ${meta.width}x${meta.height}, expected height ~${expectedHeight}`);
    }
    if (Math.abs(meta.width / meta.height - sourceRatio) > 0.005) {
      fail(`${p.file} aspect ratio drifted from the source`);
    }
    if (!meta.isProgressive) fail(`${p.file} is not progressive`);
  }

  return present.length;
}

/**
 * Originals must be byte-identical. The repository already stores their
 * hashes, so ask Git rather than inventing a second manifest to keep in sync.
 */
async function checkOriginalsUnmodified(paths) {
  try {
    const { stdout } = await execFileAsync('git', ['status', '--porcelain', '--', ...paths], {
      maxBuffer: 32 * 1024 * 1024,
    });
    const dirty = stdout.split('\n').filter(Boolean);
    if (!dirty.length) return { ok: true, tracked: true, dirty: [] };
    // Untracked originals are new images, not modified ones.
    const modified = dirty.filter((l) => !l.startsWith('??'));
    return { ok: modified.length === 0, tracked: true, dirty: modified };
  } catch (error) {
    return { ok: true, tracked: false, note: error.message };
  }
}

// ── entry point ─────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const force = argv.includes('--force');
const dryRun = argv.includes('--dry-run');
const checkOnly = argv.includes('--check');
const paths = argv.filter((a) => !a.startsWith('--'));

if (!paths.length) {
  console.error(
    'usage: node scripts/generate-responsive-images.mjs [--check|--force|--dry-run] <image.jpg> ...',
  );
  process.exit(1);
}

const originals = paths.filter((p) => !isDerivative(p));
const misdirected = paths.filter(isDerivative);
if (misdirected.length) {
  console.error(
    `refusing to run: ${misdirected.length} argument(s) are themselves derivatives, e.g. ${misdirected[0]}`,
  );
  process.exit(1);
}

let failed = 0;

if (checkOnly) {
  const problems = [];
  let derivativeCount = 0;
  for (const path of originals) {
    try {
      derivativeCount += (await check(path, problems)) || 0;
    } catch (error) {
      problems.push(`${path}: ${error.message}`);
    }
  }

  const git = await checkOriginalsUnmodified(originals);
  if (!git.ok) {
    problems.push(
      `${git.dirty.length} original(s) modified according to git:\n    ${git.dirty.join('\n    ')}`,
    );
  }

  console.log(
    `checked ${originals.length} original(s), ${derivativeCount} derivative(s), ladder [${RESPONSIVE_WIDTHS.join(', ')}]`,
  );
  console.log(
    git.tracked
      ? `originals unmodified according to git: ${git.ok ? 'yes' : 'NO'}`
      : `originals unmodified: could not consult git (${git.note})`,
  );

  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    for (const p of problems) console.error(`  ✗ ${p}`);
    process.exit(1);
  }
  console.log('\nAll responsive-image checks passed.');
  process.exit(0);
}

for (const path of originals) {
  try {
    await generate(path, { force, dryRun });
  } catch (error) {
    failed += 1;
    console.error(`\nFAILED ${path}: ${error.message}`);
  }
}

console.log(
  `\n${originals.length - failed}/${originals.length} image(s) processed${failed ? `, ${failed} failed` : ''}.`,
);
process.exit(failed ? 1 : 0);
