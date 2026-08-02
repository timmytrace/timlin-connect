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
- `> ` blockquotes
- `**bold**`, `*italic*`, `` `code` ``, `[links](https://example.com)`
- `---` horizontal rules

Raw HTML is **not** rendered — it will appear as literal text. This is intentional: post content can never inject markup into the page.

## What happens automatically

- The post appears on `/blog`, in its category filter, and in search.
- It gets a real URL at `/blog/<slug>` with its own title, description, canonical link, and OpenGraph tags.
- `BlogPosting` structured data is emitted for search engines.
- `sitemap.xml` is regenerated at build time (`scripts/sitemap.ts`) with the new URL.
- Related-article links on other posts pick it up.

## Known limitation

The site is a client-rendered SPA, so crawlers that don't execute JavaScript see an empty shell. Google generally handles this; most social unfurlers and some other crawlers do not. If organic search becomes a priority, the fix is prerendering these routes to static HTML at build time.
