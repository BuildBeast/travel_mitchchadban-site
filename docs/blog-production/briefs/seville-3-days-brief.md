# Article Brief — 3 Days in Seville

_Prepared 2026-07-29 · **Status: NOT READY TO DRAFT** — see §16 · Do not begin drafting until the blockers clear and Mitch approves_

Companion documents: [`../repository-audit.md`](../repository-audit.md) · [`../research/seville-3-days-research.md`](../research/seville-3-days-research.md)

---

## 1. Goal

Publish the missing **city-only Seville cornerstone** — the page that owns `3 days in Seville`, resolves the sequencing problem that the existing regional article deliberately ignores, and becomes the hub for the future Seville cluster (accommodation, one-day, attractions, day-trips, food).

## 2. Reader and intent

- **Primary search intent:** `3 days in Seville` / `Seville 3 day itinerary` — informational-transactional, mid-planning, dates already fixed
- **Secondary intents:** `how many days in Seville` · `Seville itinerary` · `what to do in Seville in 3 days` · `do you need to book the Alcázar in advance`
- **Reader promise:** *Three days is enough for Seville — if you get the order right. Here is the order, and here is what to book before you go.*
- **Reader decision:** what to do on each of three days, in what sequence, and what to book in advance

## 3. Article type

Cornerstone duration itinerary. Research-led editorial guide with **sourced** first-person inserts — **not** a memoir. See §6.

## 4. SEO package

| Field | Recommendation | Length |
|---|---|---|
| **Working title** | 3 Days in Seville: Palace, River and Parasol | — |
| **Recommended H1** | `3 Days in Seville: Palace, River and Parasol` | 44 |
| **Recommended slug** | `3-days-in-seville` → `/3-days-in-seville/` | — |
| **`BaseLayout` `title` prop** | `3 Days in Seville Itinerary — There & Back Again` | 48 ✓ |
| **Meta description** | `A three-day Seville itinerary built around what is actually open: the Alcázar first, Triana and the river, then the parks and the Setas at dusk.` | 144 ✓ |
| **`canonical`** | `https://travel.mitchchadban.com/3-days-in-seville/` | — |
| **`ogType`** | `article` | — |
| **Primary keyword** | 3 days in Seville | — |
| **Secondary terms** (restrained) | Seville itinerary · Real Alcázar tickets · Seville in three days · Triana · Plaza de España | — |

**Note on the H1 vs the meta title.** The site's own pattern is `<Article Title> — There & Back Again`, but `3 Days in Seville: Palace, River and Parasol — There & Back Again` is 65 characters and would truncate in search. **Recommendation: let the H1 and the `title` prop differ** — the literary H1 on the page, the plain search-facing title in `<head>`. This matches the workbook's own rule ("Search title, literary framing") and is a deliberate, documented divergence, not an inconsistency.

"Palace, River and Parasol" names the three days in concrete nouns and could not describe another city — it satisfies the voice rule that prefers specific nouns to ornamental adjectives.

## 5. Seville vs Sevilla — assessment and recommendation

**Current site usage, measured across `src/`:**

| Form | Occurrences | Where |
|---|---|---|
| **Seville** | **225** | Body prose everywhere, including *inside* the 10-day article (89×); every other article; `/chronicles/`; `/by-region/`; the 4-week itinerary title |
| **Sevilla** | **14** | Almost entirely the one legacy title/slug `10 Days in Sevilla` (13× on that page, 1× in `/chronicles/`), plus the proper noun *Sevilla-Santa Justa* |

**Finding: "Seville" is already the site's overwhelming English convention.** "Sevilla" survives only in a single legacy title and slug inherited from the Cargo migration.

**Recommendation**

1. **Use "Seville" throughout the new article** — H1, title, meta, slug, body prose. This aligns with 94 % of existing site usage *and* with English search demand.
2. **Slug: `3-days-in-seville`.** Do not mirror the legacy `sevilla` spelling.
3. **Keep Spanish proper nouns in Spanish:** *Real Alcázar de Sevilla*, *Catedral de Sevilla*, *Sevilla-Santa Justa*, *Plaza de España*, *Mercado de Triana*. Do not anglicise a proper name.
4. **Introduce the Spanish name once, in the standfirst or first paragraph** — "Seville, *Sevilla* to the people who live in it" — then use "Seville" for the rest.
5. **Do not rename `/10-days-in-sevilla/`, do not change any existing slug, and do not touch site-wide naming in this run.**

