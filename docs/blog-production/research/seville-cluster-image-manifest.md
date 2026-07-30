# Image Manifest — Seville Cluster (five articles)

_Copied and optimised 2026-07-29 · Encoder: **MozJPEG 0826579** (via sharp 0.34.5, `jpeg({ mozjpeg: true })`)_

Source library: `/Users/mitchchadban/Desktop/Trip Photos/2025/` — **outside the repository, read only.** Nothing there was moved, renamed, re-encoded or deleted. All 24 frames are from the **26 September – 4 October 2025** Seville window (camera: Sony ILCE-7M2, 2048 px web exports, not full-resolution originals) — the visit documented by [`/10-days-in-sevilla/`](../../../src/pages/10-days-in-sevilla/index.astro).

**No 2023 image is used.** That set (220 Seville frames, 93 Ronda, 211 Granada) remains excluded pending the unresolved camera-clock question recorded in [`seville-3-days-image-manifest.md`](./seville-3-days-image-manifest.md). The cost is stated openly in the day-trips research note: Granada and Ronda have no photograph.

**No frame is reused from `/3-days-in-seville/`.** All 24 are new to the site.

## Method

Constraints applied: preserve original pixel dimensions · no crop · no resize · MozJPEG · quality ≥ 70 · target ≤ 210 KiB (215,040 bytes) *where achievable at q ≥ 70* · never drop below q70 to hit the target.

Quality was found by binary search over `[70, 92]` for the **highest** quality meeting the target (JPEG size is monotonic in quality, so this returns the same answer as a linear downward scan in ~5 encodes instead of ~23). Where no quality ≥ 70 met the target, q70 was kept and the file is flagged. Output dimensions were re-read from every written file with `sharp().metadata()` and asserted equal to the source; the script throws on any mismatch. It did not throw.

## Optimisation record

### `/best-areas-to-stay-in-seville/`

| Source | Repository filename | W×H | Original | Final | Reduction | Quality | Visual QA at 1:1 |
|---|---|---|---|---|---|---|---|
| `DSC08397.jpg` | `giralda-above-the-rooftops.jpg` | 2048×1365 | 330,432 | **233,170** | 29.4% | **70** | Pass — smooth blue-to-cream sky gradient, no banding, no halo on the weathervane · ⚠️ target not reached |
| `DSC08488.jpg` | `alameda-de-hercules-columns.jpg` | 1365×2048 | 577,897 | **393,703** | 31.9% | 70 | Pass — plane-tree foliage holds separation, weathered stone texture intact · ⚠️ |
| `DSC08217.jpg` | `quiet-street-at-first-light.jpg` | 1365×2048 | 338,090 | **249,103** | 26.3% | 70 | Pass — backlit haze smooth, iron balcony detail crisp · ⚠️ |
| `DSC08456.jpg` | `capilla-del-carmen-triana.jpg` | 1365×2048 | 425,022 | **285,117** | 32.9% | 70 | Pass — dense azulejo pattern preserved, no ringing on the brickwork · ⚠️ |
| `DSC08459.jpg` | `torre-del-oro-from-el-arenal.jpg` | 1365×2048 | 575,062 | **382,947** | 33.4% | 70 | Pass — palm fronds against deep blue show no ringing · ⚠️ |

### `/one-day-in-seville/`

| Source | Repository filename | W×H | Original | Final | Reduction | Quality | Visual QA at 1:1 |
|---|---|---|---|---|---|---|---|
| `DSC08267.jpg` | `plaza-de-espana-from-the-arcade.jpg` | 2048×1365 | 618,202 | **438,226** | 29.1% | 70 | Pass — tilework and ochre brick unblotched, no shift in the canal water · ⚠️ |
| `DSC08259.jpg` | `alcazar-gardens-from-above.jpg` | 1365×2048 | 824,013 | **537,948** | 34.7% | 70 | Pass — massed foliage retains separation, clipped hedge edges clean · ⚠️ |
| `DSC08476.jpg` | `cathedral-retablo-mayor.jpg` | 1365×2048 | 1,259,072 | **817,376** | 35.1% | 70 | Pass — the hardest frame in the set; gilt relief detail and polychrome figures hold, no smearing in the deep gold · ⚠️ |
| `DSC08473.jpg` | `archivo-de-indias-inscription.jpg` | 2048×1365 | 581,076 | **427,342** | 26.5% | 70 | Pass — marble veining smooth, gilded lettering edges sharp · ⚠️ |

### `/best-things-to-do-in-seville/`

