You are working in the There & Back Again travel-blog repository.

Your task is to establish a controlled blog-production workflow and prepare the first article, not to mass-generate or publish content.

Read these project files first:

- `docs/blog-production/BLOG-PRODUCTION-SYSTEM.md`
- `docs/blog-production/PUBLISHING-QUEUE.md`
- `docs/blog-production/FIRST-PILOT-SEVILLE.md`
- `docs/blog-production/templates/RESEARCH-PACKET-TEMPLATE.md`
- `docs/blog-production/templates/ARTICLE-BRIEF-TEMPLATE.md`
- `docs/blog-production/templates/QA-CHECKLIST.md`
- the supplied voice and audit source files under `docs/blog-production/sources/`
- any existing root `CLAUDE.md`, repository instructions or content documentation

## Stage 1 — inspect, do not draft

Inspect the repository and report:

1. Framework, content location and route generation.
2. Exact frontmatter/content schema used by current chronicles.
3. Shared article components, anchor menus, practical blocks, further-reading blocks, image conventions and structured data.
4. How internal links and canonical URLs are implemented.
5. Build, lint and content-validation commands.
6. Existing Seville/Andalucía posts and every source of personal Seville material available in the repository.
7. Whether the homepage Bologna 404, Kyoto placeholder and Cádiz/Fez legacy URL issues from the audit still exist.
8. Any conflict between the production system and current repository architecture.

Do not change shared components, styles, routes, schemas, existing posts or homepage code during this stage.

## Stage 2 — create only non-invasive production records

If the repository structure supports it, create a clearly separated working area such as:

- `docs/blog-production/research/`
- `docs/blog-production/briefs/`
- `docs/blog-production/drafts/`

Do not move or rewrite existing content.

Prepare the pilot package for **3 Days in Seville**:

1. Complete research packet.
2. Anti-cannibalisation analysis against the 10-day Andalucía article.
3. Proposed article outline.
4. SEO package: title, H1, slug, intent, meta title and meta description.
5. Internal-link map.
6. Image plan based on real repository assets.
7. Exact list of current facts requiring web verification.
8. Exact list of personal details that are missing and cannot be invented.

Use current official primary sources for unstable factual research. Record source URLs and access dates in the research packet.

## Hard constraints

- Never invent personal experience.
- Never imply Mitch stayed, ate, travelled or visited somewhere unless repository material supports it.
- Do not write generic destination prose that could fit another city.
- Do not create the full article yet.
- Do not publish, deploy, commit or push.
- Do not modify existing articles or code in this run.
- Stop after the Stage 1 report and Stage 2 pilot package.

## Completion report

Return:

- findings from the repository audit;
- files created;
- research sources used;
- proposed outline and SEO package;
- provenance gaps;
- risks or architectural conflicts;
- explicit recommendation on whether the article is ready to draft.
