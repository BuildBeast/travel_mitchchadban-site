# Site Integrity Audit — Wave 0 Close-Out

_2026-08-02 · Branch `main` · Baseline HEAD `e00cf01` · **Nothing committed, staged, pushed or deployed**_

Scope: the audit and clean-up items the publishing queue lists under **Wave 0 — before new production**, plus a full structural verification of all 37 built pages. No new articles were produced.

---

## 1. Wave 0 status

| # | Queue item | Status |
|---|---|---|
| 1 | Fix the homepage Bologna card that points to a 404 | **Already resolved.** The card targets `/4-days-in-bologna/`, which exists and builds |
| 2 | Replace or clearly label the Kyoto coming-soon card | **Done this pass** — see §2 |
| 3 | Audit legacy/canonical URLs, beginning with Cádiz and Fez | **Done — clean.** See §3 |
| 4 | Confirm content schema, components, internal-link conventions, image workflow | **Done — clean.** See §4 |

## 2. Placeholder cards — the one change made

`/coming-soon/` is a real page (`noindex, follow`), not a 404, so the 11 links pointing at it were never broken links. The defect was different and worse for a reader: **6 of the 11 placeholder cards advertised unwritten articles as though they were published**, carrying a duration or month in the card meta (`14 days · May`) exactly like a real chronicle.

The site already had a convention for this — 5 cards led their meta with `Coming Soon`. The fix applies that existing convention to the other 6. No new component, no CSS, no copy invented.

| Page | Card | Meta before | Meta after |
|---|---|---|---|
| `/` | Where the Temples Keep Their Silence (Kyoto) | `14 days · May` | `Coming Soon · 14 days` |
| `/1-day-in-cordoba/` | Granada and the Alhambra | `Spain · 2 days` | `Coming Soon · 2 days` |
| `/1-day-in-cadiz/` | Jerez de la Frontera | `Andalucía · Day Trip` | `Coming Soon · Day Trip` |
| `/1-day-in-cadiz/` | Tarifa | `Andalucía · Day Trip` | `Coming Soon · Day Trip` |
| `/san-marino-day-trip-guide/` | The Road from Bologna to Rome | `Italy · Journey` | `Coming Soon · Journey` |
| `/san-marino-day-trip-guide/` | Rimini and the Adriatic Shore | `Italy · Day Trip Base` | `Coming Soon · Day Trip Base` |

The dropped token in each case was a duplicate of the card's own `.post-region` label (`Italy`, `Spain`, `Andalucía`) or, on the Kyoto card, the month `May` — the element that most implied a completed trip. The more specific descriptor was kept.

**All 11 placeholder cards now read `Coming Soon`.** Verified in the built HTML and in Chrome.

## 3. Legacy and canonical URLs — clean

- **Canonicals: 37/37 correct.** Exactly one per page, absolute, trailing slash, matching the route. Zero mismatches, zero duplicates.
- **Redirect map: 11 rules, 0 problems.** Every `_redirects` target resolves to a real built route, every rule is a 301, and no source path collides with a live route. Cádiz, Córdoba, Bologna, Sevilla, Cáceres, Barcelona, Évora, Douro, Colònia Güell and the 4-week itinerary are all covered.
- **Fez** needs no redirect rule: `/2-days-in-fez-itinerary/` has no accented legacy slug.
- `robots.txt` allows all and points at `sitemap-index.xml`.
- **Sitemap: 36 URLs.** Every route present exactly once; `/coming-soon/` correctly the only exclusion.

## 4. Structural verification — all 37 pages

