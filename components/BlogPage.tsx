import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Markdown, { extractHeadings, Heading } from '../content/Markdown';
import { BlogPost, categories, getPostBySlug, posts } from '../content/posts';

const HEADING = "'Space Grotesk', sans-serif";
const BODY = "'DM Sans', sans-serif";

/** Reads the active post slug from the URL: /blog/<slug> */
export const slugFromLocation = (): string | null => {
  const match = /^\/blog\/([^/]+)\/?$/.exec(window.location.pathname);
  return match ? decodeURIComponent(match[1]) : null;
};

/* ------------------------------------------------------------------ */
/* Scoped styles                                                       */
/* ------------------------------------------------------------------ */

const blogStyles = `
.tc-blog-grid-bg {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
}
.tc-blog-glow {
  background:
    radial-gradient(600px circle at 78% 12%, rgba(163,230,53,0.16), transparent 60%),
    radial-gradient(520px circle at 8% 88%, rgba(163,230,53,0.09), transparent 60%);
}
@keyframes tcRise {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tc-rise { animation: tcRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.tc-d1 { animation-delay: 60ms; }
.tc-d2 { animation-delay: 130ms; }
.tc-d3 { animation-delay: 200ms; }
.tc-d4 { animation-delay: 280ms; }
.tc-card-img { transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms ease; }
.tc-card:hover .tc-card-img { transform: scale(1.06); filter: grayscale(0%); }
.tc-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-size: 0% 2px;
  background-position: 0 100%;
  transition: background-size 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.tc-card:hover .tc-underline { background-size: 100% 2px; }
/* Long-form reading column: the first paragraph leads without an indent, and
   the serif sizing is handled by the Markdown renderer itself. */
.tc-article-body > p:first-of-type { margin-top: 0; }
.tc-toc-link { transition: color 200ms ease, border-color 200ms ease; }

/* Staggered reveal for the card grid.
   Driven by a CSS animation rather than an observer-toggled class: the grid is
   remounted whenever filters change, so anything that depends on JS adding a
   class after mount would leave the new cards stuck at opacity 0. */
.tc-stagger > * {
  animation: tcRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.tc-stagger > *:nth-child(1) { animation-delay: 0ms; }
.tc-stagger > *:nth-child(2) { animation-delay: 70ms; }
.tc-stagger > *:nth-child(3) { animation-delay: 140ms; }
.tc-stagger > *:nth-child(4) { animation-delay: 210ms; }
.tc-stagger > *:nth-child(5) { animation-delay: 280ms; }
.tc-stagger > *:nth-child(n+6) { animation-delay: 350ms; }

@keyframes tcPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.45; transform: scale(0.85); }
}
.tc-pulse { animation: tcPulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

@media (prefers-reduced-motion: reduce) {
  .tc-rise { animation: none; }
  .tc-pulse { animation: none; }
  .tc-card-img { transition: none; }
  .tc-stagger > * { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/* Navigation helpers                                                  */
/* ------------------------------------------------------------------ */

const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

/** Anchor that navigates client-side but is still a real, crawlable link. */
const RouteLink: React.FC<{
  href: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}> = ({ href, className, ariaLabel, children }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    className={className}
    onClick={(e) => {
      // Let modified clicks (new tab, download) behave natively.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      navigate(href);
    }}
  >
    {children}
  </a>
);

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const ArrowIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CategoryChip: React.FC<{ label: string; active: boolean; count: number; onClick: () => void }> = ({
  label,
  active,
  count,
  onClick,
}) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    style={{ fontFamily: BODY }}
    className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
      active
        ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white shadow-[0_6px_20px_-8px_rgba(11,11,11,0.7)]'
        : 'border-[#E5E5E5] bg-white text-[#6B7280] hover:-translate-y-0.5 hover:border-[#0B0B0B] hover:text-[#0B0B0B]'
    }`}
  >
    {label}
    <span
      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
        active ? 'bg-[#A3E635] text-[#0B0B0B]' : 'bg-[#F0F0F0] text-[#9CA3AF] group-hover:bg-[#E5E5E5]'
      }`}
    >
      {count}
    </span>
  </button>
);

const PostMeta: React.FC<{ post: BlogPost; light?: boolean; className?: string }> = ({
  post,
  light,
  className = '',
}) => (
  <div
    className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium ${
      light ? 'text-white/60' : 'text-[#6B7280]'
    } ${className}`}
    style={{ fontFamily: BODY }}
  >
    <time dateTime={post.date}>{post.displayDate}</time>
    <span aria-hidden="true" className={`h-1 w-1 rounded-full ${light ? 'bg-white/30' : 'bg-[#D1D5DB]'}`} />
    <span>{post.readTime}</span>
  </div>
);