| Source | Repository filename | W×H | Original | Final | Reduction | Quality | Visual QA at 1:1 |
|---|---|---|---|---|---|---|---|
| `DSC08269.jpg` | `pabellon-mudejar-reflected.jpg` | 2048×1365 | 561,503 | **381,478** | 32.1% | 70 | Pass — reflection detail and lily pads intact, no posterisation in the still water · ⚠️ |
| `DSC08379.jpg` | `casa-de-pilatos-patio-principal.jpg` | 1365×2048 | 412,622 | **315,452** | 23.5% | 70 | Pass — plaster tracery and azulejo dado crisp, marble shadow gradients smooth · ⚠️ |
| `DSC08425.jpg` | `zurbaran-crucifixion-bellas-artes.jpg` | 1365×2048 | 521,473 | **363,214** | 30.3% | 70 | Pass — frescoed dome detail preserved, dark canvas ground not blocked · ⚠️ |
| `DSC08433.jpg` | `flamenco-on-a-dark-stage.jpg` | 2048×1365 | 99,006 | **76,753** | 22.5% | **92** | Pass — the only frame that met the target with headroom. Shadow falloff to black is clean, no blocking; lit figures hold detail |
| `DSC08435.jpg` | `guadalquivir-at-sunset.jpg` | 1365×2048 | 395,520 | **289,256** | 26.9% | 70 | Pass — violet-to-orange sky gradient smooth, thin cloud streaks and crane silhouettes clean · ⚠️ |

### `/best-day-trips-from-seville/`

| Source | Repository filename | W×H | Original | Final | Reduction | Quality | Visual QA at 1:1 |
|---|---|---|---|---|---|---|---|
| `DSC08318.jpg` | `mezquita-arch-within-arch.jpg` | 2048×1365 | 250,009 | **208,995** | 16.4% | **79** | Pass — polylobed plasterwork crisp, deep shadow retains separation, no ringing at the light shafts |
| `DSC08328.jpg` | `cordoba-puente-romano.jpg` | 2048×1365 | 637,092 | **432,374** | 32.1% | 70 | Pass — ashlar masonry texture held, riverbank reeds not smeared · ⚠️ |
| `DSC08340.jpg` | `cadiz-cathedral-facade.jpg` | 2048×1365 | 541,301 | **386,729** | 28.6% | 70 | Pass — limestone tonal transition (shade line across the façade) smooth, carved detail intact · ⚠️ |
| `DSC08371.jpg` | `cadiz-la-caleta.jpg` | 2048×1365 | 367,820 | **261,626** | 28.9% | 70 | Pass — flat sky and turquoise water show no banding, sand texture preserved · ⚠️ |
| `DSC08445.jpg` | `triana-tiled-excursion-signs.jpg` | 2048×1365 | 675,009 | **473,272** | 29.9% | 70 | Pass — large flat yellow fields clean, blue lettering edges crisp with no ringing, the painted medallion's fine work intact · ⚠️ |

### `/seville-tapas-food-guide/`

| Source | Repository filename | W×H | Original | Final | Reduction | Quality | Visual QA at 1:1 |
|---|---|---|---|---|---|---|---|
| `DSC08453.jpg` | `jamon-counter-mercado-de-triana.jpg` | 2048×1365 | 545,933 | **400,651** | 26.6% | 70 | Pass — magenta lighting preserved without smearing; the small price text and denomination chart remain legible · ⚠️ |
| `DSC08440.jpg` | `mercado-de-triana-entrance.jpg` | 2048×1365 | 453,003 | **326,671** | 27.9% | 70 | Pass — white tile field clean, blue lettering sharp, deep sky ungraded · ⚠️ |
| `DSC08448.jpg` | `fruteria-mercado-de-triana.jpg` | 2048×1365 | 544,243 | **391,175** | 28.1% | 70 | Pass — saturated produce colour holds without bleeding; handwritten cards legible · ⚠️ |
| `DSC08449.jpg` | `mercado-de-triana-morning-shoppers.jpg` | 2048×1365 | 393,151 | **284,422** | 27.7% | 70 | Pass — mixed fluorescent/daylight balance stable, no colour cast shift · ⚠️ |
| `DSC08396.jpg` | `el-disparate-alameda.jpg` | 1365×2048 | 428,207 | **305,570** | 28.6% | 70 | Pass — cream wall gradients smooth, hand-painted lettering and cactus spines crisp · ⚠️ |

**Totals: 12,354,758 → 8,662,570 bytes — a 29.9% reduction (11.78 MB → 8.26 MB) across 24 files.**
**Pixel dimensions verified unchanged on all 24 files after encoding. No crop, no resize.**

