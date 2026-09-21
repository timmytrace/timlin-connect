import React from 'react';
import type { ServiceItem } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Services are grouped into three practices rather than listed flat.
 *
 * Six unrelated cards read as a catalogue, which is what made the company look
 * like a general consultancy. Grouping puts the AI work first, where the
 * product is, and keeps the traditional practice visible underneath as the
 * work that funds it and feeds it requirements.
 */
type ServiceCard = ServiceItem & { image: string };

type ServiceFamily = {
  id: string;
  /** The anchor the Services menu links to; must match components/Navbar.tsx. */
  anchor: string;
  name: string;
  blurb: string;
  items: ServiceCard[];
};

const families: ServiceFamily[] = [
  {
    id: 'ai-security',
    anchor: 'services-ai',
    name: 'AI Security',
    blurb: 'For organizations putting AI in front of their people, their customers or their data.',
    items: [
      {
        id: 'ai-assessment',
        title: 'AI Security Assessment',
        description:
          'Find where AI is already in use, what data reaches it, and which controls are missing.',
        includes: [
          'Inventory of AI tools already in use',
          'Data-flow and exposure review',
          'Prompt-injection and leakage testing',
          'Prioritized findings, with a retest',
        ],
        bestFor: 'Teams adopting AI faster than they are governing it',
        image: '/magnumai-demo/risk-analytics.png',
      },
      {
        id: 'ai-red-team',
        title: 'AI Red Teaming',
        description:
          'Attack your LLM application the way an adversary would, and show you what worked.',
        includes: [
          'Direct and indirect prompt injection',
          'Data exfiltration attempts',
          'Agent and tool-permission abuse',
          'Reproductions you can run yourself',
        ],
        bestFor: 'Products built on language models or agents',
        image: '/magnumai-demo/blocked-requests.png',
      },
      {
        id: 'ai-governance',
        title: 'AI Governance Readiness',
        description:
          'Put a defensible policy, review process and audit trail around how your organization uses AI.',
        includes: [
          'Acceptable-use policy for AI tools',
          'Model and vendor review process',
          'Logging, retention and audit trail',
          'Board-ready reporting',
        ],
        bestFor: 'Organizations writing their first AI policy',
        image: '/magnumai-demo/security-policies.png',
      },
    ],
  },
  {
    id: 'offensive-security',
    anchor: 'services-offensive',
    name: 'Offensive Security',
    blurb: 'Find the way in before someone else does. The retest is the deliverable, not the report.',
    items: [
      {
        id: 'pentest',
        title: 'Penetration Testing',
        description:
          'Simulate real-world attacks to evaluate how an attacker could gain access and what impact that could have.',
        includes: [
          'Internal & external network testing',
          'Web application testing',
          'Social engineering simulation',
          'Exploit validation & remediation guidance',
        ],
        bestFor: 'Companies handling sensitive data or seeking compliance',
        image: '/penetration testing.png',
      },
      {
        id: 'vulnerability',
        title: 'Vulnerability Assessments',
        description:
          'Identify technical vulnerabilities across systems, networks, cloud environments, and applications.',
        includes: [
          'Network & system scanning',
          'Cloud environment review',
          'Authenticated & unauthenticated scans',
          'Detailed findings report',
        ],
        bestFor: 'Businesses preparing for a product launch or audit',
        image: '/Vulnerability assessment.png',
      },
    ],
  },
  {
    id: 'security-advisory',
    anchor: 'services-advisory',
    name: 'Security Advisory',
    blurb: 'Security leadership, compliance readiness and the plan for the day something goes wrong.',
    items: [
      {
        id: 'risk-assessment',
        title: 'Cybersecurity Risk Assessments',
        description:
          "Evaluate your organization's security posture across people, processes, and technology to prioritize what matters.",
        includes: [
          'People, process & technology review',
          'Risk register & scoring',
          'Prioritized remediation roadmap',
          'Executive summary report',
        ],
        bestFor: 'Organizations without a dedicated security team',
        image: '/cybersecurity risk assessment.png',
      },
      {
        id: 'compliance',
        title: 'Compliance & Privacy Readiness',
        description:
          'Align your security controls with globally recognized privacy laws and compliance standards.',
        includes: [
          'Gap analysis against SOC 2 / ISO 27001 / PHIPA / PIPEDA / GDPR',
          'Policy & procedure review',
          'Compliance roadmap',
          'Board-ready reporting',
        ],
        bestFor: 'Organizations preparing for audits or regulatory reviews',
        image: '/compliance & privacy readiness.png',
      },
      {
        id: 'vciso',
        title: 'Virtual CISO (vCISO) Services',
        description:
          'Strategic security leadership and ongoing advisory support to build and evolve your security program.',
        includes: [
          'Monthly advisory sessions',
          'Security program development',
          'Board & stakeholder reporting',
          'Vendor & contract security review',
        ],
        bestFor: 'Growing companies that need security leadership without a full-time hire',
        image: '/virtual ciso.png',
      },
      {
        id: 'incident-response',
        title: 'Incident Response Planning',
        description:
          'Build a clear, tested incident response plan and prepare your team through realistic scenarios.',
        includes: [
          'Custom IR plan development',
          'Tabletop exercise facilitation',
          'Team roles & playbook definition',
          'Post-incident review support',
        ],
        bestFor: 'Organizations with no existing incident response plan',
        image: '/Incident Response Planning.png',
      },
    ],
  },
];

const ServiceCardView: React.FC<{ service: ServiceCard }> = ({ service }) => (
  <div className="group">
    <div className="w-full aspect-[16/10] bg-[#E5E5E5] rounded-xl overflow-hidden mb-4">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover grayscale"
        loading="lazy"
      />
    </div>

    <h3 className="text-lg font-bold text-[#0B0B0B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {service.title}
    </h3>
    <p className="text-[#6B7280] text-sm leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {service.description}
    </p>

    {service.includes.length > 0 && (
      <ul className="mb-3 space-y-1">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#A3E635] flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    )}

    {service.bestFor && (
      <p className="text-xs text-[#0B0B0B]/50 mb-3 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Best for: {service.bestFor}
      </p>
    )}

    <a
      href="#contact"
      className="inline-flex items-center text-[#0B0B0B] text-sm font-semibold hover:opacity-70 transition-opacity"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      Request an Assessment <span className="ml-1">→</span>
    </a>
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

        <div ref={gridRef} className="stagger-children space-y-16">
          {families.map((family) => (
            // scroll-mt clears the fixed navbar so the heading is not hidden under it.
            <div key={family.id} id={family.anchor} className="scroll-mt-28">
              <div className="flex flex-col gap-1 pb-5 mb-8 border-b-2 border-[#0B0B0B]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {family.name}
                </h3>
                <p className="text-sm text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {family.blurb}
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {family.items.map((service) => (
                  <ServiceCardView key={service.id} service={service} />
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
