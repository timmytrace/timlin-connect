# Blog content

Every article on the site is a Markdown file in `content/posts/`. To publish a new post you add a file and deploy — no React components to edit, no lists to update.

## Adding a post

1. Create `content/posts/YYYY-MM-DD-your-slug.md`.
2. Fill in the frontmatter (see below) and write the body in Markdown.
3. Commit and push. The deploy picks it up automatically.

The filename drives the URL: `2026-08-14-securing-ci-pipelines.md` is published at `/blog/securing-ci-pipelines`. The date prefix is stripped from the slug and only used to keep the folder sorted, so **renaming a file changes its live URL** — avoid it once a post has been shared.

## Frontmatter

```yaml
---
title: Your Post Title
excerpt: One or two sentences shown on cards, in search results, and in link previews.
category: AI Security
date: 2026-08-14
author: Timlin Connect Team
authorRole: AI Security Research
image: /magnumai-demo/dashboard-overview.png
featured: false
takeaways:
  - First thing a reader should remember.
  - Second thing.
  - Third thing.
---
```

| Field        | Required | Notes                                                                          |
| ------------ | -------- | ------------------------------------------------------------------------------ |
| `title`      | yes      | Used as the `<h1>` and page title.                                             |
| `excerpt`    | yes      | Also becomes the meta description and OpenGraph description.                   |
| `category`   | yes      | Creates a filter chip automatically. Reuse existing names to avoid near-dupes. |
| `date`       | yes      | `YYYY-MM-DD`. Controls ordering and `datePublished` in structured data.        |
| `author`     | no       | Defaults to `Timlin Connect Team`.                                             |
| `authorRole` | no       | Small line under the author name.                                              |
| `image`      | yes      | Path under `public/`. Used for the card, the article header, and social cards.  |
| `featured`   | no       | `true` pins the post to the large featured slot. Keep it on one post at a time. |
| `takeaways`  | no       | Renders the dark "Key takeaways" panel. Omit it and the panel disappears.       |

Values containing a colon must be quoted: `title: "Tabletops: A Field Guide"`.

Read time is calculated from the body — don't set it manually.

## Body Markdown

The renderer (`content/Markdown.tsx`) deliberately supports a small, safe subset:

- Paragraphs separated by a blank line
- `##`, `###`, `####` headings
- `-` bulleted lists and `1.` numbered lists
- `> ` pull quotes
- `![alt](/path.png "Optional caption")` on its own line — renders as a captioned figure
- `**bold**`, `*italic*`, `` `code` ``, `[links](https://example.com)`
- `---` section breaks

Raw HTML is **not** rendered — it will appear as literal text. This is intentional: post content can never inject markup into the page.

### Reading experience

Body copy is set in Source Serif 4 at long-form reading size in a ~680px column, which is the layout most long-form publications converge on. A few things follow from that:

- **Use `##` headings.** Two or more headings automatically produce a sticky contents rail beside the article on wide screens, with the current section highlighted as you scroll. Fewer than two and the rail is hidden.
- **Break up long stretches with figures and pull quotes.** Both are styled to sit wider and looser than the body text.
- **Image paths may contain spaces and `&`** — several files in `public/` do, and the renderer handles them.

Headings get anchor IDs derived from their text, so `## Scoping the test` is linkable at `/blog/your-post#scoping-the-test`. Renaming a heading changes that anchor.

## What happens automatically

- The post appears on `/blog`, in its category filter, and in search.
- It gets a real URL at `/blog/<slug>` with its own title, description, canonical link, and OpenGraph tags.
- `BlogPosting` structured data is emitted for search engines.
- `sitemap.xml` is regenerated at build time (`scripts/sitemap.ts`) with the new URL.
- Related-article links on other posts pick it up.

## Known limitation

The site is a client-rendered SPA, so crawlers that don't execute JavaScript see an empty shell. Google generally handles this; most social unfurlers and some other crawlers do not. If organic search becomes a priority, the fix is prerendering these routes to static HTML at build time.
