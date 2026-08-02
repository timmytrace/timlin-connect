import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  body: string[];
  takeaways: string[];
}

const posts: BlogPost[] = [
  {
    id: 'ai-security-gateway-why-now',
    title: 'Why Every LLM Application Needs a Security Gateway',
    excerpt:
      'Prompt injection, data leakage, and rogue agent actions are not edge cases anymore. Here is why a dedicated security layer between your users and your models is becoming table stakes.',
    category: 'AI Security',
    date: 'July 24, 2026',
    readTime: '7 min read',
    author: 'Timlin Connect Team',
    authorRole: 'AI Security Research',
    image: '/magnumai-demo/dashboard-overview.png',
    body: [
      'Large Language Models are now embedded in customer support flows, internal knowledge tools, and autonomous agents that can send emails, query databases, and call APIs. Every one of those integrations is a new attack surface, and the attacks do not look like traditional exploits. They look like ordinary text.',
      'Prompt injection remains the most reliable way to subvert an LLM application. An attacker does not need to break your infrastructure; they only need to convince your model that their instructions outrank yours. That can happen directly in a chat box, or indirectly through a poisoned webpage, PDF, or email that your RAG pipeline retrieves and hands to the model as trusted context.',
      'The failure modes compound when agents enter the picture. A model that has been manipulated into a new "role" is one tool call away from exfiltrating data or taking an action on behalf of an attacker. Traditional WAFs and API gateways were never designed to reason about this class of threat, because the payload is semantics, not syntax.',
      'A dedicated AI security gateway addresses this by scanning every prompt on the way in and every response on the way out: layered detection for injection and jailbreak patterns, DLP for secrets and PII, trust-tiered scanning for retrieved content, and policy enforcement for agent tool calls. Crucially, it also logs everything with risk scores, because you cannot defend what you cannot see.',
      'If you are building on LLMs today, the question is no longer whether you need this layer, but whether you build it yourself or adopt one. Either way, the time to put it in place is before your first incident, not after.',
    ],
    takeaways: [
      'Prompt injection targets model semantics, so traditional gateways and WAFs miss it entirely.',
      'Indirect injection through retrieved content is the fastest-growing attack path for RAG apps.',
      'Scan both input and output, enforce tool-call policy, and log every interaction with a risk score.',
    ],
  },
  {
    id: 'prompt-injection-primer',
    title: 'Prompt Injection, Explained for Security Teams',
    excerpt:
      'A practical primer on direct and indirect prompt injection: how the attacks work, why they bypass conventional controls, and the layered defenses that actually help.',
    category: 'AI Security',
    date: 'July 10, 2026',
    readTime: '6 min read',
    author: 'Timlin Connect Team',
    authorRole: 'AI Security Research',
    image: '/magnumai-demo/blocked-requests.png',
    body: [
      'Prompt injection is best understood as social engineering against a machine. Instead of tricking an employee into wiring money, the attacker tricks a model into ignoring its instructions, revealing its system prompt, or taking an action its operators never intended.',
      'Direct injection happens in the user-facing input: "ignore all previous instructions", role-play jailbreaks, token smuggling through encodings, or invisible Unicode characters that hide instructions from human reviewers while remaining perfectly legible to the model.',
      'Indirect injection is subtler and more dangerous. The attacker plants instructions in content the application will later retrieve: a webpage the model summarizes, a resume it screens, an email it triages. The application delivers the payload to itself.',
      'No single control stops this. Effective defense stacks several layers: evasion-resistant normalization before scanning, pattern and heuristic detection, semantic classification, and for high-stakes decisions an LLM judge that adjudicates uncertain cases. Retrieved content should carry a trust level, and nothing untrusted should ever be able to trigger a tool call on its own.',
      'Finally, treat detections as telemetry, not just blocks. The prompts your gateway flags are free threat intelligence about who is probing your application and how.',
    ],
    takeaways: [
      'Direct injection abuses the input box; indirect injection abuses your retrieval pipeline.',
      'Normalization first: attackers hide payloads in encodings, split tokens, and invisible characters.',
      'Untrusted content must never be able to trigger an agent tool call without a human in the loop.',
    ],
  },
  {
    id: 'soc2-startup-roadmap',
    title: 'A Realistic SOC 2 Roadmap for Startups',
    excerpt:
      'SOC 2 does not have to consume your engineering team for a year. A staged approach: scope tightly, automate evidence, and treat the audit as a byproduct of good operations.',
    category: 'Compliance',
    date: 'June 26, 2026',
    readTime: '8 min read',
    author: 'Timlin Connect Team',
    authorRole: 'Compliance Advisory',
    image: '/compliance & privacy readiness.png',
    body: [
      'For most startups, SOC 2 arrives as an ultimatum: a flagship customer will not sign until you have a report. The instinct is to panic-buy a compliance platform and start generating policies. The better move is to slow down for one week and scope properly.',
      'Start with the Trust Services Criteria you actually need. Almost everyone begins with Security alone; add Availability or Confidentiality only if your customers demand them. Then draw the system boundary tightly around the product that processes customer data, not your entire company.',
      'Next, map what you already do. Most engineering teams already practice code review, least-privilege access, and infrastructure as code. SOC 2 largely asks you to formalize and evidence what good teams do anyway. The gap analysis usually surfaces a handful of real gaps: offboarding discipline, vendor review, risk assessment cadence, and incident response documentation.',
      'Automate evidence collection early. Screenshots gathered by hand the week before an audit are the most expensive artifacts in compliance. Tie evidence to systems of record so it accrues continuously.',
      'Plan for a Type I report as a milestone if a customer needs paper quickly, but design your controls for the Type II observation window from day one. A realistic timeline for a focused startup is three to five months to audit-ready, not a year.',
    ],
    takeaways: [
      'Scope Security first; add other Trust Services Criteria only under real customer pressure.',
      'A tight system boundary is the single biggest cost lever in a SOC 2 program.',
      'Automated, continuous evidence beats a heroic screenshot sprint before the audit.',
    ],
  },
  {
    id: 'pentest-value',
    title: 'How to Get Real Value From a Penetration Test',
    excerpt:
      'Too many pen tests end as a PDF nobody reads. How to scope, run, and act on a test so it actually reduces risk instead of just satisfying a checkbox.',
    category: 'Offensive Security',
    date: 'June 12, 2026',
    readTime: '5 min read',
    author: 'Timlin Connect Team',
    authorRole: 'Offensive Security',
    image: '/penetration testing.png',
    body: [
      'A penetration test is a simulation of a motivated attacker with a deadline. Done well, it tells you which of your assumptions fail under pressure. Done poorly, it produces a ranked list of CVEs your scanner already knew about.',
      'Value starts with scoping. Give testers the same starting point a realistic attacker would have: an external footprint, a phished employee credential, or a compromised low-privilege account. Decide up front which crown jewels matter, and ask the testers to demonstrate impact against those, not just collect findings.',
      'During the test, insist on communication. A good team tells you immediately when they find something critical, rather than saving it for the report. A finding you fix mid-engagement is a finding the retest can verify for free.',
      'After the test, resist the urge to fix findings one by one from the severity column. Look for the classes of failure behind them: a missing patching process, over-broad internal network access, secrets in repositories. One systemic fix often closes a dozen findings and prevents next year\'s duplicates.',
      'Finally, schedule the retest before the report goes stale. The deliverable of a pen test is not the PDF; it is the verified closure of the paths an attacker would actually take.',
    ],
    takeaways: [
      'Scope around impact on crown jewels, not coverage of IP ranges.',
      'Fix classes of failure, not individual findings sorted by severity.',
      'The retest, not the report, is the real deliverable.',
    ],
  },
  {
    id: 'vciso-when-to-hire',
    title: 'When Does a Growing Company Need a vCISO?',
    excerpt:
      'The signals that you have outgrown ad-hoc security decisions, and what a fractional security leader should actually deliver in the first ninety days.',
    category: 'Leadership',
    date: 'May 29, 2026',
    readTime: '6 min read',
    author: 'Timlin Connect Team',
    authorRole: 'vCISO Practice',
    image: '/virtual ciso.png',
    body: [
      'Most companies do not need a full-time CISO at fifty employees. What they need is someone accountable for security decisions, because by that size the decisions are already being made, just implicitly, by whoever is closest to the keyboard.',
      'The signals are consistent: security questionnaires from customers are consuming engineering time; an audit or certification is on the horizon; cyber insurance renewal came with new conditions; or the board has started asking questions nobody owns.',
      'A virtual CISO closes that gap at a fraction of a full-time hire. But the title matters less than the mandate. In the first ninety days, a good vCISO should deliver three things: a risk assessment that ranks what can actually hurt the business, a pragmatic roadmap sequenced by risk reduction per unit of effort, and a reporting rhythm that gives leadership visibility without theater.',
      'What a vCISO should not be is a policy vending machine. Documents that do not change behavior are compliance wallpaper. Every policy should trace to a control someone operates, and every control to a risk someone named.',
      'The engagement succeeds when security decisions stop being surprises: when procurement, engineering, and leadership all know who to ask, and the answer arrives with context instead of a veto.',
    ],
    takeaways: [
      'The trigger is accountability, not headcount: someone must own security decisions.',
      'Expect a risk assessment, a sequenced roadmap, and a reporting rhythm in ninety days.',
      'Policies that do not change behavior are wallpaper; insist on operated controls.',
    ],
  },
  {
    id: 'incident-response-tabletop',
    title: 'Your First Tabletop Exercise: A Field Guide',
    excerpt:
      'An incident response plan that has never been rehearsed is a hypothesis. How to run a first tabletop that finds the gaps before a real incident does.',
    category: 'Incident Response',
    date: 'May 15, 2026',
    readTime: '5 min read',
    author: 'Timlin Connect Team',
    authorRole: 'Incident Response',
    image: '/Incident Response Planning.png',
    body: [
      'The first time your team opens the incident response plan should not be during an incident. A tabletop exercise is a low-cost rehearsal: gather the people who would actually respond, walk through a realistic scenario, and watch where the plan meets reality.',
      'Pick a scenario that is plausible for your business, not a Hollywood plot. A ransomware note on a file server, a leaked API key discovered in a public repository, or a phished finance mailbox will surface more truth than a nation-state thriller.',
      'Run it as a conversation, not a quiz. The facilitator advances the clock and injects complications: the backup restore is slower than expected, a journalist emails, legal asks whether notification deadlines apply. The goal is to discover decisions nobody has pre-made, like who can authorize taking production offline, and what the company says publicly in hour one.',
      'Capture every friction point without assigning blame. The output is a short list of concrete fixes: contacts that were stale, roles that overlapped, a decision authority that did not exist, systems whose recovery had never been tested.',
      'Then, and this is where most programs fail, fix them and schedule the next exercise. A tabletop every six months keeps the plan honest and the muscle memory warm.',
    ],
    takeaways: [
      'Rehearse with plausible scenarios: ransomware, leaked keys, phished mailboxes.',
      'Tabletops surface unmade decisions, like who can take production offline.',
      'The output is a fix list with owners, and a date for the next exercise.',
    ],
  },
];

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

