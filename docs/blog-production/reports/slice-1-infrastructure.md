# Slice 1 Report — New-Chronicle Authoring & Image Infrastructure

_2026-07-29 · Branch `main` · HEAD `17cf774` · **Nothing committed, pushed or deployed**_

---

## 1. Chosen architecture

**Option B — maintainable `.astro` article pages behind a shared layout and a small component set.**

New chronicles are written as ordinary Astro markup at `src/pages/<slug>/index.astro`, importing `ChronicleLayout` plus the components in `src/components/chronicle/`. Metadata is a single typed `ChronicleMeta` object. No escaped HTML strings, no Cargo wrappers.

### Why

| Factor | Verdict |
|---|---|
| **New dependencies** | **Zero.** No install, no `astro.config.mjs` change, no new build surface. |
| **Component-rich modules** | The article needs practical blocks, chapter headings, figures, an itinerary block and an anchor menu. Astro components give this natively. |
| **Routing** | Unchanged. File-system routing already works; all 26 legacy pages keep building untouched. |
| **Typed metadata** | `ChronicleMeta` + per-component `Props` interfaces, under the repo's existing `astro/tsconfigs/strict`. |
| **Canonical/JSON-LD** | Derived from `meta.path` — no more hand-typed absolute URLs to get wrong. |
| **Migration cost** | Nil. Legacy posts are not touched and need never be migrated. |
| **Future migration path** | Preserved — the components are plain `.astro`, so they can be imported into MDX later if content collections are ever adopted. |

## 2. Alternatives considered

### Option A — content collections with Markdown or MDX · **rejected**

Investigated against the installed toolchain, not assumed:

- **Astro 6.4.8** supports content collections, and `zod@4.4.3` is already present as an Astro dependency — so *plain Markdown* collections would work with no install.
- **But plain Markdown cannot embed components.** The Seville article needs practical blocks, figures with captions, an anchor menu and an itinerary block. In plain Markdown these would have to be written as raw inline HTML — which reintroduces exactly the maintainability problem this slice exists to solve.
- **MDX would solve that, but `@astrojs/mdx` is not installed.** Adopting it means a network install, a new dependency, an `astro.config.mjs` integration change and a second content pipeline — for one article.
- Schema validation is a genuine advantage of collections, but a typed `Props` interface delivers most of it here without new machinery.

**Conclusion:** collections are the right answer at ~10+ new articles with a settled format. At article one they are more surface than value. Option B is the smaller robust choice, and it does not foreclose Option A.

### Also rejected

- **Continuing the escaped-HTML-string pattern** — it is the root cause of the maintainability problem; kept only for the legacy pages, which are not being rewritten.
- **`astro:assets` / `<Image>` for images** — `sharp@0.34.5` is available, so this would work, but `<Image>` always re-encodes. The brief requires native dimensions preserved and no resizing or compression without authorisation. Deferred (see §11).

## 3. Files created

**Layout (1)**
```
src/layouts/ChronicleLayout.astro
```

**Components (10)**
```
src/components/chronicle/types.ts                 typed metadata contract + absolute() helper
src/components/chronicle/ArticleHeader.astro      hero: route strip, label, h1, standfirst, stats
src/components/chronicle/AnchorNav.astro          in-page anchor menu  [NEW PATTERN]
src/components/chronicle/Chapter.astro            chapter/day heading with anchor id
src/components/chronicle/Practical.astro          practical block shell
src/components/chronicle/PracticalSection.astro   labelled group; optional real h3/h4
src/components/chronicle/Figure.astro             figure/figcaption/img  [NEW PATTERN]
src/components/chronicle/PullQuote.astro          pull quote
src/components/chronicle/Beat.astro               beat line between chapters
src/components/chronicle/AtAGlance.astro          itinerary summary block
src/components/chronicle/FurtherReading.astro     further-reading cards
```

**Images (8)** — `public/images/3-days-in-seville/`
```
giralda-from-alcazar-gardens.jpg          1365×2048  714,942 B
cathedral-capilla-mayor.jpg               2048×1365  531,005 B
archivo-de-indias-gallery.jpg             2048×1365  448,811 B
plaza-de-toros-maestranza-facade.jpg      2048×1365  326,431 B
plaza-de-espana-bridges.jpg               2048×1365  599,735 B
parque-maria-luisa-pabellon-mudejar.jpg   2048×1365  561,503 B
casa-de-pilatos-garden-loggia.jpg         2048×1365  523,180 B
giralda-at-dusk.jpg                       2048×1365  283,659 B
```

**Documentation (1)**
```
docs/blog-production/research/seville-3-days-image-manifest.md
```

## 4. Files modified

