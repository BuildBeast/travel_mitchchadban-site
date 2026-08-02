# Responsive-image rollout manifest

Generated from the production build. Every row is a rendered article figure:
what it is, which architecture sizes it, and which derivative files must exist
beside its original. Use it to regenerate derivatives or to re-audit coverage.

Regenerate the files for any row with:

    npm run images:responsive -- <original path>

Verify every row with:

    npm run images:responsive:check -- $(cat <list of originals>)
    npm run build && npm run images:responsive:markup

## Architecture

Candidate ladder: **480w, 768w, 1200w, 1600w**, plus the original at its true
intrinsic width as the largest candidate and the `src` fallback. A width is
emitted only when strictly narrower than the source, so nothing is upscaled.
Encoding is MozJPEG quality 70, progressive, no crop/rotation/sharpening.
Derivatives are committed to the repository; nothing is generated at build time.

`sizes` strings live in `src/lib/responsive-image-config.mjs` and were derived by
measuring rendered figure widths in Chrome at 390 / 768 / 1024 / 1440 CSS px.

| architecture | orientation | sizes constant | cap |
|---|---|---|---|
| modern Chronicle (Figure.astro) | landscape | `SIZES_MODERN_WIDE` | 980px |
| modern Chronicle (Figure.astro) | portrait | `SIZES_MODERN_PORTRAIT` | 560px |
| legacy with .post-body | landscape | `SIZES_LEGACY_POSTBODY_LANDSCAPE` | 1100px |
| legacy with .post-body | portrait | `SIZES_LEGACY_POSTBODY_PORTRAIT` | 560px |
| legacy using legacy-gutter.css | landscape | `SIZES_LEGACY_GUTTER_LANDSCAPE` | 1100px |
| legacy using legacy-gutter.css | portrait | `SIZES_LEGACY_GUTTER_PORTRAIT` | 560px |

## Totals

| metric | value |
|---|---|
| rendered article figures | 140 |
| unique original files | 140 |
| routes carrying figures | 28 |
| derivative files | 494 |
| legacy-gutter/landscape | 43 |
| legacy-gutter/portrait | 32 |
| legacy-postbody/landscape | 14 |
| legacy-postbody/portrait | 20 |
| modern/landscape | 20 |
| modern/portrait | 11 |

## Figures by route

### `/1-day-in-figueres-girona/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/1-day-in-figueres-girona/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `figueres-teatre-museu-dali-exterior.jpg` | landscape | 2048×1365 | 336019 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `figueres-dali-museum-courtyard.jpg` | landscape | 2048×1365 | 569285 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `girona-onyar-houses.jpg` | landscape | 2048×1365 | 468822 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `girona-cathedral-facade-steps.jpg` | portrait | 1365×2048 | 441375 | 480, 768, 1200 + 1365 (original) |
| 5 | `girona-old-town-gate.jpg` | portrait | 1365×2048 | 275657 | 480, 768, 1200 + 1365 (original) |

### `/1-day-in-santiago-de-compostela/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/1-day-in-santiago-de-compostela/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `santiago-old-town-lane.jpg` | portrait | 1365×2048 | 397158 | 480, 768, 1200 + 1365 (original) |
| 2 | `santiago-cathedral-over-rooftops.jpg` | landscape | 2048×1365 | 410394 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `santiago-obradoiro-facade.jpg` | landscape | 2048×1365 | 319125 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `santiago-cathedral-high-altar.jpg` | portrait | 1365×2048 | 515318 | 480, 768, 1200 + 1365 (original) |
| 5 | `santiago-square-fountain-flowers.jpg` | portrait | 1365×2048 | 448918 | 480, 768, 1200 + 1365 (original) |

### `/1-day-in-sintra-the-mountain-of-romantic-follies/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/1-day-in-sintra-the-mountain-of-romantic-follies/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `sintra-town-rooftops-in-mist.jpg` | landscape | 2048×1365 | 420816 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `sintra-pena-palace-in-mist.jpg` | landscape | 2048×1365 | 238766 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `sintra-quinta-da-regaleira.jpg` | landscape | 2048×1365 | 417796 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `sintra-pena-ramparts-and-gate.jpg` | landscape | 2048×1365 | 449829 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `sintra-pena-tiled-and-yellow-walls.jpg` | portrait | 1365×2048 | 410493 | 480, 768, 1200 + 1365 (original) |