const HEADING = "'Space Grotesk', sans-serif";
const BODY = "'DM Sans', sans-serif";

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
.tc-article-body > p:first-of-type::first-letter {
  float: left;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.6rem;
  line-height: 0.82;
  font-weight: 700;
  padding: 0.32rem 0.7rem 0 0;
  color: #0B0B0B;
}
/* Staggered reveal for the card grid (self-contained: styles.css is not linked). */
.tc-stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.tc-stagger.is-visible > * { opacity: 1; transform: translateY(0); }
.tc-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms; }
.tc-stagger.is-visible > *:nth-child(2) { transition-delay: 70ms; }
.tc-stagger.is-visible > *:nth-child(3) { transition-delay: 140ms; }
.tc-stagger.is-visible > *:nth-child(4) { transition-delay: 210ms; }
.tc-stagger.is-visible > *:nth-child(5) { transition-delay: 280ms; }
.tc-stagger.is-visible > *:nth-child(6) { transition-delay: 350ms; }

@keyframes tcPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.45; transform: scale(0.85); }
}
.tc-pulse { animation: tcPulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

@media (prefers-reduced-motion: reduce) {
  .tc-rise { animation: none; }
  .tc-pulse { animation: none; }
  .tc-card-img { transition: none; }
  .tc-stagger > * { opacity: 1; transform: none; transition: none; }
}
`;

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
    <span>{post.date}</span>
    <span aria-hidden="true" className={`h-1 w-1 rounded-full ${light ? 'bg-white/30' : 'bg-[#D1D5DB]'}`} />
    <span>{post.readTime}</span>
  </div>
);

const Avatar: React.FC<{ light?: boolean }> = ({ light }) => (
  <span
    aria-hidden="true"
    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
      light ? 'bg-[#A3E635] text-[#0B0B0B]' : 'bg-[#0B0B0B] text-[#A3E635]'
    }`}
    style={{ fontFamily: HEADING }}
  >
    TC
  </span>
);

