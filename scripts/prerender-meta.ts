import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

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
 * Adding a route means adding an entry here. Failing to do so is visible —
 * the build reports which files it wrote.
 */

const SITE_URL = 'https://www.timlinconnect.com';

type RouteMeta = {
  route: string;
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
  image?: string;
};

const ROUTES: RouteMeta[] = [
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
    title: 'Blog | Timlin Connect - Cybersecurity, Compliance & AI Security Insights',
    description:
      'Practical articles from Timlin Connect on cybersecurity, compliance readiness, penetration testing, incident response, and AI security for LLM applications.',
    socialTitle: 'Timlin Connect Blog',
    socialDescription:
      'Practical writing on cybersecurity, compliance readiness, penetration testing, and AI security.',
  },
];

/** Replace a meta tag's content, matching either attribute order. */
const setMeta = (html: string, key: string, value: string): string => {
  const attr = key.startsWith('og:') ? 'property' : 'name';
  const escaped = value.replace(/"/g, '&quot;');
  const forward = new RegExp(
    `(<meta[^>]+${attr}="${key}"[^>]*content=")[^"]*(")`,
    'i'
  );
  if (forward.test(html)) return html.replace(forward, `$1${escaped}$2`);
  const reverse = new RegExp(
    `(<meta[^>]+content=")[^"]*("[^>]*${attr}="${key}")`,
    'i'
  );
  if (reverse.test(html)) return html.replace(reverse, `$1${escaped}$2`);
  // Absent rather than present-and-wrong: insert it so the route is still correct.
  return html.replace(/<\/head>/i, `  <meta ${attr}="${key}" content="${escaped}">\n</head>`);
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

    for (const meta of ROUTES) {
      let html = shell;
      html = html.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${meta.title.replace(/</g, '&lt;')}</title>`
      );
      html = setMeta(html, 'description', meta.description);
      html = setMeta(html, 'og:title', meta.socialTitle);
      html = setMeta(html, 'og:description', meta.socialDescription);
      html = setMeta(html, 'og:url', `${SITE_URL}/${meta.route}`);
      html = setMeta(html, 'twitter:title', meta.socialTitle);
      html = setMeta(html, 'twitter:description', meta.socialDescription);
      if (meta.image) {
        html = setMeta(html, 'og:image', meta.image);
        html = setMeta(html, 'twitter:image', meta.image);
      }

      const dir = path.join(dist, meta.route);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
      // eslint-disable-next-line no-console
      console.log(`  prerendered meta: /${meta.route}/index.html`);
    }
  },
});
