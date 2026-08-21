import React from 'react';

const GatewayTeaserSection: React.FC = () => {
  return (
    <section id="magnum-ai-teaser" className="section bg-white py-16 sm:py-20 border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <p
              className="inline-flex items-center rounded-full border border-[#D1D5DB] bg-[#F9FAFB] px-3 py-1 text-xs font-semibold tracking-wide text-[#374151]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Design-partner preview
            </p>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold text-[#0B0B0B]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Introducing Timlin Gateway
            </h2>
            <p
              className="mt-3 text-lg text-[#374151]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              An upcoming AI security gateway from Timlin Connect.
            </p>
            <p
              className="mt-5 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-3xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Timlin Gateway is a self-hosted security gateway for LLM-powered applications. It
              blocks prompt injection, sensitive data leakage, unsafe model outputs, indirect
              injection from retrieved documents, and risky AI agent actions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center bg-[#0B0B0B] hover:bg-[#0B0B0B]/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Join Early Access
              </a>
              <a
                href="/gateway"
                className="inline-flex items-center justify-center border border-[#0B0B0B]/20 hover:border-[#0B0B0B] text-[#0B0B0B] font-semibold px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-7 text-white">
            <h3
              className="text-xl font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Where it stands
            </h3>
            <p
              className="mt-3 text-white/80 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              98.7% prompt-injection recall at a 2.0% false-positive rate, measured on a held-out
              set. The gaps are published alongside the results. Open to design partners who want
              to run it against their own traffic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GatewayTeaserSection;