### `/1-day-in-tarragona-sitges/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/1-day-in-tarragona-sitges/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `tarragona-roman-amphitheatre-and-sea.jpg` | landscape | 2048×1365 | 417725 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `tarragona-cathedral-facade.jpg` | portrait | 1365×2048 | 387595 | 480, 768, 1200 + 1365 (original) |
| 3 | `tarragona-monument-als-castellers.jpg` | portrait | 1365×2048 | 400861 | 480, 768, 1200 + 1365 (original) |
| 4 | `tarragona-cathedral-cloister-garden.jpg` | portrait | 1365×2048 | 478610 | 480, 768, 1200 + 1365 (original) |

### `/2-days-in-caceres/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/2-days-in-caceres/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `caceres-plaza-mayor-torre-de-bujaco.jpg` | landscape | 2048×1365 | 408966 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `caceres-arco-de-la-estrella.jpg` | portrait | 1365×2048 | 328275 | 480, 768, 1200 + 1365 (original) |
| 3 | `caceres-ciudad-monumental-rooftops.jpg` | landscape | 2048×1365 | 305782 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `caceres-old-town-lane.jpg` | portrait | 1365×2048 | 257642 | 480, 768, 1200 + 1365 (original) |
| 5 | `caceres-whitewashed-lane-bougainvillea.jpg` | landscape | 2048×1365 | 336606 | 480, 768, 1200, 1600 + 2048 (original) |

### `/2-days-in-evora/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/2-days-in-evora/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `evora-templo-de-diana-marigolds.jpg` | portrait | 1365×2048 | 260869 | 480, 768, 1200 + 1365 (original) |
| 2 | `evora-capela-dos-ossos-window.jpg` | landscape | 2048×1365 | 422147 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `evora-cathedral-nave.jpg` | portrait | 1365×2048 | 429372 | 480, 768, 1200 + 1365 (original) |
| 4 | `evora-whitewashed-rooftops.jpg` | landscape | 2048×1365 | 383826 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `evora-old-town-lane.jpg` | portrait | 1365×2048 | 261507 | 480, 768, 1200 + 1365 (original) |

### `/2-days-in-fez-itinerary/`

- architecture: **legacy with .post-body**
- source: `src/pages/2-days-in-fez-itinerary/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `fez-city-gate.jpg` | portrait | 1365×2048 | 247498 | 480, 768, 1200 + 1365 (original) |
| 2 | `fez-medersa-courtyard.jpg` | portrait | 1365×2048 | 588787 | 480, 768, 1200 + 1365 (original) |
| 3 | `fez-chouara-tannery-vats.jpg` | landscape | 2048×1365 | 351566 | 480, 768, 1200, 1600 + 2048 (original) |

### `/3-days-in-madrid-the-capital-at-full-volume/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/3-days-in-madrid-the-capital-at-full-volume/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `madrid-tio-pepe-puerta-del-sol.jpg` | landscape | 2048×1365 | 278451 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `madrid-plaza-mayor-through-arch.jpg` | portrait | 1365×2048 | 219257 | 480, 768, 1200 + 1365 (original) |
| 3 | `madrid-catedral-de-la-almudena.jpg` | portrait | 1365×2048 | 503494 | 480, 768, 1200 + 1365 (original) |

### `/3-days-in-seville/`