| Check | Result |
|---|---|
| `npm run check` | **0 errors, 0 warnings, 0 hints** (57 files) |
| `npm run build` | **Passed — 37 pages** |
| Internal links | **0 broken** across all pages |
| In-page anchors | **0 broken** |
| Images referenced | **0 broken, 0 orphaned** (140 files on disk, all referenced) |
| `alt` text | **0 missing or empty** |
| `width`/`height` attributes | **0 missing** |
| Eager-loaded images | **exactly 1 per page** — no page over-eager |
| Canonical tags | **0 issues** |
| Open Graph | **0 issues** — all absolute, every `og:image` present on disk |
| Meta descriptions | **0 issues** — all present, all 50–165 chars |
| `<h1>` | **exactly 1 per page** |
| JSON-LD | **0 issues** — all valid, `Article.headline` matches visible H1, breadcrumbs absolute |
| `lang` attribute | **present on all 37** |
| Duplicate element IDs | **none** |
| Browser render (390 px / 1440 px) | **no horizontal overflow** on any page probed; cards and meta labels correct at both widths |

## 5. Outstanding — not changed, owner's call

**A. Fifteen title tags exceed 60 characters** (they will truncate in search results). All are legacy pages; the ` — There & Back Again` suffix costs 21 characters, leaving 39 for the page-specific part. Not changed because these are voice-carrying editorial titles.

| Len | Page | Possible trim |
|---|---|---|
| 70 | `/1-day-in-sintra-.../` | `1 Day in Sintra: Romantic Follies` |
| 70 | `/douro-valley-day-trip/` | `The Douro Valley: A Day Among the Vines` |
| 69 | `/2-days-in-caceres/` | `2 Days in Cáceres: A Medieval City` |
| 69 | `/7-days-in-barcelona/` | `7 Days in Barcelona: Gaudí and After` |
| 68 | `/1-day-in-cadiz/` | `1 Day in Cádiz: The Edge of the World` |
| 65 | `/3-days-in-madrid-.../` | `3 Days in Madrid: At Full Volume` |
| 65 | `/3-days-in-tangier-.../` | `3 Days in Tangier: Two Worlds` |
| 64 | `/4-days-in-lagos-.../` | `4 Days in Lagos: Golden Cliffs` |
| 63 | `/1-day-in-cordoba/` | `1 Day in Córdoba: Between Empires` |
| 63 | `/10-days-in-sevilla/` | `10 Days in Sevilla: Without Rush` |
| 62 | `/5-days-in-porto-.../` | `5 Days in Porto: The River's City` |
| 62 | `/italy-morocco-seville-.../` | `Italy, Morocco & Seville: 4 Weeks` |
| 61 | `/4-weeks-portugal-.../` | `Portugal to Spain by Rail & Road` |
| 61 | `/six-days-in-rome-.../` | `Six Days in Rome: Table of Empires` |
| 61 | `/the-imperial-circuit-.../` | `The Imperial Circuit: Morocco` |

**B. No `<footer>` element anywhere** — 0 of 37 pages. Pre-existing and sitewide; previously flagged in the Seville batch report. Adding one is a global `BaseLayout` change.

**C. Placeholder cards only link on the region label.** On the legacy pages the `<a>` wraps the small `.post-region` text, not the card, so the headline is not clickable. Pre-existing and applies to real cards on those pages too — a shared legacy-markup issue, not specific to placeholders.

**D. Six advertised articles remain unwritten** — Kyoto, Granada, Jerez, Tarifa, Bologna→Rome, Rimini (plus Ronda, Chefchaouen ×2, Modena/Parma, Sahara). Labelling is honest but a reader still lands on an empty page. Worth deciding whether `/coming-soon/` should list them or the cards should be retired.

## 6. Files changed

```
 M src/pages/index.astro                          (1 card meta)
 M src/pages/1-day-in-cordoba/index.astro          (1 card meta)
 M src/pages/1-day-in-cadiz/index.astro            (2 card metas)
 M src/pages/san-marino-day-trip-guide/index.astro (2 card metas)
```

Four files, **4 insertions / 4 deletions**, all inside `.post-meta` blocks. No component, no CSS, no route, no schema, no image, no dependency touched. Word-level diff confirmed: the only changed strings are the six meta labels.

Nothing staged, committed, pushed or deployed. Preview server stopped.
