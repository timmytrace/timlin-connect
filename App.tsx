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
import MagnumTeaserSection from './components/MagnumTeaserSection';
import MagnumAIPage from './components/MagnumAIPage';
import BlogPage from './components/BlogPage';
import { getPostBySlug } from './content/posts';

const SITE_URL = 'https://www.timlinconnect.com';
const SITE_IMAGE = `${SITE_URL}/logo1.png`;

const HOME_TITLE = 'Timlin Connect | Cybersecurity Services - Risk Assessments, Pen Testing & vCISO';
const HOME_DESCRIPTION = 'Timlin Connect provides practical cybersecurity services including risk assessments, penetration testing, compliance readiness (SOC 2, ISO 27001, GDPR, CCPA), and Virtual CISO advisory. Clear guidance, real results.';
const MAGNUM_TITLE = 'MagNum AI | AI Security Gateway by Timlin Connect';
const MAGNUM_DESCRIPTION = 'MagNum AI is an upcoming AI security gateway from Timlin Connect, designed to help protect LLM applications from prompt injection, sensitive data leakage, unsafe outputs, and risky AI agent behavior.';
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

const App: React.FC = () => {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  // Client-side navigation dispatches popstate; keep routing in sync with it.
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const isMagnumPage = useMemo(
    () => pathname === '/magnum-ai' || pathname === '/products/magnum-ai',
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
      const url = `${SITE_URL}/blog/${post.id}`;
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
        url: `${SITE_URL}/blog`,
      });
      return;
    }

    if (isMagnumPage) {
      applyMeta({
        title: MAGNUM_TITLE,
        description: MAGNUM_DESCRIPTION,
        url: `${SITE_URL}/magnum-ai`,
      });
      return;
    }

    applyMeta({
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      socialTitle: 'Timlin Connect | Cybersecurity Services',
      socialDescription:
        "Practical cybersecurity services - risk assessments, pen testing, compliance readiness, and vCISO advisory. Protect what you've built.",
      url: SITE_URL,
    });
  }, [isMagnumPage, isBlogPage, postSlug]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0B0B0B] selection:bg-[#A3E635] selection:text-[#0B0B0B]">
      <Navbar />
      {isBlogPage ? (
        <BlogPage />
      ) : isMagnumPage ? (
        <MagnumAIPage />
      ) : (
        <main className="flex-grow">
          <HeroSection />
          <ServicesSection />
          <WhoWeHelpSection />
          <HowWeWorkSection />
          <WhyChooseUsSection />
          <MagnumTeaserSection />
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
