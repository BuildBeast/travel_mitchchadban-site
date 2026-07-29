# Slice 2 Report — 3 Days in Seville: Implementation

_2026-07-29 · Branch `main` · HEAD `17cf774` · Factual review date: **2026-07-29** · **Nothing committed, pushed or deployed**_

---

## 1. Infrastructure changes completed

- **Real type checking added.** `@astrojs/check` + `typescript` installed as devDependencies; `"check": "astro check"` added to `package.json`. First run of `npm run check` reports **6 errors, all pre-existing**, in `src/components/Header.astro` (3) and `src/components/RegionMap.astro` (3) — implicit-`any` parameters and `Element.focus()` typing. **Zero errors in the new page, layout or components.** Those two files are shared components outside this slice's scope and were left untouched.
- **Structured data verified** (§19).
- **`Figure` hardened** with a `variant` prop (`wide` | `narrow` | `portrait`) so tall frames render at a constrained 560 px instead of dominating the scroll.
- **`AnchorNav` hardened** — real defect found and fixed during browser QA: the site header is `position: sticky` at ~78 px, and anchor targets had `scroll-margin-top: 0`, so every in-page jump landed the heading underneath the header. Added a zero-specificity `:where(...)` rule with `scroll-margin-top: 6rem`, confined to chronicle article elements. Verified emitted **only** on the new page; the shared `BaseLayout.D2GA9v2P.css` hash is unchanged and legacy pages contain no trace of it.
- **Images optimised** with MozJPEG (§13).

## 2. Development dependencies added

| Package | Version |
|---|---|
| `@astrojs/check` | **0.9.10** |
| `typescript` | **6.0.3** |

Files changed by the installation: `package.json` (new `devDependencies` block + `check` script) and `package-lock.json` (+999 lines, 77 packages). No existing dependency was altered.

## 3. Files created

```
src/pages/3-days-in-seville/index.astro                          the article
docs/blog-production/reports/slice-2-seville-article.md           this report
```

## 4. Files modified

```
package.json          devDependencies + "check" script
package-lock.json     lockfile for the two devDependencies
src/components/chronicle/Figure.astro       added `variant` prop + portrait style
src/components/chronicle/AnchorNav.astro    added scroll-margin-top fix
docs/blog-production/research/seville-3-days-image-manifest.md   optimisation record
public/images/3-days-in-seville/*.jpg       7 files replaced with optimised versions
public/images/3-days-in-seville/parque-maria-luisa-pabellon-mudejar.jpg   DELETED (unused)
```

**Not modified:** `global.css`, `BaseLayout.astro`, `Header.astro`, `RegionMap.astro`, `astro.config.mjs`, `tsconfig.json`, `public/_redirects`, and every legacy page under `src/pages/` — all verified unchanged via `git diff --stat`.

## 5–8. Final identity

| Field | Value |
|---|---|
| **URL** | `/3-days-in-seville/` |
| **H1** | 3 Days in Seville: Palace, River and Parasol |
| **Title tag** | `3 Days in Seville Itinerary — There & Back Again` (48 chars) |
| **Meta description** | `A three-day Seville route that avoids crossing the city twice — the Real Alcázar and the monumental core, Triana and the river, then Plaza de España and the Setas.` (161 chars) |
| **Canonical** | `https://travel.mitchchadban.com/3-days-in-seville/` |
| **OG image** | `/images/3-days-in-seville/giralda-at-dusk.jpg` (landscape) |

The earlier "built around what is actually open" phrasing was dropped as instructed. The replacement leads on the route's actual organising idea — not crossing the city twice — and names the three days' anchors in order. No banned language ("ultimate", "perfect", "must-see", "hidden gems", "you need to").

## 9. Word count

**5,071 words** of article (hero, body and closing; excludes the further-reading cards and site chrome). At the upper end of the 3,500–5,000 guide range and not padded — the length is carried by three fully specified day routes, three practical blocks, and five decision sections.

## 10. Final section structure

```
post-hero            route strip · label · H1 · standfirst · 4 stats
  H2  Who this route suits
  AnchorNav (7 links)
itin-block           The Three Days at a Glance — 4 meta rows + 3 day rows
  H2  I. The Monumental Core            (+3 figures, practical block, beat)
        H3 The route in order / Tickets / Watch-outs
  H2  II. Triana and the River          (+1 figure, practical block, beat)
        H3 The route in order / Watch-outs
  H2  III. South to North               (+2 figures, practical block)
        H3 The route in order / Watch-outs
  pull quote
  H2  Arranging the days around Sunday and Monday
  H2  What to book, and in what order
  H2  Heat, and adjusting for the season
  H2  Walking, transport and what the days actually ask of you
  H2  What three days leaves out
post-closing         restrained two-paragraph close
next-chronicles      3 further-reading cards
```