/** "Timilehin Owolabi" → "TO", "Timlin Connect Team" → "TC". */
const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

const Avatar: React.FC<{ name: string; light?: boolean }> = ({ name, light }) => (
  <span
    aria-hidden="true"
    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
      light ? 'bg-[#A3E635] text-[#0B0B0B]' : 'bg-[#0B0B0B] text-[#A3E635]'
    }`}
    style={{ fontFamily: HEADING }}
  >
    {initialsOf(name)}
  </span>
);

const PostCard: React.FC<{ post: BlogPost; compact?: boolean }> = ({ post, compact }) => (
  <RouteLink
    href={`/blog/${post.id}`}
    className="tc-card group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0B0B0B] hover:shadow-[0_28px_60px_-28px_rgba(11,11,11,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
  >
    <div className={`relative w-full overflow-hidden bg-[#E5E5E5] ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
      <img src={post.image} alt="" loading="lazy" className="tc-card-img h-full w-full object-cover grayscale" />
      <span
        className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#0B0B0B]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#A3E635] backdrop-blur"
        style={{ fontFamily: BODY }}
      >
        {post.category}
      </span>
    </div>

    <div className="flex flex-grow flex-col p-6">
      <h3 className={`font-bold leading-snug ${compact ? 'text-lg' : 'text-xl'}`} style={{ fontFamily: HEADING }}>
        <span className="tc-underline">{post.title}</span>
      </h3>
      {!compact && (
        <p className="mt-3 flex-grow text-sm leading-relaxed text-[#6B7280]" style={{ fontFamily: BODY }}>
          {post.excerpt}
        </p>
      )}
      <div
        className={`flex items-center justify-between ${compact ? 'mt-4' : 'mt-6 border-t border-[#F0F0F0] pt-4'}`}
      >
        <PostMeta post={post} />
        {!compact && (
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0] text-[#0B0B0B] transition-colors duration-300 group-hover:bg-[#A3E635]"
            aria-hidden="true"
          >
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  </RouteLink>
);

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */

const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the "active" band toward the top of the viewport.
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents">
      <p
        className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9CA3AF]"
        style={{ fontFamily: BODY }}
      >
        Contents
      </p>
      <ul className="mt-4 space-y-1">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`tc-toc-link block border-l-2 py-1.5 text-sm leading-snug ${
                  heading.level > 2 ? 'pl-6' : 'pl-4'
                } ${
                  active
                    ? 'border-[#A3E635] font-semibold text-[#0B0B0B]'
                    : 'border-[#E5E5E5] text-[#9CA3AF] hover:border-[#D1D5DB] hover:text-[#0B0B0B]'
                }`}
                style={{ fontFamily: BODY }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/* ------------------------------------------------------------------ */
/* Article view                                                        */
/* ------------------------------------------------------------------ */

const ArticleView: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - el.offsetTop;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.id]);

  const headings: Heading[] = useMemo(() => extractHeadings(post.body), [post.body]);

  const related = useMemo(() => {
    const sameCategory = posts.filter((p) => p.id !== post.id && p.category === post.category);
    const others = posts.filter((p) => p.id !== post.id && p.category !== post.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [post.id, post.category]);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.id}` : '';

  const copyLink = useCallback(() => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [shareUrl]);

  return (
    <main className="flex-grow bg-[#FAFAFA] text-[#0B0B0B]">
      <style>{blogStyles}</style>

      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
        <div className="h-full bg-[#A3E635] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <article ref={articleRef}>
        {/* Dark article header */}
        <header className="relative overflow-hidden bg-[#0B0B0B] pt-28 pb-40 text-white sm:pt-32 sm:pb-48">
          <div className="pointer-events-none absolute inset-0 tc-blog-glow" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 tc-blog-grid-bg" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-[42.5rem] px-4 sm:px-6">
            <RouteLink
              href="/blog"
              className="tc-rise inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span style={{ fontFamily: BODY }}>All articles</span>
            </RouteLink>

            <p
              className="tc-rise tc-d1 mt-8 inline-flex items-center rounded-full bg-[#A3E635] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0B0B0B]"
              style={{ fontFamily: BODY }}
            >
              {post.category}
            </p>

            <h1
              className="tc-rise tc-d2 mt-5 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[3.25rem]"
              style={{ fontFamily: HEADING }}
            >
              {post.title}
            </h1>

            <p
              className="tc-rise tc-d3 mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
              style={{ fontFamily: BODY }}
            >
              {post.excerpt}
            </p>

            <div className="tc-rise tc-d4 mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
              <Avatar name={post.author} light />
              <div>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: BODY }}>
                  {post.author}
                </p>
                <p className="text-xs text-white/50" style={{ fontFamily: BODY }}>
                  {post.authorRole}
                </p>
              </div>
              <div className="ml-auto">
                <PostMeta post={post} light />
              </div>
            </div>
          </div>
        </header>

        {/* Hero image overlapping the header */}
        <div className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6">
          <div className="mx-auto max-w-[48rem] overflow-hidden rounded-2xl border border-white/10 bg-[#E5E5E5] shadow-[0_30px_70px_-30px_rgba(11,11,11,0.6)]">
            <div className="aspect-[16/9] w-full">
              <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative mx-auto mt-12 max-w-[42.5rem] px-4 sm:px-6">
          {/* Contents rail — only where there is room beside the reading column. */}
          <aside className="absolute left-full top-0 hidden h-full w-56 pl-8 xl:block">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          <Markdown source={post.body} className="tc-article-body" />

          {/* Share row */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-[#E5E5E5] py-5">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#9CA3AF]" style={{ fontFamily: BODY }}>
              Share
            </span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#0B0B0B] hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.02h4.52V24H.24V8.02zm7.9 0h4.33v2.18h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.41 3 5.41 6.9V24h-4.52v-7.4c0-1.77-.03-4.04-2.46-4.04-2.47 0-2.85 1.93-2.85 3.92V24H8.14V8.02z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#0B0B0B] hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button
              onClick={copyLink}
              aria-label="Copy link to article"
              style={{ fontFamily: BODY }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-xs font-semibold text-[#6B7280] transition-all hover:-translate-y-0.5 hover:border-[#0B0B0B] hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5"
                />
              </svg>
              {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>

          {/* Takeaways */}
          {post.takeaways.length > 0 && (
            <aside className="mt-10 overflow-hidden rounded-2xl bg-[#0B0B0B] p-7 text-white sm:p-9">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#A3E635]" aria-hidden="true" />
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/50" style={{ fontFamily: BODY }}>
                  Key takeaways
                </h2>
              </div>
              <ul className="mt-6 space-y-5">
                {post.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 text-sm font-bold text-[#A3E635]" style={{ fontFamily: HEADING }} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-white/80 sm:text-base" style={{ fontFamily: BODY }}>
                      {takeaway}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-[#E5E5E5] bg-white p-7 sm:p-9">
            <h2 className="text-xl font-bold sm:text-2xl" style={{ fontFamily: HEADING }}>
              Need help putting this into practice?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280] sm:text-base" style={{ fontFamily: BODY }}>
              Timlin Connect helps organizations turn guidance like this into working security programs.
            </p>
            <a
              href="/#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0B0B0B] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0B0B0B]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              style={{ fontFamily: BODY }}
            >
              Talk to Us
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: HEADING }}>
                Keep reading
              </h2>
              <RouteLink
                href="/blog"
                className="text-sm font-semibold text-[#6B7280] transition-colors hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                <span style={{ fontFamily: BODY }}>View all</span>
              </RouteLink>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} compact />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
};

/* ------------------------------------------------------------------ */
/* Index view                                                          */
/* ------------------------------------------------------------------ */

const BlogIndex: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    posts.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesQuery =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const isDefaultView = activeCategory === 'All' && query.trim() === '';
  const featuredPost = isDefaultView ? filteredPosts[0] : undefined;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const resetFilters = () => {
    setQuery('');
    setActiveCategory('All');
  };

  return (
    <main className="flex-grow bg-[#FAFAFA] text-[#0B0B0B]">
      <style>{blogStyles}</style>

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-[#0B0B0B] pt-28 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 tc-blog-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 tc-blog-grid-bg" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p
                className="tc-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur"
                style={{ fontFamily: BODY }}
              >
                <span className="tc-pulse h-1.5 w-1.5 rounded-full bg-[#A3E635]" aria-hidden="true" />
                Insights &amp; Guides
              </p>

              <h1
                className="tc-rise tc-d1 mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
                style={{ fontFamily: HEADING }}
              >
                Field notes on
                <br />
                <span className="text-[#A3E635]">security that works.</span>
              </h1>

              <p
                className="tc-rise tc-d2 mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
                style={{ fontFamily: BODY }}
              >
                Practical thinking on cybersecurity, compliance, and AI security — written for the people
                who have to make it work, not just pass the audit.
              </p>

              {/* Search */}
              <div className="tc-rise tc-d3 mt-9 max-w-md">
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                  <input
                    id="blog-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles…"
                    style={{ fontFamily: BODY }}
                    className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur transition-colors focus:border-[#A3E635]/60 focus:bg-white/10 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Stats rail */}
            <div className="tc-rise tc-d4 lg:col-span-4">
              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {[
                  { value: String(posts.length), label: 'Articles' },
                  { value: String(categories.length - 1), label: 'Topics' },
                  { value: posts[0]?.date.slice(0, 4) ?? '', label: 'Latest' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#0B0B0B]/80 px-4 py-6 text-center backdrop-blur">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-bold text-[#A3E635] sm:text-3xl" style={{ fontFamily: HEADING }}>
                        {stat.value}
                      </span>
                      <span
                        className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45"
                        style={{ fontFamily: BODY }}
                      >
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Sticky filter bar ---------------- */}
      <div className="sticky top-20 z-30 border-b border-[#E5E5E5] bg-[#FAFAFA]/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles by category">
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                count={counts[category] ?? 0}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
            {!isDefaultView && (
              <button
                onClick={resetFilters}
                style={{ fontFamily: BODY }}
                className="ml-auto text-xs font-semibold text-[#9CA3AF] underline underline-offset-4 transition-colors hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Featured ---------------- */}
      {featuredPost && (
        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <RouteLink
              href={`/blog/${featuredPost.id}`}
              className="tc-card group grid w-full overflow-hidden rounded-3xl bg-[#0B0B0B] text-left text-white transition-all duration-500 hover:shadow-[0_40px_80px_-40px_rgba(11,11,11,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] lg:grid-cols-12"
            >
              <div className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:col-span-6 lg:p-14">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center rounded-full bg-[#A3E635] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B0B0B]"
                    style={{ fontFamily: BODY }}
                  >
                    Featured
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50" style={{ fontFamily: BODY }}>
                    {featuredPost.category}
                  </span>
                </div>

                <h2
                  className="mt-5 text-2xl font-bold leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.5rem]"
                  style={{ fontFamily: HEADING }}
                >
                  <span className="tc-underline">{featuredPost.title}</span>
                </h2>

                <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base" style={{ fontFamily: BODY }}>
                  {featuredPost.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <Avatar name={featuredPost.author} light />
                  <div>
                    <p className="text-sm font-semibold" style={{ fontFamily: BODY }}>
                      {featuredPost.author}
                    </p>
                    <PostMeta post={featuredPost} light className="mt-0.5" />
                  </div>
                  <span
                    className="ml-auto inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-[#A3E635] transition-all duration-300 group-hover:border-[#A3E635] group-hover:bg-[#A3E635] group-hover:text-[#0B0B0B]"
                    aria-hidden="true"
                  >
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="relative order-1 aspect-[16/10] w-full overflow-hidden lg:order-2 lg:col-span-6 lg:aspect-auto lg:min-h-[26rem]">
                <img
                  src={featuredPost.image}
                  alt=""
                  loading="lazy"
                  className="tc-card-img h-full w-full object-cover opacity-90 grayscale"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0B0B0B] lg:via-[#0B0B0B]/20 lg:to-transparent"
                  aria-hidden="true"
                />
              </div>
            </RouteLink>
          </div>
        </section>
      )}

      {/* ---------------- Grid ---------------- */}
      <section className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {gridPosts.length > 0 ? (
            <>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#9CA3AF]" style={{ fontFamily: BODY }}>
                  {isDefaultView
                    ? 'More articles'
                    : `${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'}`}
                </h2>
                <span className="h-px flex-grow bg-[#E5E5E5]" aria-hidden="true" />
              </div>

              <div
                key={`${activeCategory}-${query}`}
                className="tc-stagger grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {gridPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D1D5DB] bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold" style={{ fontFamily: HEADING }}>
                No articles found
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#6B7280]" style={{ fontFamily: BODY }}>
                Nothing matches that search yet. Try a different term or browse all topics.
              </p>
              <button
                onClick={resetFilters}
                style={{ fontFamily: BODY }}
                className="mt-6 inline-flex items-center rounded-lg bg-[#0B0B0B] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0B0B0B]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#0B0B0B] p-8 text-white sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute inset-0 tc-blog-glow" aria-hidden="true" />
            <div className="relative z-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A3E635]" style={{ fontFamily: BODY }}>
                  Work with us
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl" style={{ fontFamily: HEADING }}>
                  Want guidance like this for your organization?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base" style={{ fontFamily: BODY }}>
                  From risk assessments to AI security, we help teams turn good intentions into working
                  controls. Tell us what you are up against.
                </p>
              </div>
              <a
                href="/#contact"
                className="group mt-8 inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-[#A3E635] px-7 py-3.5 text-sm font-semibold text-[#0B0B0B] transition-all duration-300 hover:bg-[#A3E635]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:mt-0"
                style={{ fontFamily: BODY }}
              >
                Get in Touch
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ------------------------------------------------------------------ */
/* Not found                                                           */
/* ------------------------------------------------------------------ */

const PostNotFound: React.FC = () => (
  <main className="relative flex flex-grow items-center bg-[#0B0B0B] px-4 py-32 text-white sm:px-6 lg:px-8">
    <style>{blogStyles}</style>
    <div className="pointer-events-none absolute inset-0 tc-blog-glow" aria-hidden="true" />
    <div className="relative z-10 mx-auto max-w-xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A3E635]" style={{ fontFamily: BODY }}>
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl" style={{ fontFamily: HEADING }}>
        We couldn't find that article
      </h1>
      <p className="mt-4 text-white/60" style={{ fontFamily: BODY }}>
        It may have been renamed or moved. Everything we've published is on the main blog page.
      </p>
      <RouteLink
        href="/blog"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#A3E635] px-6 py-3 text-sm font-semibold text-[#0B0B0B] transition-all hover:bg-[#A3E635]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span style={{ fontFamily: BODY }}>Browse all articles</span>
      </RouteLink>
    </div>
  </main>
);

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const BlogPage: React.FC = () => {
  const [slug, setSlug] = useState<string | null>(() => slugFromLocation());

  useEffect(() => {
    const sync = () => setSlug(slugFromLocation());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!slug) return <BlogIndex />;

  const post = getPostBySlug(slug);
  return post ? <ArticleView post={post} /> : <PostNotFound />;
};

export default BlogPage;
