# Repository & Content-System Audit — There & Back Again

_Audit run: 2026-07-29 · Repo: `/Users/mitchchadban/Desktop/travel-mitchchadban-site` · Branch: `main` · HEAD: `17cf774`_

**Purpose:** establish the real technical ground for the blog-production pilot before any article is drafted. Every claim below was verified against the working tree, not inferred from documentation or from the external audit workbook.

---

## 0. Working-tree state

| Check | Result |
|---|---|
| `git status --short` at start of run | **empty — clean working tree** |
| `git stash list` | empty |
| Uncommitted work found | **none** |
| Unrelated files modified by this run | **none** |
| Files created by this run | only under `docs/blog-production/` |

`npm run build` was executed once (writes to `dist/`, which is git-ignored). `git status --short` remained empty afterwards.

> **No pre-existing uncommitted work was found, so nothing needed to be preserved.**

---

## 1. Repository architecture

| Aspect | Finding | Evidence |
|---|---|---|
| Framework | **Astro 6** (`astro@^6.4.7`) | `package.json` |
| Node engine | `>=22.12.0` | `package.json` |
| Rendering | Fully static SSG. No adapter, no SSR, no islands, no UI framework integration | `astro.config.mjs` |
| Integrations | `@astrojs/sitemap` only | `astro.config.mjs:19-23` |
| Site URL | `https://travel.mitchchadban.com` | `astro.config.mjs:5` |
| Trailing slash | `'always'` | `astro.config.mjs:18` |
| **Content source of truth** | **None. There is no content layer.** No `src/content/`, no content collections, no `content.config.*`, no Markdown, no MDX, no JSON, no CMS, no database. | verified by full file listing of `src/` |
| Chronicle file location | `src/pages/<slug>/index.astro` — one hand-authored `.astro` file per post | 26 post directories |
| Route generation | **File-system routing only.** No dynamic routes, no `[...slug].astro`, no `getStaticPaths()` anywhere | verified across `src/pages/**` |
| Article body format | A **single JavaScript string constant** (`pageContent`) holding escaped raw HTML migrated from Cargo, injected via `<Fragment set:html={pageContent} />` | every post file, line 4 |
| Deployment | Cloudflare Pages (inferred from `public/_redirects` syntax and the comment in `astro.config.mjs:13-15`). No CI config, no deploy script in the repo | `public/_redirects:1` |

### The single most important architectural fact

Every post is a **17-line `.astro` file** with an identical shape. The entire article — 6,000+ words, all headings, all practical blocks — lives on **line 4** as one escaped string. Example (`src/pages/10-days-in-sevilla/index.astro`, 64,728 bytes, 17 lines):

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";

const pageContent = "<div …>…entire article as escaped HTML…</div>";
const schema = { "@context": "https://schema.org", "@graph": [ … ] };
const jsonLd = '<script type="application/ld+json">' + JSON.stringify(schema) + '<\/script>';
---

<BaseLayout
  title="10 Days in Sevilla: Andalucía Without Rush — There & Back Again"
  description="A 10-day Andalucía itinerary using Seville as a base…"
  canonical="https://travel.mitchchadban.com/10-days-in-sevilla/"
  ogType="article"
>
  <Fragment slot="head" set:html={jsonLd} />
  <Fragment set:html={pageContent} />