### Files that could not reach 210 KiB

**22 of 24.** Only `flamenco-on-a-dark-stage.jpg` (q92, a mostly-black frame) and `mezquita-arch-within-arch.jpg` (q79) met the target. For the rest, q70 was kept and the target was **not forced** — the reason is the same as for the seven images in `/3-days-in-seville/`: these are already-compressed 2048 px exports of high-detail scenes (tilework, foliage, gilt relief, market clutter, carved stone), and MozJPEG q70 with trellis quantisation is close to the practical floor for that content at full dimensions. Reaching 210 KiB would require resizing below 2048 px or dropping under q70, both prohibited.

Mitigation already in place: **one eager image per page, everything else `loading="lazy"`.** A reader who does not scroll fetches between 77 KB and 438 KB depending on the article, not the article's full weight. Per-article totals:

| Article | Images | Total bytes | Eager (lead) |
|---|---|---|---|
| `/best-areas-to-stay-in-seville/` | 5 | 1,544,040 | 233,170 |
| `/one-day-in-seville/` | 4 | 2,220,892 | 438,226 |
| `/best-things-to-do-in-seville/` | 5 | 1,426,153 | 381,478 |
| `/best-day-trips-from-seville/` | 5 | 1,762,996 | 208,995 |
| `/seville-tapas-food-guide/` | 5 | 1,708,489 | 400,651 |

Options if the byte budget later matters more than fidelity, each needing separate authorisation: serve a smaller rendition for narrow viewports; add WebP/AVIF alternates; or reduce the long edge to ~1600 px. `one-day-in-seville` is the article that would benefit most — `cathedral-retablo-mayor.jpg` alone is 817 KB.

## Provenance and visible content

Every frame below was **opened and visually inspected at full size before selection**, and its alt text and caption written from what is in the frame. No image was identified from its filename.

