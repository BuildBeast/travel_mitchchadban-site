# Seville Cluster Batch — Implementation Report

_2026-07-30 · Branch `main` · Baseline HEAD `0e372f6` (untouched) · Factual review date **2026-07-29** · **Nothing committed, staged, pushed or deployed**_

Companion documents: [`../briefs/seville-cluster-cannibalisation.md`](../briefs/seville-cluster-cannibalisation.md) · five research notes and the image manifest under [`../research/`](../research/)

---

## 1. The five articles

| # | URL | H1 | Title tag | Meta description |
|---|---|---|---|---|
| 1 | `/best-areas-to-stay-in-seville/` | Best Areas to Stay in Seville: Six Bases and What Each Costs You | `Best Areas to Stay in Seville — There & Back Again` (49) | `Six Seville neighbourhoods assessed on noise, shade, walking distance and evening character — Santa Cruz, El Arenal, Centro, San Lorenzo, Triana and La Macarena.` (161) |
| 2 | `/one-day-in-seville/` | One Day in Seville: The Route, and the Cost of It | `One Day in Seville — There & Back Again` (38) | `A realistic route for one day in Seville — Plaza de España before the Alcázar opens, then the Cathedral, the Archivo and Santa Cruz — and what a day cannot hold.` (161) |
| 3 | `/best-things-to-do-in-seville/` | Best Things to Do in Seville: Sixteen, Grouped and Judged | `Best Things to Do in Seville — There & Back Again` (48) | `Sixteen Seville experiences assessed individually — how long each takes, what it pairs with, what needs booking, and which ones a first visit can reasonably skip.` (162) |
| 4 | `/best-day-trips-from-seville/` | Best Day Trips from Seville: Seven Assessed, Two Refused | `Best Day Trips from Seville — There & Back Again` (47) | `Seven excursions from Seville assessed by the shape of the day — Córdoba, Cádiz, Jerez, Itálica, Carmona, Granada and Ronda — including two that are not worth a day.` (165) |
| 5 | `/seville-tapas-food-guide/` | Seville Tapas and Food Guide: How the City Eats, and When | `Seville Tapas and Food Guide — There & Back Again` (48) | `How eating in Seville actually works — the tapas system, the three sizes, the clock that ruins visitors' evenings, the markets, and what one documented stay ate.` (161) |

Canonicals are all `https://travel.mitchchadban.com<path>` and were verified in the built HTML. "Seville" appears in every title, description, slug and H1. `/10-days-in-sevilla/` was not renamed.

## 2. Word counts, and an honest note on the target ranges

| Article | Words | Brief's range | Status |
|---|---|---|---|
| Best Areas to Stay | **4,271** | 2,500–4,000 | **271 over** |
| One Day | **3,740** | 2,000–3,500 | **240 over** |
| Best Things to Do | **4,909** | 3,000–4,500 | **409 over** |
| Best Day Trips | **4,771** | 3,000–4,500 | **271 over** |
| Seville Tapas & Food | **4,879** | 3,000–5,000 | within range |
| _(reference)_ `/3-days-in-seville/` | 4,985 | — | approved benchmark |

**Four of five exceed the stated upper bound, by 6–9%.** This is flagged rather than glossed. Two rounds of trimming were applied — `one-day` came down from 4,022 and `best-things-to-do` from 5,042 — and the prose is genuinely tighter for it. What remains over is concentrated in structured practical content rather than narrative: the At-a-Glance block (300–400 words per article, counted here because it sits inside the article body) and, in `best-things-to-do`, the fixed six-part spine repeated across sixteen entries.

Measurement method matches the pilot's: hero + body + At-a-Glance + closing, excluding further-reading cards and site chrome.

**If the bands matter more than the content, the cuts I would make** — each is Mitch's call, not mine:
- `best-things-to-do`: drop three entries (Torre del Oro, Palacio de las Dueñas, Basílica de la Macarena) → ~4,450.
- `best-areas-to-stay`: cut the "street with nothing on it" section and its figure → ~4,000.
- `one-day`: cut the season section entirely → ~3,540.
- `best-day-trips`: cut the "considered and cut" section → ~4,540.

## 3. Unique intent and anti-cannibalisation boundary

