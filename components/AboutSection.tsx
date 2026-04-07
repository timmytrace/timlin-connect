import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content — left-aligned */}
          <div>
            <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>About Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Practical Security. No Fear‑Mongering.
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#0B0B0B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Mission</h3>
                <p className="text-lg text-[#6B7280] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Timlin Connect was founded to help Canadian organizations navigate cybersecurity with clarity and confidence. We believe security should be practical, transparent, and achievable—not overwhelming or fear‑driven.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0B0B0B] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Credentials & Experience</h3>
                <p className="text-lg text-[#6B7280] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Our team brings deep experience across cybersecurity risk management, compliance frameworks (PIPEDA, ISO 27001, NIST CSF, CIS Controls), vulnerability assessment, penetration testing, and incident response—serving organizations across Canada.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image placeholder + Values */}
          <div className="space-y-8">
            <div className="img-placeholder w-full aspect-[4/3] bg-[#E5E5E5] rounded-xl flex items-center justify-center">
              <span className="text-[#9CA3AF] text-sm">About visual — Team photo or workspace</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0B0B0B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Values</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]">
                  <p className="font-semibold text-[#0B0B0B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Practical Over Theoretical</p>
                  <p className="text-sm text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recommendations you can actually implement with your resources.</p>
                </div>
                <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]">
                  <p className="font-semibold text-[#0B0B0B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Clarity Over Jargon</p>
                  <p className="text-sm text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Reports and guidance that everyone in your organization can understand.</p>
                </div>
                <div className="p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]">
                  <p className="font-semibold text-[#0B0B0B] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Compliance Without Fear</p>
                  <p className="text-sm text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>We help you meet requirements with confidence, not anxiety.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="#contact"
            className="inline-block bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
            aria-label="Contact us to discuss your security needs"
          >
            Discuss Your Needs
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