- architecture: **modern Chronicle (Figure.astro)**
- source: `src/pages/3-days-in-seville/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `giralda-at-dusk.jpg` | landscape | 2048×1365 | 212723 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `giralda-from-alcazar-gardens.jpg` | portrait | 1365×2048 | 465146 | 480, 768, 1200 + 1365 (original) |
| 3 | `cathedral-capilla-mayor.jpg` | landscape | 2048×1365 | 389965 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `archivo-de-indias-gallery.jpg` | landscape | 2048×1365 | 343743 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `plaza-de-toros-maestranza-facade.jpg` | landscape | 2048×1365 | 225361 | 480, 768, 1200, 1600 + 2048 (original) |
| 6 | `plaza-de-espana-bridges.jpg` | landscape | 2048×1365 | 417162 | 480, 768, 1200, 1600 + 2048 (original) |
| 7 | `casa-de-pilatos-garden-loggia.jpg` | landscape | 2048×1365 | 371520 | 480, 768, 1200, 1600 + 2048 (original) |

### `/3-days-in-tangier-at-the-edge-of-two-worlds/`

- architecture: **legacy with .post-body**
- source: `src/pages/3-days-in-tangier-at-the-edge-of-two-worlds/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `tangier-bay-at-sunset.jpg` | landscape | 2048×1365 | 287568 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `tangier-cinema-rif.jpg` | portrait | 1365×2048 | 238215 | 480, 768, 1200 + 1365 (original) |
| 3 | `tangier-kasbah-lane.jpg` | portrait | 1365×2048 | 377254 | 480, 768, 1200 + 1365 (original) |
| 4 | `tangier-fishing-port.jpg` | landscape | 2048×1365 | 510188 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `tangier-medina-rooftops.jpg` | landscape | 2048×1365 | 299254 | 480, 768, 1200, 1600 + 2048 (original) |

### `/4-days-in-bologna/`

- architecture: **legacy with .post-body**
- source: `src/pages/4-days-in-bologna/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `bologna-fontana-del-nettuno-piazza-maggiore.jpg` | portrait | 1365×2048 | 330037 | 480, 768, 1200 + 1365 (original) |
| 2 | `bologna-portico-columns-evening-light.jpg` | portrait | 1365×2048 | 310787 | 480, 768, 1200 + 1365 (original) |
| 3 | `bologna-salumeria-window.jpg` | portrait | 1365×2048 | 343156 | 480, 768, 1200 + 1365 (original) |
| 4 | `bologna-rooftops-and-towers.jpg` | landscape | 2048×1365 | 416143 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `bologna-basilica-di-san-petronio.jpg` | landscape | 2048×1365 | 303511 | 480, 768, 1200, 1600 + 2048 (original) |

### `/4-days-in-lagos-the-coast-of-golden-cliffs/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/4-days-in-lagos-the-coast-of-golden-cliffs/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `lagos-old-town-street-parasols.jpg` | portrait | 1365×2048 | 286037 | 480, 768, 1200 + 1365 (original) |
| 2 | `lagos-gilded-baroque-altarpiece.jpg` | portrait | 1365×2048 | 642677 | 480, 768, 1200 + 1365 (original) |
| 3 | `lagos-ponta-da-piedade-arches.jpg` | landscape | 2048×1365 | 436626 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `lagos-cliff-beach-morning.jpg` | landscape | 2048×1365 | 397076 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `lagos-cliff-coast-headland.jpg` | landscape | 2048×1365 | 471691 | 480, 768, 1200, 1600 + 2048 (original) |

### `/4-days-in-mondim-de-basto/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/4-days-in-mondim-de-basto/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `mondim-de-basto-hills-at-sunset.jpg` | landscape | 2048×1365 | 243544 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `mondim-de-basto-monte-farinha-above-town.jpg` | portrait | 1365×2048 | 276607 | 480, 768, 1200 + 1365 (original) |
| 3 | `mondim-de-basto-riverside-park.jpg` | portrait | 1365×2048 | 390149 | 480, 768, 1200 + 1365 (original) |

### `/4-days-in-valencia-itinerary/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/4-days-in-valencia-itinerary/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `valencia-cathedral-golden-hour.jpg` | landscape | 2048×1365 | 282639 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `valencia-turia-gardens.jpg` | portrait | 1365×2048 | 467070 | 480, 768, 1200 + 1365 (original) |
| 3 | `valencia-marques-de-dos-aguas-portal.jpg` | portrait | 1365×2048 | 526898 | 480, 768, 1200 + 1365 (original) |
| 4 | `valencia-hemisferic-city-of-arts.jpg` | landscape | 2048×1365 | 264049 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `valencia-port-houses-and-boats.jpg` | landscape | 2048×1365 | 391109 | 480, 768, 1200, 1600 + 2048 (original) |
| 6 | `valencia-mercado-central-produce.jpg` | portrait | 1365×2048 | 291476 | 480, 768, 1200 + 1365 (original) |

