import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { SITE_URL, canonicalUrl } from '../content/site';
import { readPostFrontmatter } from './post-frontmatter';

/**
 * Emits a per-route `index.html` with that route's metadata baked in.
 *
 * Why this exists
 * ---------------
 * `App.tsx` rewrites `<title>` and the Open Graph tags on navigation, and a
 * comment there says it does so for "crawlers and link unfurlers". Client-side
 * rewriting cannot reach unfurlers: Slack, LinkedIn, X and iMessage fetch the
 * HTML and never execute the bundle. Every share of `/gateway` therefore
 * previewed as the generic services homepage, logo and all.
 *
 * Vite emits one `index.html`. This writes `dist/<route>/index.html` for each
 * route below with the tags already substituted, so the first byte a crawler
 * reads is correct. The SPA still boots and routes normally afterwards; only
 * the initial markup differs.
 *
 * Blog posts are generated from `content/posts/`, so publishing an article
 * needs no edit here. Their first version was missed: `_redirects` sent every
 * `/blog/*` URL to the generic shell, and the first findings post previewed as
 * "Timlin Connect | Cybersecurity Services" wherever it was shared.
 *
 * The canonical link is set as well. The shell hardcodes the homepage as
 * canonical and only the client corrects it, so to a crawler every prerendered
 * route - posts, `/blog` and `/gateway` alike - declared itself a duplicate of
 * the homepage.
 *
 * Values mirror what `App.tsx` sets after hydration, so the page does not
 * change its own metadata once the bundle runs. URLs come from content/site.ts,
 * which explains why they are the apex with a trailing slash.
 */

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
};

const STATIC_ROUTES: RouteMeta[] = [
  {
    route: 'gateway',
    title: 'Timlin Gateway | AI Security Gateway by Timlin Connect',
    description:
      'Timlin Gateway is a self-hosted AI security gateway from Timlin Connect. 98.7% prompt-injection recall at a 2.0% false-positive rate, measured on a held-out set, with the known gaps published alongside.',
    socialTitle: 'Timlin Gateway | AI Security Gateway',
    socialDescription:
      'Self-hosted LLM security. 98.7% injection recall at 2.0% false positives, measured — and the failure modes published next to the results.',
  },
  {
    route: 'blog',
    title: 'Research & Insights | Timlin Connect',
    description:
      'Original security research and practical writing from Timlin Connect: AI security findings, measured detection results, compliance readiness and incident response.',
    socialTitle: 'Timlin Connect | Research & Insights',
    socialDescription:
      'Original security research: what we measured, what it found, and where it still falls short.',
  },
];

// A slug goes into a filesystem path and a `_redirects` line. Anything outside
// this set would break one or the other quietly, so it fails the build instead.
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const postRoutes = (): RouteMeta[] =>
  readPostFrontmatter().map((post) => {
    if (!SAFE_SLUG.test(post.slug)) {
      throw new Error(
        `prerender-meta: post slug "${post.slug}" is not lowercase kebab-case; rename the file in content/posts/`
      );
    }
    const title = `${post.title} | Timlin Connect`;
    return {
      route: `blog/${post.slug}`,
      title,
      description: post.excerpt,
      // App.tsx uses the page title and excerpt for the social tags on posts.
      socialTitle: title,
      socialDescription: post.excerpt,
      // Same encoding as App.tsx: several image filenames contain spaces and "&".
      image: post.image ? `${SITE_URL}${encodeURI(post.image)}` : undefined,
      type: 'article',
      publishedTime: post.date || undefined,
    };
  });

const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Replace a meta tag's content, matching either attribute order.
 *
 * Replacements go through a function, not a replacement string: in a string,
 * `$1` and `$&` are special, so an excerpt mentioning "$1,200" would have been
 * spliced with regex captures.
 */