1 × H1, 9 × H2, 7 × H3. **No FAQ section** and no `FAQPage` schema.

## 11–13. Images

7 images, all from the verified September–October 2025 set. Full provenance and visual-QA notes in the image manifest.

| Position | File | W×H | Loading | Original → Final | Reduction | Quality |
|---|---|---|---|---|---|---|
| Lead (landscape) | `giralda-at-dusk.jpg` | 2048×1365 | eager/sync/high | 283,659 → **212,723** | 25.0% | **73** |
| Day 1 (portrait) | `giralda-from-alcazar-gardens.jpg` | 1365×2048 | lazy | 714,942 → **465,146** | 34.9% | 70 |
| Day 1 | `cathedral-capilla-mayor.jpg` | 2048×1365 | lazy | 531,005 → **389,965** | 26.6% | 70 |
| Day 1 | `archivo-de-indias-gallery.jpg` | 2048×1365 | lazy | 448,811 → **343,743** | 23.4% | 70 |
| Day 2 (only) | `plaza-de-toros-maestranza-facade.jpg` | 2048×1365 | lazy | 326,431 → **225,361** | 31.0% | 70 |
| Day 3 | `plaza-de-espana-bridges.jpg` | 2048×1365 | lazy | 599,735 → **417,162** | 30.4% | 70 |
| Day 3 | `casa-de-pilatos-garden-loggia.jpg` | 2048×1365 | lazy | 523,180 → **371,520** | 29.0% | 70 |

**Totals: 3,427,763 → 2,425,620 bytes (29.2% reduction).** Encoder: MozJPEG 0826579 via sharp 0.34.5. **All pixel dimensions unchanged; no crop, no resize.** Every output visually inspected for banding, colour shift, halos and detail loss — all pass.

**Six of seven could not reach the 210 KiB target at quality ≥ 70, so q70 was kept rather than forcing the target.** These are already-compressed 2048 px exports of high-detail scenes; q70 MozJPEG is near the practical floor at full dimensions. Only `giralda-at-dusk.jpg` met it (at q73).

The lead image is **landscape**, as required. The one portrait frame is used as an inline figure at the constrained 560 px `portrait` variant, never as a wide hero. `parque-maria-luisa-pabellon-mudejar.jpg` was deleted rather than left unreferenced. Source photographs outside the repository are untouched.

## 14. Personal evidence used

Drawn only from `/10-days-in-sevilla/` (repository content) and EXIF-verified photographs, used sparingly and always attributed to *a longer stay recorded elsewhere on this site*, never to this route:

- Accommodation in **San Lorenzo**, on the edge of the Alameda de Hércules, and the documented advice **against** sleeping in Santa Cruz — both attributed to the ten-day chronicle and linked.
- **Estación de Autobuses del Prado de San Sebastián** as the arrival point for coaches from the Cádiz coast and the Tarifa ferry — the documented overland approach from Morocco, linked to that chronicle.
- The seven photographs, all from the documented 2025 visit, all captioned to what is visibly in frame.

## 15. Research-led guidance used

Everything operational: opening hours, closure days, ticket prices, the timed-entry and sell-out behaviour of the Alcázar, the Cathedral's Sunday and July–August schedules, the free Sunday slot, the Church of El Salvador inclusion, the Archivo's Monday closure and cultural-visit hours, the Mercado de Triana retail-versus-hospitality distinction, Casa de Pilatos hours and two-tier pricing, the Setas ticket, walking distances and dwell times, seasonal temperatures, and accessibility.

**The three-day sequence itself is an editorial construction.** The article never claims Mitch walked it.

## 16. Refresh-sensitive claims

