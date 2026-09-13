/**
 * The site's canonical origin, and the only place it is written in code.
 *
 * It has to match what Netlify actually serves, not what looks tidy:
 *
 *   https://www.timlinconnect.com/gateway  301 -> https://timlinconnect.com/gateway
 *   https://timlinconnect.com/gateway      301 -> /gateway/
 *   https://timlinconnect.com/gateway/     200
 *
 * The apex is the primary domain, and any route served from a directory index
 * (`/gateway`, `/blog`, and every post) is redirected to its trailing-slash
 * form. Every canonical link, `og:url` and sitemap entry used to point at the
 * `www` form without the slash, so each one declared a URL that redirected -
 * twice, for `/gateway`. A canonical should be the URL that answers 200.
 *
 * If the primary domain is ever switched to `www` in Netlify, change SITE_URL
 * here and the two literal copies that cannot import it: `index.html` and
 * `public/robots.txt`.
 *
 * Imported by the client (App.tsx) and by the build plugins, so it must stay
 * free of browser- or Vite-only APIs.
 */

export const SITE_URL = 'https://timlinconnect.com';

export const SITE_IMAGE = `${SITE_URL}/logo1.png`;

/** `''` -> `https://timlinconnect.com/`, `'blog/x'` -> `https://timlinconnect.com/blog/x/` */
export const canonicalUrl = (route: string): string => {
  const clean = route.replace(/^\/+|\/+$/g, '');
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
};
