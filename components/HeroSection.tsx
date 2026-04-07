import React from 'react';

const ShieldIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const GlobeIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const GridIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const MapPinIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative bg-[#0B0B0B] min-h-screen flex flex-col overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[#1a1a1a]" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) brightness(0.4)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex items-center pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Cybersecurity for<br />Canadian organizations.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Practical security guidance that actually works. Risk assessments, compliance support, and advisory services tailored to Canada's privacy and regulatory landscape. Clear guidance without unnecessary complexity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-[#0B0B0B] font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] text-base"
                aria-label="Request a consultation"
              >
                Request a Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] text-base"
                aria-label="View our cybersecurity services"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals Bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#0B0B0B]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-start gap-8 sm:gap-12">
            <div className="flex items-center gap-2.5 text-white/70">
              <ShieldIcon />
              <span className="text-sm font-medium">PIPEDA‑Aligned</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/70">
              <GlobeIcon />
              <span className="text-sm font-medium">ISO / NIST‑Based</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/70">
              <GridIcon />
              <span className="text-sm font-medium">Vendor‑Neutral</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/70">
              <MapPinIcon />
              <span className="text-sm font-medium">Serving Canada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;