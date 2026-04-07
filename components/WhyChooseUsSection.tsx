import React from 'react';

const differentiators = [
  'Independent, vendor‑neutral advice',
  'Strong focus on compliance and risk',
  'Transparent pricing and scope',
  'No unnecessary tools or upselling',
  'Clear documentation you can actually use',
];

const engagementModels = [
  { title: 'Fixed‑Scope Assessments', description: 'One‑time evaluations with clear deliverables and timeline.' },
  { title: 'Project‑Based Engagements', description: 'Defined projects with specific goals and milestones.' },
  { title: 'Monthly Advisory (vCISO)', description: 'Ongoing strategic security leadership and support.' },
  { title: 'Recurring Testing', description: 'Regular assessments to maintain your security posture.' },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us" className="section bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image placeholder */}
        <div className="img-placeholder w-full aspect-[21/9] bg-[#E5E5E5] rounded-xl flex items-center justify-center mb-16">
          <span className="text-[#9CA3AF] text-sm">Partnership visual — Collaboration or trust imagery</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Why Choose Us */}
          <div>
            <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Why Choose Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Security You Can Trust
            </h2>
            <div className="mt-8 space-y-4">
              {differentiators.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-[#A3E635] flex-shrink-0"></span>
                  <span className="text-[#0B0B0B] text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Models */}
          <div>
            <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Engagement Models</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Flexible Options
            </h2>
            <div className="mt-8 space-y-4">
              {engagementModels.map((model, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#A3E635] transition-all duration-300">
                  <h3 className="text-base font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{model.title}</h3>
                  <p className="text-[#6B7280] text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{model.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[#6B7280] text-sm italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We'll recommend the model that fits your organization—not the most expensive one.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#0B0B0B] rounded-xl p-10 sm:p-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to understand your cyber risk?
            </h3>
            <p className="mt-3 text-[#9CA3AF] text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Whether you need a one‑time assessment or ongoing security support, we'll help you move forward with clarity and confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-block bg-[#A3E635] hover:bg-[#A3E635]/90 text-[#0B0B0B] font-semibold px-8 py-3 rounded-lg transition-all duration-300 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                Request a Consultation
              </a>
              <a
                href="#contact"
                className="inline-block border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
