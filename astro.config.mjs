// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://travel.mitchchadban.com';

// Pages kept out of the sitemap (utility/placeholder routes).
const SITEMAP_EXCLUDE = [
  `${SITE}/coming-soon/`,
];

// https://astro.build/config
// Old accented/punctuation slug redirects are handled host-level (301) in
// public/_redirects rather than as build-time meta-refresh pages, so the
// generated output and sitemap contain only clean canonical URLs.
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.includes(page),
    }),
  ],
});
