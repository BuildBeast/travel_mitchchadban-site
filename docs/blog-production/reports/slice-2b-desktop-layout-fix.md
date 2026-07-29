# Slice 2b — Desktop Layout Correction

_2026-07-29 · **Nothing committed, pushed or deployed** · Article copy unchanged_

---

## Why the first QA pass missed this

My Slice 2 responsive QA was invalid in a specific, avoidable way. I measured the page inside **fixed-width iframes**, and I screenshotted those iframes through `transform: scale(0.44)` / `scale(0.485)` pinned to `transform-origin: top left`.

That transform is exactly what produced the appearance being described: a small, narrow column pressed against the left edge, roughly two-thirds of the frame empty, all type apparently far too small, and the lead image reduced to a shallow strip. **I was looking at a downscaled thumbnail of the page and reading it as the page.** Measurements taken inside an iframe were technically accurate about the iframe, and told me nothing about how the page composes in a real window.

This pass used the **real top-level browser viewport** throughout, with no transform.

## What I found at a real viewport

At a genuine 1440 px and 1600 px top-level viewport the page was **not** miniaturised or left-pushed. Containers were full-width, prose was 1100 px centred, the H1 was 88 px, and the lead image was at its exact natural 3:2 ratio. So the catastrophic symptom was an artefact of my own screenshots.

**But the inspection did surface two genuine composition defects**, both mine, and both consistent with a page that "doesn't feel intentionally composed":

### Defect 1 — half the article ran full-bleed and misaligned

**Cause.** The site's content measure is not set by a wrapper. It comes from individual class rules in `global.css`, each declaring `max-width: 1100px; margin: 0 auto`:

```
.opening-prose  .narrative  .chapter-break  .practical
.itin-inner     .faq-inner  .pull           .ornament   .tours
```

**A bare `.prose` has no `max-width` at all** — `global.css` only ever styles `.prose p`, `.prose p:last-child` and `.prose em`. I had wrapped "Who this route suits" and the five closing sections (`scheduling`, `booking`, `heat`, `walking`, `omitted`) in a bare `<div class="prose">`.

**Result at 1600 px:** those blocks rendered **1472 px wide at left 64**, while every neighbouring block rendered **1100 px at left 250**. Roughly half the article was 34% wider than the other half and misaligned by 186 px, so nothing lined up down the page.

**Fix.** Use `.narrative prose` — the class the legacy chronicles already use for body prose — on both blocks. Zero new CSS, exact parity with the existing article.

### Defect 2 — six section headings had no styling at all

**Cause.** `global.css` styles `.chapter-name` (51.2 px IM Fell English) and `.prac-label` (15 px uppercase green), but has **no rule for a bare `h2` or `h3`**. My six section headings therefore fell back to the UA default: **24 px, weight 700, Cormorant, `margin: 0`** — the same size as body copy, with no separation. Five of the article's major sections had effectively no visible hierarchy.

**Fix.** New `SectionHeading.astro` component, deliberately pitched between the two existing levels and built only from existing brand tokens (IM Fell English, `#dde8d0`, the `rgba(160,200,120,0.1)` hairline). Component-scoped, so legacy pages cannot be affected.

### Also corrected — off-centre stats block (pre-existing, fixed for new chronicles only)

`global.css` gives `.post-stats` a `max-width` with `margin: 0`. Between roughly 700 px and 1024 px the block sat flush left, leaving a wide empty gap to its right — a genuine "empty right-hand void". **Verified identical on `/10-days-in-sevilla/`**, so it is pre-existing global behaviour, not something I introduced. Rather than change `global.css` and alter every legacy chronicle, I added `margin-inline: auto` as a **component-scoped** rule inside `ArticleHeader.astro`, so only new chronicles are centred and legacy rendering is untouched.

## Before / after measurements (real top-level viewport, no transform)

### Content measure at 1600 px

| Block | Before | After | Legacy `/10-days-in-sevilla/` |
|---|---|---|---|
| `.opening-prose` | 1100 @ left 250 | 1100 @ left 250 | 1100 @ left 250 |
| `.narrative.prose` | 1100 @ left 250 | 1100 @ left 250 | 1100 @ left 250 |
| **bare `.prose`** (6 sections) | **1472 @ left 64** ❌ | **1100 @ left 250** ✓ | *n/a — legacy has none* |
| `.practical` | 1100 @ left 250 | 1100 @ left 250 | 1100 @ left 250 |
| `.itin-inner` | 1100 @ left 250 | 1100 @ left 250 | 1100 @ left 250 |
| Blocks wider than 1100 px | **1** ❌ | **0** ✓ | 0 |
| Distinct left edges | 64, 250, 310, 390, 520 ❌ | 250, 310, 390, 520 ✓ | 250, … |