</BaseLayout>
```

**Implication for article production:** there is no frontmatter to fill in and no Markdown to write. Authoring a new chronicle means hand-building an escaped HTML string. This is the single largest conflict between the external production system and this repository — see §9.

### File map (complete, excluding `node_modules/`, `dist/`, `.astro/`)

```
astro.config.mjs                      Astro config: site, trailingSlash, sitemap
package.json                          4 scripts, 5 deps
tsconfig.json                         extends astro/tsconfigs/base (minimal)
README.md                             UNMODIFIED Astro starter boilerplate — not project docs
SEO-RELAUNCH-PLAN.md                  the real project documentation (see §9)
public/_redirects                     11 host-level 301s (Cloudflare Pages)
public/robots.txt                     allow-all + sitemap pointer
public/og-default.svg                 the ONLY share image on the site
public/favicon.ico, favicon.svg
scripts/extract-travel-cargo.mjs      one-off Cargo migration/extraction script
src/layouts/BaseLayout.astro          the only layout — 85 lines
src/components/Header.astro           site header + mobile nav
src/components/RegionMap.astro        interactive SVG world map for /by-region/
src/components/world-map-path.js      the map's single merged path data
src/styles/global.css                 4,466 lines — ALL article component styling
src/assets/astro.svg, background.svg  unused starter assets
src/pages/index.astro                 homepage
src/pages/chronicles/index.astro      archive hub (26 cards)
src/pages/by-region/index.astro       map-led region hub
src/pages/about-the-traveller/index.astro
src/pages/coming-soon/index.astro     noindex placeholder
src/pages/<slug>/index.astro          × 26 chronicles
```

**There is no `CLAUDE.md`, no `CONTRIBUTING`, and no content-authoring documentation in this repository.** `README.md` is untouched Astro starter boilerplate and should not be treated as project guidance. The only genuine project documentation is `SEO-RELAUNCH-PLAN.md`.

---

## 2. Chronicle "schema"

There is **no schema** in the technical sense — no Zod, no content collections, no validation, no build-time checks on post metadata. What exists is a **convention**, applied consistently across all 26 posts. Verified by comparing four representative posts:

- single-city itinerary — `4-days-in-bologna`
- day-trip article — `1-day-in-cadiz`
- multi-city / regional itinerary — `10-days-in-sevilla`
- most recently touched — `2-days-in-fez-itinerary`

### 2a. The `BaseLayout` prop contract (the closest thing to frontmatter)

Defined at `src/layouts/BaseLayout.astro:9-18`:

| Prop | Required? | Default | Notes |
|---|---|---|---|
| `title` | conventionally always set | `'There & Back Again'` | Pattern: `<Article Title> — There & Back Again`. Drives `<title>`, `og:title`, `twitter:title` |
| `description` | conventionally always set | generic site string | Drives `<meta name=description>`, `og:description`, `twitter:description` |
| `canonical` | conventionally always set | `${SITE_URL}/` | Absolute URL **with trailing slash**. Drives `<link rel=canonical>` and `og:url` |
| `ogType` | posts set `"article"` | `'website'` | Hubs and homepage leave the default |
| `image` | **never set by any page** | `/og-default.svg` | Resolved to absolute at line 21 |
| `noindex` | only `coming-soon` sets it | `false` | Emits `<meta name="robots" content="noindex, follow">` |

**Fields that do not exist anywhere in this repository:** `date` / `pubDate` / `updated`, `draft`, `category`, `region`, `country`, `destination`, `tags`, `author`, `heroImage`, `imageAlt`, `readingTime`, `order`, `featured`.

There is therefore **no date format**, **no draft flag**, **no taxonomy** and **no publication workflow**. Region and destination grouping is achieved by *hardcoding* the post into `src/pages/by-region/index.astro` and `src/pages/chronicles/index.astro`. Dates appear only as human-readable text inside the article HTML (e.g. `Travel Chronicle · September 2025`).

### 2b. Structured data

Each post declares a `schema` object in the frontmatter script and injects it through the layout's `head` slot. Verified shape on `10-days-in-sevilla`:

- `@graph` containing an `Article` node — `headline`, `description`, `author` (`Person`, "Mitch Chadban"), `publisher` (`Organization`)
- plus `BreadcrumbList`, plus `FAQPage` on posts that carry a FAQ block
- homepage carries a `WebSite` node instead

**No schema validation runs at build time.** A malformed JSON-LD object would build and deploy silently.

### 2c. Head output (all pages)

`BaseLayout` emits: charset, viewport with `initial-scale=1`, `<title>`, description, canonical, conditional `noindex`, Google Fonts preconnect + stylesheet (IM Fell English, Cormorant Garamond), favicon/apple-touch-icon/theme-color, full Open Graph block, Twitter `summary_large_image`, the `head` slot, and GA4 `gtag.js` (`G-8XHNFCYJ42`). `<html lang="en-AU">`. Body carries a skip-link to `#main-content`.