| Article | Primary intent | Owns exclusively | Kept out |
|---|---|---|---|
| Best Areas to Stay | `where to stay in seville` | Six-area comparison on noise / shade / price / transport; who each suits and who should avoid it; the fifteen-minute-radius rule | Any route; hotel names; per-night prices |
| One Day | `one day in seville` | The single-day route with clock times; the pre-opening Plaza de España move; the Sunday variation; the arithmetic showing the greedy day is impossible | Multi-day sequencing; day trips; neighbourhood choice |
| Best Things to Do | `things to do in seville` | Sixteen individually judged entries with skip-verdicts and first-visit/longer-stay allocations; six sights no route on the site covers | Any ordered day plan; restaurants; day trips |
| Best Day Trips | `day trips from seville` | Seven destinations classed by shape of day; the two negative verdicts; transport practicality per destination | The interiors of Córdoba and Cádiz (their own chronicles) |
| Seville Tapas & Food | `seville tapas` / `what to eat in seville` | How the system works; the three sizes; the clock; market culture; nine mistakes; four separated evidence classes | The ten-day chronicle's 13-restaurant table; any route |

**The two thinnest boundaries and how they were held.** *One Day vs Three Days*: the one-day route opens with a different move (Plaza de España before the Alcázar gate opens, which the three-day route never needs), contains no Triana, and its editorial content is the subtraction — there is no equivalent of "what one day cannot hold" on the three-day page. *Things to Do vs Three Days*: six of sixteen entries appear on no route on the site, and every entry carries a skip-verdict and a stay-length allocation, neither of which a route can express.

The test applied throughout: *could this paragraph move to the sibling page without a reader noticing?* If yes, it was rewritten.

## 4. Images — 24 files, all new to the site

All from `Trip Photos/2025/`, the 26 Sept – 4 Oct 2025 Seville window (Sony ILCE-7M2, 2048 px web exports). **Every frame was opened and visually inspected at full size before selection**; none was identified from its filename. **No frame is reused from `/3-days-in-seville/`.** No 2023 image is used — that set stays excluded pending the camera-clock question.

| Article | Images | Lead (eager) | Total bytes |
|---|---|---|---|
| Best Areas to Stay | 5 (1 landscape, 4 portrait) | `giralda-above-the-rooftops.jpg` | 1,544,040 |
| One Day | 4 (2 landscape, 2 portrait) | `plaza-de-espana-from-the-arcade.jpg` | 2,220,892 |
| Best Things to Do | 5 (2 landscape, 3 portrait) | `pabellon-mudejar-reflected.jpg` | 1,426,153 |
| Best Day Trips | 5 (all landscape) | `mezquita-arch-within-arch.jpg` | 1,762,996 |
| Seville Tapas & Food | 5 (4 landscape, 1 portrait) | `jamon-counter-mercado-de-triana.jpg` | 1,708,489 |

Every lead image is landscape and doubles as the Open Graph image. Full provenance, visible-content descriptions, capture timestamps and identification-confidence ratings are in [`../research/seville-cluster-image-manifest.md`](../research/seville-cluster-image-manifest.md).

**Captions constrained by uncertainty:** `flamenco-on-a-dark-stage` names no venue (the record does not establish which of two performances that evening it was); `quiet-street-at-first-light` names no district (not determinable from the frame); `guadalquivir-at-sunset` names the river only; `giralda-above-the-rooftops` names the subject only.

### Compression results

Encoder **MozJPEG 0826579** via sharp 0.34.5. Quality found by binary search over `[70, 92]` for the highest quality meeting a 210 KiB target; never below q70; no resize, no crop.

**Totals: 12,354,758 → 8,662,570 bytes — 29.9% reduction (11.78 MB → 8.26 MB) across 24 files.**
**All 24 files verified dimension-unchanged after encoding** (asserted in the encode script, and re-asserted independently against the rendered `width`/`height` attributes — see §10).

**22 of 24 could not reach 210 KiB at q ≥ 70, so q70 was kept and the target was not forced** — the same intrinsic limit the pilot hit: already-compressed 2048 px exports of high-detail scenes. Only `flamenco-on-a-dark-stage.jpg` (q92, 76,753 B — a mostly-black frame) and `mezquita-arch-within-arch.jpg` (q79, 208,995 B) met it.

**Visual QA on the encoded output**: six 1:1 crops of the highest-risk regions (sky gradients, dark-stage falloff, dense tilework, flat colour fields, small price text, gilt relief) were extracted from the written files and inspected. No banding, no shadow blocking, no ringing on lettering, no colour shift. Per-file QA notes are in the manifest.