| Repository filename | Visible subject (confirmed by inspection) | Capture (camera clock, local) |
|---|---|---|
| `giralda-above-the-rooftops.jpg` | The Giralda's belfry gold-lit above the roofline of a large early-20th-century civic block; Andalusian, Spanish and EU flags; a half-moon in a pale sky; ornate iron street lamps | 2 Oct 2025, 19:24 |
| `alameda-de-hercules-columns.jpg` | The two Roman columns of the Alameda de Hércules carrying statues of Hercules and Julius Caesar, inside iron railings; plane trees turning; café tables and passers-by | 4 Oct 2025, 20:02 |
| `quiet-street-at-first-light.jpg` | A narrow residential Seville street, empty, low sun down its length; whitewashed and ochre houses, wrought-iron balconies, hanging street lamps, a single narrow pavement | 27 Sep 2025, 09:21 |
| `capilla-del-carmen-triana.jpg` | The Capilla de Nuestra Señora del Carmen at the Triana end of the Puente de Isabel II: brick drum with a glazed azulejo dome dated **AÑO 1927**, and its tiled octagonal bell tower | 4 Oct 2025, 12:34 |
| `torre-del-oro-from-el-arenal.jpg` | The Torre del Oro from the landward side among palms, Spanish flag flying, brick paving and clipped planting in the foreground | 4 Oct 2025, 12:56 |
| `plaza-de-espana-from-the-arcade.jpg` | Plaza de España from an elevated vantage on the arcade: north tower with the Spanish flag, tiled arcade and roof, the canal with a rowing boat and a balustraded tiled bridge, several dozen visitors on the paving | 29 Sep 2025, 17:45 |
| `alcazar-gardens-from-above.jpg` | The Real Alcázar gardens from above: clipped box parterres in a grid, tall Canary palms, an ochre garden pavilion, a small stone fountain, scattered visitors | 29 Sep 2025, 11:25 |
| `cathedral-retablo-mayor.jpg` | The Retablo Mayor of Seville Cathedral: the vast gilded and polychrome altarpiece in tiers of carved scenes, a coffered gold canopy above, silver candlesticks and the silver frontal below | 4 Oct 2025, 15:50 |
| `archivo-de-indias-inscription.jpg` | The words **ARCHIVO GENERAL DE INDIAS** in gilded letters on a marble tablet framed by fluted marble columns and a dark marble surround | 4 Oct 2025, 13:47 |
| `pabellon-mudejar-reflected.jpg` | The Pabellón Mudéjar in Parque de María Luisa mirrored in its lily-padded pool; two ornate iron lamp standards; a *Culturas del mar* banner; the building's own **PABELLÓN MUDÉJAR — MUSEO DE ARTES Y COSTUMBRES POPULARES** sign | 29 Sep 2025, 18:07 |
| `casa-de-pilatos-patio-principal.jpg` | The principal courtyard of Casa de Pilatos: Mudéjar plaster arcading, Gothic tracery balustrade above, azulejo dado, Roman busts in roundels, a standing Roman female statue, and the marble fountain with dolphins under a Janus bust; chequered marble paving | 2 Oct 2025, 10:14 |
| `zurbaran-crucifixion-bellas-artes.jpg` | Zurbarán's *Cristo crucificado* hung alone on a partition wall in the Museo de Bellas Artes, beneath the former convent church's frescoed dome and the Carthusian arms; three visitors photographing it | 3 Oct 2025, 12:16 |
| `flamenco-on-a-dark-stage.jpg` | Six flamenco performers on a dark stage in blue and red light: a guitarist in shadow at left, a woman standing in a red and gold dress, a seated group around a small table, a second guitarist | 3 Oct 2025, 19:43 |
| `guadalquivir-at-sunset.jpg` | The Guadalquivir at sunset from above: a lone kayaker and a group of four on violet water, the far bank in silhouette with construction cranes and a lit modern building, orange sky | 3 Oct 2025, 20:27 |
| `mezquita-arch-within-arch.jpg` | Inside the Mezquita-Catedral of Córdoba: a Christian Gothic pointed arch framing the interlacing polylobed Islamic arches of the Villaviciosa chapel, with a Crucifixion below and stained-glass colour thrown across the floor | 30 Sep 2025, 14:04 |
| `cordoba-puente-romano.jpg` | The Puente Romano at Córdoba in low afternoon light, the Torre de la Calahorra at its far end, the shallow Guadalquivir with weirs and reed islands, visitors along the parapet | 30 Sep 2025, 16:59 |
| `cadiz-cathedral-facade.jpg` | The twin-towered limestone west front of Cádiz Cathedral, the shade line halfway down it, palm fronds across the upper frame, a café umbrella at lower left | 1 Oct 2025, 10:06 |
| `cadiz-la-caleta.jpg` | La Caleta beach, Cádiz: the domed *balneario* building on its piers, the breakwater running out to the Castillo de San Sebastián, turquoise Atlantic, bathers and sunbathers | 1 Oct 2025, 12:39 |
| `triana-tiled-excursion-signs.jpg` | A wall of Triana trade azulejos at the Centro Cerámica Triana, including a pre-war coach advertisement — **"EXCURSION DE SIX JOURS EN AUTOCAR · CORDOBA, SEVILLA, GRANADA · DEPART DE MADRID: TOUS LES MARDIS ET SAMEDIS"** — plus shop signs, a Singer sewing-machine roundel, a painted Virgin medallion, a 1966 inauguration plaque, and *Cerámica Sta Ana · Sevilla-Triana* maker marks | 4 Oct 2025, 11:18 |
| `jamon-counter-mercado-de-triana.jpg` | A charcuterie counter in the Mercado de Triana: Cinco Jotas ibérico hams hanging in netting, chorizo and morcilla, a *Queso Payoyo* poster, a **Jamones y Paletas Ibéricos** chart setting out Bellota 100% / Bellota / Cebo de Campo / Cebo, euro price tags, two customers at the glass and an assistant behind it | 4 Oct 2025, 11:40 |
| `mercado-de-triana-entrance.jpg` | The azulejo gable sign **"Bienvenidos al Mercado de Triana"** above the market's brick front and shuttered gate, a street lamp's shadow thrown across it, deep blue sky | 4 Oct 2025, 10:52 |
| `fruteria-mercado-de-triana.jpg` | A greengrocer's stall in the Mercado de Triana: garlic, spring onions, leeks, pineapples, bananas and cauliflower hanging above crates of citrus, peppers and beans; a stallholder reaching across; handwritten *Frutas* price cards | 4 Oct 2025, 11:32 |
| `mercado-de-triana-morning-shoppers.jpg` | A Mercado de Triana aisle mid-morning: mangos, avocados marked *aguacate extra ecológico Málaga 3'95*, radishes, fennel and berry punnets, with two shoppers of retirement age at the counter | 4 Oct 2025, 11:34 |
| `el-disparate-alameda.jpg` | The corner of *el Disparate* on the Alameda de Hércules: cream walls with the name hand-painted large, a round navy sign, a tall cactus in a pot, bougainvillea, and one laid pavement table | 2 Oct 2025, 14:15 |