---

## 3. Shared content patterns

**All article "components" are CSS classes in `src/styles/global.css`, applied to plain HTML inside the `pageContent` string. There are no Astro components for article internals.** Only three `.astro` components exist in the whole project (`Header`, `RegionMap`, and the `BaseLayout`), and none of them is used inside an article body.

I checked all 63 class names used by the existing Seville article against `global.css`. **61 of 63 are defined.** The reusable vocabulary is:

| Module | Classes (all confirmed present in `global.css`) |
|---|---|
| Hero | `post-hero`, `post-hero-title`, `post-hero-sub`, `post-route-strip`, `page-label` |
| Stats bar | `post-stats`, `stat`, `stat-num`, `stat-label` |
| Body / prose | `post-body`, `opening-prose`, `prose`, `drop-cap`, `ornament` |
| Chapter headings | `chapter-break`, `chapter-number`, `chapter-name`, `chapter-epithet` |
| Narrative & transitions | `narrative`, `beat` |
| Practical blocks | `practical`, `prac-header`, `prac-city`, `prac-dates`, `prac-section`, `prac-label`, `prac-item`, `tip-row` |
| Badges | `badge-row`, `badge`, `badge-michelin`, `badge-bourdain` |
| Budget | `budget-grid`, `budget-cell`, `budget-cat`, `budget-val` |
| Itinerary summary | `itin-block`, `itin-inner`, `itin-meta`, `itin-section-head`, `itin-days`, `itin-day-row`, `itin-day-num` |
| Grand total | `grand-total-block`, `grand-total-grid`, `grand-line`, `grand-total-num` |
| Quick-reference eats | `eats-row`, `eats-city` |
| Transport | `transport-note` |
| FAQ | `faq-block`, `faq-inner`, `faq-item`, `faq-q`, `faq-a`, `faq-divider` |
| Pull quote | `pull` |
| Closing | `post-closing` |
| Further reading | `next-chronicles`, `section-label`, `posts-grid`, `post-card`, `post-region`, `post-title`, `post-excerpt`, `post-meta` |
| Affiliate tour cards | `tours`, `tours-label`, `tours-grid`, `tour-card`, `tour-type`, `tour-name`, `tour-meta`, `tour-footer`, `tour-price`, `tour-link-label` |

### Patterns that DO NOT exist

| Requested pattern | Status |
|---|---|
| **Anchor menu** | **Not implemented.** `.anchor-menu` is not defined in `global.css` and no post uses one. |
| **Table of contents** | **Not implemented.** No `.toc` class, no TOC markup in any post. |
| **Maps (in articles)** | **Not implemented.** No embedded maps, no iframes, no map component in any article. `RegionMap.astro` serves only `/by-region/`. |
| **Image figures** | **Not implemented.** Zero `<figure>` or `<img>` elements in any article. |
| **Image captions / alt text** | **Not implemented.** No `<figcaption>` styling; `global.css` contains only `img, video { max-width:100%; height:auto; }` plus two archive-grid rules. |
| **Breadcrumbs (visible)** | **Not implemented as UI.** `BreadcrumbList` exists in JSON-LD only; there is no on-page breadcrumb trail. |
| **Related-post cards** | Implemented as `next-chronicles` / `post-card`, but **hand-authored per post**, not generated. |

### Tables and lists

`10-days-in-sevilla` contains **zero** `<table>`, `<ul>` and `<ol>` elements. Tabular information is expressed through the `budget-grid` / `eats-row` / `itin-day-row` div patterns instead. Any brief that calls for a "comparison table" must either use those div patterns or accept that new CSS would be required.

---

## 4. Internal linking and URL handling