## 5. Personal evidence used

Drawn only from repository content (`/10-days-in-sevilla/`, `/1-day-in-cadiz/`, `/1-day-in-cordoba/`) and EXIF-verified photographs, always attributed to the documented September–October 2025 stay and linked, never to a route:

- **San Lorenzo** as the documented base (Calle Hombre de Piedra, nine nights) and the documented advice **against** sleeping in Santa Cruz — the only two first-person verdicts in the accommodation article.
- The Alcázar entered on a pre-booked skip-the-line ticket, inside by 10:30; the Giralda climbed; the Archivo visited and thought under-visited.
- **Córdoba** by AVE (07:15 out, 20:25 back) and **Cádiz** by Renfe, both with their own chronicles; **Granada** as a day trip on the service that ran 3 h 30 each way.
- **Eslava's dishes** — the slow-cooked egg, the oxtail croquette, the unasked-for glass of fino. **The only venue whose food is described anywhere in the batch.**
- Seven of the fourteen recorded venues named, each to illustrate a category; the convent sweets at the Plaza de Pilatos hatch; El Garlochi as a cultural artefact.
- Walking as the documented practice; the noted usefulness of a taxi for Triana crossings at night; late-September heat at ~32 °C.
- Twenty-four photographs, all captioned to what is visibly in frame.

**Nothing was invented.** No hotel name, no euro price paid, no dish outside Eslava, no conversation, no waiter, no host, no atmosphere inside an unvisited venue, no claim that Mitch walked any route on these pages, and no claim of visiting Jerez, Itálica, Carmona or Ronda from Seville.

## 6. Research-led material

Everything operational. Primary sources opened and read on 2026-07-29: the Real Alcázar visitor page, the Cathedral's schedules-and-rates page and its 7 June 2026 Giralda-works notice, Setas de Sevilla, Casa de Pilatos (Fundación Medinaceli), the Maestranza visitor site, Mercado de Triana's own timetable, Renfe's Sevilla–Jerez route page, Metro de Sevilla's network map, and the Real Escuela's visit pages.

**Four venues rest on reputable secondary sources because the official page could not be opened from this environment** (TLS chain unverifiable on `cultura.gob.es` and `museosdeandalucia.es`; connection reset on `torredeloro.es`): the Archivo General de Indias, the Museo de Bellas Artes, Itálica, and the Torre del Oro. Each is corroborated across independent sources, flagged in the research notes, and phrased in-article so the decision survives a changed number. **No fact anywhere is asserted on a search-result snippet alone.**

The **sixteen-entry list, the six-area assessment, the one-day route and the seven day-trip verdicts are editorial constructions** from that evidence. No article claims otherwise.

## 7. Refresh-sensitive claims and how each is phrased

| Claim | Handling |
|---|---|
| Cathedral opening hours | **No opening time is asserted on any page.** The two official pages disagree; articles give the booking rule, link the schedule page, and carry a dated review line |
| Giralda belfry works | Stated as under way through 2026 with **no published completion date**; notices neither close the climb nor confirm it. No end date predicted |
| Torre del Oro hours | **Not quoted** — sources disagree. Only the ~€3 admission and the free-Monday convention, both flagged for confirmation |
| Setas hours | Quoted as the official 09:30–01:00 with the caution that published times read inconsistently |
| Jerez equestrian show days and prices | **Not asserted** — the official calendar does not expose them. Readers sent to the calendar |
| Rail journey times | Given as bands with fastest and typical named, so a timetable change does not falsify them |
| Granada travel time | **Both figures given** — the 3 h 30 service the documented trip took, and the ~2 h 30 fastest services now running. More useful than silently correcting the older chronicle |
| Itálica / Bellas Artes / Archivo Monday closures | Stated with the closure leading, plus the Andalusian reduced-summer-schedule caution |
| Restaurant status | **No venue verified as currently trading.** All framed as a 2025 record, with the rule stated in the article's own text |
| Restaurant prices | **None quoted anywhere.** The only euro figures in the food guide are the ones legible on market price cards in October 2025 |
| Prices generally (Alcázar €15.50, Cathedral €13/€14, Casa de Pilatos €12+€6, Setas €16, palaces €12) | Once each, in a practical block, behind a "verified 29 July 2026" line |
| Plaza de España enclosure proposal | Discussed, not implemented, no price set |
| Room-price relativities | Written as relativities only, never as figures |