**None.** Zero tracked files were changed — verified with `git status --porcelain` (no ` M` entries) and per-file `git diff --stat` on `global.css`, `BaseLayout.astro`, `astro.config.mjs`, `package.json` and all of `src/pages/`. Every entry in the working tree is a new untracked addition.

## 5. Components added — and how they reuse the existing design

**Nine of the eleven components emit exactly the DOM the legacy chronicles already use**, so they inherit the site's typography, spacing and colour with **no changes to `global.css`**. I verified all 63 class names used by `/10-days-in-sevilla/` against `global.css`; 61 were already defined.

The two genuinely new patterns carry **component-scoped styles only** (Astro scopes them automatically; `global.css` is untouched), and reuse the existing tokens — accent greens `#6a9a47` / `#5a8a3a` / `#3d6b25`, text `rgba(221,232,208,…)`, hairlines `rgba(160,200,120,0.12)`, and the IM Fell English / Cormorant Garamond pairing:

- **`AnchorNav`** — the site had no anchor menu or TOC at all (`.anchor-menu` and `.toc` were the only two undefined classes). Semantic `<nav aria-label>` → `<ul>` → `<li>` → `<a href="#…">`, wrapping flex layout, hairline rules top and bottom, focus-visible states.
- **`Figure`** — the site had **no image pattern whatsoever**. Emits `<figure>` → `<img>` (+ optional `<figcaption>`), requires true `width`/`height`, lazy by default.

Two small scoped resets were also needed: `h3/h4.prac-label` (so a real heading renders like the legacy div) and `a.chronicle-card` (so a whole card can be a link).

Also fixed in the new component, relative to the legacy pattern: `FurtherReading` makes the **entire card** a link to a **real route**, rather than the legacy markup where only the region line was clickable and several cards pointed at `/coming-soon/`.

No UI framework was introduced. No global visual styling was changed. The site was not redesigned.

## 6. Image convention

```
public/images/<article-slug>/<descriptive-kebab-name>.jpg
docs/blog-production/research/<article-slug>-image-manifest.md
```

**Rules**
- Copy only the images an article actually uses. 8 files copied from a library of ~1,180.
- **Byte-identical copies.** sha256 verified for all 8: no resizing, no re-encoding, no format conversion, **no compression**. Output bytes == input bytes in every case.
- Descriptive filenames reflecting the **visually confirmed** subject — never the camera serial.
- Every image was **opened and inspected**; nothing was identified from its filename.
- `<figure>`/`<figcaption>` semantics via `Figure.astro`.
- Explicit `width`/`height` = true pixel dimensions. With the existing `img { max-width:100%; height:auto }` rule this reserves the correct aspect ratio and prevents layout shift.
- `loading="lazy"` + `decoding="async"` by default; `loading="eager"` + `decoding="sync"` + `fetchpriority="high"` only via `priority`, intended for at most one above-the-fold image.
- `alt` is a required prop. `alt=""` is permitted only for genuinely decorative images.
- No stock imagery. No external images.
- The manifest lives in `docs/`, **not** in `public/` — it would otherwise be publicly served.

**Provenance recorded** in the manifest for each file: source path, destination path, original and output dimensions (identical), original and output bytes (identical), compression (none), visible subject, capture timestamp, and an explicit identification-confidence rating. Two frames are flagged as *subject certain / vantage inferred or unknown* so captions cannot over-claim.

All 8 are from the **September–October 2025** visit. **No 2023 images are used**, per the approved decision.

## 7. Existing behaviour preserved

| Check | Result |
|---|---|
| Tracked files modified | **0** |
| `global.css` / `BaseLayout.astro` / `astro.config.mjs` / `package.json` | untouched |
| Legacy articles under `src/pages/` | untouched — no article HTML rewritten, no legacy post migrated |
| Route count | **31 before → 31 after** |
| Sitemap | **30 URLs before → 30 after**; `coming-soon` still excluded |
| Broken internal links in built output | **0** (all `href`/`src` across all 31 pages checked against built routes and assets) |
| New dependencies | **0** |
| New global CSS | **0** — all new styling is component-scoped |
| Public surface added | 8 images at `/images/3-days-in-seville/`; no manifest leaked to `dist/` |

## 8. Validation commands

Only commands that genuinely exist in this repository were used (`package.json` defines exactly four scripts):

```sh
npm run build          # astro build — the only real automated gate
git status --short     # working-tree state
git diff --stat -- <path>   # per-file confirmation nothing was modified
```

Plus scripted checks written for this run: sha256 byte-identity of image copies, `sips` pixel-dimension verification, and a full `dist/`-wide link/asset resolver.

**Not available, and not invented:** there is no linter, formatter, test runner, content validation or link checker in this repo. `npx astro check` would need `@astrojs/check` and `typescript`, **neither of which is installed** — see §11.

