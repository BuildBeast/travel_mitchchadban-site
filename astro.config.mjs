// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://travel.mitchchadban.com';

// Pages kept out of the sitemap (utility/placeholder routes).
const SITEMAP_EXCLUDE = [
  `${SITE}/coming-soon/`,
];

// https://astro.build/config
// Legacy HTTP redirects (old accented/punctuation Cargo slugs) are configured
// in the root vercel.json for Vercel rather than as build-time meta-refresh
// pages, so the generated output and sitemap contain only clean canonical URLs.
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.includes(page),
    }),
  ],
});