## 8. Internal links created

| Article | Prose links | Further-reading cards | External |
|---|---|---|---|
| Best Areas to Stay | `/10-days-in-sevilla/` ×2 · `/3-days-in-seville/` · `/seville-tapas-food-guide/` · `/italy-morocco-seville-4-week-itinerary/` · `/chronicles/` · `/by-region/` | 3-day, 10-day, food | none |
| One Day | `/3-days-in-seville/` ×3 · `/10-days-in-sevilla/` ×2 · `/1-day-in-cordoba/` · `/1-day-in-cadiz/` · `/best-day-trips-from-seville/` · `/seville-tapas-food-guide/` · `/chronicles/` | 3-day, things, areas | Alcázar, Cathedral |
| Best Things to Do | `/3-days-in-seville/` ×2 · `/one-day-in-seville/` ×2 · `/10-days-in-sevilla/` · `/best-day-trips-from-seville/` · `/seville-tapas-food-guide/` · `/chronicles/` | 3-day, one-day, day-trips | Cathedral |
| Best Day Trips | `/1-day-in-cordoba/` · `/1-day-in-cadiz/` · `/10-days-in-sevilla/` · `/3-days-in-seville/` · `/seville-tapas-food-guide/` · `/4-weeks-portugal-to-spain-by-rail-road/` · `/chronicles/` · `/by-region/` | Córdoba, Cádiz, 10-day | none |
| Seville Tapas & Food | `/10-days-in-sevilla/` ×3 · `/best-day-trips-from-seville/` ×2 · `/best-areas-to-stay-in-seville/` · `/1-day-in-cadiz/` · `/chronicles/` | 10-day, Bologna, areas | none |

**External links: three in total**, all official, all at the point where a reader acts. Not a source directory. `/1-day-in-cordoba/` and `/1-day-in-cadiz/` are each linked twice from the day-trips article — once in prose at the decision point, once as a card — as required. Nothing links `/coming-soon/`. No invented `/seville/`, `/andalucia/` or `/spain/` hub.

## 9. Reciprocal links added to the two existing articles

**Nine additions, all a clause or sentence inside an existing block. Neither article was restructured or rewritten** — the full diffs are 17 lines on one and a single string edit on the other.

**`/3-days-in-seville/` — 5 links added:**

| Location | Anchor | Target |
|---|---|---|
| Opening prose, after "three days and a return flight" | "a single day" | `/one-day-in-seville/` |
| "Walking, arriving, and where to stay" | "the guide to where to stay" | `/best-areas-to-stay-in-seville/` |
| "What three days leaves out", omissions list | "the guide to what is worth doing in Seville" | `/best-things-to-do-in-seville/` |
| "What three days leaves out", the table | "what to order in them" | `/seville-tapas-food-guide/` |
| "What three days leaves out", excursions | "the day-trips guide" | `/best-day-trips-from-seville/` |

**`/10-days-in-sevilla/` — 4 links added:**

| Location | Anchor | Target |
|---|---|---|
| "Where to Stay" practical item | "the guide to where to stay in Seville" | `/best-areas-to-stay-in-seville/` |
| "The Full Table of Meals" (new leading item) | "the Seville tapas and food guide" | `/seville-tapas-food-guide/` |
| FAQ "How many days do you need in Seville?" | "three days in Seville" / "a single day" | `/3-days-in-seville/`, `/one-day-in-seville/` |
| FAQ "Can you do Córdoba and Granada as day trips?" | "the guide to day trips from Seville" | `/best-day-trips-from-seville/` |

**Metadata on both pages is unchanged** — title, description, canonical and OG all verified byte-identical to HEAD. The three `/coming-soon/` cards in the ten-day article's further-reading block were **left alone**, as fixing placeholders is out of scope.

## 10. Index placement

**`/chronicles/`** — 27 cards → **32**. The five new cards sit at **positions 25–29**, immediately after `/3-days-in-seville/` (24) and before `/4-days-in-valencia-itinerary/` (30), keeping the Seville cluster contiguous. Existing card order is untouched; each new article appears **exactly once**; the existing card pattern (`post-card` / `post-region` / `post-title` / `post-excerpt`) is followed.

**`/by-region/`** — all five added under **Europe → Spain · Andalucía**, inserted after `/3-days-in-seville/` and before `/1-day-in-cordoba/`, so the six Seville pages read as one group. Each appears **exactly once**. The page was not redesigned and no new destination architecture was created.