### `/4-weeks-portugal-to-spain-by-rail-road/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/4-weeks-portugal-to-spain-by-rail-road/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `porto-capela-das-almas.jpg` | landscape | 2048×1365 | 391345 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `lisbon-azulejo-panel.jpg` | landscape | 2048×1365 | 514398 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `lagos-old-town-from-above.jpg` | landscape | 2048×1365 | 368402 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `evora-cathedral-portal.jpg` | portrait | 1365×2048 | 462941 | 480, 768, 1200 + 1365 (original) |
| 5 | `madrid-plaza-mayor.jpg` | portrait | 1365×2048 | 283760 | 480, 768, 1200 + 1365 (original) |
| 6 | `barcelona-hospital-de-sant-pau.jpg` | landscape | 2048×1365 | 361080 | 480, 768, 1200, 1600 + 2048 (original) |

### `/5-days-in-lisbon-itinerary/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/5-days-in-lisbon-itinerary/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `lisbon-castelo-sao-jorge-over-the-city.jpg` | landscape | 2048×1365 | 319641 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `lisbon-alfama-rooftops-golden-hour.jpg` | landscape | 2048×1365 | 366544 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `lisbon-yellow-tram-steep-street.jpg` | portrait | 1365×2048 | 300230 | 480, 768, 1200 + 1365 (original) |
| 4 | `lisbon-padrao-dos-descobrimentos.jpg` | landscape | 2048×1365 | 353432 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `lisbon-arco-da-rua-augusta.jpg` | landscape | 2048×1365 | 274367 | 480, 768, 1200, 1600 + 2048 (original) |
| 6 | `lisbon-alfama-lane-tram-tracks.jpg` | portrait | 1365×2048 | 409265 | 480, 768, 1200 + 1365 (original) |

### `/5-days-in-porto-the-city-the-river-built/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/5-days-in-porto-the-city-the-river-built/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `porto-rooftops-torre-dos-clerigos.jpg` | landscape | 2048×1365 | 411244 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `porto-livraria-lello-interior.jpg` | landscape | 2048×1365 | 462500 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `porto-gilded-church-interior.jpg` | landscape | 2048×1365 | 633279 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `porto-ponte-dom-luis-i.jpg` | landscape | 2048×1365 | 481925 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `porto-ribeira-waterfront.jpg` | landscape | 2048×1365 | 417465 | 480, 768, 1200, 1600 + 2048 (original) |
| 6 | `porto-sao-bento-station-azulejos.jpg` | portrait | 1365×2048 | 445871 | 480, 768, 1200 + 1365 (original) |

### `/7-days-in-barcelona/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/7-days-in-barcelona/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `barcelona-placa-despanya-from-montjuic.jpg` | landscape | 2048×1365 | 473454 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `barcelona-sagrada-familia-spires.jpg` | portrait | 1365×2048 | 488089 | 480, 768, 1200 + 1365 (original) |
| 3 | `barcelona-bellesguard-brick-attic.jpg` | portrait | 1365×2048 | 402446 | 480, 768, 1200 + 1365 (original) |
| 4 | `barcelona-rambla-newspaper-kiosk.jpg` | landscape | 2048×1365 | 492904 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `barcelona-temple-del-sagrat-cor-tibidabo.jpg` | landscape | 2048×1365 | 214381 | 480, 768, 1200, 1600 + 2048 (original) |
| 6 | `barcelona-from-tibidabo.jpg` | landscape | 2048×1365 | 383463 | 480, 768, 1200, 1600 + 2048 (original) |

### `/best-areas-to-stay-in-seville/`

