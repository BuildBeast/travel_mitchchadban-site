# Image Manifest — 3 Days in Seville

_Copied 2026-07-29 · Optimised 2026-07-29 · Encoder: **MozJPEG 0826579** (via sharp 0.34.5, `jpeg({ mozjpeg: true })`)_

Source library: `/Users/mitchchadban/Desktop/Trip Photos/2025/` — **outside the repository, unmodified.** The original photographs were read only; nothing there was moved, renamed, re-encoded or deleted. Only the copies inside `public/images/3-days-in-seville/` were replaced.

All frames are from the **September–October 2025 Seville visit** — the trip documented by `/10-days-in-sevilla/`. Camera: Sony ILCE-7M2. Files are 2048 px web exports, not full-resolution originals.

**No 2023 images are used.** That set carries an unresolved camera-clock question and is excluded from this article.

## Optimisation record

Constraints applied: preserve original pixel dimensions · no crop · no resize · MozJPEG · quality ≥ 70 · target ≤ 210 KiB (215,040 bytes) *where achievable at q ≥ 70* · never drop below q70 merely to hit the target.

Method: for each file, quality was scanned downward from 92 and the **highest** quality that met the target was chosen. Where no quality ≥ 70 met the target, q70 was kept and the file is flagged.

| # | Source | Repository filename | W | H | Original bytes | Final bytes | Reduction | Encoder | Quality | Visual QA |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `DSC08489.jpg` | `giralda-at-dusk.jpg` | 2048 | 1365 | 283,659 | **212,723** | 25.0% | MozJPEG | **73** | Pass — smooth pink-to-blue sky gradient, no banding, no halo on the tower silhouette |
| 2 | `DSC08258.jpg` | `giralda-from-alcazar-gardens.jpg` | 1365 | 2048 | 714,942 | **465,146** | 34.9% | MozJPEG | **70** | Pass — foliage and bougainvillea detail held, brickwork texture intact, no halos · ⚠️ target not reached |
| 3 | `DSC08487.jpg` | `cathedral-capilla-mayor.jpg` | 2048 | 1365 | 531,005 | **389,965** | 26.6% | MozJPEG | **70** | Pass — deep shadows not blocked, gilt vault detail intact, no colour cast · ⚠️ target not reached |
| 4 | `DSC08468.jpg` | `archivo-de-indias-gallery.jpg` | 2048 | 1365 | 448,811 | **343,743** | 23.4% | MozJPEG | **70** | Pass — chequered marble floor shows no ringing or moiré; window-light gradients smooth · ⚠️ target not reached |
| 5 | `DSC08457.jpg` | `plaza-de-toros-maestranza-facade.jpg` | 2048 | 1365 | 326,431 | **225,361** | 31.0% | MozJPEG | **70** | Pass — clean sky gradient, white stucco unblotched, carved lettering crisp · ⚠️ target not reached |
| 6 | `DSC08264.jpg` | `plaza-de-espana-bridges.jpg` | 2048 | 1365 | 599,735 | **417,162** | 30.4% | MozJPEG | **70** | Pass — dense azulejo tilework preserved, no ringing on balustrades, no shift on ochre brick · ⚠️ target not reached |
| 7 | `DSC08386.jpg` | `casa-de-pilatos-garden-loggia.jpg` | 2048 | 1365 | 523,180 | **371,520** | 29.0% | MozJPEG | **70** | Pass — dark foliage retains separation, fountain water detail intact, roses not smeared · ⚠️ target not reached |

**Totals: 3,427,763 → 2,425,620 bytes — a 29.2% reduction (3.27 MB → 2.31 MB).**
**Pixel dimensions verified unchanged on all 7 files after encoding (`sips`).** No crop, no resize.

### Files that could not reach 210 KiB

Six of the seven (all but `giralda-at-dusk.jpg`) could not reach 210 KiB at quality 70 or above, so **q70 was kept and the target was not forced**, exactly as instructed. The reason is intrinsic: these are already-compressed 2048 px exports of highly detailed scenes — tilework, foliage, carved stone, dense archival shelving — and MozJPEG at q70 with trellis quantisation is close to the practical floor for that content at full dimensions. Reaching 210 KiB would require either resizing below 2048 px or dropping under q70, both prohibited.

Options if the byte budget later matters more than fidelity, each needing separate authorisation: serve a smaller rendition for narrow viewports; add WebP/AVIF alternates; or reduce the long edge to roughly 1600 px.

Mitigating factor already in place: only the lead image loads eagerly. The other six are `loading="lazy"`, so a reader who does not scroll fetches about 210 KB rather than 2.31 MB.

## Provenance and visible content

