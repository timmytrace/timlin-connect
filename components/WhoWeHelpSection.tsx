import React from 'react';

const industries = [
  {
    title: 'Small & Mid‑Sized Businesses',
    description: '10–500 employees needing strong security without a full in‑house team.',
  },
  {
    title: 'Professional Services Firms',
    description: 'Legal, accounting, and consulting firms that handle sensitive client data.',
  },
  {
    title: 'Healthcare & Service Providers',
    description: 'Clinics and healthcare organizations managing personal health information.',
  },
  {
    title: 'Non‑Profits & Community Organizations',
    description: 'Mission‑driven organizations that need security without enterprise budgets.',
  },
  {
    title: 'Startups & Growing Companies',
    description: 'Companies preparing for audits, partnerships, or scaling with security in mind.',
  },
];

const WhoWeHelpSection: React.FC = () => {
  return (
    <section id="who-we-help" className="section bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image placeholder */}
          <div className="img-placeholder w-full aspect-[4/5] bg-[#E5E5E5] rounded-xl flex items-center justify-center">
            <span className="text-[#9CA3AF] text-sm">Industries visual — People at work</span>
          </div>

          {/* Right: Content — left-aligned */}
          <div>
            <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Who We Work With</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Security for Organizations That Need It Most
            </h2>
            <p className="mt-4 text-lg text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              If you handle sensitive personal or business data, security is not optional—we help you get it right.
            </p>
            <div className="mt-8 space-y-4">
              {industries.map((industry, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#A3E635] transition-all duration-300"
                >
                  <h3 className="text-base font-bold text-[#0B0B0B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{industry.title}</h3>
                  <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{industry.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="#services"
                className="inline-block bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                See Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelpSection;