- architecture: **modern Chronicle (Figure.astro)**
- source: `src/pages/best-areas-to-stay-in-seville/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `giralda-above-the-rooftops.jpg` | landscape | 2048×1365 | 233170 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `torre-del-oro-from-el-arenal.jpg` | portrait | 1365×2048 | 382947 | 480, 768, 1200 + 1365 (original) |
| 3 | `alameda-de-hercules-columns.jpg` | portrait | 1365×2048 | 393703 | 480, 768, 1200 + 1365 (original) |
| 4 | `capilla-del-carmen-triana.jpg` | portrait | 1365×2048 | 285117 | 480, 768, 1200 + 1365 (original) |
| 5 | `quiet-street-at-first-light.jpg` | portrait | 1365×2048 | 249103 | 480, 768, 1200 + 1365 (original) |

### `/best-day-trips-from-seville/`

- architecture: **modern Chronicle (Figure.astro)**
- source: `src/pages/best-day-trips-from-seville/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `mezquita-arch-within-arch.jpg` | landscape | 2048×1365 | 208995 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `cordoba-puente-romano.jpg` | landscape | 2048×1365 | 432374 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `cadiz-cathedral-facade.jpg` | landscape | 2048×1365 | 386729 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `cadiz-la-caleta.jpg` | landscape | 2048×1365 | 261626 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `triana-tiled-excursion-signs.jpg` | landscape | 2048×1365 | 473272 | 480, 768, 1200, 1600 + 2048 (original) |

### `/best-things-to-do-in-seville/`

- architecture: **modern Chronicle (Figure.astro)**
- source: `src/pages/best-things-to-do-in-seville/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `pabellon-mudejar-reflected.jpg` | landscape | 2048×1365 | 381478 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `guadalquivir-at-sunset.jpg` | portrait | 1365×2048 | 289256 | 480, 768, 1200 + 1365 (original) |
| 3 | `casa-de-pilatos-patio-principal.jpg` | portrait | 1365×2048 | 315452 | 480, 768, 1200 + 1365 (original) |
| 4 | `zurbaran-crucifixion-bellas-artes.jpg` | portrait | 1365×2048 | 363214 | 480, 768, 1200 + 1365 (original) |
| 5 | `flamenco-on-a-dark-stage.jpg` | landscape | 2048×1365 | 76753 | 480, 768, 1200, 1600 + 2048 (original) |

### `/douro-valley-day-trip/`

- architecture: **legacy using legacy-gutter.css**
- source: `src/pages/douro-valley-day-trip/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `douro-terraced-valley.jpg` | landscape | 2048×1365 | 494204 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `douro-river-bend-terraces.jpg` | landscape | 2048×1365 | 615516 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `douro-quinta-garden.jpg` | portrait | 1365×2048 | 527340 | 480, 768, 1200 + 1365 (original) |
| 4 | `douro-river-oleander.jpg` | portrait | 1365×2048 | 343607 | 480, 768, 1200 + 1365 (original) |
| 5 | `douro-vineyard-through-leaves.jpg` | landscape | 2048×1365 | 566538 | 480, 768, 1200, 1600 + 2048 (original) |

### `/italy-morocco-seville-4-week-itinerary/`

- architecture: **legacy with .post-body**
- source: `src/pages/italy-morocco-seville-4-week-itinerary/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `bologna-tower-above-the-roofs.jpg` | portrait | 1365×2048 | 356035 | 480, 768, 1200 + 1365 (original) |
| 2 | `bologna-ochre-street.jpg` | portrait | 1365×2048 | 346413 | 480, 768, 1200 + 1365 (original) |
| 3 | `rome-vittoriano.jpg` | landscape | 2048×1365 | 317776 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `marrakech-jardin-majorelle.jpg` | portrait | 1365×2048 | 383938 | 480, 768, 1200 + 1365 (original) |
| 5 | `rabat-kasbah-gate.jpg` | landscape | 2048×1365 | 315101 | 480, 768, 1200, 1600 + 2048 (original) |
| 6 | `fez-tiled-gateway.jpg` | portrait | 1365×2048 | 501307 | 480, 768, 1200 + 1365 (original) |
| 7 | `tangier-strait-at-dusk.jpg` | portrait | 1365×2048 | 242061 | 480, 768, 1200 + 1365 (original) |

### `/one-day-in-seville/`

- architecture: **modern Chronicle (Figure.astro)**
- source: `src/pages/one-day-in-seville/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `plaza-de-espana-from-the-arcade.jpg` | landscape | 2048×1365 | 438226 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `alcazar-gardens-from-above.jpg` | portrait | 1365×2048 | 537948 | 480, 768, 1200 + 1365 (original) |
| 3 | `cathedral-retablo-mayor.jpg` | portrait | 1365×2048 | 817376 | 480, 768, 1200 + 1365 (original) |
| 4 | `archivo-de-indias-inscription.jpg` | landscape | 2048×1365 | 427342 | 480, 768, 1200, 1600 + 2048 (original) |