| Aspect | Finding |
|---|---|
| Slug generation | **Manual.** The slug is the directory name under `src/pages/`. Nothing derives it from a title. |
| Canonical generation | **Manual.** Each page hardcodes an absolute `canonical` prop. Nothing derives it from the route. |
| Canonical correctness | Verified in `dist/` — all self-referential and correct, e.g. `dist/2-days-in-fez-itinerary/index.html` → `https://travel.mitchchadban.com/2-days-in-fez-itinerary/` |
| Trailing slash | `'always'` globally; every internal link and canonical uses it consistently |
| Redirects | Host-level only, in `public/_redirects` (copied verbatim to `dist/_redirects`). 10 legacy accented/punctuation slugs + `/front-page/` → `/`. No `redirects:` block in `astro.config.mjs`. |
| **Internal-link integrity** | **29 distinct internal links across all pages; 0 broken.** Every `href` resolves to a real route. Verified programmatically against the `src/pages/` directory listing. |
| Archive linking | `/chronicles/` links to all **26** posts, hand-authored. |
| Region linking | `/by-region/` renders 13 region panels from a data array; 26 real post links (23 Europe, 3 North Africa). |
| Destination pages | **Do not exist.** There is no `/spain/`, `/andalucia/`, `/seville/` or any destination hub. |
| Tag / category archives | **Do not exist.** |

**Would changing a slug create a regression?** Yes, in three places, all manual: (1) the post directory name, (2) every hardcoded inbound `href` in `/chronicles/`, `/by-region/`, the homepage and sibling posts, and (3) the post's own `canonical` prop. A rename with no `_redirects` entry would 404 with no build-time warning. **Legacy paths are already redirected** for the 10 known Cargo slugs.

---

## 5. Images and personal source material

### 5a. Images in the repository

**There are zero raster images in this repository.** A full search for `*.jpg|jpeg|png|webp|avif|heic|tif|gif` across the working tree (excluding `node_modules/`, `dist/`, `.git/`) returned **0 files**. The only graphics are three SVGs: `public/favicon.svg`, `public/og-default.svg`, and two unused starter assets in `src/assets/`.

No post contains an `<img>`. Every post's `og:image` therefore falls back to `/og-default.svg`. This confirms the open item recorded in `SEO-RELAUNCH-PLAN.md` ("per-post hero images … still not implemented").

### 5b. Personal source material found outside the repository

Not referenced by the repo, but present on the Desktop and clearly the project's photo library. **Inspected read-only. Nothing was copied, moved, renamed, compressed or edited.**

| Location | Contents | Relevance |
|---|---|---|
| `/Users/mitchchadban/Desktop/Trip Photos/2023/Sevilla/` | **220 JPEGs**, Sony ILCE-7M2, 2048 px long edge (web exports, not originals). 128 landscape / 91 portrait / 1 square. No GPS. | **Earlier Seville visit** — see 5c |
| `/Users/mitchchadban/Desktop/Trip Photos/2025/` | 961 JPEGs, unsorted, spanning EXIF dates 2025-09-06 → 2025-10-04 (the whole 4-week Italy→Morocco→Spain trip). **~234 fall in the Seville window.** | **The September 2025 stay documented by the live article** |
| `/Users/mitchchadban/Desktop/Trip Photos/2023/Granada/`, `/Ronda/` | 211 and 93 files | Andalucía, not Seville |
| `/Users/mitchchadban/Desktop/Trip Photos/Still need day trips done/` | **empty** | Day-trip photos are unsorted/absent |
| `/Users/mitchchadban/Desktop/Holiday Tickets/` | 12 PDFs — **all South America** (Lima, Cusco, La Paz, Santiago, Mendoza, Iguazú, Machu Picchu) | **No Spain tickets. No Seville tickets, bookings or receipts exist.** |

**There are no Seville accommodation records, restaurant bookings, tickets or receipts anywhere on disk.** The only booking-grade evidence for Seville is what the existing article itself states.

### 5c. Two distinct Seville visits — a provenance finding

The photo library contains evidence of **two separate Seville visits**, which must not be conflated:

**Visit A — late August 2023** (`Trip Photos/2023/Sevilla/`, 220 photos)
EXIF `DateTimeOriginal` runs 2023-08-29 01:00 → 2023-08-30 04:30 on the camera clock. Those raw values are implausible as local time (shooting monuments at 2 a.m.). Applying a −8 h correction (camera set to AEST/UTC+10; Seville on CEST/UTC+2) yields a fully coherent pattern: **28 Aug 17:00–22:00, then 29 Aug 08:39–13:43 and 16:25–20:30**, with a 13:43–16:25 gap consistent with late-August midday heat. No `OffsetTime` EXIF tag is present, so **the −8 h correction is a reasoned inference, not documented fact.**
*This visit is not described by any live article.*

**Visit B — 26 September – 5 October 2025** (`Trip Photos/2025/`, ~234 photos in window)
Here the camera clock reads as plausible local time with **no correction** (sessions run 09:21–20:29). The sessions align closely with the live article's documented days — e.g. photos at 15:50–16:09 on 4 Oct match the article's "Cathedral and Giralda at the sixteenth hour"; photos at 10:18–11:51 on 29 Sept match "inside [the Alcázar] by half past ten".
*This is the visit the live 10-day article describes.*

**Caveat carried into the research packet:** the camera-date/article-day mapping is not perfect. Photographs of Plaza de España and Parque María Luisa are stamped **29 September**, whereas the article places those sights on Day 3 (28 September) and puts Triana on 29 September. The article also contains **internal date inconsistencies of its own** (the Córdoba and Granada practical blocks are both dated "Tuesday 30 September", while the at-a-glance list assigns Granada to Wed 1 Oct; the Day 7 chapter header says "Wednesday 1 October" while the at-a-glance says Thu 2 Oct). Photographs are reliable evidence of **what** was seen and roughly **when**; the article's day numbering is a later reconstruction. Neither should be presented as precise.

### 5d. Images visually inspected

Fourteen images were opened and viewed (not judged from filenames). Confirmed contents are recorded in the research packet's image plan. Highlights:

- `2025/DSC08258.jpg` — Giralda seen over a brick wall, palms and bougainvillea, from inside the Alcázar grounds (portrait)
- `2025/DSC08264.jpg` — Plaza de España, tiled bridges and canal (landscape)
- `2025/DSC08269.jpg` — Pabellón Mudéjar reflected in its pool, Parque María Luisa (landscape)
- `2025/DSC08457.jpg` — Plaza de Toros de la Maestranza façade, "PLAZA DE TOROS" legible (landscape)
- `2025/DSC08468.jpg` — Archivo General de Indias interior gallery, mahogany shelving (landscape)
- `2025/DSC08487.jpg` — Seville Cathedral, Capilla Mayor and vaults (landscape)
- `2025/DSC08488.jpg` — Alameda de Hércules, the two Roman columns at evening (portrait)
- `2025/DSC08489.jpg` — Giralda above rooftops at sunset, pink cloud (portrait)
- `2023/Sevilla/DSC04624.jpg` — Plaza de España at golden hour, tiled bridge reflected (landscape)
- `2023/Sevilla/DSC04708.jpg` — Cathedral Retablo Mayor, the gilded altarpiece (landscape)
- `2023/Sevilla/DSC04757.jpg` — Setas de Sevilla walkway with the Giralda beyond (landscape)

---

## 6. Existing-content relationship

### `10 Days in Sevilla: Andalucía Without Rush` — `/10-days-in-sevilla/`

~6,150 words, 8 `<h2>` chapters, no `<h3>`. Route strip: Spain · Andalucía · Seville · Córdoba · Granada. Label: "Travel Chronicle · September 2025".

**This article already contains a great deal of first-person Seville material**, which is repository content and therefore a tier-1 source under the provenance hierarchy:

- **Arrival:** by ferry Tangier→Tarifa, then coach, into **Estación de Autobuses del Prado**, 18:00, Friday 26 September
- **Accommodation:** a street behind **San Lorenzo**, **Calle Hombre de Piedra 24**; 9 nights, ~AUD 130/night; explicit advice to avoid staying in Santa Cruz
- **Sights visited:** Real Alcázar (booked skip-the-line, inside by 10:30), Cathedral & Giralda, Archivo de Indias, Torre del Oro, Plaza de Toros de la Maestranza, Museo de Bellas Artes, Metropol Parasol, Plaza de España, Parque María Luisa, Casa de Pilatos, Yemas de San Leandro, Hospital de las Cinco Llagas, Basílica de la Macarena, Convento de Santa Paula, Palacio de las Dueñas, Museo Palacio de la Condesa de Lebrija, Museo del Baile Flamenco, Real Fábrica de Tabacos, Triana / Mercado de Triana / Centro Cerámica Triana, Barrio de Santa Cruz, Convento de San José del Carmen (Las Teresas), Museum of Illusions, CaixaForum, Isla Mágica
- **13 named meals:** Eneko Basque, Restaurante El Sella, Tradevo, Lalola, Restaurante Realcázar, Restaurante Eslava, El Disparate, La Huerta 9, Abacería del Postigo, Taberna la Auténtica Regina, Balbuena y Huertas, Baratillo, El Pimiento; plus the bar El Garlochi
- **Day trips:** Córdoba (AVE, 45 min, dep. 07:00, ret. 20:25) and Granada (~3.5 h, ret. 18:55)
- **Budget:** ~AUD 2,670 in-destination, itemised

### Related coverage

| Page | Route | Overlap with a 3-day Seville cornerstone |
|---|---|---|
| `1 Day in Córdoba` | `/1-day-in-cordoba/` | Day-trip target. **Link out; do not describe.** |
| `1 Day in Cádiz` | `/1-day-in-cadiz/` | Day-trip target. **Link out; do not describe.** |
| `Italy, Morocco & Seville 4 Week Itinerary` | `/italy-morocco-seville-4-week-itinerary/` | Seville as the closing leg of a 4-week circuit. Mentions Seville 34×. Owns the multi-country framing. |
| `4 Weeks Portugal to Spain by Rail & Road` | `/4-weeks-portugal-to-spain-by-rail-road/` | Broad Iberian rail routing |
| **Granada** | — | **No standalone page.** Covered only inside `/10-days-in-sevilla/`. |
| Unpublished Seville drafts | — | **None exist.** No drafts anywhere in the repo. |

**What must not be duplicated:** Córdoba and Granada day-trip content, the 10-day budget, the "slow inhabitation over 10 days" thesis, Isla Mágica, and the complete 13-restaurant table. **What should remain exclusive to the regional article:** the Andalucía-wide framing and the use of Seville as a multi-day base for regional excursions. Full boundary in the research packet.

---

## 7. Verification of the audit workbook's technical findings

The workbook (`blog-cluster-audit-2026-07-26.xlsx`, 6 sheets, audited against the *live site* on 26 July 2026) was parsed in full. Each reported issue was re-checked against the **current repository**.