| Claim | Status |
|---|---|
| Giralda belfry restoration active; access has remained part of the general visit; **no completion date published** | Stated exactly that way; readers told to check the official page. Not claimed closed; no end date predicted |
| Cathedral hours (Mon–Sat 11:00–18:00, Sun 14:30–19:00, Giralda 17:00; Jul–Aug variant) | Stated with the Cathedral's own caveat that times may change |
| Cathedral prices (€13/€14; €7/€8), current from 1 Jan 2026 | Dated in the text |
| Alcázar €15.50 / €8.00 reduced / €5.50 Cuarto Real Alto; seasonal hours; four annual closure days | Verified 2026-07-29 |
| Archivo cultural-visit hours + Monday closure | Verified; **cultural-visit hours only, explicitly not research-room hours** |
| Mercado de Triana retail Mon–Sat, closed Sun/holidays; hospitality may still trade Sunday | Stated as that distinction, never as "the market complex is closed Sunday" |
| Casa de Pilatos daily 09:00–18:00, €12 + €6 | Verified 2026-07-29 |
| Setas from €16; light installation Apr–Oct | Price and inclusions stated; **hours deliberately not quoted** — the official page's published times are self-contradictory, so readers are told to confirm |
| Plaza de España access/charging proposal | Framed as discussed, not implemented, no price set |

Temporary 2026 arrangements are flagged as current-and-changeable, never as permanent rules.

## 17. Internal links implemented

`/10-days-in-sevilla/` (×3: opening, accommodation, day-trip framing) · `/1-day-in-cordoba/` · `/1-day-in-cadiz/` · `/italy-morocco-seville-4-week-itinerary/` · `/4-weeks-portugal-to-spain-by-rail-road/` · `/chronicles/` — plus further-reading cards to the ten-day, Córdoba and Cádiz chronicles.

`/by-region/` was **not** forced in; nothing links `/coming-soon/`; no invented `/seville/`, `/andalucia/` or `/spain/` hub.

**External links: two only** — the Alcázar visitor page and the Cathedral schedules-and-rates page, both at the point where a reader acts. Not a source directory.

## 18. Proposed inbound links — NOT implemented

Each requires editing an existing chronicle and was deliberately left alone:

| Page | Proposed change |
|---|---|
| `/10-days-in-sevilla/` | Add a further-reading card to the new article. Its "Ronda" card currently points at `/coming-soon/` and would be the natural slot |
| `/1-day-in-cordoba/` | Link "three days in Seville" as the base-city itinerary |
| `/1-day-in-cadiz/` | Same |
| `/italy-morocco-seville-4-week-itinerary/` | Link from the Seville leg |
| `/chronicles/` | Add a 27th card |
| `/by-region/` | Add to the Europe panel |

## 19. Structured data emitted

`Article` + `BreadcrumbList` only. Verified in the built HTML:

- `Article` — headline matches the visible H1 exactly; `description` matches the meta description; absolute `url`, `mainEntityOfPage` and `image`; `inLanguage: en-AU`
- **No `datePublished` or `dateModified`** — the repository has no reliable publication-date field, so no date was invented
- `BreadcrumbList` — Home > Chronicles > 3 Days in Seville: Palace, River and Parasol, all absolute URLs
- **No `FAQPage`** — the layout emits it only when `meta.faq` is supplied, and this article supplies none

## 20. Validation commands

```sh
npm run check     # astro check — newly available
npm run build     # astro build
npm run preview   # served localhost:4321 for browser QA; stopped afterwards
git status --short / git diff --stat -- <path>
```
Plus scripted checks: MozJPEG encode-and-measure, `sips` dimension verification, full `dist`-wide link/asset resolver, JSON-LD parse, heading-outline extraction, image attribute audit, and in-browser layout measurement at three widths.

## 21. Validation results

| Check | Result |
|---|---|
| `npm run check` | 51 files, **6 errors — all pre-existing** in `Header.astro`/`RegionMap.astro`; **0 in new code** |
| `npm run build` | **Passed, no errors, no warnings.** 32 pages (31 → 32) |
| Route generated | `/3-days-in-seville/index.html` ✓ |
| Canonical / trailing slash | `https://travel.mitchchadban.com/3-days-in-seville/` ✓ |
| Open Graph | `og:type=article`, absolute `og:url`, absolute landscape `og:image`, matching `twitter:image` ✓ |
| Structured data | `Article` + `BreadcrumbList`; **no `FAQPage`**; no invented dates ✓ |
| Headings | 1 × H1, 9 × H2, 7 × H3; valid outline ✓ |
| Anchor links | 7 of 7 resolve to real ids; **all clear the sticky header at 390/768/1440** ✓ |
| Internal links | all resolve; **0 broken internal refs across all 32 pages** ✓ |
| `/coming-soon/` | not linked from the new page ✓ (9 legacy pages still do — pre-existing) |
| Images | 7 on disk, 7 referenced, **0 unreferenced, 0 missing**; all have `alt`, `width`, `height`; attribute dims match file dims exactly; 1 eager / 6 lazy ✓ |
| Broken images in browser | 0 at all three widths ✓ |
| Layout shift | prevented — explicit `width`/`height` plus the existing `img { max-width:100%; height:auto }` ✓ |
| Sitemap | new route included; 30 → **31** URLs; `coming-soon` still excluded ✓ |
| Existing routes | all 31 still build; shared CSS bundle hash **unchanged** ✓ |

