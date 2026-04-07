import React from 'react';
import type { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'risk-assessment',
    title: 'Cybersecurity Risk Assessments',
    description: 'Cybersecurity risk assessments, monitoring and cybersecurity risk assessments.',
    includes: [],
    bestFor: '',
  },
  {
    id: 'vulnerability',
    title: 'Vulnerability Assessments',
    description: 'Vulnerability assessments assisting and vulnerability assessments.',
    includes: [],
    bestFor: '',
  },
  {
    id: 'pentest',
    title: 'Penetration Testing',
    description: 'Penetration testing benefits to practice and penetration testing.',
    includes: [],
    bestFor: '',
  },
  {
    id: 'compliance',
    title: 'Compliance & Privacy Readiness',
    description: 'Compliance compliance & privacy and organizations.',
    includes: [],
    bestFor: '',
  },
  {
    id: 'vciso',
    title: 'Virtual CISO (vCISO) Services',
    description: 'Virtual CISO (vCISO) Services experts.',
    includes: [],
    bestFor: '',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Planning',
    description: 'Incident response planning for incidents sectors.',
    includes: [],
    bestFor: '',
  },
];

const serviceImages = [
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
];

const ServicesSection: React.FC = () => {
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
