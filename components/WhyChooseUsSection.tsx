import React from 'react';

const differentiators = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Independent, vendor‑neutral advice',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Strong focus on compliance and risk',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Transparent pricing and scope',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'No unnecessary tools or upselling',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Clear documentation you can actually use',
  },
];

const engagementModels = [
  { title: 'Fixed‑Scope Assessments', description: 'One‑time evaluations with clear deliverables and timeline.' },
  { title: 'Project‑Based Engagements', description: 'Defined projects with specific goals and milestones.' },
  { title: 'Monthly Advisory (vCISO)', description: 'Ongoing strategic security leadership and support.' },
  { title: 'Recurring Testing', description: 'Regular assessments to maintain your security posture.' },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us" className="section bg-slate-800/50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Why Choose Us */}
          <div>
            <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#E6EDF3]">
              Security You Can Trust
            </p>
            <div className="mt-8 space-y-4">
              {differentiators.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="text-[#00D1FF] flex-shrink-0">{item.icon}</div>
                  <span className="text-[#E6EDF3] text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Models */}
          <div>
            <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">Engagement Models</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#E6EDF3]">
              Flexible Options
            </p>
            <div className="mt-8 space-y-4">
              {engagementModels.map((model, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-[#30363D] bg-[#161B22] hover:border-[#00D1FF] transition-all duration-300">
                  <h3 className="text-base font-bold text-[#E6EDF3]">{model.title}</h3>
                  <p className="text-[#8B949E] text-sm mt-1">{model.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[#8B949E] text-sm italic">
              We'll recommend the model that fits your organization—not the most expensive one.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center glass-effect rounded-lg p-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E6EDF3]">
            Ready to understand your cyber risk?
          </h3>
          <p className="mt-3 text-[#8B949E] text-lg max-w-2xl mx-auto">
            Whether you need a one‑time assessment or ongoing security support, we'll help you move forward with clarity and confidence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="inline-block bg-[#2E5BFF] hover:bg-[#2E5BFF]/80 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#2E5BFF]/50 transform hover:scale-105 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]"
            >
              Request a Consultation
            </a>
            <a
              href="#contact"
              className="inline-block bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
