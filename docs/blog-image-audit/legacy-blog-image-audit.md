# Legacy blog image audit

Branch: `feature/legacy-blog-images` (separate worktree at
`~/Desktop/there-and-back-again-blog-images`). Working tree was clean at
`0e372f6` before this work started.

Source photo library: `/Users/mitchchadban/Desktop/Trip Photos` — 5,645 JPEGs,
treated as strictly read-only. Nothing in it was moved, renamed, edited or
deleted.

## Library map

The library is sorted by year and destination, but two folders hold more than
their name suggests. Both were only discovered by looking at the photographs —
filenames are all camera-generated (`DSC…`, `APC_…`) and carry no information.

| Folder | Actually contains |
|---|---|
| `2024/Porto` (190) | Porto, **plus Santiago de Compostela and the Douro valley** |
| `2024/Lisbon` (161) | Lisbon, **plus Sintra and Cascais** |
| `2024/Barcelona` (183) | Barcelona, **plus Girona, Figueres, Tarragona and Torre Bellesguard** |
| `2025` (961, unsorted) | Bologna, San Marino, Rome, Marrakech, Rabat, Fez, Tangier, Córdoba, Cádiz, Seville |
| `2019`, `2022`, `2023` | Trips with no corresponding published article (see note below) |

**Year matching.** Every Iberian article is labelled *Summer 2024* in its route
strip, so only the `2024/…` folders were used for them. The large `2023`
folders (Barcelona 476, Madrid 376, Sevilla, Granada, Ronda, Bilbao, Salamanca)
are a different trip and were deliberately left alone — using them would have
put 2023 photographs in an article that tells the reader it is 2024.

## Article status

| Route | Status | Images | Notes |
|---|---|---|---|
| `/2-days-in-caceres/` | IMAGE-FREE, IMPLEMENTED | 5 | |
| `/2-days-in-evora/` | IMAGE-FREE, IMPLEMENTED | 5 | |
| `/4-days-in-lagos-the-coast-of-golden-cliffs/` | IMAGE-FREE, IMPLEMENTED | 5 | |
| `/4-days-in-mondim-de-basto/` | IMAGE-FREE, IMPLEMENTED | 3 | Only 7 source frames exist for this destination |
| `/5-days-in-porto-the-city-the-river-built/` | IMAGE-FREE, IMPLEMENTED | 6 | |
| `/1-day-in-santiago-de-compostela/` | IMAGE-FREE, IMPLEMENTED | 5 | Source frames found inside `2024/Porto` |
| `/douro-valley-day-trip/` | IMAGE-FREE, IMPLEMENTED | 5 | Source frames found inside `2024/Porto` |
| `/5-days-in-lisbon-itinerary/` | IMAGE-FREE, IMPLEMENTED | 6 | |
| `/1-day-in-sintra-the-mountain-of-romantic-follies/` | IMAGE-FREE, IMPLEMENTED | 5 | Source frames found inside `2024/Lisbon` |
| `/4-days-in-valencia-itinerary/` | IMAGE-FREE, IMPLEMENTED | 6 | |
| `/7-days-in-barcelona/` | IMAGE-FREE, IMPLEMENTED | 6 | |
| `/1-day-in-figueres-girona/` | IMAGE-FREE, IMPLEMENTED | 5 | Source frames found inside `2024/Barcelona` |
| `/1-day-in-tarragona-sitges/` | IMAGE-FREE, IMPLEMENTED | 4 | Tarragona only — **no Sitges photographs exist in the library** |
| `/3-days-in-madrid-the-capital-at-full-volume/` | IMAGE-FREE, IMPLEMENTED | 3 | Thin: see report |
| `/4-days-in-bologna/` | IMAGE-FREE, IMPLEMENTED | 5 | |
| `/six-days-in-rome-at-the-table-of-empires/` | IMAGE-FREE, IMPLEMENTED | 5 | |
| `/san-marino-day-trip-guide/` | IMAGE-FREE, IMPLEMENTED | 4 | |
| `/2-days-in-fez-itinerary/` | IMAGE-FREE, IMPLEMENTED | 3 | Only 3 usable section anchors in this article's markup |
| `/3-days-in-tangier-at-the-edge-of-two-worlds/` | IMAGE-FREE, IMPLEMENTED | 5 | Tangier only — no Chefchaouen photographs confirmed |
| `/the-imperial-circuit-morocco-in-14-days/` | IMAGE-FREE, IMPLEMENTED | 5 | |
| `/italy-morocco-seville-4-week-itinerary/` | IMAGE-FREE, IMPLEMENTED | 7 | Seville chapter deliberately left unillustrated |
| `/4-weeks-portugal-to-spain-by-rail-road/` | IMAGE-FREE, IMPLEMENTED | 6 | All six frames unused by any other article |
| `/1-day-in-colonia-guell/` | IMAGE-FREE, NO VERIFIED SOURCE PHOTOS | 0 | See "Colònia Güell" below |
| `/1-day-in-cordoba/` | SKIPPED, PROVENANCE UNCERTAIN | 0 | Owned in practice by the active Seville batch — see below |
| `/1-day-in-cadiz/` | SKIPPED, PROVENANCE UNCERTAIN | 0 | Same |
| `/3-days-in-seville/` | EXCLUDED, ACTIVE SEVILLE WORK | 7 (pre-existing) | Not touched |
| `/10-days-in-sevilla/` | EXCLUDED, ACTIVE SEVILLE WORK | 0 | Not touched |
| `/best-areas-to-stay-in-seville/` and the other four new cluster routes | EXCLUDED, ACTIVE SEVILLE WORK | — | Do not exist on this branch |
| `/chronicles/`, `/by-region/`, `/about-the-traveller/`, `/coming-soon/`, `/` | Not a destination article | — | Not touched |

No published article on this branch had any images before this batch except
`/3-days-in-seville/`, which the other session had already illustrated.

## Colònia Güell

`/1-day-in-colonia-guell/` is recorded as **NO VERIFIED SOURCE PHOTOS**.

`2024/Barcelona` contains a run of Gaudí interiors that a filename- or
folder-based process would very plausibly have assigned to this article: a
crypt-like brick vault, catenary arches, flower-shaped stained glass, a
crenellated tower among cypresses. On inspection they are **Torre Bellesguard**,
not the Colònia Güell crypt — the giveaway is the stepped-brick attic and the
tower's neo-Gothic spire. The Colònia Güell crypt (leaning basalt columns, the
half-built church at Santa Coloma de Cervelló) does not appear anywhere in the
library.

Those Bellesguard frames were used instead in `/7-days-in-barcelona/`, whose
Chapter II is explicitly "Gaudí across the city, from the grand to the
overlooked", which is exactly what Bellesguard is.

## Córdoba and Cádiz

Both articles are image-free and **do** have verified source photographs in the
unsorted `2025` folder — the Mezquita's double arches, the Puente Romano, and
the twin-towered west front of Cádiz cathedral are all unmistakable.

They were still skipped. The concurrent Seville session is building
`/best-day-trips-from-seville/`, and its image manifest already claims the same
source frames (`DSC08318`, `DSC08328`, `DSC08340`, `DSC08371`) and explicitly
rejects `DSC08321`–`DSC08327` as near-duplicates. Illustrating these two
articles from the same run would either reuse that session's exact frames or
publish its rejected near-duplicates, and would put the same subjects on two
routes at once — which is the cannibalisation problem that session is already
tracking in `seville-cluster-cannibalisation.md`.

This is a scoping decision, not a lack of material. Once the Seville cluster
lands, both articles can be illustrated from the remaining Córdoba/Cádiz frames
in one short follow-up run.