| Repository filename | Visible subject (confirmed by inspection, never from filename) | Capture (camera clock, local) | Used at |
|---|---|---|---|
| `giralda-at-dusk.jpg` | The Giralda gold-lit above a row of pale buildings; a bank of pink cloud on deep blue; wrought-iron street lamps | 4 Oct 2025, 20:15 | Lead image + Open Graph |
| `giralda-from-alcazar-gardens.jpg` | The Giralda's belfry beyond a weathered brick wall with a low arch; date palm, cypress, magenta bougainvillea | 29 Sep 2025, 11:20 | Day 1, portrait variant |
| `cathedral-capilla-mayor.jpg` | Seville Cathedral interior: the Capilla Mayor, gilded retablo, Gothic vaults, clustered piers, two crimson heraldic banners | 4 Oct 2025, 16:09 | Day 1 |
| `archivo-de-indias-gallery.jpg` | Archivo General de Indias upper gallery: barrel-vaulted coffered ceiling, mahogany shelving of uniform document boxes, polished chequered marble floor | 4 Oct 2025, 13:42 | Day 1 |
| `plaza-de-toros-maestranza-facade.jpg` | Principal façade of the Plaza de Toros de la Real Maestranza; **"PLAZA DE TOROS" carved in the lintel** | 4 Oct 2025, 12:48 | Day 2 (its only image) |
| `plaza-de-espana-bridges.jpg` | Plaza de España: tiled balustraded bridges over the canal, ornate lampposts, curved arcade and tower, roughly twenty visitors | 29 Sep 2025, 17:38 | Day 3 |
| `casa-de-pilatos-garden-loggia.jpg` | Renaissance garden loggia of three arches with Roman busts in roundels; clipped standard trees; octagonal tiled fountain; azulejo-backed marble benches; roses | 2 Oct 2025, 10:21 | Day 3 |

### Identification confidence

| File | Confidence | Handling in the article |
|---|---|---|
| `plaza-de-toros-maestranza-facade.jpg` | Certain — the building names itself | Named freely |
| `plaza-de-espana-bridges.jpg`, `cathedral-capilla-mayor.jpg`, `archivo-de-indias-gallery.jpg` | High — unique, unmistakable architecture | Named freely |
| `casa-de-pilatos-garden-loggia.jpg` | High — a loggia with Roman busts and azulejo benches is the Casa de Pilatos garden, and the frame sits in the 2 Oct session the existing chronicle assigns to Casa de Pilatos | Named freely |
| `giralda-from-alcazar-gardens.jpg` | Subject certain; **vantage inferred** from the 10:18–11:51 Alcázar session | Caption says "from inside the Alcázar grounds"; the alt text describes only what is in the frame |
| `giralda-at-dusk.jpg` | Subject certain; **vantage unknown** | Caption names the subject only, never the location |

## Not used

| Candidate | Reason |
|---|---|
| `DSC08269.jpg` — Pabellón Mudéjar, Parque de María Luisa | A good frame, but eight images was one more than the article needed. Deleted from the repository rather than left unreferenced; still available in the source library |
| `DSC08256.jpg` — Virgen de los Navegantes retablo, Alcázar | Rendered black and white; would clash with every other image |
| `DSC08483.jpg` — a phone photographing the Tomb of Columbus | A comment on tourism, not an illustration of the route |
| `DSC08261.jpg` — blackbird · `DSC08391.jpg` — cycad cone | No editorial function |
| `DSC08376.jpg` — man in a Real Betis cap at a stall | Close portrait of an identifiable private individual; location not determinable |
| `2023/Sevilla/*` | Excluded pending resolution of the camera-clock question |

## Coverage gaps

No confidently identified 2025 image exists for **Triana** (Mercado de Triana, Centro Cerámica Triana, Calle Betis), the **Torre del Oro**, **Barrio de Santa Cruz**, the **Setas de Sevilla**, **Real Alcázar interiors**, or **any food**. Day 2 therefore carries a single image, and nothing was invented or loosely attributed to fill the gap. Roughly 400 frames across the two libraries remain unreviewed. **No stock imagery was sourced or proposed.**

## Convention for future chronicles

```
public/images/<article-slug>/<descriptive-kebab-name>.jpg
docs/blog-production/research/<article-slug>-image-manifest.md
```

- Copy only the images an article actually uses; delete any that fall out of the final edit.
- Inspect every image visually before writing alt text or a caption.
- Optimise with MozJPEG at the highest quality that meets the size target, never below q70, never resizing or cropping without authorisation.
- Record source, dimensions, before/after bytes, quality and visual-QA result here.
- Name files for their visible subject, never for the camera's serial number.
- Render through `src/components/chronicle/Figure.astro`, which requires true `width`/`height`, lazy-loads by default, and offers a `portrait` variant so tall frames stay constrained.
- These remain **static, pre-optimised JPEGs**. No Astro image transformation is applied to them.
