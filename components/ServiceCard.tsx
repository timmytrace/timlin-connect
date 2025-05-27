import React from 'react';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="relative bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-sky-500/30 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group border border-transparent hover:border-sky-500 focus-within:border-sky-400">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
      <div className="relative z-10">
        {service.icon && (
          <div className="text-sky-400 mb-4 text-4xl">
            {service.icon}
          </div>
        )}
        <h3 className="text-2xl font-bold text-slate-100 mb-3">{service.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed flex-grow">{service.description}</p>
        <a href="#contact" className="inline-block mt-4 text-sky-400 hover:text-sky-300 font-medium transition-colors self-start focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md">
          Learn More &rarr;
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