## 9. Validation results

**Component compilation.** Because unimported components are never compiled, I created a temporary route `src/pages/zz-slice1-smoke/` exercising every component, built it, inspected the generated HTML, then **deleted it and rebuilt**. Confirmed in the generated output:

- `<title>`, `<meta name="description">`, self-referential `<link rel="canonical">`, `og:type="article"`, and an absolute `og:image`
- JSON-LD graph: `Article` (with `image`) + `BreadcrumbList` (`Home > Chronicles > <title>`) + `FAQPage` — emitted only when `meta.faq` is supplied
- Heading outline `h1 → h2 → h3`, exactly one `<h1>`
- Figures: `<figure>` / `<img>` / `<figcaption>`; **2 images, 0 missing `alt`, 0 missing `width` or `height`**; 1 eager (`decoding="sync"`, `fetchpriority="high"`), 1 lazy (`decoding="async"`)
- Anchor nav: `<nav aria-label>` → `<ul>` → `<li>` → in-page `<a href="#…">`, resolving to real `id`s
- Legacy modules (`post-hero`, `post-stats`, `chapter-break`, `practical`, `itin-block`, `next-chronicles`) emit the same DOM as `/10-days-in-sevilla/`

Two defects were found in that inspection and fixed: a redundant `fetchpriority="auto"` on non-priority images, and an unused `id` on the anchor-nav label. Re-verified after the fix.

**Builds.** All passed with **no errors and no warnings** — 32 pages with the smoke page, **31 after removal**, matching the pre-slice baseline exactly.

**Images.** 8/8 byte-identical to source (sha256), dimensions confirmed with `sips`, 3,989,266 bytes total (3.80 MB), all present in `dist/images/3-days-in-seville/`, no `MANIFEST.md` leaked into `dist/`.

**Links.** 0 broken across the whole built site.

**Not run:** type checking (tooling absent) and responsive browser inspection (deferred to Slice 2, where there is a real page to view).

## 10. Working-tree status

Clean apart from **new, unstaged, untracked additions**:

```
?? docs/                            (Stage 1–2 documents + this report + image manifest)
?? public/images/                   (8 Seville JPEGs)
?? src/components/chronicle/        (10 files)
?? src/layouts/ChronicleLayout.astro
```

Nothing staged. Nothing committed. Nothing pushed. Nothing deployed. No unrelated work existed at the start of this slice and none was touched.

## 11. Risks

| Risk | Severity | Note |
|---|---|---|
| **No type checking** — `astro check` needs `@astrojs/check` + `typescript`, not installed | Medium | Types are declared and the strict tsconfig is in place, but nothing enforces them. Installing two devDependencies would fix it; **not done**, as it changes `package.json` and needs approval. |
| **Images served unoptimised** — 8 files, 3.80 MB total, largest 715 KB | Medium | A deliberate consequence of "no resizing or compression without authorisation". Only ~2 images load per viewport with lazy-loading, so real-world cost is well below 3.80 MB. `astro:assets` (sharp already present) or pre-generated WebP/AVIF would cut this substantially — **needs your authorisation**, since both re-encode. |
| Two components carry scoped CSS the site has never rendered before | Low | Verified in built HTML; visual check at three widths is a Slice 2 task. |
| `Figure` trusts hand-entered `width`/`height` | Low | Wrong values would cause layout shift. All 8 are recorded in the manifest from `sips` output; a build-time assertion is possible later. |
| Two parallel authoring systems (legacy strings, new components) | Low | Intentional and documented. Legacy pages are frozen, not migrated. |
| No automated link or schema checking | Low | Unchanged from before; mitigated by the scripted `dist` checks used here. |

## 12. Recommendation on Slice 2

**Slice 2 is safe to begin.**

The infrastructure builds cleanly, changes nothing that already existed, adds no dependencies, and has been validated end-to-end through a temporary page that was then removed. The eight images are in place, verified byte-identical, and each has a confirmed visible subject.

Two decisions are worth taking before or alongside Slice 2, neither of which blocks it:

1. **Authorise image optimisation?** Currently 3.80 MB of unoptimised JPEG. Say the word and I will add responsive WebP/AVIF via `astro:assets` — but that re-encodes, which your brief prohibits by default.
2. **Install `@astrojs/check` + `typescript`?** Two devDependencies would turn the typed metadata into an enforced contract rather than a convention.

One content constraint carries into Slice 2: **there is no confidently identified 2025 photograph of Triana, the Torre del Oro, Santa Cruz, the Setas or any food.** Day 2 will therefore carry a single image (the Maestranza façade). I will not pad it with an image whose subject or location I cannot confirm.

**Awaiting your explicit approval before drafting or implementing the article.**
