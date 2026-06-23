# SEO Relaunch Plan — There & Back Again

_Audit date: 2026-06-24 · Site: https://travel.mitchchadban.com · Stack: Astro 6, content migrated from Cargo as raw HTML strings_

> ## ✅ Implemented 2026-06-24 (Phases 1–4, images excluded)
> - **Foundation:** `site` + `@astrojs/sitemap` configured → `sitemap-index.xml`; `public/robots.txt` added; `BaseLayout` rewritten with unique description, canonical, full Open Graph + Twitter cards, `noindex` support, a `head` slot for JSON-LD, and icon/theme-color tags.
> - **Per-page metadata:** unique meta descriptions on all 26 posts + index pages (was 32/33 duplicates); posts set `og:type=article`; malformed Córdoba title fixed.
> - **Structured data:** JSON-LD on every post (`Article` + `BreadcrumbList`, plus `FAQPage` on 24 of 26) and `WebSite` schema on the homepage.
> - **Hub fixed:** `/chronicles/` rebuilt from the dead Cargo `<gallery-grid>` into a real 26-card grid linking every post.
> - **Cleanup:** logo links to `/`; junk `rel="history"`/`rel="home-page"` stripped sitewide; `front-page` + `email-protection` deleted (`/front-page/` → `/` redirect); `coming-soon` set `noindex`; dead `Layout.astro` + `Welcome.astro` removed.
> - **Slugs (Phase 4):** all 10 accented/punctuation slugs normalized to clean ASCII, internal links rewritten, and 301 redirects added in `astro.config.mjs`.
> - **Verified:** `npm run build` passes; built `<head>`, sitemap (30 clean URLs, utility pages excluded), redirects, and JSON-LD all confirmed in `dist/`.
>
> **Still open (deferred / post-launch):** (1) **Images** — `og:image` is wired to a placeholder `/og-default.jpg`; add that file + per-post hero images with `alt` text. (2) Wire analytics. (3) For real 301s (vs meta-refresh), deploy on a platform adapter or add host-level redirect rules. (4) Submit `sitemap-index.xml` in Google Search Console. (5) Optional: trim the handful of titles still >60 chars.

## Scope reviewed
33 page files under `src/pages`: home, `chronicles`, `by-region`, `about-the-traveller`, 31 travel-guide posts, and three utility pages (`front-page`, `coming-soon`, `email-protection`). All render through a single minimal `BaseLayout.astro`.

---

## Findings by severity

### 🔴 Critical — block relaunch
| # | Issue | Evidence | Impact |
|---|-------|----------|--------|
| 1 | **Duplicate meta descriptions** | 32 of 33 pages use the identical generic string `"…solo travel blog blending literary travel stories…"` | Google suppresses duplicate descriptions; no per-page keyword relevance |
| 2 | **No Open Graph / Twitter / og:image** | `grep og:image twitter:card src/` → none | Every shared link renders as bare text — kills social distribution |
| 3 | **No sitemap.xml / robots.txt** | absent from `public/`; no `site` in `astro.config.mjs` | Crawlers get no map; indexing slow/incomplete |
| 4 | **JSON-LD commented out + wrong domain** | Fez page has `Article`+`TravelGuide`+`FAQPage`+`BreadcrumbList` inside an HTML comment, pointing to `thereandbackagain.blog` | Rich-result markup dormant; even if enabled it points to the wrong site |
| 5 | **`/chronicles/` archive renders empty** | relies on Cargo `<gallery-grid>` web component that doesn't exist in Astro | Main hub links to zero posts → broken internal linking and crawl depth |

### 🟠 High
| # | Issue | Action |
|---|-------|--------|
| 6 | `/front-page/` duplicates the homepage (same content + title) | Delete; 301 → `/` |
| 7 | `/email-protection/` titled "Email Protection \| Cloudflare" (migration junk) | Delete; ensure not in sitemap |
| 8 | Logo links to `href="#"` not `/` | Homepage unlinked from every page — fix href |
| 9 | 9 slugs with accents/apostrophes/em-dashes/commas | Normalize to clean ASCII **+ add 301 redirects** (see table below) |
| 10 | No images in any post (only favicons) | No og:image source, no image-search traffic — add hero per post |