**Long-term option, for separate approval only:** align `/10-days-in-sevilla/` to `/10-days-in-seville/` with a `_redirects` 301 and updated inbound links. Worth doing eventually; explicitly **not** part of this pilot. Until then the one-off divergence between the two slugs is the lesser evil — matching search intent beats matching a legacy typo.

## 6. Evidence and provenance restrictions

**Binding. The QA gate.**

### Permitted in the first person — each traceable to `/10-days-in-sevilla/` [REPO] or to inspected EXIF [PHOTO]

Staying in **San Lorenzo** on Calle Hombre de Piedra (9 nights) and advising against Santa Cruz · entering the **Alcázar** on a pre-booked skip-the-line ticket and being inside by 10:30 · climbing the **Giralda** and visiting the Cathedral · visiting the **Archivo de Indias** and finding it under-visited · eating at **Eslava** (slow-cooked egg, oxtail croquette, fino) · arriving overland from **Morocco via the Tarifa ferry** into Estación de Autobuses del Prado · experiencing **~32 °C in late September** · **walking** the city rather than using transport · seeing Plaza de España and Parque María Luisa in the **late afternoon**, and the Cathedral at **~16:00**.

### Forbidden — no evidence exists

Any hotel or apartment **name** · any euro price paid at any venue · any dish other than at Eslava · any person, guide, host or conversation · any emotion not already written in the existing article · any weather beyond the two documented windows · riding the tram, metro or airport bus · arriving by AVE · Semana Santa or the Feria · climbing the Giralda since the 2026 belfry works began · **any suggestion that Mitch followed this three-day route.**

### The governing sentence

> **The three-day sequence is an editorial construction, not a memory.** Write it as an informed guide in the second or third person. Where Mitch's own experience genuinely bears on a decision, quote it as a documented past visit — never as a walk-through of this itinerary.

### The two-visit rule

Photographs come from **two separate visits** — August 2023 and September/October 2025. Never caption a 2023 frame with a 2025 date, or vice versa. Never merge them into one narrative.

## 7. Proposed standfirst

> Three days is enough for Seville, but only in the right order. A route built around the heat, the closing days and the one ticket that genuinely sells out.

