/**
 * Single source of truth for the responsive-image architecture.
 *
 * Plain `.mjs` with no dependencies so the same file can be imported by Astro
 * components, by `.astro` frontmatter and by the Node scripts under
 * `scripts/` — generation, validation and articles cannot drift apart.
 *
 * ── Candidate ladder ────────────────────────────────────────────────────────
 * Derivatives are pre-generated into the repository beside their originals as
 * `<basename>-<width>w.jpg` and committed. Nothing is generated at build or
 * deploy time: every URL a `srcset` names exists in Git, so local and
 * production output are identical and the Cloudflare build never has to run a
 * native binary.
 *
 * A width is emitted only when it is strictly narrower than the source, so an
 * image is never upscaled and no derivative duplicates the original. The
 * original is always the `src` fallback and the largest `srcset` candidate, at
 * its real intrinsic width.
 *
 * ── The `sizes` strings ─────────────────────────────────────────────────────
 * These are not estimates. Each was derived by measuring the rendered figure
 * width in Chrome at 390 / 768 / 1024 / 1440 CSS px and sweeping the
 * breakpoints either side, then expressed as the CSS that produces it. Every
 * formula reproduces the measured width to within 0.003%.
 *
 * Three article architectures exist on the site and each has its own gutter
 * behaviour:
 *
 *   modern Chronicle     `.chronicle-figure` inside `.post-body`
 *                        caps 980px wide / 560px portrait
 *   legacy post-body     `.legacy-figure` inside `.post-body`
 *                        caps 1100px / 560px
 *   legacy gutter        `.legacy-figure` in a wrapper-less article whose
 *                        gutter comes from `legacy-gutter.css` on
 *                        `.page-content`; caps 1100px / 560px
 *
 * `.post-body` steps its horizontal padding 0.95rem → 1.5rem → 4rem at the
 * 420px and 600px breakpoints (15.2px / 24px / 64px a side, hence the 30.4 /
 * 48 / 128 subtractions). `legacy-gutter.css` uses a different scale —
 * 0.95rem → 1.1rem → 1.5rem → 4rem → 0 at 420 / 480 / 600 / 1024 — which is
 * why the gutter formulas carry an extra 35.2px tier and a `100vw` tier above
 * 1024px where the gutter collapses to zero.
 *
 * Changing any of these strings without re-measuring will silently mis-size
 * every image on the affected architecture.
 */

/** Candidate widths offered below the original. Approved and fixed. */
export const RESPONSIVE_WIDTHS = [480, 768, 1200, 1600];

/** MozJPEG quality used for every derivative. One standard, no per-file exceptions. */
export const DERIVATIVE_QUALITY = 70;

// ── modern Chronicle ────────────────────────────────────────────────────────
// min(980px, 100vw - 2 * gutter); the 980 cap engages at vw 1108.
export const SIZES_MODERN_WIDE =
  '(max-width: 420px) calc(100vw - 30.4px), (max-width: 600px) calc(100vw - 48px), (max-width: 1108px) calc(100vw - 128px), 980px';

// min(560px, 100vw - 2 * gutter); the 560 cap engages at vw 688.
export const SIZES_MODERN_PORTRAIT =
  '(max-width: 420px) calc(100vw - 30.4px), (max-width: 600px) calc(100vw - 48px), (max-width: 688px) calc(100vw - 128px), 560px';

// ── legacy article that has a .post-body wrapper ────────────────────────────
// Same gutter scale as modern, but `.legacy-figure` caps at 1100px, reached at
// vw 1228.
export const SIZES_LEGACY_POSTBODY_LANDSCAPE =
  '(max-width: 420px) calc(100vw - 30.4px), (max-width: 600px) calc(100vw - 48px), (max-width: 1228px) calc(100vw - 128px), 1100px';

// Portrait caps at 560px under the same gutters, so this is identical to the
// modern portrait formula. Kept as its own export because the two are
// independent decisions that happen to coincide today.
export const SIZES_LEGACY_POSTBODY_PORTRAIT = SIZES_MODERN_PORTRAIT;

// ── legacy article using legacy-gutter.css (no .post-body wrapper) ──────────
// Above 1024px the gutter collapses to 0, so the figure is 100vw until the
// 1100px cap.
export const SIZES_LEGACY_GUTTER_LANDSCAPE =
  '(max-width: 420px) calc(100vw - 30.4px), (max-width: 480px) calc(100vw - 35.2px), (max-width: 600px) calc(100vw - 48px), (max-width: 1024px) calc(100vw - 128px), (max-width: 1100px) 100vw, 1100px';

export const SIZES_LEGACY_GUTTER_PORTRAIT =
  '(max-width: 420px) calc(100vw - 30.4px), (max-width: 480px) calc(100vw - 35.2px), (max-width: 600px) calc(100vw - 48px), (max-width: 688px) calc(100vw - 128px), 560px';

/**
 * Lookup used by the validation script to confirm that the `sizes` value
 * baked into a page matches the architecture and orientation it belongs to.
 *
 * Architectures: 'modern' | 'legacy-postbody' | 'legacy-gutter'
 * Orientations:  'landscape' | 'portrait'
 */
export const SIZES_BY_ARCHITECTURE = {
  modern: {
    landscape: SIZES_MODERN_WIDE,
    portrait: SIZES_MODERN_PORTRAIT,
  },
  'legacy-postbody': {
    landscape: SIZES_LEGACY_POSTBODY_LANDSCAPE,
    portrait: SIZES_LEGACY_POSTBODY_PORTRAIT,
  },
  'legacy-gutter': {
    landscape: SIZES_LEGACY_GUTTER_LANDSCAPE,
    portrait: SIZES_LEGACY_GUTTER_PORTRAIT,
  },
};

/**
 * Derivative filename for a source path and candidate width:
 * `/images/a/x.jpg` + 768 -> `/images/a/x-768w.jpg`.
 * Deterministic, and the only naming rule anything is allowed to use.
 */
export function derivativeName(srcPath, width) {
  return srcPath.replace(/\.(jpe?g)$/i, `-${width}w.$1`);
}

/**
 * The candidate widths that should exist for a source of the given intrinsic
 * width — everything in the ladder strictly narrower than the source.
 */
export function expectedWidths(sourceWidth) {
  return RESPONSIVE_WIDTHS.filter((w) => w < sourceWidth);
}

/**
 * Full `srcset` value for a source image: every generated derivative in
 * ascending order, then the original at its true intrinsic width.
 *
 * Callers must pass the source's real measured width — this helper does not
 * read the filesystem and does not verify that the derivatives exist. The
 * generation and check scripts are what prove that.
 */
export function buildSrcset(srcPath, sourceWidth) {
  const candidates = expectedWidths(sourceWidth).map(
    (w) => `${derivativeName(srcPath, w)} ${w}w`,
  );
  return [...candidates, `${srcPath} ${sourceWidth}w`].join(', ');
}
