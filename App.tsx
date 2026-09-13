import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhoWeHelpSection from './components/WhoWeHelpSection';
import HowWeWorkSection from './components/HowWeWorkSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import GatewayTeaserSection from './components/GatewayTeaserSection';
import GatewayPage from './components/GatewayPage';
import BlogPage from './components/BlogPage';
import { getPostBySlug } from './content/posts';
import { SITE_IMAGE, SITE_URL, canonicalUrl } from './content/site';

const HOME_TITLE = 'Timlin Connect | Cybersecurity Services - Risk Assessments, Pen Testing & vCISO';
const HOME_DESCRIPTION = 'Timlin Connect provides practical cybersecurity services including risk assessments, penetration testing, compliance readiness (SOC 2, ISO 27001, GDPR, CCPA), and Virtual CISO advisory. Clear guidance, real results.';
const GATEWAY_TITLE = 'Timlin Gateway | AI Security Gateway by Timlin Connect';
const GATEWAY_DESCRIPTION = 'Timlin Gateway is a self-hosted AI security gateway from Timlin Connect. 98.7% prompt-injection recall at a 2.0% false-positive rate, measured on a held-out set, with the known gaps published alongside.';
const BLOG_TITLE = 'Blog | Timlin Connect - Cybersecurity, Compliance & AI Security Insights';
const BLOG_DESCRIPTION = 'Practical articles from Timlin Connect on cybersecurity, compliance readiness, penetration testing, incident response, and AI security for LLM applications.';

const ARTICLE_SCHEMA_ID = 'article-schema';

const setMetaContent = (selector: string, content: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', content);
  }
};

const setCanonical = (url: string) => {
  const link = document.querySelector('link[rel="canonical"]');
  if (link) {
    link.setAttribute('href', url);
  }
};

/**
 * Applies page metadata in one pass. Because this is a single-page app, every
 * route change has to rewrite the tags that crawlers and link unfurlers read.
 */
const applyMeta = (opts: {
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
}) => {
  const socialTitle = opts.socialTitle ?? opts.title;
  const socialDescription = opts.socialDescription ?? opts.description;
  const image = opts.image ?? SITE_IMAGE;

  document.title = opts.title;
  setMetaContent('meta[name="description"]', opts.description);
  setMetaContent('meta[property="og:title"]', socialTitle);
  setMetaContent('meta[property="og:description"]', socialDescription);
  setMetaContent('meta[property="og:url"]', opts.url);
  setMetaContent('meta[property="og:image"]', image);
  setMetaContent('meta[property="og:type"]', opts.type ?? 'website');
  setMetaContent('meta[name="twitter:title"]', socialTitle);
  setMetaContent('meta[name="twitter:description"]', socialDescription);
  setMetaContent('meta[name="twitter:image"]', image);
  setCanonical(opts.url);
};

/** Adds (or removes) BlogPosting structured data for the current article. */
const setArticleSchema = (schema: object | null) => {
  const existing = document.getElementById(ARTICLE_SCHEMA_ID);
  if (existing) existing.remove();
  if (!schema) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = ARTICLE_SCHEMA_ID;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Compare paths without letting a trailing slash decide the route.
 *
 * `/gateway` is served from a prerendered `gateway/index.html`, and hosts
 * resolve that directory index under both `/gateway` and `/gateway/`. Matching
 * the exact string meant the slashed form fell through every branch and
 * rendered the homepage under the product URL.
 */
const normalisePath = (value: string): string => {
  const trimmed = value.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const App: React.FC = () => {
  const [pathname, setPathname] = useState(() => normalisePath(window.location.pathname));

  // Client-side navigation dispatches popstate; keep routing in sync with it.
  useEffect(() => {
    const sync = () => setPathname(normalisePath(window.location.pathname));
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const isGatewayPage = useMemo(
    () =>
      pathname === '/gateway' ||
      // Superseded paths. Netlify 301s these, but a client-side navigation from a
      // stale in-page link never touches the server, so they are matched here too.
      pathname === '/magnum-ai' ||
      pathname === '/products/magnum-ai',
    [pathname]
  );

  const isBlogPage = useMemo(() => pathname === '/blog' || pathname.startsWith('/blog/'), [pathname]);

  const postSlug = useMemo(() => {
    const match = /^\/blog\/([^/]+)\/?$/.exec(pathname);
    return match ? decodeURIComponent(match[1]) : null;
  }, [pathname]);

  useEffect(() => {
    const post = postSlug ? getPostBySlug(postSlug) : undefined;

    if (post) {
      const url = canonicalUrl(`blog/${post.id}`);
      const image = post.image ? `${SITE_URL}${encodeURI(post.image)}` : SITE_IMAGE;

      applyMeta({
        title: `${post.title} | Timlin Connect`,
        description: post.excerpt,
        url,
        image,
        type: 'article',
      });

      setArticleSchema({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        author: { '@type': 'Organization', name: post.author, url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          name: 'Timlin Connect',
          logo: { '@type': 'ImageObject', url: SITE_IMAGE },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      });
      return;
    }

    setArticleSchema(null);

    if (isBlogPage) {
      applyMeta({
        title: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        url: canonicalUrl('blog'),
      });
      return;
    }

    if (isGatewayPage) {
      applyMeta({
        title: GATEWAY_TITLE,
        description: GATEWAY_DESCRIPTION,
        url: canonicalUrl('gateway'),
      });
      return;
    }

    applyMeta({
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      socialTitle: 'Timlin Connect | Cybersecurity Services',
      socialDescription:
        "Practical cybersecurity services - risk assessments, pen testing, compliance readiness, and vCISO advisory. Protect what you've built.",
      url: canonicalUrl(''),
    });
  }, [isGatewayPage, isBlogPage, postSlug]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0B0B0B] selection:bg-[#A3E635] selection:text-[#0B0B0B]">
      <Navbar />
      {isBlogPage ? (
        <BlogPage />
      ) : isGatewayPage ? (
        <GatewayPage />
      ) : (
        <main className="flex-grow">
          <HeroSection />
          <ServicesSection />
          <WhoWeHelpSection />
          <HowWeWorkSection />
          <WhyChooseUsSection />
          <GatewayTeaserSection />
          <AboutSection />
          <ContactSection />
        </main>
      )}
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default App;