**Europe chronicle count: 24 → 29.** The count is computed from `r.posts.length`, so it updated automatically; the rendered value was read back from the built page as "29 chronicles". Africa remains 3. No unrelated card was reordered and no duplicate was created.

## 11. Components

**No component was added. No component was modified. No global CSS was touched.**

The five articles are built entirely from the existing set — `ChronicleLayout`, `ArticleHeader`, `AnchorNav`, `Chapter`, `AtAGlance`, `Figure`, `Practical`, `PracticalSection`, `SectionHeading`, `PullQuote`, `Beat`, `FurtherReading` — and add no `<style>` blocks of their own. Where a per-entry mechanics line was needed in `best-things-to-do` (Time / Pairs with / Booking / Skip if), it is a bolded run-in paragraph rather than a new component, since that expresses the content cleanly and no second article needs it.

**Confirmation:** the shared CSS bundle is `BaseLayout.CaAkosvt.css` in both the working build and a clean build of HEAD in a throwaway worktree, and the two files are **byte-identical**. Legacy rendered output is therefore unaffected.

## 12. Validation results

| Check | Result |
|---|---|
| `npm run check` | **0 errors, 0 warnings, 0 hints** across 57 files |
| `npm run build` | **Passed. 37 pages** (32 → 37) |
| All 37 pages generate | ✓ |
| Five new routes in sitemap | ✓ — sitemap 31 → **36 URLs**, each new route exactly once, `coming-soon` still excluded |
| Internal links | **527 links checked across all 37 pages, 0 broken** |
| `/coming-soon/` on the five new pages | **0** ✓ |
| Canonicals | all five correct, absolute, trailing slash ✓ |
| Open Graph | `og:type=article`, absolute `og:url` and `og:image`, `twitter:image` matches, every OG file present on disk ✓ |
| Structured data | `Article` + `BreadcrumbList` only on all five. **No `FAQPage` anywhere** (no article has a visible FAQ). **No invented `datePublished`/`dateModified`.** `Article.headline` matches the visible H1 on all five; `Article.description` matches the meta description; all breadcrumb items absolute ✓ |
| Headings | exactly 1 × H1 per page; valid outlines (areas 10×H2/3×H3 · one-day 8/3 · things 8/19 · day-trips 8/6 · food 10/3) ✓ |
| In-page anchors | **44 anchors across the five pages, 0 broken** ✓ |
| Anchor jumps clear the sticky header | ✓ — every target resolves `scroll-margin-top: 96px` against a 50px sticky header, measured landing exactly 96px from the top |
| Images | 24 on disk, 24 referenced, **0 orphaned, 0 missing**; all have non-empty `alt`, `width` and `height`; **every attribute dimension re-verified equal to the real file dimensions**; exactly 1 eager per page, 20 lazy |
| Broken images in browser | **0** at all three widths |
| Existing routes | all 32 still build; **only 4 built pages differ from HEAD** — the two Seville articles and the two indexes, all intended |
| Metadata on unrelated pages | unchanged ✓ |
| Infrastructure | `global.css`, `BaseLayout.astro`, `Header.astro`, `RegionMap.astro`, all `components/chronicle/*`, `astro.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`, `public/_redirects` — **all verified unchanged** |

One defect was found and fixed during validation: the `best-things-to-do` anchor menu carried a `#booking` link with no target. `id="booking"` was added to the corresponding `PracticalSection`.

## 13. Browser QA

Real Chrome, page served from `npm run preview`, 100% browser zoom (no page-zoom shortcuts used).

**`resize_window` reports success but does not change the viewport in this Chrome instance** — the same limitation the pilot recorded. Widths were therefore established with genuine same-origin fixed-width iframes, and the **inner width was read back from inside each frame** and is reported honestly below. Media queries evaluate against the iframe viewport, so the breakpoints are real. The anchor-offset test was run on the **top-level page** rather than in a frame.

