import React from 'react';
import type { ServiceItem } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Services are grouped into practices, each laid out as a list.
 *
 * There is one practice now. Offensive Security and Security Advisory offered
 * seven services - penetration testing, vCISO, incident response - that nobody
 * here has delivered. A capability list is a claim, and a claim you cannot meet
 * does more damage than a short list: the first prospect who asks about your
 * pen-testing methodology finds out, and then doubts the parts that were true.
 * The structure stays plural because a second practice should be added back
 * only when there is delivered work behind it.
 *
 * The previous version put every service in one card grid: nine cards of three
 * columns, split 3 / 2 / 4, so the middle practice left a hole and the last
 * wrapped to three-plus-one. Every card repeated an image, four bullets, a
 * "best for" line and its own call to action, which read as a wall rather than
 * a structure.
 *
 * A list fixes the underlying problem: practices do not have to hold the same
 * number of services for the section to look deliberate. Each practice states
 * itself once, on the left, with a single call to action; its services read
 * down the right in a consistent shape.
 */
type ServiceFamily = {
  id: string;
  /** The anchor the Services menu links to; must match components/Navbar.tsx. */
  anchor: string;
  name: string;
  blurb: string;
  image: string;
  cta: string;
  items: ServiceItem[];
};

const families: ServiceFamily[] = [
  {
    id: 'ai-security',
    anchor: 'services-ai',
    name: 'AI Security',
    blurb:
      'For organizations putting AI in front of their people, their customers or their data.',
    image: '/magnumai-demo/risk-analytics.png',
    cta: 'Request an AI security assessment',
    items: [
      {
        id: 'ai-assessment',
        title: 'AI Security Assessment',
        description: 'Where AI is already in use, what data reaches it, and which controls are missing.',
        includes: ['Inventory of AI tools in use', 'Data-flow and exposure review', 'Prompt-injection and leakage testing', 'Prioritized findings, with a retest'],
        bestFor: 'Teams adopting AI faster than they are governing it',
      },
      {
        id: 'ai-red-team',
        title: 'AI Red Teaming',
        description: 'Attacking your LLM application the way an adversary would, and showing you what worked.',
        includes: ['Direct and indirect prompt injection', 'Data exfiltration attempts', 'Agent and tool-permission abuse', 'Reproductions you can run yourself'],
        bestFor: 'Products built on language models or agents',
      },
      {
        id: 'llm-app-testing',
        title: 'LLM & Application Security Testing',
        description: 'The application around the model: its APIs, its authentication, and what it trusts.',
        includes: ['Application and API testing', 'Authentication and authorization review', 'Retrieval and plugin surfaces', 'Remediation guidance'],
        bestFor: 'Teams shipping an AI feature into production',
      },
      {
        id: 'ai-governance',
        title: 'AI Governance Readiness',
        description: 'A defensible policy, review process and audit trail around how your organization uses AI.',
        includes: ['Acceptable-use policy for AI tools', 'Model and vendor review process', 'Logging, retention and audit trail', 'Board-ready reporting'],
        bestFor: 'Organizations writing their first AI policy',
      },
    ],
  },
];

const ServiceRow: React.FC<{ service: ServiceItem }> = ({ service }) => (
  // break-inside-avoid keeps a service whole when the list flows into two
  // columns at xl; without it a row splits across the column break.
  // The first service drops its rule on mobile, where it would sit alone under
  // the practice heading. From lg the rule comes back: in two columns the item
  // starting the second column keeps its rule regardless, so dropping the first
  // one only misaligns the two columns by the padding it also loses.
  <div className="break-inside-avoid border-t border-[#E5E5E5] py-6 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-6">
    <h4 className="text-lg font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {service.title}
    </h4>
    <p className="mt-1.5 text-[#4B5563] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {service.description}
    </p>
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
      {service.includes.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm text-[#6B7280]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="mt-[0.45rem] h-1 w-1 flex-shrink-0 rounded-full bg-[#A3E635]" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
    {service.bestFor && (
      <p className="mt-3 text-sm text-[#0B0B0B]/45" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Best for: {service.bestFor}
      </p>
    )}
  </div>
);

const ServicesSection: React.FC = () => {
  const gridRef = useScrollAnimation();
  return (
    <section id="services" className="section bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Services
          </h2>
          <p className="mt-4 text-[#6B7280] text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            One practice, deliberately. The work we publish is on prompt injection, detection and the failure
            modes of AI guardrails, so that is what we take on — and the research is open, so you can judge the
            depth before you engage us.
          </p>
        </div>

        <div ref={gridRef} className="stagger-children space-y-16 lg:space-y-20">
          {families.map((family) => (
            // scroll-mt clears the fixed navbar so the heading is not hidden under it.
            <div key={family.id} id={family.anchor} className="scroll-mt-28 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  {/*
                    Square from lg up: the card is the short side of the row, so
                    a 16/10 image left it 164-209px shorter than the list even
                    after the list went to two columns. Height the image can
                    honestly carry is better than padding the copy out.
                  */}
                  <div className="w-full aspect-[16/10] lg:aspect-square bg-[#E5E5E5] rounded-xl overflow-hidden mb-5">
                    <img
                      src={family.image}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {family.name}
                  </h3>
                  <p className="mt-2.5 text-[#6B7280] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {family.blurb}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center text-[#0B0B0B] text-sm font-semibold hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {family.cta} <span className="ml-1.5" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/*
                CSS columns, not a grid, so unequal practices still balance. At
                full width a single list ran 771px beside a 385px card, leaving
                a 386px hole; two columns halve it. A grid would fix the number
                of cells, so a practice with an odd number of services would
                leave one empty — the hole the card layout had. Multi-column
                balances the fill instead, at three services or five.
              */}
              <div className="lg:col-span-8 lg:columns-2 lg:gap-x-10">
                {family.items.map((service) => (
                  <ServiceRow key={service.id} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
