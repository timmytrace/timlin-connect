import React from 'react';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Determine card styling based on service ID
  const getCardClasses = () => {
    const baseClasses = "relative p-6 rounded-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group";
    const borderClasses = "border border-[#30363D] hover:border-[#00D1FF]";
    
    if (service.id === 'cyber') {
      // Cybersecurity Card - Grid pattern background
      return `${baseClasses} ${borderClasses} bg-[#161B22] grid-pattern`;
    } else if (service.id === 'it') {
      // IT Support Card - Grid pattern background
      return `${baseClasses} ${borderClasses} bg-[#161B22] grid-pattern`;
    } else if (service.id === 'dev') {
      // Web Development Card - Special glow effect
      return `${baseClasses} ${borderClasses} bg-[#161B22] glow-effect`;
    }
    return `${baseClasses} ${borderClasses} bg-[#161B22]`;
  };

  const renderStatusIndicator = () => {
    if (service.id === 'cyber') {
      // Cybersecurity - Single pulsing status indicator
      return (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#00D1FF] pulse-animation"></div>
          <span className="text-[#00D1FF] text-xs font-semibold uppercase tracking-wider">Data-Secure</span>
        </div>
      );
    } else if (service.id === 'it') {
      // IT Support - Multiple status dots
      return (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <span className="text-[#00D1FF] text-xs font-semibold uppercase tracking-wider">Always-On</span>
        </div>
      );
    } else if (service.id === 'dev') {
      // Web Development - Innovation label
      return (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#2E5BFF]/20 text-[#00D1FF] text-xs font-bold uppercase tracking-wider rounded-full border border-[#2E5BFF]/40">
            Innovation
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={getCardClasses()}>
      <div className="relative z-10 flex flex-col h-full">
        {service.icon && (
          <div className={`text-[#00D1FF] mb-4 ${service.id === 'cyber' ? 'icon-drop-shadow' : ''}`}>
            {service.icon}
          </div>
        )}
        
        {renderStatusIndicator()}
        
        <h3 className="text-2xl font-bold text-[#E6EDF3] mb-3">{service.title}</h3>
        <p className="text-[#8B949E] text-sm leading-relaxed flex-grow mb-4">{service.description}</p>
        
        <a 
          href="#contact" 
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2E5BFF] hover:bg-[#2E5BFF]/80 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2E5BFF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF] mt-auto"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
