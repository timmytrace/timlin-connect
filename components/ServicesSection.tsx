import React from 'react';
import type { ServiceItem } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Services are grouped into three practices, each laid out as a list.
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
  {
    id: 'offensive-security',
    anchor: 'services-offensive',
    name: 'Offensive Security',
    blurb: 'Finding the way in before someone else does. The retest is the deliverable, not the report.',
    image: '/penetration testing.png',
    cta: 'Scope a penetration test',
    items: [
      {
        id: 'pentest',
        title: 'Penetration Testing',
        description: 'Real-world attack simulation: how an attacker gets in, and what it costs you when they do.',
        includes: ['Internal and external network testing', 'Web application testing', 'Social engineering simulation', 'Exploit validation and remediation guidance'],
        bestFor: 'Companies handling sensitive data or seeking compliance',
      },
      {
        id: 'api-cloud-testing',
        title: 'API & Cloud Security Testing',
        description: 'The surfaces that grew fastest and are reviewed least: your APIs and your cloud configuration.',
        includes: ['API authentication and authorization', 'Cloud configuration review', 'Identity and permission boundaries', 'Exposed service discovery'],
        bestFor: 'Teams whose estate moved to cloud faster than their reviews did',
      },
      {
        id: 'vulnerability',
        title: 'Vulnerability Assessments',
        description: 'Technical weaknesses across systems, networks, cloud environments and applications.',
        includes: ['Network and system scanning', 'Cloud environment review', 'Authenticated and unauthenticated scans', 'Detailed findings report'],
        bestFor: 'Businesses preparing for a product launch or audit',
      },
    ],
  },
  {
    id: 'security-advisory',
    anchor: 'services-advisory',
    name: 'Security Advisory',
    blurb: 'Security leadership, compliance readiness, and the plan for the day something goes wrong.',
    image: '/virtual ciso.png',
    cta: 'Talk about your security program',
    items: [
      {
        id: 'risk-assessment',
        title: 'Cybersecurity Risk Assessments',
        description: 'Your real exposure across people, process and technology, ranked by impact on the business.',
        includes: ['People, process and technology review', 'Risk register and scoring', 'Prioritized remediation roadmap', 'Executive summary report'],
        bestFor: 'Organizations without a dedicated security team',
      },
      {
        id: 'compliance',
        title: 'Compliance & Privacy Readiness',
        description: 'Controls aligned to the frameworks and privacy laws you actually answer to.',
        includes: ['Gap analysis against SOC 2 / ISO 27001 / PHIPA / PIPEDA / GDPR', 'Policy and procedure review', 'Compliance roadmap', 'Board-ready reporting'],
        bestFor: 'Organizations preparing for audits or regulatory reviews',
      },
      {
        id: 'vciso',
        title: 'Virtual CISO (vCISO)',
        description: 'Security leadership and ongoing advisory without a full-time hire.',
        includes: ['Monthly advisory sessions', 'Security program development', 'Board and stakeholder reporting', 'Vendor and contract security review'],
        bestFor: 'Growing companies that need security leadership, not a headcount',
      },
      {
        id: 'incident-response',
        title: 'Incident Response Planning',
        description: 'A tested plan, and a team that has already rehearsed the decisions.',
        includes: ['Custom IR plan development', 'Tabletop exercise facilitation', 'Team roles and playbook definition', 'Post-incident review support'],
        bestFor: 'Organizations with no existing incident response plan',
      },
    ],
  },
];

const ServiceRow: React.FC<{ service: ServiceItem }> = ({ service }) => (
  <div className="border-t border-[#E5E5E5] py-6 first:border-t-0 first:pt-0">
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
            Three practices. The AI work leads, because that is where the product is; the offensive and advisory
            practice funds it and tells us what to build next.
          </p>
        </div>

        <div ref={gridRef} className="stagger-children space-y-16 lg:space-y-20">
          {families.map((family) => (
            // scroll-mt clears the fixed navbar so the heading is not hidden under it.
            <div key={family.id} id={family.anchor} className="scroll-mt-28 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="w-full aspect-[16/10] bg-[#E5E5E5] rounded-xl overflow-hidden mb-5">
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

              <div className="lg:col-span-8">
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