*(155 characters. Uses the site's `post-hero-sub` class. States the promise and the differentiator in two sentences, without hype.)*

## 8. Article structure

Follows the existing chronicle architecture exactly — the same classes, in the same order, as `/10-days-in-sevilla/`. **Every class listed is already defined in `src/styles/global.css`; no new CSS is required.**

```
post-hero
  post-route-strip .......... Spain · Andalucía · Seville
  page-label ................ Itinerary · Three Days
  post-hero-title (H1) ...... 3 Days in Seville: Palace, River and Parasol
  post-hero-sub ............. standfirst (§7)
post-stats .................. 4 × stat: 3 Days · 11 Sights · ~9 km Walked · 1 Ticket to Book Ahead
post-body
  opening-prose / prose / drop-cap ... the answer arrives in paragraph one
  [practical] ............... "Before You Go" — the booking block
  chapter-break I ........... Day 1
  chapter-break II .......... Day 2
  chapter-break III ......... Day 3
  [practical] ............... Getting There & Around
  [practical] ............... Where to Stay (short — links out)
  [practical] ............... Day Trips (short — links out)
  [practical] ............... Tips & Watch-Outs
  itin-block ................ At a Glance
  faq-block ................. 4 questions, only if genuinely distinct
post-closing / pull ......... closing reflection + pull quote
next-chronicles ............. further reading
```

### Proposed H2 hierarchy

The site uses `chapter-name` as its `<h2>` and has **no `<h3>` anywhere** in the existing article. This brief keeps `<h2>` for chapters and introduces `<h3>` **only inside the practical blocks** — a small, contained extension.

| Level | Heading |
|---|---|
| H1 | 3 Days in Seville: Palace, River and Parasol |
| H2 | **I. The Monumental Core** — *epithet:* the Alcázar, the Giralda, the archive and the shaded lanes |
| H2 | **II. The River and the Other Bank** — *epithet:* Triana at market hour, the bullring, and the water between them |
| H2 | **III. South to North** — *epithet:* an empty Plaza de España at dawn, a hidden palace, and the city from above |
| H2 | Getting There and Around |
| H2 | Where to Stay in Seville |
| H2 | Day Trips — and Why Not on Three Days |
| H2 | Tips and Watch-Outs |
| H2 | The Three Days at a Glance |
| H2 | Frequently Asked Questions |

### Proposed H3 hierarchy (inside practical blocks only)

Under **Before You Go**: `What to book, in order` · `What you do not need to book`
Under **Getting There and Around**: `From the airport` · `From Santa Justa` · `Getting around the city`
Under **Tips and Watch-Outs**: `The midday rule` · `Which day should be which` · `Access and mobility`

## 9. Day-by-day route and geographic logic

Full analysis and rejection of the pilot file's hypothesis: research packet §19.

### Day 1 — The Monumental Core · *radial, ~2 km, no transit*

`Real Alcázar (09:30 timed entry)` → `Cathedral & Giralda` → `Archivo de Indias` → *late lunch* → `Barrio de Santa Cruz` (late afternoon) → *evening tapas, Santa Cruz / Alfalfa*

**Logic:** the four principal monuments sit within a 250 m radius, so every transition is 3–6 minutes. The one item that genuinely sells out goes first, on the first morning. The free, air-conditioned Archivo absorbs the early-afternoon heat. Santa Cruz's narrow, shaded lanes are correct at 17:00 and miserable at noon.
**Weekday rule:** not a Sunday (Cathedral opens 14:30); not a Monday *if* the Archivo's Monday closure is confirmed.

### Day 2 — The River and the Other Bank · *linear, ~3 km, one bridge*

`Mercado de Triana (early)` → `Centro Cerámica Triana` → `Calle Betis` → *cross Puente de Isabel II* → `Torre del Oro` → `Plaza de Toros de la Maestranza` → *break* → *evening: Calle Betis at sunset, or flamenco*

**Logic:** the market is a morning institution and must not be scheduled for the afternoon. The day runs west-bank-to-east-bank along the river with no backtracking. The single deliberate repeat — returning to Calle Betis in the evening — is justified: it is a different street at sunset.
**Weekday rule:** not a Sunday *if* the Mercado's Sunday closure is confirmed.

### Day 3 — South to North · *linear traverse, ~3.5 km*

`Plaza de España (08:30–09:30)` → `Parque María Luisa` → *walk north* → `Casa de Pilatos` → *lunch + break* → `Setas de Sevilla at dusk`

**Logic:** one continuous south-to-north line. **Plaza de España first thing is the single strongest piece of advice in the article** — it is free and unenclosed, nearly empty before 09:30, the low light rakes across the tiles, and by noon it is the hottest and most crowded place on the route. Parque María Luisa provides genuine shade immediately after. Casa de Pilatos is open every day 09:00–18:00, which makes this the flexible day. Ending on the Setas at dusk gives the highest accessible viewpoint and a way to close on the Giralda without depending on the belfry works.
**Weekday rule:** works on any day — **schedule this one on the Sunday or Monday.**

### The scheduling rule — the article's signature takeaway

> Day 3 is the flexible day. If your three days include a Sunday or a Monday, put Day 3 on it: Day 1 needs the Cathedral open in the morning, and Day 2 needs the market open.

**⚠️ Blocked** until the Archivo/Monday and Mercado/Sunday closures are verified against primary sources (research packet §16).

### Deliberately omitted from three days — and the article should say so, briefly

Córdoba and Granada day trips (link out) · Isla Mágica · Museo de Bellas Artes · Basílica de la Macarena · Palacio de las Dueñas · Condesa de Lebrija · Real Fábrica de Tabacos · Itálica. **Naming what was cut, and why, is a quality signal — not filler.**

## 10. Practical modules required

All exist in `global.css`. Reuse; do not invent.

| Module | Classes | Content |
|---|---|---|
| **Before You Go** | `practical` / `prac-header` / `prac-section` / `prac-label` / `prac-item` | Booking order: **1.** Alcázar (timed, sells out) **2.** Cathedral + Giralda (timed, €1 cheaper online) **3.** everything else on the day. Each with its official URL and a verified-on date |
| **Per-day practical** | same, ×3 | `prac-city` = "📍 Seville — Day N"; Key Sites; Where to Eat (≤2 per day); `tip-row` watch-outs |
| **Getting There & Around** | `transport-note` | Airport, Santa Justa, Prado bus station, walking. **Airport fares blocked pending verification** |
| **Where to Stay** | `practical` | **Short.** San Lorenzo recommendation + the Santa Cruz caution **[REPO]**, then link out. Reserve the full treatment for the future accommodation guide |
| **Day Trips** | `practical` | **One paragraph.** Say plainly that three days is too short for Córdoba or Granada; link `/1-day-in-cordoba/`, `/1-day-in-cadiz/`, `/10-days-in-sevilla/` |
| **Tips & Watch-Outs** | `tip-row` | The midday rule; the weekday rule; the Giralda works caveat; accessibility |
| **At a Glance** | `itin-block` / `itin-day-row` / `itin-day-num` | Three rows: `Day 1 · The Monumental Core`, etc. |
| **FAQ** | `faq-block` / `faq-item` / `faq-q` / `faq-a` | **Maximum four, only if genuinely distinct** — see §11 |

**Not used:** `budget-grid` / `grand-total-block` (no 3-day cost evidence exists — do **not** derive one from the 10-day AUD figures) · `tour-card` (no affiliate links this run) · `badge-michelin` / `badge-bourdain` (only if a named venue genuinely carries it) · `eats-row` (belongs to the future food guide).

## 11. FAQ policy

**FAQ is not a keyword-expansion device.** Include a question only if it resolves a real planning problem the body does not already answer, and **only if it does not repeat the existing article's FAQ**, which already covers *how many days*, *Córdoba and Granada as day trips*, *booking the Alhambra*, *best time of year*, and *which neighbourhood*.

Permitted, because all four are new:

1. Is three days enough for Seville?
2. Do you need to book the Real Alcázar in advance? *(and how far ahead)*
3. Can you see Seville in three days without a car or public transport?
4. Which day of your three should fall on a Sunday?

If the body answers any of these fully, **cut it from the FAQ**. If fewer than three survive, drop the `faq-block` entirely and remove `FAQPage` from the JSON-LD.

## 12. Internal-link map

All targets verified to resolve (`repository-audit.md` §4). Descriptive anchors; no exact-match repetition; no "click here".

| From section | Target | Anchor text |
|---|---|---|
| Opening | `/10-days-in-sevilla/` | ten days using Seville as a base |
| Where to Stay | `/10-days-in-sevilla/` | why San Lorenzo, and why not Santa Cruz |
| Day Trips | `/1-day-in-cordoba/` | Córdoba is a day in itself |
| Day Trips | `/1-day-in-cadiz/` | Cádiz, out at the edge of the Atlantic |
| Getting There | `/italy-morocco-seville-4-week-itinerary/` | arriving overland from Morocco |
| Getting There | `/4-weeks-portugal-to-spain-by-rail-road/` | the wider Iberian rail routes |
| Further Reading | `/chronicles/` | the full archive |
| Further Reading | `/by-region/` | chronicles by region |

**Do not link to** `/coming-soon/` (the site already has eight such links and it is a live audit issue), or to any destination hub, country page or tag archive — **none exists**.

**Inbound links** from `/10-days-in-sevilla/`, `/1-day-in-cordoba/`, `/1-day-in-cadiz/`, `/chronicles/` and `/by-region/` should later point at the new page. Each edits an existing file and is **out of scope for this run** — propose separately.

## 13. Future siblings — mention without pre-empting

Refer to these as forthcoming **in prose only**. **Do not link them, and do not create `/coming-soon/` cards for them.**

| Future page | How this article gestures at it | What it must NOT do |
|---|---|---|
| Best Areas to Stay in Seville | One paragraph naming San Lorenzo and the Santa Cruz caution | No neighbourhood-by-neighbourhood comparison |
| One Day in Seville | Nothing, or a single clause | **No 1-day compressed variant** |
| Best Things to Do in Seville | The ~11 sights appear inside the route | No catalogue, no numbered ranking |
| Best Day Trips from Seville | One paragraph + links to the two live day-trip posts | No comparison table |
| Seville Tapas / Food Guide | ≤2 venues per day, tied to place and time | No dish glossary, no directory |

## 14. Image plan

> **⚠️ BLOCKING.** The repository contains **zero images** and **no image pipeline** — no `<figure>` pattern, no caption CSS, no `heroImage` prop, no `public/images/`. See `repository-audit.md` §3, §5a, §9. **This plan cannot be executed until an image pattern is separately approved and implemented.** This run is forbidden from modifying shared components or styles.

Eleven candidates were **visually inspected** — full table with per-image contents, orientation, draft alt text and uncertainty in research packet §25.

**Recommended set, in article order:**

| Position | File | Orientation | Subject |
|---|---|---|---|
| Hero | `Trip Photos/2025/DSC08258.jpg` | Portrait | Giralda over a brick wall and bougainvillea, from the Alcázar grounds |
| Day 1 | `Trip Photos/2025/DSC08487.jpg` *or* `Trip Photos/2023/Sevilla/DSC04708.jpg` | Landscape | Cathedral — Capilla Mayor / Retablo Mayor |
| Day 1 | `Trip Photos/2025/DSC08468.jpg` | Landscape | Archivo de Indias upper gallery |
| Day 2 | `Trip Photos/2025/DSC08457.jpg` | Landscape | Maestranza façade, "PLAZA DE TOROS" legible |
| Day 3 | `Trip Photos/2023/Sevilla/DSC04624.jpg` | Landscape | Plaza de España at golden hour, empty |
| Day 3 | `Trip Photos/2025/DSC08269.jpg` | Landscape | Pabellón Mudéjar reflected, Parque María Luisa |
| Day 3 close | `Trip Photos/2023/Sevilla/DSC04757.jpg` | Landscape | Setas walkway with the Giralda beyond |
| Closing | `Trip Photos/2025/DSC08489.jpg` | Portrait | Giralda at dusk above the rooftops |

**Alt-text direction.** Describe **only what is visibly in the frame**, name the place when identification is certain, keep to one sentence, and never restate the caption or the surrounding prose. Never assert a vantage point that the image does not prove (see #1 and the closing image, both flagged in the packet).

**Gaps with no usable inspected image:** Real Alcázar interiors (the article's most important sight), Santa Cruz streets, Mercado de Triana, Calle Betis, Torre del Oro, Casa de Pilatos, **any food image**, any human-scale streetscape. Roughly 400 frames across the two folders remain unreviewed and should be searched before any decision to publish without images. **No stock imagery is proposed.**

## 15. Factual-review requirements

Before drafting, and again immediately before publishing:

1. Re-open the Alcázar and Cathedral official pages; re-confirm hours, prices and closure days
2. **Resolve the Giralda belfry works** — open? end date? which of the two conflicting Cathedral schedules applies?
3. Confirm **Archivo de Indias Monday closure** *(the weekday rule depends on it)*
4. Confirm **Mercado de Triana Sunday closure** *(the weekday rule depends on it)*
5. Confirm Setas opening hours and TUSSAM EA fares
6. Confirm accessibility statements against each venue's own page
7. Confirm the Plaza de España access/charging proposal is still unimplemented
8. Carry a visible **"Practical details verified: YYYY-MM-DD"** line in the practical layer
9. Manually verify all eight internal links resolve — **no build-time link checking exists**

## 16. Draft acceptance criteria

A draft is acceptable only when **all** of these hold:

**Provenance**
- [ ] No first-person claim outside the §6 permitted list
- [ ] The three-day sequence is never framed as something Mitch did
- [ ] No invented hotel, price, meal, person, emotion or weather
- [ ] 2023 and 2025 photographs are never conflated or misdated

**Facts**
- [ ] Every hour, price, closure and booking rule traces to a primary source opened at draft time
- [ ] Nothing rests on a search-result snippet
- [ ] The Giralda works are addressed honestly
- [ ] A verified-on date is visible

**Search and architecture**
- [ ] One clear primary intent; does not cannibalise `/10-days-in-sevilla/` (packet §7)
- [ ] Title, H1, slug, canonical and meta are aligned and distinct
- [ ] All eight internal links resolve; none points to `/coming-soon/`
- [ ] No invented destination hub, country page or tag archive

**Usefulness**
- [ ] The answer appears in the first paragraph
- [ ] Each day is geographically coherent with no needless backtracking
- [ ] Dwell and transfer times are plausible
- [ ] What was cut from three days is stated, with reasons
- [ ] The weekday rule is present and verified

**Voice**
- [ ] Could not be rewritten for another city by swapping the name
- [ ] No influencer commands, hype, or banned AI phrasing ("nestled", "vibrant", "hidden gem", "must-visit", "bucket list", …)
- [ ] Any venue named in prose also appears in the practical layer
- [ ] No purple prose; no manufactured sensory detail

**Technical**
- [ ] File is `src/pages/3-days-in-seville/index.astro`, matching the 17-line pattern exactly
- [ ] Six `BaseLayout` props set correctly, `ogType="article"`
- [ ] Body uses **only** classes already defined in `global.css`
- [ ] JSON-LD mirrors the existing `Article` + `BreadcrumbList` shape; `FAQPage` only if a real FAQ survives §11
- [ ] `npm run build` passes with no warnings and page count rises 31 → 32
- [ ] No existing post, component, style, route, schema or config modified
- [ ] Nothing committed, pushed or deployed without instruction

## 17. QA commands

The only real gate in this repository (`repository-audit.md` §8):

```sh
npm install        # if needed
npm run build      # MUST pass, no warnings; expect 32 pages after the new post
npm run preview    # visual check of /3-days-in-seville/
```

There is **no** linter, type-check script, content validation, test suite, link checker or route check. Everything else is manual.

## 18. Blockers — why this is NOT READY TO DRAFT

| # | Blocker | Needed to clear it |
|---|---|---|
| 1 | **Giralda belfry works** — status and end date unknown; two official Cathedral schedules conflict | Re-read both official pages; contact the Cathedral if still unresolved |
| 2 | **Archivo de Indias Monday closure unverified** — the weekday rule depends on it | Open `cultura.gob.es` (TLS failure from this environment) |
| 3 | **Mercado de Triana Sunday closure unverified** — the weekday rule depends on it | Find and open a primary source |
| 4 | **No image pipeline exists** | Mitch's decision: build one (separate approved task), publish without images, or defer |
| 5 | **Structure change needs sign-off** — Day 3 replaces the pilot file's hypothesis | Mitch approves packet §19 |
| 6 | **Slug convention needs sign-off** — `seville` vs legacy `sevilla` | Mitch approves §5 |
| 7 | **2023 visit needs confirmation** — unlocks 220 photographs; misdating them is a provenance failure | Mitch confirms packet §30 items 1–2 |

Blockers 1–3 are researchable and do not need Mitch. **Blockers 4–7 require his decision.**

## 19. Constraints

- Do not invent personal experience
- Do not duplicate the cornerstone
- Do not use generic travel-blog language
- Do not change shared site systems — components, styles, routes, schemas, config — without explicit approval
- Do not add affiliate links or commercial claims in this pilot
- Do not use the FAQ for keyword expansion
- Do not rename existing pages or slugs
- Do not create `/coming-soon/` cards
- Do not source or add stock imagery

---

_No live content was created or modified. Nothing staged, committed, pushed or deployed._
