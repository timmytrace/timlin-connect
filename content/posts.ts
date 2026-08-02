/// <reference types="vite/client" />

/**
 * Blog content loader.
 *
 * Posts live as Markdown files in `content/posts/*.md` and are read at build
 * time by Vite. To publish a new article, add a file — no component edits, no
 * code changes. See `content/README.md` for the frontmatter contract.
 */

export interface BlogPost {
  /** URL slug, derived from the filename minus its date prefix. */
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date (YYYY-MM-DD), used for sorting and <time> semantics. */
  date: string;
  /** Human-readable date, e.g. "July 24, 2026". */
  displayDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  featured: boolean;
  takeaways: string[];
  /** Raw Markdown body (frontmatter stripped). */
  body: string;
}

/* ------------------------------------------------------------------ */
/* Minimal frontmatter parsing (no runtime dependencies)               */
/* ------------------------------------------------------------------ */

type FrontmatterValue = string | string[];

const stripQuotes = (value: string): string => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length > 1)
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  return trimmed;
};

/**
 * Parses the YAML subset we actually use: `key: value` pairs and block
 * sequences of scalars. Anything more exotic should go in the body.
 */
const parseFrontmatter = (raw: string): { data: Record<string, FrontmatterValue>; body: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { data: {}, body: raw.trim() };

  const [, block, body] = match;
  const data: Record<string, FrontmatterValue> = {};
  let currentListKey: string | null = null;

  for (const line of block.split(/\r?\n/)) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;

    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && currentListKey) {
      (data[currentListKey] as string[]).push(stripQuotes(listItem[1]));
      continue;
    }

    const pair = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!pair) continue;

    const [, key, value] = pair;
    if (value.trim() === '') {
      currentListKey = key;
      data[key] = [];
    } else {
      currentListKey = null;
      data[key] = stripQuotes(value);
    }
  }

  return { data, body: body.trim() };
};

/* ------------------------------------------------------------------ */
/* Derived fields                                                      */
/* ------------------------------------------------------------------ */

const WORDS_PER_MINUTE = 225;

const estimateReadTime = (body: string): string => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
};

const formatDate = (iso: string): string => {
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

/** `content/posts/2026-07-24-my-title.md` -> `my-title` */
const slugFromPath = (filePath: string): string => {
  const filename = filePath.split('/').pop() ?? filePath;
  return filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
};

const asString = (value: FrontmatterValue | undefined, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const asList = (value: FrontmatterValue | undefined): string[] => (Array.isArray(value) ? value : []);

/* ------------------------------------------------------------------ */
/* Load                                                                */
/* ------------------------------------------------------------------ */

const files = import.meta.glob<string>('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const posts: BlogPost[] = Object.entries(files)
  .map(([filePath, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = slugFromPath(filePath);
    const date = asString(data.date);

    return {
      id: slug,
      title: asString(data.title, slug),
      excerpt: asString(data.excerpt),
      category: asString(data.category, 'Insights'),
      date,
      displayDate: formatDate(date),
      readTime: asString(data.readTime) || estimateReadTime(body),
      author: asString(data.author, 'Timlin Connect Team'),
      authorRole: asString(data.authorRole, 'Security Advisory'),
      image: asString(data.image),
      featured: asString(data.featured) === 'true',
      takeaways: asList(data.takeaways),
      body,
    };
  })
  // Newest first; an explicit `featured: true` post is pinned to the top.
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });

export const categories: string[] = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

export const getPostBySlug = (slug: string): BlogPost | undefined => posts.find((p) => p.id === slug);