| # | Reported issue | Verdict | Evidence |
|---|---|---|---|
| 1 | Homepage Bologna card → 404 (`/bologna-the-fat-city%27s-table-1`) | **ALREADY FIXED** | `src/pages/index.astro:19` — the card's `href` is `/4-days-in-bologna/`, which resolves to a real route. The old percent-encoded path appears nowhere in `src/`. |
| 2 | Kyoto placeholder promoted as a latest post | **CONFIRMED CURRENT ISSUE** | `src/pages/index.astro:19` — third "Latest Chronicles" card, region "Japan · Asia", title "Where the Temples Keep Their Silence", Kyoto excerpt, `href="/coming-soon/"`, meta "14 days · May". Nothing labels it as forthcoming. It sits in the same grid, with the same styling, as two live posts. |
| 3 | Cádiz duplicate / legacy URL | **ALREADY FIXED** | `public/_redirects:5` 301s `/1-day-in-cádiz-—-at-the-edge-of-the-known-world/` → `/1-day-in-cadiz/`. `dist/1-day-in-cadiz/index.html` carries a correct self-referential canonical. |
| 4 | Fez duplicate / legacy URL (`/fez-into-the-labyrinth-of-the-eternal-city`) | **PARTIALLY TRUE** | The repo builds only `/2-days-in-fez-itinerary/`, with a correct canonical, and the string `fez-into` appears nowhere in `src/`, `dist/` or `public/`. **But there is no `_redirects` entry for that legacy path** — unlike the 10 Cargo slugs that were mapped. If the URL is still reachable on the live host it will 404 rather than 301. A live-host check could not be completed from this environment. **Verify against the live site before publishing more.** |
| 5 | No destination-cluster architecture | **CONFIRMED CURRENT ISSUE** | No `/spain/`, `/andalucia/`, `/seville/` or any destination hub. No tag or category archives. Grouping exists only as hardcoded cards in `/chronicles/` (flat, 26 cards) and `/by-region/` (13 region panels). |
| 6 | Seville lacks a clean standalone cornerstone | **CONFIRMED CURRENT ISSUE** | Only `/10-days-in-sevilla/`, which is a regional base itinerary covering Seville + Córdoba + Granada. No city-only Seville page. |
| 7 | Granada lacks a standalone cornerstone | **CONFIRMED CURRENT ISSUE** | No Granada page. Chapter VII of `/10-days-in-sevilla/` is the only coverage. |
| 8 | Marrakech lacks a standalone cornerstone | **CONFIRMED CURRENT ISSUE** | No Marrakech page. Covered only inside `/the-imperial-circuit-morocco-in-14-days/`. |
| 9 | Rabat lacks a standalone cornerstone | **CONFIRMED CURRENT ISSUE** | No Rabat page. Same circuit article only. |
| 10 | Girona and Figueres share a paired URL | **CONFIRMED CURRENT ISSUE** | Single route `/1-day-in-figueres-girona/`. No independent page for either. |
| 11 | Tarragona and Sitges share a paired URL | **CONFIRMED CURRENT ISSUE** | Single route `/1-day-in-tarragona-sitges/`. No independent page for either. |

**None of these were fixed during this run.**

### Additional issues found that the workbook did not report

| Finding | Evidence |
|---|---|
| **8 pages link to `/coming-soon/`** as "Next Chronicles" cards | `index.astro`, `10-days-in-sevilla`, `1-day-in-cadiz`, `1-day-in-cordoba`, `3-days-in-tangier…`, `4-days-in-bologna`, `san-marino-day-trip-guide`, `the-imperial-circuit…`. `/10-days-in-sevilla/` alone has three such cards (Morocco, Bologna, Ronda) — two of which point at articles **that are already live** (`/the-imperial-circuit-morocco-in-14-days/`, `/4-days-in-bologna/`) yet are still captioned "Coming Soon". |
| **Zero images sitewide** | See §5a. Every `og:image` is the same SVG. |
| **No anchor menus / TOC** despite being a stated editorial preference | §3 |
| **Date inconsistencies inside `/10-days-in-sevilla/`** | §5c |
| **`README.md` is unmodified Astro boilerplate** | Misleading to any new contributor |
| **Affiliate content already exists** | `/10-days-in-sevilla/` carries 7 Viator `tour-card` affiliate links with prices. The site is already monetised — relevant context, though the pilot adds none. |

---

## 8. Validation commands (read from `package.json`, verified by execution)

| Purpose | Real command | Status |
|---|---|---|
| Install dependencies | `npm install` | standard |
| Dev server | `npm run dev` → `astro dev` (default `localhost:4321`) | defined |
| Production build | `npm run build` → `astro build` | **Executed 2026-07-29: passed, no warnings, 31 pages, sitemap generated, 1.92 s** |
| Preview built output | `npm run preview` → `astro preview` | defined |
| Astro CLI passthrough | `npm run astro …` | defined |
| Type checking | `npx astro check` | **not a defined script.** `astro` is in `node_modules/.bin`; `@astrojs/check` and `typescript` are **not installed**, so this would require a network install. |
| Linting | **none** | no ESLint/Prettier config, no dependency, no script |
| Content validation | **none** | no content collections, so no schema validation exists |
| Tests | **none** | no test runner, no test files, no script |
| Broken-link check | **none** | no link checker configured |
| Route check | **none** | no route test |