### Typographic hierarchy at 1600 px

| Level | Before | After |
|---|---|---|
| `h1` | 88 px | 88 px |
| `.chapter-name` | 51.2 px | 51.2 px |
| **section heading** | **24 px / weight 700 / margin 0** ❌ | **34.4 px / weight 400 / IM Fell English / 41.6 px top margin + hairline** ✓ |
| body prose | 24 px | 24 px |
| `.prac-label` | 15 px | 15 px |

A flat 24/24 body-and-heading relationship became a clean descending ladder: **88 → 51.2 → 34.4 → 24 → 15**.

### Stats block

| Viewport | Before | After |
|---|---|---|
| 768 px | w 360 @ left 64, `margin: 0` — 344 px void to the right ❌ | w 360, `margin-inline: 59px/59px` — centred ✓ |
| 606 px | flush left | centred ✓ |
| 1440/1600 px | already centred | unchanged ✓ |

### Lead image — no crop, at any width

| | Value |
|---|---|
| Natural | 2048 × 1365 (**aspect 1.500**) |
| Rendered at 1600 px | 980 × 654 (**aspect 1.500**) |
| `object-fit` | `fill` — irrelevant, since the box matches the intrinsic ratio exactly |
| CSS height | `auto`, never a fixed height |

The "shallow cropped strip" was the downscaled iframe in my earlier screenshots, not the page. Portrait frames remain separately constrained by the `portrait` variant (560 px), which does not touch landscape figures.

### Overflow

`scrollWidth` equals viewport width at **1440 px and 1600 px** — zero horizontal overflow. At 768 px and below, `scrollWidth` exceeds the viewport solely because of the off-canvas `nav.mobnav__panel` in shared `Header.astro`, positioned at `left: 396px`. **Verified byte-for-byte identical on `/10-days-in-sevilla/`, `/1-day-in-cordoba/` and `/`.** Pre-existing, sitewide, and in a shared component — left alone.

## Files changed

| File | Change |
|---|---|
| `src/pages/3-days-in-seville/index.astro` | Two `<div class="prose">` → `<div class="narrative prose">`; six bare `<h2>` → `<SectionHeading>`; import added. **No copy changed.** |
| `src/components/chronicle/SectionHeading.astro` | **New** — branded section heading, component-scoped |
| `src/components/chronicle/ArticleHeader.astro` | Added scoped `.post-stats { margin-inline: auto }` with justification comment |

**Not touched:** `global.css`, `Header.astro`, `RegionMap.astro`, `BaseLayout.astro`, `astro.config.mjs`, and every legacy page — all verified unchanged via `git diff --stat`.

## Verified no leakage to legacy pages

Searched each built page's inline `<style>` blocks **and** its linked CSS bundle for the new tokens:

| Page | `chronicle-section-heading` / `chronicle-figure` / `anchor-menu` / `scroll-margin-top` / `margin-inline:auto` |
|---|---|
| `/3-days-in-seville/` | all present |
| `/10-days-in-sevilla/` | **none** |
| `/1-day-in-cordoba/` | **none** |
| `/` | **none** |

Shared bundle hash **`BaseLayout.D2GA9v2P.css` — unchanged**, so legacy rendered output is identical.

## Validation

```
npm run check   → 51 files, 6 errors, 0 warnings, 1 hint
                  all 6 pre-existing in Header.astro / RegionMap.astro
                  errors in new page/layout/components: 0
npm run build   → passed, no errors, no warnings, 32 pages
```

Nothing committed, pushed or deployed.

## Screenshot method

All captures below are **1:1 with no transform**.

- **1440 px** and **1600 px** — real top-level browser window.
- **768 px** — real top-level browser window.
- **390 px** — Chrome enforces a minimum window width on this machine (the window floors at **606 px**), so a top-level 390 px window was not achievable. The 390 px capture is a 390 px-wide frame rendered **at 1:1 with no scaling**, so all type sizes are truthful. Stated plainly rather than presented as a real window.

## Honest residual limitations

- The **390 px** view is a 1:1 frame render, not a real 390 px window (browser minimum-width limit).
- Two pre-existing sitewide issues remain, both in shared code and both identical on legacy pages: the off-canvas mobile-nav overflow, and both headers rendering simultaneously at ≤820 px. Fixing either means editing `Header.astro`. I can do that as a separate, scoped task on your say-so.
- The 1100 px prose measure at desktop is long by typographic convention, but it is **exactly** the legacy measure. Narrowing it would make the new article diverge from every existing chronicle, so I left it — flagging it as a site-wide decision rather than an article-level one.
