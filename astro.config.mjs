// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://travel.mitchchadban.com';

// Pages kept out of the sitemap (deleted/utility/placeholder routes).
const SITEMAP_EXCLUDE = [
  `${SITE}/coming-soon/`,
  `${SITE}/front-page/`,
  `${SITE}/email-protection/`,
];

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.includes(page),
    }),
  ],
  redirects: {
    // Phase 4 — clean slugs (301 from the old percent-encoded paths)
    '/1-day-in-cádiz-—-at-the-edge-of-the-known-world/': '/1-day-in-cadiz/',
    '/2-days-in-cáceres-a-medieval-city-held-in-amber/': '/2-days-in-caceres/',
    '/the-douro-valley-—-a-day-among-the-terraced-vines/': '/douro-valley-day-trip/',
    "/7-days-in-barcelona-gaudí's-unfinished-argument/": '/7-days-in-barcelona/',
    '/italy,-morocco-seville-4-week-itinerary/': '/italy-morocco-seville-4-week-itinerary/',
    "/4-days-in-bologna-the-fat-city's-table/": '/4-days-in-bologna/',
    '/2-days-in-évora-bones-roman-stones/': '/2-days-in-evora/',
    '/10-days-in-sevilla-andalucía-without-rush/': '/10-days-in-sevilla/',
    '/the-city-between-empires-—one-day-in-córdoba/': '/1-day-in-cordoba/',
    '/1-day-in-colònia-güell/': '/1-day-in-colonia-guell/',
    // Removed pages
    '/front-page/': '/',
  },
});
