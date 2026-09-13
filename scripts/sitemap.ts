import type { Plugin } from 'vite';
import { SITE_URL, canonicalUrl } from '../content/site';
import { readPostFrontmatter } from './post-frontmatter';

/**
 * Emits `sitemap.xml` at build time so every published article is discoverable
 * without anyone remembering to edit a list. Adding a Markdown file to
 * `content/posts/` is enough.
 */

interface SitemapEntry {
  /** Absolute URL. Routes use canonicalUrl so every entry answers 200 without a redirect. */
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const today = () => new Date().toISOString().slice(0, 10);

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The sitemap needs only each post's slug and date. */
const readPosts = (): Array<{ slug: string; date: string }> =>
  readPostFrontmatter().map(({ slug, date }) => ({ slug, date: date || today() }));

const buildSitemap = (): string => {
  const posts = readPosts();
  const built = today();
  const latestPost = posts[0]?.date ?? built;

  const entries: SitemapEntry[] = [
    { loc: canonicalUrl(''), lastmod: built, changefreq: 'monthly', priority: '1.0' },
    { loc: `${SITE_URL}/#services`, lastmod: built, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/#about`, lastmod: built, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_URL}/#contact`, lastmod: built, changefreq: 'monthly', priority: '0.7' },
    { loc: canonicalUrl('gateway'), lastmod: built, changefreq: 'monthly', priority: '0.8' },
    { loc: canonicalUrl('blog'), lastmod: latestPost, changefreq: 'weekly', priority: '0.8' },
    ...posts.map<SitemapEntry>((post) => ({
      loc: canonicalUrl(`blog/${post.slug}`),
      lastmod: post.date,
      changefreq: 'yearly',
      priority: '0.7',
    })),
  ];

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
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