## 22. Browser widths checked

Real Chrome (Browser 1, user-selected), page served from `npm run preview`. **`resize_window` had no effect on the viewport in this Chrome instance**, so widths were established with fixed-width iframes — media queries evaluate against the iframe viewport, so breakpoints are genuine.

| Width | Findings |
|---|---|
| **390 px** | No overflow from article content. H1 44.8 px, prose 360 px, anchor nav wraps to 3 rows (162 px), portrait figure 360×623, landscape 360×324, caption 2 lines, practical blocks 360 px, cards stack. Screenshots confirm hero, anchor nav and At a Glance |
| **768 px** | prose 640 px, anchor nav 101 px, portrait figure 560×899, landscape 640×487. Screenshot confirms a practical block with green H3 labels and bordered tip rows |
| **1440 px** | **scrollWidth 1440 — zero horizontal overflow.** H1 86.4 px, prose 1100 px, portrait 560×904, landscape 980×718, further-reading **3-up row** (394 px cards). Screenshots confirm portrait figure and Archivo figure with captions |

**One pre-existing sitewide issue found, not introduced here and not fixed:** at 390 px and 768 px the document `scrollWidth` is 753 px rather than the viewport width, caused entirely by the off-canvas `nav.mobnav__panel` in the shared `Header.astro` sitting at `left: 396px`. **Verified identical on `/10-days-in-sevilla/`, `/1-day-in-cordoba/` and the homepage.** `Header.astro` is out of scope for this slice.

## 23. Existing routes and files confirmed unchanged

`global.css`, `BaseLayout.astro`, `Header.astro`, `RegionMap.astro`, `astro.config.mjs`, `tsconfig.json`, `public/_redirects` and **all 26 legacy pages** — every one verified unchanged by `git diff --stat`. Route count 31 → 32 (addition only). Shared CSS bundle hash unchanged, so legacy rendered output is identical. Source photo library (961 files) and the external Desktop system folder are untouched.

## 24. Working-tree status

```
 M package-lock.json                     (authorised devDependency install)
 M package.json                          (authorised devDependency install + check script)
?? docs/
?? public/images/
?? src/components/chronicle/
?? src/layouts/ChronicleLayout.astro
?? src/pages/3-days-in-seville/
```

Nothing staged, committed, pushed or deployed. Preview server stopped.

## 25. Remaining risks

| Risk | Severity | Note |
|---|---|---|
| **6 pre-existing type errors** mean `npm run check` exits non-zero | Medium | Now visible for the first time. Fixing them is a small, separate task on `Header.astro`/`RegionMap.astro` |
| **Images still 2.31 MB total**; six could not reach 210 KiB without breaking the q70 floor | Medium | Lazy loading means a non-scrolling reader fetches ~210 KB. Further reduction needs authorisation to resize or add WebP/AVIF |
| **Giralda works have no published end date** | Medium | Handled honestly, but the passage will need review whenever the works conclude |
| **Cathedral hours are actively changing** | Medium | Flagged in-article; the 2026-07-29 review date should be refreshed before publication |
| **Setas hours deliberately unstated** — official page self-contradictory | Low | Readers directed to confirm; worth a follow-up call to the venue |
| Pre-existing mobile-nav horizontal overflow | Low | Sitewide, unchanged, out of scope |
| Prose measure is 1100 px at 1440 px — long lines | Low | **Identical on legacy pages**; a site-wide typographic decision, not this article's to change |
| Two inferred image vantage points | Low | Captions constrained accordingly; recorded in the manifest |

## 26. Recommendation

# `READY FOR EDITORIAL REVIEW`

The article builds clean, validates on every structural check, renders correctly at three widths, uses only verified 2025 photographs with accurate alt text and true dimensions, emits correct structured data with no invented dates and no FAQ schema, and changes nothing that already existed apart from the two authorised dependency lines.

Before publication: refresh the factual-review date and re-confirm the Cathedral hours and Giralda access, since both are the fastest-moving facts on the page.