**Do not invent commands beyond these five.** The only meaningful automated gate in this repository is `npm run build`. Link integrity, schema correctness, image existence and factual accuracy are **entirely unguarded** and must be checked by hand.

---

## 9. Conflicts between the external production system and this repository

| # | External system assumes | Repository reality | Resolution for the pilot |
|---|---|---|---|
| 1 | "Preserve existing **frontmatter**" (`BLOG-PRODUCTION-SYSTEM.md` §8.2; `QA-CHECKLIST.md` "Frontmatter matches the repository schema") | **There is no frontmatter and no schema.** Metadata is `BaseLayout` props; the body is an escaped HTML string. | Redefine the QA item as: *props match the six-prop `BaseLayout` contract; body HTML uses only classes already defined in `global.css`.* |
| 2 | "Article body in the repository's **actual content format**" (§6) | The actual format is hand-escaped HTML in a JS string constant — high-friction and error-prone at 6,000 words. | Flag to Mitch as a **decision point**. A Markdown/MDX content collection would make production far safer, but that is a structural change requiring separate approval. **Not attempted in this run.** |
| 3 | "**Anchor-menu** labels where the site supports them" (§6) | The site does not support them. | Omit, or request a separate approved component. |
| 4 | "Image brief and recommended source folder"; "Images exist and **alt text** matches" | **No image pipeline exists at all** — no images, no `<figure>` pattern, no caption CSS, no `heroImage` prop. | The image plan is a **specification only**. Publishing images requires a prior, separately approved implementation step. See the brief. |
| 5 | "Link to the appropriate **country, region or archive page**" (§9) | Only `/chronicles/` and `/by-region/` exist. No country or destination pages. | Link only to `/chronicles/` and `/by-region/`. **Do not invent destination hubs.** |
| 6 | "The cornerstone **must be updated** to link out to each approved supporting page" (§9) | Requires editing `/10-days-in-sevilla/`'s escaped HTML string — a modification to an existing post. | Out of scope this run. Must be a separate, explicitly approved change. |
| 7 | "**Structured-data** recommendation only when supported" | Supported, but hand-written and unvalidated. | Mirror the existing `Article` + `BreadcrumbList` (+ `FAQPage` only if a genuine FAQ is written) pattern exactly. |
| 8 | Workbook Wave 0: "Create destination hub pages or tag archives" | Not implemented. | Confirmed as a real gap; **not** a pilot task. |
| 9 | Workbook counts "26 live chronicles" | Repo builds **31 pages**: 26 chronicles + homepage + `/chronicles/` + `/by-region/` + `/about-the-traveller/` + `/coming-soon/`. Sitemap contains 30 (`coming-soon` excluded). | Workbook figure is right about chronicles; don't reuse "26" as a page count. |
| 10 | `00-START-HERE.md`: "Copy this folder into the repository as `docs/blog-production/`" | The Desktop folder is **read-only** per this run's instructions. | Not copied. New artefacts were authored fresh under `docs/blog-production/`; the external folder is untouched. |

---

## 10. Summary for the pilot

**Green — safe to rely on:** file-system routing; the six-prop `BaseLayout` contract; 61 confirmed article CSS components; correct canonicals and trailing slashes; a clean `_redirects` file; 0 broken internal links; a passing build; a rich, tier-1 first-person Seville record inside the existing article; two well-documented photo pools.

**Amber — requires care:** the escaped-HTML authoring format; no schema validation; no link checking; hand-maintained inbound links from `/chronicles/`, `/by-region/` and sibling posts; a live article containing its own internal date inconsistencies.

**Red — blocks part of the plan:** **no image pipeline whatsoever.** No images, no figure pattern, no caption styling, no `heroImage` prop. An image plan can be specified but cannot be executed without a separately approved change to shared styles and layout — which this run is explicitly forbidden from making.

---

_Prepared 2026-07-29. No existing posts, components, styles, routes, schemas or configuration were modified. Nothing was staged, committed, pushed or deployed. The external Desktop production-system folder was read only._