| Width (measured `innerWidth`) | Findings across all five pages |
|---|---|
| **390 px** | `documentElement.scrollWidth` = **390 — no horizontal overflow**. One header displayed (`header-mob`). H1 44.8 px. Prose, practical blocks and further-reading cards all 359.6 px; At-a-Glance full-bleed 390 px; stats bar 359.6 px at x=15.2. Anchor nav wraps to 135.8–162.5 px. Landscape figures 359.6×240, portrait 359.6×539. Captions 3–5 lines. Cards stack 1-up. 0 broken images |
| **768 px** | scrollWidth = **768 — no overflow**. One header (`header-mob`). H1 46.08 px. Prose and practical 640 px; **stats bar 360 px centred at x=204** — the `margin-inline: auto` correction in `ArticleHeader` working as intended. Landscape figures 640×426.9, portrait constrained to **560×839.7**. Anchor nav 83.2–109.1 px. Cards 1-up at 640 px. 0 broken images |
| **1440 px** | scrollWidth = **1440 — no overflow, and no off-viewport elements at all**. One header (`header-web`). H1 86.4 px. Prose and practical 1100 px. Landscape figures 980×653.5, portrait 560×839.7 — tall frames never dominate the scroll. Anchor nav 96.8–126.3 px. Further-reading **3-up at 393.7 px each**. 0 broken images |

Verified at every width: one header only, no horizontal page overflow, readable article widths, correct title hierarchy, stats bars, anchor navigation, practical blocks, figures with correct portrait/landscape treatment, captions, and further-reading cards.

**Two measurement artefacts, recorded so they are not mistaken for defects.** The off-canvas mobile nav panel (`nav.mobnav__panel`) and its child links sit outside the viewport to the right at 390 px and 768 px; they are `display:none` at 1440 px. They do **not** extend `scrollWidth` — the pre-existing overflow the pilot reported at HEAD `17cf774` was resolved by the header work in `0e372f6`. Separately, an initial anchor-jump measurement appeared to fail because `html { scroll-behavior: smooth }` was still animating; with smooth scrolling neutralised, all targets land at exactly 96 px.

**No transformed screenshots were used as proof.** Screenshots were taken at the tab's real 1584 px viewport for visual confirmation of the hero, the At-a-Glance block and the chapter typography.

## 14. Quality concerns and blockers

| # | Concern | Severity | Note |
|---|---|---|---|
| 1 | **Four articles exceed the brief's word ranges by 6–9%** | **Medium** | Fully quantified in §2 with the exact cuts I would make. Editorial call |
| 2 | **Cosmetic: partial final row in the At-a-Glance grid** | **Low** | `.itin-days` is `repeat(auto-fit, minmax(200px, 1fr))`, so trailing empty cells show the container's 7%-opacity wash. Measured: at 1440 px, 6 items → 4 empty cells, 7 → 3, 8 → 2. **This is pre-existing and present on the approved `/3-days-in-seville/` too** (3 items → 2 empty cells at 1440). No empty cells at 390 px. Fixing it properly means changing a shared component, which is out of scope; the alternative is capping row counts at five, which costs content |
| 3 | **The site has no `<footer>` element anywhere** | **Low** | `BaseLayout` renders skip-link + Header + `<main>` only; 0 of 38 built pages contain a `<footer>`. Pages end with the further-reading block. Pre-existing and sitewide — adding one would be a global change. Flagged because the QA checklist asks for it |
| 4 | **Four venues rest on secondary sources** | **Medium** | Archivo, Museo de Bellas Artes, Itálica, Torre del Oro — official pages unreachable (TLS / connection reset). Phrased so the decision survives a changed number; listed in the research notes |
| 5 | **Cathedral hours are actively changing and the Giralda works have no end date** | **Medium** | Handled by asserting no opening time and linking the official page. The fastest-moving facts in the cluster; re-confirm before publication |
| 6 | **Five of six areas assessed without a documented stay** | **Medium** | Stated explicitly in the article's own opening. Only San Lorenzo carries a first-person verdict, and only Santa Cruz a first-person warning |
| 7 | **Four of seven day trips not visited from Seville** | **Medium** | Jerez, Itálica, Carmona, Ronda — labelled *"Assessed rather than visited"* in each section and in the watch-outs |
| 8 | **Granada and Ronda have no photograph** | **Low** | The 2023 library (which holds 211 Granada and 93 Ronda frames) stays excluded pending the camera-clock question. Those sections run without figures rather than being illustrated loosely |
| 9 | **No dish photography exists anywhere in the library** | **Low** | The food guide has no photograph of food on a plate. Nothing was substituted |
| 10 | **Images total 8.26 MB across 24 files; 22 could not reach 210 KiB above q70** | **Medium** | Lazy loading means a non-scrolling reader fetches 77–438 KB. `one-day-in-seville` is heaviest (2.22 MB, with `cathedral-retablo-mayor.jpg` at 817 KB). Further reduction needs authorisation to resize or add WebP/AVIF |
| 11 | **The ten-day chronicle's internal day/date numbering is inconsistent with its own photographic record** | **Low** | Not inherited: no new article restates its day numbering. Worth a separate correction pass on that article |
| 12 | Prose measure is 1100 px at 1440 px | **Low** | Identical on legacy pages. A sitewide typographic decision, not this batch's to change |

