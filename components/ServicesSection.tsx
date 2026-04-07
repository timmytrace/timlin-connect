import React from 'react';
import type { ServiceItem } from '../types';

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const BugIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152-6.135c-.117-1.065-.908-1.878-1.89-2.103A12.004 12.004 0 0012 5.25c-1.806 0-3.534.352-5.115.972-.995.226-1.786 1.04-1.903 2.104a23.86 23.86 0 01-1.152 6.135A23.843 23.843 0 0112 12.75zM2.695 14.763l-.051.107a2.25 2.25 0 001.472 3.026l.317.093a2.25 2.25 0 002.024-.58l.368-.355M21.305 14.763l.051.107a2.25 2.25 0 01-1.472 3.026l-.317.093a2.25 2.25 0 01-2.024-.58l-.368-.355" />
  </svg>
);

const FingerPrintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a48.667 48.667 0 00-1.394 7.788M12 10.5a3 3 0 10-6 0c0 3.067-.318 6.06-.925 8.928M12 10.5a48.825 48.825 0 00-.896 8.572M3.18 21.018a4.5 4.5 0 017.122-3.878M16.5 13.5a12.001 12.001 0 00-.528 4.5m.528-4.5A48.913 48.913 0 0118 10.5a7.5 7.5 0 00-7.5-7.5" />
  </svg>
);

const ScaleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
  </svg>
);

const UserGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const BoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const services: ServiceItem[] = [
  {
    id: 'risk-assessment',
    icon: <ShieldIcon className="w-10 h-10" />,
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
    icon: <BugIcon className="w-10 h-10" />,
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
    icon: <FingerPrintIcon className="w-10 h-10" />,
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
    icon: <ScaleIcon className="w-10 h-10" />,
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
    icon: <UserGroupIcon className="w-10 h-10" />,
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
    icon: <BoltIcon className="w-10 h-10" />,
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
    <section id="services" className="section bg-[#0B0E14] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">Our Core Services</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E6EDF3]">
            Practical Security. Clear Compliance. Real Risk Reduction.
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-[#8B949E]">
            We help Canadian organizations identify, reduce, and manage cyber risk—without unnecessary complexity. Our approach is pragmatic, transparent, and aligned with Canadian privacy and cybersecurity requirements.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="relative p-6 rounded-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group border border-[#30363D] hover:border-[#00D1FF] bg-[#161B22] grid-pattern">
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-[#00D1FF] mb-4 icon-drop-shadow">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">{service.title}</h3>
                <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{service.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#00D1FF] uppercase tracking-wider mb-2">What's included:</p>
                  <ul className="space-y-1.5">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start text-[#8B949E] text-sm">
                        <svg className="w-4 h-4 text-[#00D1FF] mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-[#8B949E] italic mt-auto mb-4">
                  <span className="font-semibold text-[#E6EDF3]">Best for:</span> {service.bestFor}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2E5BFF] hover:bg-[#2E5BFF]/80 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2E5BFF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]"
                >
                  Request an Assessment →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
