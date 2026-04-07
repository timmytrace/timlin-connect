import React from 'react';

const industryGroups = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
    industries: [
      'Small & Mid-Sized Businesses',
      'Professional Services',
      'Legal & Accounting Firms',
      'Retail & E-Commerce',
      'Real Estate',
      'Financial Services',
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    industries: [
      'Healthcare Providers',
      'Government & Public Sector',
      'Technology & Innovation',
      'Insurance & Risk Management',
      'Construction & Engineering',
      'Telecommunications',
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    description: 'Follow-up support to help businesses maintain a secure posture for the long term.',
  },
];

const WhoWeHelpSection: React.FC = () => {
  return (
    <section id="who-we-help" className="section bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — centered */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Who We Work With
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We serve organizations across diverse industries, providing customized cybersecurity solutions tailored to each sector's unique requirements.
          </p>
        </div>

        {/* Industry groups */}
        <div className="grid md:grid-cols-3 gap-8">
          {industryGroups.map((group, idx) => (
            <div key={idx} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[#F0F0F0] flex items-center justify-center text-[#0B0B0B]">
                {group.icon}
              </div>
              {group.industries ? (
                <ul className="space-y-1.5">
                  {group.industries.map((industry, i) => (
                    <li key={i} className="flex items-center justify-center text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0B] mr-2 flex-shrink-0"></span>
                      {industry}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {group.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelpSection;
