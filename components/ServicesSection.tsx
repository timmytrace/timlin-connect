import React from 'react';
import ServiceCard from './ServiceCard';
import type { ServiceItem } from '../types';

// Heroicons SVGs (inline for simplicity, consider a library for more icons)
const CodeBracketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>
);

const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const WrenchScrewdriverIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83M11.42 15.17A3 3 0 0 1 6.3 13.16l4.95-4.95a2.25 2.25 0 0 1 3.182 0l8.12 8.12a2.25 2.25 0 0 1 0 3.182l-4.95 4.95a3 3 0 0 1-2.122.53M6.3 13.16A3 3 0 0 1 4.84 8.08l-1.2-1.2a1.5 1.5 0 0 1 0-2.12l1.58-1.58a1.5 1.5 0 0 1 2.12 0l1.2 1.2A3 3 0 0 1 13.16 6.3l4.95-4.95a2.25 2.25 0 0 1 3.182 0l8.12 8.12a2.25 2.25 0 0 1 0 3.182l-4.95 4.95a3 3 0 0 1-2.122.53" />
</svg>
);


const services: ServiceItem[] = [
  {
    id: 'cyber',
    icon: <ShieldCheckIcon className="w-12 h-12" />,
    title: 'Cybersecurity Solutions',
    description: 'Fortify your digital fortress with enterprise-grade security solutions. Comprehensive threat assessment, vulnerability management, incident response, and proactive defense strategies to protect your valuable digital assets.'
  },
  {
    id: 'it',
    icon: <WrenchScrewdriverIcon className="w-12 h-12" />,
    title: 'IT Support & Management',
    description: '24/7 reliable IT support and infrastructure management. Proactive maintenance, responsive helpdesk, strategic infrastructure optimization, and continuous monitoring to ensure your operations run smoothly.'
  },
  {
    id: 'dev',
    icon: <CodeBracketIcon className="w-12 h-12" />,
    title: 'Modern Web Development',
    description: 'Cutting-edge web applications built for performance and security. Scalable, modern solutions using the latest technologies, tailored to your unique business needs from concept to deployment.'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section bg-[#0B0E14] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">Our Expertise</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E6EDF3]">
            Solutions to Elevate Your Business
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8B949E]">
            At Timlin Connect, we provide a suite of services designed to address your technological challenges and drive growth.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
