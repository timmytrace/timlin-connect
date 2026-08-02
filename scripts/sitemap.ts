import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Emits `sitemap.xml` at build time so every published article is discoverable
 * without anyone remembering to edit a list. Adding a Markdown file to
 * `content/posts/` is enough.
 */

const SITE_URL = 'https://www.timlinconnect.com';
const POSTS_DIR = path.resolve(process.cwd(), 'content/posts');

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const today = () => new Date().toISOString().slice(0, 10);

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Pulls just the fields the sitemap needs out of a post's frontmatter. */
const readPosts = (): Array<{ slug: string; date: string }> => {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw.trim());
      const dateMatch = frontmatter ? /^date:\s*(.+)$/m.exec(frontmatter[1]) : null;
      const slug = file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

      return {
        slug,
        date: (dateMatch?.[1] ?? today()).trim().replace(/^["']|["']$/g, ''),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
};

const buildSitemap = (): string => {
  const posts = readPosts();
  const built = today();
  const latestPost = posts[0]?.date ?? built;

  const entries: SitemapEntry[] = [
    { loc: '/', lastmod: built, changefreq: 'monthly', priority: '1.0' },
    { loc: '/#services', lastmod: built, changefreq: 'monthly', priority: '0.8' },
    { loc: '/#about', lastmod: built, changefreq: 'monthly', priority: '0.7' },
    { loc: '/#contact', lastmod: built, changefreq: 'monthly', priority: '0.7' },
    { loc: '/magnum-ai', lastmod: built, changefreq: 'monthly', priority: '0.6' },
    { loc: '/blog', lastmod: latestPost, changefreq: 'weekly', priority: '0.8' },
    ...posts.map<SitemapEntry>((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'yearly',
      priority: '0.7',
    })),
  ];

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(SITE_URL + entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

export const sitemapPlugin = (): Plugin => ({
  name: 'timlin-sitemap',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: buildSitemap(),
    });
  },
});

export default sitemapPlugin;
