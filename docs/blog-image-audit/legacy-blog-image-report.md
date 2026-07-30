# Legacy blog image batch — report

22 articles illustrated, 109 photographs added. Nothing committed, staged or
pushed. See `legacy-blog-image-audit.md` for the per-article status table and
`legacy-blog-image-manifest.md` for full per-image provenance.

## Method

**Selection.** Filenames in the library are camera-generated and carry no
information, so nothing was chosen on the basis of a filename or folder name.
The whole library was triaged through contact sheets, and every photograph that
made the final cut was then opened and looked at individually before use. That
is what turned up the three folders holding more than their name suggests, and
what caught the Bellesguard/Colònia Güell misidentification.

**Rejections worth noting.** Two frames were dropped on privacy grounds
(`2024/Lisbon/DSC06341` and `DSC06342` — a child's face is the focal subject in
a public street; a different tram frame was used instead). One was dropped
because the bird species could not be confirmed and the article makes a
specific claim about storks (`2024/Caceres/DSC06658`). One was dropped for a
scaffolding tower in frame (`2024/Lagos/DSC06537`).

**Captions and alt text.** Alt text describes only what is visibly in the frame.
Captions are short, specific and never assert anything the photograph does not
show — in particular they never imply that Mitch entered, ate at or experienced
something merely because a photograph exists. Six draft captions were rewritten
before integration because they asserted facts that cannot be verified from the
image (tile counts at São Bento, the Mercado Central's opening year, the number
of steps at Girona, a consecration date at the Almudena). Where a building's
identity was high-confidence but not certain, it is described rather than named
— hence `lagos-gilded-baroque-altarpiece.jpg` rather than naming the church, and
`fez-city-gate.jpg` rather than asserting Bab Bou Jeloud.

## Compression

MozJPEG, quality 70, no resize, no crop, no rotation. No source file in the
library carries an EXIF orientation tag (all 5,645 checked), so no orientation
normalisation was needed anywhere and every output is byte-for-byte the same
pixel grid as its source.

| | |
|---|---|
| Images | 109 |
| Total, before | 58.98 MB |
| Total, after | 40.24 MB |
| Saved | 31.8% |
| Smallest / largest output | 209 KB / 628 KB |
| Native dimensions preserved | 109 / 109 |

**The 210 KB target was not met, and could not be met within the rules.** 108
of 109 images land above it. The brief allows quality 70 as the floor and
forbids resizing, and at 2048 px on the long edge a detailed photograph simply
does not compress to 210 KB at q70. I confirmed this is not a tuning problem:
on the worst case (a gilded altarpiece, 628 KB) I tested all nine MozJPEG
quantisation tables and the default is already the smallest; disabling
progressive encoding and forcing 4:2:0 chroma changed nothing. Every output was
inspected at 100% against its original — no banding in sky gradients, no colour
shift, no haloing, no loss of fine detail.

So the choice is Mitch's, and it is a real one: article pages now carry roughly
1.6–2.8 MB of imagery each. Meeting 210 KB would require resizing to about
1400 px on the long edge, which the brief prohibits. **Recommendation:** allow
resizing to ~1600 px for a future pass, which would bring nearly everything
under target with no visible quality cost at the widths these images are
actually displayed (max 1100 px).

## Implementation

Legacy articles render as a single escaped HTML string through `set:html`, so
Astro's scoped styles cannot reach them and `components/chronicle/Figure.astro`
cannot be used without migrating the article — which the brief prohibits.
Figures are therefore plain semantic markup inserted into the escaped string:

```html
<figure class="legacy-figure">
  <img src="…" alt="…" width="2048" height="1365" loading="lazy" decoding="async" />
  <figcaption>…</figcaption>
</figure>
```

Insertion was done by script against unique anchors (section comments, or the
Nth `<div class="chapter-break">`), failing loudly if an anchor was missing or
ambiguous, so no article HTML was hand-edited and no escaped string was
corrupted. `width`/`height` are read from the real file on disk, never written
by hand, and the portrait variant is derived from the real aspect ratio rather
than trusted from a spec — a check that caught five figures carrying the wrong
width class.

Placement follows each article's own structure: one image after the opening,
then one at each chapter boundary illustrating the chapter it closes, and one
before the closing reflection. Nothing is dumped in a gallery at the end and
nothing interrupts a practical block or table.

### Shared style file

One new file: `src/styles/legacy-figure.css`, imported only by the 22 articles
that now contain figures. `global.css` was **not** touched — it is owned by the
concurrent Seville session, and a new narrowly scoped file avoids the conflict
entirely.

Figures are capped at 1100 px to match the legacy prose column
(`.narrative` / `.chapter-break`) and carry no horizontal padding, so they align
with the text column exactly at every width. Portrait frames are capped at
560 px so a 2:3 photograph cannot dominate the scroll.

## Validation

- `npm run check` — 0 errors, 0 warnings, 0 hints (52 files)
- `npm run build` — 32 pages, sitemap generated, no route lost
- 109 figures: every `src` resolves, every `alt` non-empty, every image
  `loading="lazy"` + `decoding="async"`
- `width`/`height` verified against the real file for all 109 — 0 mismatches
- Portrait/landscape class verified against real aspect ratio — 0 mismatches
- 0 orphaned files in the new image folders
- Source library re-counted after the run: 5,645 files, 0 modified

### Browser QA

Every one of the 22 modified articles was measured in Chrome at 390 px, 768 px
and 1440 px. `resize_window` had no effect on the viewport in this environment,
so each article was loaded in a same-origin iframe at the exact CSS width — a
real layout viewport, against which media queries resolve normally — and
measured from inside the document. Representative pages were also inspected
visually at each width.

Result at all three widths, all 22 articles: no horizontal overflow, no image
exceeding the viewport, no caption clipping, no aspect-ratio distortion
(worst case 0.14%, i.e. sub-pixel rounding), all images decoding.

One correction came out of this pass: the figures originally carried a 4rem
gutter below 1024 px, which left them visibly narrower than the flush prose
column. The gutter was removed; figure width now equals prose width exactly at
390/768/1440 on both article generations.

## Pre-existing issue found, not fixed

On the older legacy articles the body text runs **flush to the viewport edge**
below 600 px — `.opening-prose` and `.chapter-break` get no horizontal padding
at that breakpoint, while `.post-hero`, `.faq-block` and friends do. The
newer 2025-era articles have a 15 px gutter and read correctly. This predates
this batch and is untouched; the figures deliberately match whatever the prose
column does so they stay consistent either way. Worth a separate fix in
`global.css` once the Seville session releases that file.

## Not done

- `/1-day-in-cordoba/` and `/1-day-in-cadiz/` — verified photographs exist, but
  the active Seville batch has already claimed those frames. Reasoning in the
  audit doc.
- `/1-day-in-colonia-guell/` — no photographs of Colònia Güell exist in the
  library.
- Sitges (in `/1-day-in-tarragona-sitges/`) and Chefchaouen (in
  `/3-days-in-tangier…/`) have no confirmed photographs; those articles are
  illustrated from their other destination only.
