import React from 'react';
import { posts } from '../content/posts';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * The research, on the homepage.
 *
 * It was reachable only through the nav. A visitor could scroll 5,772px of
 * homepage and never learn that any of it exists - past six sections of
 * capability claims, which is the part of this site a competitor with a
 * template could reproduce in an afternoon.
 *
 * The findings are the opposite: seven published write-ups, several of them
 * bugs we found in our own product, and an open evaluation anyone can run
 * against their own guardrail. That is the argument for taking the rest
 * seriously, so it belongs above the argument it supports.
 *
 * Pulled from content/posts, not hand-listed, so publishing a post updates
 * this section - including the date filter, so a scheduled post stays out
 * until its publication date.
 */
const EVAL_REPO = 'https://github.com/timmytrace/suffix-evasion';

const ResearchSection: React.FC = () => {
  const gridRef = useScrollAnimation();
  const latest = posts.slice(0, 3);

  return (
    <section id="research" className="section bg-[#0B0B0B] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Research
          </h2>
          <p
            className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We measure how AI guardrails fail and publish the results, including the ones that are
            unflattering to us. Several of these are bypasses found in our own product. The
            evaluation behind the most recent is open source, so you can run it against your own.
          </p>
        </div>

        <div ref={gridRef} className="stagger-children mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <span
                className="text-xs font-medium uppercase tracking-wider text-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {post.category}
              </span>
              <h3
                className="mt-3 text-lg font-bold leading-snug text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {post.title}
              </h3>
              <p
                className="mt-2.5 flex-1 text-sm leading-relaxed text-white/60"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {post.excerpt}
              </p>
              <span
                className="mt-5 flex items-center gap-2 text-xs text-white/40"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <time dateTime={post.date}>{post.displayDate}</time>
                <span aria-hidden="true">·</span>
                {post.readTime}
              </span>
            </a>
          ))}
        </div>

        <div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-[#0B0B0B] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
          >
            All research
          </a>
          {/*
            External, so it opens in a new tab - and rel="noopener" because a
            target="_blank" link hands the opened page a reference back to
            this one unless you say otherwise.
          */}
          <a
            href={EVAL_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
          >
            The evaluation, on GitHub <span className="ml-1.5" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