**No blockers.** Nothing prevented completion of any part of the brief.

## 15. Files changed

**Created — 5 pages:**
```
src/pages/best-areas-to-stay-in-seville/index.astro
src/pages/one-day-in-seville/index.astro
src/pages/best-things-to-do-in-seville/index.astro
src/pages/best-day-trips-from-seville/index.astro
src/pages/seville-tapas-food-guide/index.astro
```

**Created — 24 images** under `public/images/<article-slug>/` (5 / 4 / 5 / 5 / 5).

**Created — 7 documents:**
```
docs/blog-production/briefs/seville-cluster-cannibalisation.md
docs/blog-production/research/seville-best-areas-research.md
docs/blog-production/research/seville-one-day-research.md
docs/blog-production/research/seville-things-to-do-research.md
docs/blog-production/research/seville-day-trips-research.md
docs/blog-production/research/seville-food-research.md
docs/blog-production/research/seville-cluster-image-manifest.md
docs/blog-production/reports/seville-cluster-batch.md   (this file)
```

**Modified — 4 files only:**
```
src/pages/chronicles/index.astro          +5 cards
src/pages/by-region/index.astro           +5 entries (Europe 24 → 29)
src/pages/3-days-in-seville/index.astro   +5 reciprocal links (17 lines)
src/pages/10-days-in-sevilla/index.astro  +4 reciprocal links (654 chars)
```

Nothing else. No dependency was added or changed; `package.json` and `package-lock.json` are untouched.

## 16. Final `git status --short`

```
 M src/pages/10-days-in-sevilla/index.astro
 M src/pages/3-days-in-seville/index.astro
 M src/pages/by-region/index.astro
 M src/pages/chronicles/index.astro
?? docs/blog-production/briefs/seville-cluster-cannibalisation.md
?? docs/blog-production/research/seville-best-areas-research.md
?? docs/blog-production/research/seville-cluster-image-manifest.md
?? docs/blog-production/research/seville-day-trips-research.md
?? docs/blog-production/research/seville-food-research.md
?? docs/blog-production/research/seville-one-day-research.md
?? docs/blog-production/research/seville-things-to-do-research.md
?? public/images/best-areas-to-stay-in-seville/
?? public/images/best-day-trips-from-seville/
?? public/images/best-things-to-do-in-seville/
?? public/images/one-day-in-seville/
?? public/images/seville-tapas-food-guide/
?? src/pages/best-areas-to-stay-in-seville/
?? src/pages/best-day-trips-from-seville/
?? src/pages/best-things-to-do-in-seville/
?? src/pages/one-day-in-seville/
?? src/pages/seville-tapas-food-guide/
```

Nothing staged, committed, pushed or deployed. Preview server stopped. The source photograph library and the external Desktop production-system folder were read only.

## 17. Verdicts

| Article | Verdict |
|---|---|
| `/best-areas-to-stay-in-seville/` | **READY FOR MITCH'S EDITORIAL REVIEW** |
| `/one-day-in-seville/` | **READY FOR MITCH'S EDITORIAL REVIEW** |
| `/best-things-to-do-in-seville/` | **READY FOR MITCH'S EDITORIAL REVIEW** |
| `/best-day-trips-from-seville/` | **READY FOR MITCH'S EDITORIAL REVIEW** |
| `/seville-tapas-food-guide/` | **READY FOR MITCH'S EDITORIAL REVIEW** |

All five build clean, validate on every structural check, render correctly at three widths, use only verified 2025 photographs with accurate alt text and true dimensions, emit correct structured data with no invented dates and no FAQ schema, appear exactly once on both indexes, and change nothing that already existed apart from four intended files.

**Two things to settle before publication.** First, the word-count overruns in §2 — my judgement is that the length is earned, but the ranges were explicit and the decision is Mitch's. Second, re-confirm the Cathedral hours and the Giralda access, and refresh the `factsVerified` date on all five articles: those are the fastest-moving facts on the pages.