const setMeta = (html: string, key: string, value: string): string => {
  const attr = key.startsWith('og:') || key.startsWith('article:') ? 'property' : 'name';
  const escaped = escapeAttr(value);
  const forward = new RegExp(`(<meta[^>]+${attr}="${key}"[^>]*content=")[^"]*(")`, 'i');
  if (forward.test(html)) return html.replace(forward, (_m, open, close) => `${open}${escaped}${close}`);
  const reverse = new RegExp(`(<meta[^>]+content=")[^"]*("[^>]*${attr}="${key}")`, 'i');
  if (reverse.test(html)) return html.replace(reverse, (_m, open, close) => `${open}${escaped}${close}`);
  // Absent rather than present-and-wrong: insert it so the route is still correct.
  return html.replace(/<\/head>/i, () => `  <meta ${attr}="${key}" content="${escaped}">\n</head>`);
};

const setCanonical = (html: string, url: string): string => {
  const escaped = escapeAttr(url);
  const existing = /(<link[^>]+rel="canonical"[^>]*href=")[^"]*(")/i;
  if (existing.test(html)) return html.replace(existing, (_m, open, close) => `${open}${escaped}${close}`);
  return html.replace(/<\/head>/i, () => `  <link rel="canonical" href="${escaped}">\n</head>`);
};

const renderRoute = (shell: string, meta: RouteMeta): string => {
  const url = canonicalUrl(meta.route);
  const safeTitle = meta.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let html = shell.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${safeTitle}</title>`);
  html = setMeta(html, 'description', meta.description);
  html = setMeta(html, 'og:title', meta.socialTitle);
  html = setMeta(html, 'og:description', meta.socialDescription);
  html = setMeta(html, 'og:url', url);
  html = setMeta(html, 'og:type', meta.type ?? 'website');
  html = setMeta(html, 'twitter:title', meta.socialTitle);
  html = setMeta(html, 'twitter:description', meta.socialDescription);
  if (meta.image) {
    html = setMeta(html, 'og:image', meta.image);
    html = setMeta(html, 'twitter:image', meta.image);
  }
  if (meta.publishedTime) {
    html = setMeta(html, 'article:published_time', meta.publishedTime);
  }
  return setCanonical(html, url);
};

/**
 * Point each post URL at its own prerendered file.
 *
 * The rules are written into `dist/_redirects` ahead of the `/blog/*` fallback,
 * so a known post is served its own metadata and an unknown slug still reaches
 * the SPA's not-found view. Generating them from the same list as the files
 * means a post can never have a rule without a file, or a file without a rule.
 */
const writePostRewrites = (dist: string, posts: RouteMeta[]): void => {
  const redirectsPath = path.join(dist, '_redirects');
  if (!fs.existsSync(redirectsPath)) {
    throw new Error('prerender-meta: dist/_redirects not found; post URLs would serve the generic shell');
  }
  const lines = fs.readFileSync(redirectsPath, 'utf8').split(/\r?\n/);
  const fallback = lines.findIndex((line) => /^\/blog\/\*\s/.test(line.trim()));
  if (fallback === -1) {
    throw new Error('prerender-meta: no "/blog/*" rule in _redirects to insert post rewrites ahead of');
  }
  const rules = [
    '# Generated by scripts/prerender-meta.ts: each post is served its own metadata.',
    ...posts.map((post) => `/${post.route}  /${post.route}/index.html  200`),
  ];
  lines.splice(fallback, 0, ...rules);
  fs.writeFileSync(redirectsPath, lines.join('\n'), 'utf8');
};

export const prerenderMetaPlugin = (): Plugin => ({
  name: 'timlin-prerender-meta',
  apply: 'build',
  closeBundle() {
    const dist = path.resolve(process.cwd(), 'dist');
    const shellPath = path.join(dist, 'index.html');
    if (!fs.existsSync(shellPath)) {
      this.error('prerender-meta: dist/index.html not found; cannot emit route metadata');
      return;
    }
    const shell = fs.readFileSync(shellPath, 'utf8');
    const posts = postRoutes();

    for (const meta of [...STATIC_ROUTES, ...posts]) {
      const dir = path.join(dist, meta.route);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), renderRoute(shell, meta), 'utf8');
      // eslint-disable-next-line no-console
      console.log(`  prerendered meta: /${meta.route}/index.html`);
    }

    writePostRewrites(dist, posts);
    // eslint-disable-next-line no-console
    console.log(`  post rewrites: ${posts.length} rules ahead of /blog/*`);
  },
});
