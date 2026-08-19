/**
 * Publication provenance: who wrote and photographed these chronicles, when
 * they were published, and which links on a page are paid.
 *
 * The site's narrator stays "the traveller" — that is a literary device and no
 * article prose is touched here. This module is the *publication* layer: the
 * byline, the dates, the affiliate disclosure and the schema.org identity that
 * search engines read.
 *
 * Two article families share it:
 *   - the 11 chronicles built with `ChronicleLayout` (see `ArticleHeader`)
 *   - the 26 Cargo-migrated chronicles that render a `pageContent` HTML string
 *     (see `prepareLegacyArticle`)
 */

export const SITE_URL = 'https://travel.mitchchadban.com';

/** Stable @id for the author. One node, referenced from every Article. */
export const PERSON_ID = `${SITE_URL}/#mitch-chadban`;
/** Stable @id for the publication itself. */
export const PUBLISHER_ID = `${SITE_URL}/#publication`;
/** Stable @id for the site. */
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

/**
 * The author.
 *
 * `sameAs` carries only profiles already publicly asserted by Mitch Chadban in
 * the live JSON-LD on `https://mitchchadban.com/` (its `#person` node). Nothing
 * here is inferred: no job title, no location, no credentials, no image.
 */
export function personNode(): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Mitch Chadban',
    url: `${SITE_URL}/about-the-traveller/`,
    sameAs: [
      'https://mitchchadban.com/',
      'https://www.instagram.com/mitch_chadban/',
    ],
  };
}

/** The publication. */
export function publisherNode(): Node {
  return {
    '@type': 'Organization',
    '@id': PUBLISHER_ID,
    name: 'There & Back Again',
    url: `${SITE_URL}/`,
    founder: { '@id': PERSON_ID },
  };
}

