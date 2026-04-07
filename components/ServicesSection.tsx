import React from 'react';
import type { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'risk-assessment',
    title: 'Cybersecurity Risk Assessments',
    description: 'Understand your risk. Prioritize what matters. We evaluate your organization\'s security posture across people, processes, and technology.',
    includes: [
      'Asset and data flow review',
      'Policy and procedure assessment',
      'Technical control review (endpoints, cloud, access)',
      'Risk scoring and prioritization',
      'Executive‑ready summary report',
    ],
    bestFor: 'Organizations that need a baseline security assessment, board visibility, or compliance readiness.',
  },
  {
    id: 'vulnerability',
    title: 'Vulnerability Assessments',
    description: 'Find weaknesses before attackers do. We identify technical vulnerabilities across systems, networks, cloud environments, and applications.',
    includes: [
      'Scoped vulnerability scanning',
      'Manual validation of high‑risk findings',
      'False‑positive elimination',
      'Remediation recommendations',
      'Final technical report',
    ],
    bestFor: 'Organizations seeking regular security hygiene or preparing for audits and vendor reviews.',
  },
  {
    id: 'pentest',
    title: 'Penetration Testing',
    description: 'Test your defenses—safely and legally. We simulate real‑world attacks to evaluate how an attacker could gain access and what impact that access could have.',
    includes: [
      'Rules of engagement and written authorization',
      'External, internal, or cloud testing (scope‑dependent)',
      'Evidence‑based findings',
      'Clear business impact analysis',
      'Detailed remediation guidance',
    ],
    bestFor: 'Organizations with mature environments or regulatory, customer, or insurance requirements.',
  },
  {
    id: 'compliance',
    title: 'Compliance & Privacy Readiness',
    description: 'Security that aligns with your legal obligations. We help organizations align their security controls with Canadian privacy laws and recognized standards.',
    includes: [
      'PIPEDA and Quebec Law 25 alignment',
      'ISO/IEC 27001 and NIST CSF readiness',
      'Gap analysis and roadmap',
      'Policy and documentation support',
      'Audit and vendor‑questionnaire readiness',
    ],
    bestFor: 'Organizations needing to demonstrate compliance with Canadian privacy regulations and industry frameworks.',
  },
  {
    id: 'vciso',
    title: 'Virtual CISO (vCISO) Services',
    description: 'Strategic security leadership—without hiring full‑time. Our vCISO service provides ongoing advisory support to help you build and evolve your security program.',
    includes: [
      'Security roadmap and prioritization',
      'Risk management and reporting',
      'Incident response planning',
      'Vendor and third‑party risk guidance',
      'Ongoing advisory support (monthly or quarterly)',
    ],
    bestFor: 'Growing organizations that need consistent security leadership.',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Planning',
    description: 'Be prepared before an incident happens. We help you build a clear, tested incident response plan and walk your team through realistic scenarios.',
    includes: [
      'Incident response plan development or review',
      'Breach notification guidance',
      'Tabletop simulation exercise',
      'Lessons‑learned summary',
    ],
    bestFor: 'Organizations that want to be prepared and confident when an incident occurs.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — left-aligned */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Core Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Practical Security. Clear Compliance. Real Risk Reduction.
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We help Canadian organizations identify, reduce, and manage cyber risk—without unnecessary complexity.
          </p>
        </div>

        {/* Section image placeholder */}
        <div className="img-placeholder w-full aspect-[21/9] bg-[#E5E5E5] rounded-xl flex items-center justify-center mb-16">
          <span className="text-[#9CA3AF] text-sm">Services overview — Process or team visual</span>
        </div>

        {/* Service cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="relative p-6 rounded-xl border border-[#E5E5E5] hover:border-[#A3E635] bg-white transition-all duration-300 h-full flex flex-col group">
              {/* Card image placeholder */}
              <div className="img-placeholder w-full aspect-[16/9] bg-[#F0F0F0] rounded-lg flex items-center justify-center mb-5">
                <span className="text-[#9CA3AF] text-xs">Service image</span>
              </div>

              <h3 className="text-xl font-bold text-[#0B0B0B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{service.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>{service.description}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>What's included:</p>
                <ul className="space-y-1.5">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] mr-2.5 mt-1.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-[#6B7280] italic mt-auto mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="font-semibold text-[#0B0B0B] not-italic">Best for:</span> {service.bestFor}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] text-sm"
              >
                Request an Assessment →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
