import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-[#0B0E14] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-sky-400 tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
            Practical Security. No Fear‑Mongering.
          </p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">Our Mission</h3>
            <p className="text-lg text-slate-300">
              Timlin Connect was founded to help Canadian organizations navigate cybersecurity with clarity and confidence. We believe security should be practical, transparent, and achievable—not overwhelming or fear‑driven.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">Our Values</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-[#30363D] bg-[#161B22]">
                <p className="font-semibold text-[#00D1FF] mb-1">Practical Over Theoretical</p>
                <p className="text-sm text-slate-300">Recommendations you can actually implement with your resources.</p>
              </div>
              <div className="p-4 rounded-lg border border-[#30363D] bg-[#161B22]">
                <p className="font-semibold text-[#00D1FF] mb-1">Clarity Over Jargon</p>
                <p className="text-sm text-slate-300">Reports and guidance that everyone in your organization can understand.</p>
              </div>
              <div className="p-4 rounded-lg border border-[#30363D] bg-[#161B22]">
                <p className="font-semibold text-[#00D1FF] mb-1">Compliance Without Fear</p>
                <p className="text-sm text-slate-300">We help you meet requirements with confidence, not anxiety.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">Credentials & Experience</h3>
            <p className="text-lg text-slate-300">
              Our team brings deep experience across cybersecurity risk management, compliance frameworks (PIPEDA, ISO 27001, NIST CSF, CIS Controls), vulnerability assessment, penetration testing, and incident response—serving organizations across Canada.
            </p>
          </div>
        </div>
         <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