export interface Provenance {
  /**
   * `false` only where the page carries no original photography. Every
   * photograph on this site comes from the author's own library — see
   * `docs/blog-image-audit/` — so this is `true` wherever images are present.
   */
  photography?: boolean;
  /**
   * ISO date (YYYY-MM-DD). Set ONLY where a trustworthy publication date
   * exists. None of the 26 migrated chronicles has one: the inert Cargo-era
   * JSON-LD drafts embedded in some of their bodies cite thereandbackagain.blog
   * URLs that were never live, and the visible "Travel Chronicle · <month>"
   * kickers denote the trip period, not publication. Omitted, never guessed.
   */
  published?: string;
  /**
   * ISO date (YYYY-MM-DD). Set only where a documented editorial revision
   * happened after publication — never a build, styling or config commit.
   * Requires a known `published`: a modification date without a publication
   * date implies one that is not in evidence.
   */
  modified?: string;
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Schema                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * Points every Article node in a graph at the shared Person and Organization
 * @ids and appends those two nodes once. Replaces the older pattern where each
 * article carried its own name-only Person stub.
 */
export function withProvenance(
  schema: Record<string, unknown>,
  prov: Provenance = {},
): Record<string, unknown> {
  const graph = ((schema['@graph'] as Node[]) ?? []).map((node) => {
    if (node['@type'] !== 'Article') return node;
    const article: Node = {
      ...node,
      author: { '@id': PERSON_ID },
      publisher: { '@id': PUBLISHER_ID },
    };
    if (prov.published) article.datePublished = prov.published;
    if (prov.modified) article.dateModified = prov.modified;
    return article;
  });

  return { ...schema, '@graph': [...graph, personNode(), publisherNode()] };
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Visible provenance block                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

export const DISCLOSURE =
  'Some links in this chronicle are affiliate links. If you book through one, ' +
  'I may earn a small commission at no extra cost to you.';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** `2025-09-01` → `September 2025`. Parsed as literal parts, not via Date. */
export function formatPublished(iso: string): string {
  const [year, month] = iso.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function bylineText(photography: boolean): string {
  return photography ? 'Written and photographed by' : 'Written by';
}

/**
 * The markup rendered under every article hero. `ArticleHeader.astro` renders
 * the same structure as an Astro component; this string form exists for the
 * migrated pages, whose body is a single HTML string.
 */
export function provenanceHtml(
  prov: Provenance,
  options: { affiliate: boolean },
): string {
  const photography = prov.photography !== false;

  const date = prov.published
    ? `<span class="article-byline__sep" aria-hidden="true"></span>` +
      `<span class="article-byline__date">Published ` +
      `<time datetime="${prov.published}">${formatPublished(prov.published)}</time></span>`
    : '';

  const disclosure = options.affiliate
    ? `<p class="affiliate-disclosure">${DISCLOSURE}</p>`
    : '';

  return (
    `<div class="article-provenance">` +
    `<p class="article-byline">${bylineText(photography)} ` +
    `<a href="/about-the-traveller/">Mitch Chadban</a>${date}</p>` +
    `${disclosure}</div>`
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Affiliate links                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * The site's Viator partner id. Its presence in a query string is what makes a
 * link monetised — a Viator URL without it earns nothing, and a museum or
 * transport-authority link is not commercial at all. Classification is by this
 * parameter, never by hostname.
 */
export const AFFILIATE_PARAM = 'pid=P00295455';

export function isAffiliateHref(href: string): boolean {
  return href.includes(AFFILIATE_PARAM);
}

/**
 * Adds `rel="sponsored"` to every monetised link, and `noopener` alongside it
 * where the link opens a new tab. Destinations, tracking parameters and anchor
 * text are untouched, and `noreferrer` is deliberately NOT added: it would
 * strip the referrer the affiliate network attributes bookings with.
 */
function qualifyAffiliateLinks(html: string): { html: string; count: number } {
  let count = 0;

  const out = html.replace(/<a\b([^>]*)>/gi, (tag: string, attrs: string) => {
    const href = /\bhref\s*=\s*"([^"]*)"/i.exec(attrs);
    if (!href || !isAffiliateHref(href[1])) return tag;
    count += 1;

    const existing = /\srel\s*=\s*"([^"]*)"/i.exec(attrs);
    const tokens = new Set(
      (existing ? existing[1] : '').split(/\s+/).filter(Boolean),
    );
    tokens.add('sponsored');
    if (/\starget\s*=\s*"_blank"/i.test(attrs)) tokens.add('noopener');

    const rel = ` rel="${[...tokens].join(' ')}"`;
    return `<a${existing ? attrs.replace(existing[0], rel) : `${attrs}${rel}`}>`;
  });

  return { html: out, count };
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Legacy page transform                                                      */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * Inserts `block` as the last child of the article hero. The hero is located by
 * its opening tag and matched to its own closing tag by depth-counting that tag
 * name, so nothing else in the string is reparsed or reformatted.
 */
function appendToHero(html: string, block: string, label: string): string {
  const open = /<(section|div|header)\b[^>]*class="[^"]*\bpost-hero\b[^"]*"[^>]*>/i.exec(html);
  if (!open) {
    throw new Error(`provenance: no .post-hero found in ${label}`);
  }

  const tag = open[1].toLowerCase();
  const scan = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  scan.lastIndex = open.index + open[0].length;

  let depth = 1;
  let match: RegExpExecArray | null;
  while ((match = scan.exec(html)) !== null) {
    depth += match[1] === '/' ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, match.index) + block + html.slice(match.index);
    }
  }

  throw new Error(`provenance: unbalanced .post-hero in ${label}`);
}

/**
 * Prepares a migrated chronicle's body for rendering: qualifies its affiliate
 * links and adds the byline (plus the disclosure, when and only when the page
 * actually carries a paid link).
 */
export function prepareLegacyArticle(
  html: string,
  prov: Provenance = {},
  label = 'legacy article',
): string {
  const qualified = qualifyAffiliateLinks(html);
  const block = provenanceHtml(prov, { affiliate: qualified.count > 0 });
  return appendToHero(qualified.html, block, label);
}
