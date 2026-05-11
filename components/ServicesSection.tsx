import React from 'react';
import type { ServiceItem } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services: ServiceItem[] = [
  {
    id: 'risk-assessment',
    title: 'Cybersecurity Risk Assessments',
    description: 'Evaluate your organization\'s security posture across people, processes, and technology to prioritize what matters.',
    includes: ['People, process & technology review', 'Risk register & scoring', 'Prioritized remediation roadmap', 'Executive summary report'],
    bestFor: 'Organizations without a dedicated security team',
  },
  {
    id: 'vulnerability',
    title: 'Vulnerability Assessments',
    description: 'Identify technical vulnerabilities across systems, networks, cloud environments, and applications.',
    includes: ['Network & system scanning', 'Cloud environment review', 'Authenticated & unauthenticated scans', 'Detailed findings report'],
    bestFor: 'Businesses preparing for a product launch or audit',
  },
  {
    id: 'pentest',
    title: 'Penetration Testing',
    description: 'Simulate real-world attacks to evaluate how an attacker could gain access and what impact that could have.',
    includes: ['Internal & external network testing', 'Web application testing', 'Social engineering simulation', 'Exploit validation & remediation guidance'],
    bestFor: 'Companies handling sensitive data or seeking compliance',
  },
  {
    id: 'compliance',
    title: 'Compliance & Privacy Readiness',
    description: 'Align your security controls with Canadian privacy laws and recognized compliance standards.',
    includes: ['Gap analysis against PIPEDA / PHIPA / SOC 2', 'Policy & procedure review', 'Compliance roadmap', 'Board-ready reporting'],
    bestFor: 'Organizations preparing for audits or regulatory reviews',
  },
  {
    id: 'vciso',
    title: 'Virtual CISO (vCISO) Services',
    description: 'Strategic security leadership and ongoing advisory support to build and evolve your security program.',
    includes: ['Monthly advisory sessions', 'Security program development', 'Board & stakeholder reporting', 'Vendor & contract security review'],
    bestFor: 'Growing companies that need security leadership without a full-time hire',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Planning',
    description: 'Build a clear, tested incident response plan and prepare your team through realistic scenarios.',
    includes: ['Custom IR plan development', 'Tabletop exercise facilitation', 'Team roles & playbook definition', 'Post-incident review support'],
    bestFor: 'Organizations with no existing incident response plan',
  },
];

const serviceImages = [
  '/cybersecurity risk assessment.png',
  '/Vulnerability assessment.png',
  '/penetration testing.png',
  '/compliance & privacy readiness.png',
  '/virtual ciso.png',
  '/Incident Response Planning.png',
];

const ServicesSection: React.FC = () => {
  const gridRef = useScrollAnimation();
  return (
    <section id="services" className="section bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Core Services
          </h2>
        </div>

        {/* Service cards */}
        <div ref={gridRef} className="stagger-children grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.id} className="group">
              {/* Card image */}
              <div className="w-full aspect-[16/10] bg-[#E5E5E5] rounded-xl overflow-hidden mb-4">
                <img
                  src={serviceImages[index]}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale"
                  loading="lazy"
                />
              </div>

              <h3 className="text-lg font-bold text-[#0B0B0B] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{service.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{service.description}</p>

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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