### Identification confidence

| File(s) | Confidence | Handling in the article |
|---|---|---|
| `archivo-de-indias-inscription`, `mercado-de-triana-entrance`, `pabellon-mudejar-reflected`, `triana-tiled-excursion-signs`, `el-disparate-alameda`, `capilla-del-carmen-triana` | **Certain** — each names or dates itself in the frame | Named freely |
| `cathedral-retablo-mayor`, `plaza-de-espana-from-the-arcade`, `alameda-de-hercules-columns`, `torre-del-oro-from-el-arenal`, `casa-de-pilatos-patio-principal`, `mezquita-arch-within-arch`, `cordoba-puente-romano`, `cadiz-cathedral-facade`, `cadiz-la-caleta` | **High** — unique, unmistakable architecture, and each sits in a session the existing chronicles already assign to that place | Named freely |
| `alcazar-gardens-from-above` | **High** — subject certain; sits inside the 10:18–11:51 Alcázar session on 29 Sep | Named freely |
| `zurbaran-crucifixion-bellas-artes` | **High** — subject and setting certain (a Carthusian-armed convent dome over a hung Zurbarán is the Museo de Bellas Artes); the specific gallery is not stated | Museum named; gallery not |
| `fruteria-`, `jamon-counter-`, `mercado-de-triana-morning-shoppers` | **High** — all inside the 10:52–11:40 Mercado de Triana session, and the interior matches the entrance frame | Market named; individual stalls not named |
| `flamenco-on-a-dark-stage` | Subject certain; **venue unknown** — the record shows two flamenco performances that evening and does not establish which | Caption says "a tablao stage"; **no venue named** |
| `guadalquivir-at-sunset` | Subject certain; **exact bridge and bank inferred** | Caption names the river only |
| `quiet-street-at-first-light` | Subject certain; **district not determinable** | Caption says "a street in Seville", never a neighbourhood |

## Considered and rejected

| Candidate | Reason |
|---|---|
| `DSC08376` — man in a Real Betis cap at a stall | Already rejected for `/3-days-in-seville/`: close portrait of an identifiable private individual, location indeterminable. Rejection stands |
| `DSC08483` — a hand holding a phone photographing the Tomb of Columbus | Wry, but a comment on tourism rather than an illustration of any of these five arguments |
| `DSC08474` — street scene including a person wearing a Palestinian flag | Identifiable individuals in a political context; not the subject of any of these articles |
| `DSC08250`–`DSC08253` — a religious procession with a *paso* and men in suits at close range | Identifiable private individuals at close range in a devotional setting |
| `DSC08256` — *Virgen de los Navegantes* retablo, Alcázar | Rendered black and white; would clash with every other image |
| `DSC08417` — a Real Betis *Federación de Peñas* banner on a table | Interesting, but supports no argument any of these five articles makes |
| `DSC08428`–`DSC08430` — further flamenco frames | Near-duplicates of the frame chosen; one flamenco image is enough |
| `DSC08325`–`DSC08327`, `DSC08321`–`DSC08324` — further Córdoba street and Mezquita frames | Near-duplicates; the two Córdoba frames chosen carry the whole argument |
| `DSC08452` — butcher's sign under magenta light | Near-duplicate of the charcuterie frame already chosen |
| `2023/Sevilla/*`, `2023/Ronda/*`, `2023/Granada/*` | Excluded pending the camera-clock question. Costs the day-trips article its Granada and Ronda images |

## Coverage gaps

- **No food-on-a-plate photograph exists anywhere in the library.** The food guide therefore has no dish photography and none was sourced. This is the largest single gap in the cluster.
- **No image exists for Jerez de la Frontera, Itálica, Carmona, Ronda or Granada** usable under the 2023 exclusion. Those sections of the day-trips article run without figures.
- No image of the Setas de Sevilla walkway, Calle Betis, Barrio de Santa Cruz street level, or Alcázar interiors in the 2025 set.
- **No stock imagery was sourced or proposed.**

## Convention followed

```
public/images/<article-slug>/<descriptive-kebab-name>.jpg
docs/blog-production/research/<slug-or-cluster>-image-manifest.md
```

All 24 files are referenced by exactly one article each. **No file was left unreferenced**, and no article references a file that is not on disk — both asserted by the link/asset audit recorded in the batch report. Rendered through `src/components/chronicle/Figure.astro` with true `width`/`height`; one `priority` image per page, everything else lazy. These remain static, pre-optimised JPEGs; no Astro image transformation is applied.
