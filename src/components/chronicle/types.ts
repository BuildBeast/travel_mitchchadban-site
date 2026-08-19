/**
 * Typed metadata contract for NEW chronicles.
 *
 * Legacy chronicles (the 26 Cargo-migrated pages under `src/pages/<slug>/index.astro`)
 * do not use this and are deliberately untouched. This applies only to articles
 * built with `ChronicleLayout`.
 */

export const SITE_URL = 'https://travel.mitchchadban.com';

/** One crumb in the article's BreadcrumbList. `item` is a site-absolute path. */
export interface Crumb {
  name: string;
  /** Site-absolute path with leading and trailing slash, e.g. `/chronicles/`. */
  path: string;
}

/** A single question/answer pair. Only emitted as FAQPage JSON-LD when present. */
export interface FaqEntry {
  question: string;
  answer: string;
}

/** A stat shown in the hero strip, e.g. `{ num: '3', label: 'Days' }`. */
export interface HeroStat {
  num: string;
  label: string;
}

/** An anchor-menu entry. `id` must match the `id` of a Chapter/section on the page. */
export interface AnchorLink {
  id: string;
  label: string;
}

export interface ChronicleMeta {
  /** Search-facing <title> content, without the site suffix. */
  title: string;
  /** Meta description. Aim for ~150–160 characters. */
  description: string;
  /** Site-absolute path with leading and trailing slash, e.g. `/3-days-in-seville/`. */
  path: string;
  /**
   * Optional share image, site-absolute (e.g. `/images/<slug>/hero.jpg`).
   * Falls back to the site default OG image when omitted.
   */
  ogImage?: string;
  /** Headline used in Article JSON-LD. Defaults to `title`. */
  headline?: string;
  /** Breadcrumb trail excluding Home and the article itself; both are added automatically. */
  breadcrumbs?: Crumb[];
  /** Optional FAQ. When present and non-empty, a FAQPage node is added to the JSON-LD graph. */
  faq?: FaqEntry[];
  /**
   * ISO date (YYYY-MM-DD) on which the article's refresh-sensitive practical
   * details were last verified against primary sources.
   *
   * This is a research record, not an editorial one: a verification pass that
   * changes nothing is not a modification, so this never becomes `dateModified`.
   */
  factsVerified?: string;
  /**
   * ISO date (YYYY-MM-DD) the article was first published. Set only where a
   * trustworthy date exists; omitted rather than guessed.
   */
  datePublished?: string;
  /**
   * ISO date (YYYY-MM-DD) of a documented editorial revision after publication.
   * Never a build, styling or configuration commit.
   */
  dateModified?: string;
  /**
   * `false` only where the page carries no original photography. Every
   * photograph on this site is the author's own — see `docs/blog-image-audit/`.
   */
  photography?: boolean;
  /** `true` where the page carries at least one monetised outbound link. */
  affiliateLinks?: boolean;
}

/** Build an absolute URL from a site-absolute path. */
export function absolute(path: string): string {
  return `${SITE_URL}${path}`;
}