/* ------------------------------------------------------------------ */
/* Article view                                                        */
/* ------------------------------------------------------------------ */

const ArticleView: React.FC<{ post: BlogPost; onBack: () => void; onSelect: (p: BlogPost) => void }> = ({
  post,
  onBack,
  onSelect,
}) => {
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

  const related = useMemo(() => {
    const sameCategory = posts.filter((p) => p.id !== post.id && p.category === post.category);
    const others = posts.filter((p) => p.id !== post.id && p.category !== post.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [post.id, post.category]);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog#${post.id}` : '';

  const copyLink = useCallback(() => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [shareUrl]);

  return (
    <main className="flex-grow bg-[#FAFAFA] text-[#0B0B0B]">
      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
        <div className="h-full bg-[#A3E635] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <article ref={articleRef}>
        {/* Dark article header */}
        <header className="relative overflow-hidden bg-[#0B0B0B] pt-28 pb-40 text-white sm:pt-32 sm:pb-48">
          <div className="pointer-events-none absolute inset-0 tc-blog-glow" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 tc-blog-grid-bg" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBack}
              style={{ fontFamily: BODY }}
              className="tc-rise inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All articles
            </button>

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
              <Avatar light />
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
        <div className="relative z-10 -mt-28 px-4 sm:-mt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#E5E5E5] shadow-[0_30px_70px_-30px_rgba(11,11,11,0.6)]">
            <div className="aspect-[16/9] w-full">
              <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="tc-article-body mt-12 space-y-6">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-[1.0625rem] leading-[1.85] text-[#374151] sm:text-lg" style={{ fontFamily: BODY }}>
                {paragraph}
              </p>
            ))}
          </div>

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
              <button
                onClick={onBack}
                style={{ fontFamily: BODY }}
                className="text-sm font-semibold text-[#6B7280] transition-colors hover:text-[#0B0B0B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                View all
              </button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className="tc-card group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#0B0B0B] hover:shadow-[0_24px_50px_-24px_rgba(11,11,11,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#E5E5E5]">
                    <img src={p.image} alt="" loading="lazy" className="tc-card-img h-full w-full object-cover grayscale" />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]" style={{ fontFamily: BODY }}>
                      {p.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-snug" style={{ fontFamily: HEADING }}>
                      <span className="tc-underline">{p.title}</span>
                    </h3>
                    <div className="mt-4">
                      <PostMeta post={p} />
                    </div>
                  </div>
                </button>
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

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const gridRef = useScrollAnimation();

  // Deep-link support: /blog#post-id
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace('#', '');
      const match = posts.find((p) => p.id === id);
      setSelectedPost(match ?? null);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    window.addEventListener('popstate', applyHash);
    return () => {
      window.removeEventListener('hashchange', applyHash);
      window.removeEventListener('popstate', applyHash);
    };
  }, []);

  const selectedId = selectedPost?.id;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [selectedId]);

  const openPost = useCallback((post: BlogPost) => {
    window.history.pushState(null, '', `/blog#${post.id}`);
    setSelectedPost(post);
  }, []);

  const closePost = useCallback(() => {
    window.history.pushState(null, '', '/blog');
    setSelectedPost(null);
  }, []);

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

  if (selectedPost) {
    return (
      <>
        <style>{blogStyles}</style>
        <ArticleView post={selectedPost} onBack={closePost} onSelect={openPost} />
      </>
    );
  }

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
                  { value: '2026', label: 'Latest' },
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
            {(query !== '' || activeCategory !== 'All') && (
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                }}
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
            <button
              onClick={() => openPost(featuredPost)}
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
                  <Avatar light />
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
            </button>
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
                ref={gridRef}
                className="tc-stagger grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {gridPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => openPost(post)}
                    className="tc-card group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0B0B0B] hover:shadow-[0_28px_60px_-28px_rgba(11,11,11,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E5E5E5]">
                      <img src={post.image} alt="" loading="lazy" className="tc-card-img h-full w-full object-cover grayscale" />
                      <span
                        className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#0B0B0B]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#A3E635] backdrop-blur"
                        style={{ fontFamily: BODY }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-grow flex-col p-6">
                      <h3 className="text-xl font-bold leading-snug" style={{ fontFamily: HEADING }}>
                        <span className="tc-underline">{post.title}</span>
                      </h3>
                      <p className="mt-3 flex-grow text-sm leading-relaxed text-[#6B7280]" style={{ fontFamily: BODY }}>
                        {post.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-[#F0F0F0] pt-4">
                        <PostMeta post={post} />
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0] text-[#0B0B0B] transition-colors duration-300 group-hover:bg-[#A3E635]"
                          aria-hidden="true"
                        >
                          <ArrowIcon className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </button>
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
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                }}
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

export default BlogPage;