### 🟡 Medium / cleanup
- Invalid `rel="history"` / `rel="home-page"` on all nav links (Cargo cruft) — strip.
- `coming-soon` is indexable → add `noindex` until live.
- Dead files: `src/layouts/Layout.astro` (still "Astro Basics") and `src/components/Welcome.astro` — delete.
- Analytics not wired (empty `gtag` comment) — add or remove.
- Missing `apple-touch-icon`, `theme-color`, `initial-scale=1` on viewport.

---

## Plan

### Phase 1 — Foundation (one-time, highest leverage)
1. Set `site: 'https://travel.mitchchadban.com'` in `astro.config.mjs`.
2. `npx astro add sitemap` → auto-generates `sitemap-index.xml` at build. Exclude utility/noindex pages via the integration's `filter`.
3. Add `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://travel.mitchchadban.com/sitemap-index.xml
   ```
4. Upgrade `BaseLayout.astro` to accept props and emit: unique `description`, `canonical`, full Open Graph (`og:title/description/image/type/url/site_name`), Twitter `summary_large_image` card, optional `noindex`, plus `apple-touch-icon` / `theme-color` / `initial-scale=1`. Add a `<slot name="head">` so pages can inject JSON-LD.

### Phase 2 — Per-page metadata
5. Write a unique `<title>` (≤60 chars) and `description` (~150–160 chars) for all 31 posts, derived from each post's intro + FAQ. Standardize title format on one separator (recommend `Post Title — There & Back Again`, or drop the brand suffix on long titles to stay under 60 chars).
6. Provide each post an `og:image` (the hero added in Phase 3).
7. Fix and enable the Fez JSON-LD (correct domain), then template `Article` + `FAQPage` + `BreadcrumbList` across the other posts via the `head` slot.

### Phase 3 — Fix the broken hub + content
8. Rebuild `/chronicles/` as a real card grid linking to all 31 posts (mirror the working hardcoded pattern already in `/by-region/`).
9. Fix logo `href="/"`; strip `rel="history"`/`rel="home-page"`; `noindex` `coming-soon`; delete `front-page` + `email-protection`.
10. Add ≥1 hero image per post (also serves og:image), with descriptive `alt` text.

### Phase 4 — Slug normalization + redirects
Normalize the 9 problem slugs and 301 the old paths. Redirects can be declared in `astro.config.mjs` (`redirects: {}`) or at the host (e.g. Netlify `_redirects` / Vercel `vercel.json`).

| Current slug | Proposed clean slug |
|---|---|
| `1-day-in-cádiz-—-at-the-edge-of-the-known-world` | `1-day-in-cadiz` |
| `2-days-in-cáceres-a-medieval-city-held-in-amber` | `2-days-in-caceres` |
| `the-douro-valley-—-a-day-among-the-terraced-vines` | `douro-valley-day-trip` |
| `7-days-in-barcelona-gaudí's-unfinished-argument` | `7-days-in-barcelona` |
| `italy,-morocco-seville-4-week-itinerary` | `italy-morocco-seville-4-week-itinerary` |
| `4-days-in-bologna-the-fat-city's-table` | `4-days-in-bologna` |
| `2-days-in-évora-bones-roman-stones` | `2-days-in-evora` |
| `10-days-in-sevilla-andalucía-without-rush` | `10-days-in-sevilla` |
| `the-city-between-empires-—one-day-in-córdoba` | `1-day-in-cordoba` |

> Also update the internal links that reference these slugs (e.g. the homepage links to `/4-days-in-bologna-the-fat-city%27s-table/`).

### Phase 5 — Post-launch
- Wire analytics (GA4 or privacy-friendly alternative).
- Verify in Google Search Console; submit `sitemap-index.xml`.
- Spot-check rich results in Google's Rich Results Test; validate OG with a sharing debugger.

---

## Suggested sequencing
Phase 1 → 2 → 3 are the relaunch blockers. Phase 4 (slugs) should land **before** go-live so URLs are final. Phase 5 is day-of / post-launch. Phases 1–4 are roughly a day of focused work given the content already exists.
