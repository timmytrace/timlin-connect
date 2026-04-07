import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative bg-[#FAFAFA] min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content — left-aligned, editorial */}
          <div>
            <span className="inline-block bg-[#A3E635]/20 text-[#0B0B0B] text-sm font-semibold px-4 py-1.5 rounded-full mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Cybersecurity for Canadian organizations
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-tight text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Practical security guidance that actually works.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#6B7280] max-w-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Risk assessments, compliance support, and advisory services tailored to Canada's privacy and regulatory landscape. Clear guidance without unnecessary complexity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-block bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] text-base sm:text-lg"
                aria-label="Request a consultation"
              >
                Request a Consultation
              </a>
              <a
                href="#services"
                className="inline-block border-2 border-[#E5E5E5] hover:border-[#0B0B0B] text-[#0B0B0B] font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] text-base sm:text-lg"
                aria-label="View our cybersecurity services"
              >
                View Services
              </a>
            </div>

            {/* Trust Signals — horizontal, left-aligned */}
            <div className="mt-14 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A3E635]"></span>
                <span className="text-[#6B7280] text-sm font-medium">PIPEDA‑Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A3E635]"></span>
                <span className="text-[#6B7280] text-sm font-medium">ISO / NIST‑Based</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A3E635]"></span>
                <span className="text-[#6B7280] text-sm font-medium">Vendor‑Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A3E635]"></span>
                <span className="text-[#6B7280] text-sm font-medium">Serving Canada</span>
              </div>
            </div>
          </div>

          {/* Right: Image placeholder */}
          <div className="img-placeholder aspect-[4/3] w-full bg-[#E5E5E5] rounded-xl flex items-center justify-center">
            <span className="text-[#9CA3AF] text-sm">Hero Image — Team or product visual</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;