import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads blog post frontmatter at build time, for the plugins that run in Node.
 *
 * `content/posts.ts` cannot be imported here: it loads posts through
 * `import.meta.glob`, which exists only inside Vite's module graph. The sitemap
 * used to carry its own copy of this parsing, and the link-preview step would
 * have needed a third. Every one of them has to derive the same slug the SPA
 * routes on, or a preview file is written to a path nobody requests and the
 * post silently shares with the homepage's metadata. One reader keeps them in
 * lockstep.
 */

const POSTS_DIR = path.resolve(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}

const stripQuotes = (value: string): string => {
  const trimmed = value.trim();
  if (
    trimmed.length > 1 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  return trimmed;
};

/** Same rule as `slugFromPath` in content/posts.ts: filename minus its date prefix. */
export const slugFromFilename = (file: string): string =>
  file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

/**
 * Mirrors `isPublished` in content/posts.ts: a post dated in the future is
 * scheduled, and must not reach the sitemap or get a prerendered page.
 *
 * Both exist because they answer at different times. This one runs at build,
 * so a scheduled post is absent from the sitemap until the first deploy on or
 * after its date — which is correct, since advertising a URL the app will not
 * render is worse than listing it a day late.
 */
const isPublished = (date: string): boolean => {
  if (!date) return true;
  return date <= new Date().toISOString().slice(0, 10);
};

export const readPostFrontmatter = (): PostFrontmatter[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw.trim())?.[1] ?? '';
      const field = (key: string): string => {
        const match = new RegExp(`^${key}:[ \\t]*(.+)$`, 'm').exec(block);
        return match ? stripQuotes(match[1]) : '';
      };
      const slug = slugFromFilename(file);

      return {
        slug,
        title: field('title') || slug,
        excerpt: field('excerpt'),
        date: field('date'),
        image: field('image'),
        author: field('author') || 'Timlin Connect Team',
      };
    })
    .filter((post) => isPublished(post.date))
    .sort((a, b) => b.date.localeCompare(a.date));
};