### `/san-marino-day-trip-guide/`

- architecture: **legacy with .post-body**
- source: `src/pages/san-marino-day-trip-guide/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `san-marino-rooftops-and-hills.jpg` | landscape | 2048×1152 | 467755 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `san-marino-tower-on-the-crag.jpg` | portrait | 1152×2048 | 318051 | 480, 768 + 1152 (original) |
| 3 | `san-marino-ramparts-along-the-ridge.jpg` | portrait | 1152×2048 | 300348 | 480, 768 + 1152 (original) |
| 4 | `san-marino-view-over-the-plain.jpg` | portrait | 1152×2048 | 486406 | 480, 768 + 1152 (original) |

### `/seville-tapas-food-guide/`

- architecture: **modern Chronicle (Figure.astro)**
- source: `src/pages/seville-tapas-food-guide/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `jamon-counter-mercado-de-triana.jpg` | landscape | 2048×1365 | 400651 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `mercado-de-triana-entrance.jpg` | landscape | 2048×1365 | 326671 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `fruteria-mercado-de-triana.jpg` | landscape | 2048×1365 | 391175 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `mercado-de-triana-morning-shoppers.jpg` | landscape | 2048×1365 | 284422 | 480, 768, 1200, 1600 + 2048 (original) |
| 5 | `el-disparate-alameda.jpg` | portrait | 1365×2048 | 305570 | 480, 768, 1200 + 1365 (original) |

### `/six-days-in-rome-at-the-table-of-empires/`

- architecture: **legacy with .post-body**
- source: `src/pages/six-days-in-rome-at-the-table-of-empires/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `rome-tiber-towards-saint-peters.jpg` | landscape | 2048×1152 | 342400 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `rome-saint-peters-basilica-interior.jpg` | landscape | 2048×1365 | 568902 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `rome-colosseum-arena.jpg` | landscape | 2048×1365 | 523943 | 480, 768, 1200, 1600 + 2048 (original) |
| 4 | `rome-trevi-fountain.jpg` | portrait | 1365×2048 | 360519 | 480, 768, 1200 + 1365 (original) |
| 5 | `rome-pyramid-of-cestius.jpg` | portrait | 1365×2048 | 246991 | 480, 768, 1200 + 1365 (original) |

### `/the-imperial-circuit-morocco-in-14-days/`

- architecture: **legacy with .post-body**
- source: `src/pages/the-imperial-circuit-morocco-in-14-days/index.astro`

| # | image | orient | intrinsic | bytes | derivative widths |
|--:|---|---|---|--:|---|
| 1 | `marrakech-medina-rooftops.jpg` | landscape | 2048×1365 | 281981 | 480, 768, 1200, 1600 + 2048 (original) |
| 2 | `marrakech-bahia-palace-courtyard.jpg` | landscape | 2048×1365 | 398388 | 480, 768, 1200, 1600 + 2048 (original) |
| 3 | `rabat-hassan-tower.jpg` | portrait | 1365×2048 | 219651 | 480, 768, 1200 + 1365 (original) |
| 4 | `fez-tannery-dye-vats.jpg` | portrait | 1365×2048 | 469909 | 480, 768, 1200 + 1365 (original) |
| 5 | `tangier-port-from-the-hill.jpg` | portrait | 1365×2048 | 324987 | 480, 768, 1200 + 1365 (original) |
