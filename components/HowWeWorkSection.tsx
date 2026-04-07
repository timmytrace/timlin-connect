import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Clear Scope First',
    description: 'Every engagement starts with defined scope, authorization, and expectations. No surprises.',
  },
  {
    number: '02',
    title: 'Assessment & Testing',
    description: 'We perform the agreed assessment or testing with precision and professionalism.',
  },
  {
    number: '03',
    title: 'Analysis & Validation',
    description: 'Findings are validated, false positives eliminated, and risks scored based on real‑world impact.',
  },
  {
    number: '04',
    title: 'Plain‑Language Reporting',
    description: 'Reports are written for both technical teams and executives. No jargon, no filler findings.',
  },
  {
    number: '05',
    title: 'Actionable Outcomes',
    description: 'We focus on reducing risk—not just listing problems. Every recommendation is practical and prioritized.',
  },
  {
    number: '06',
    title: 'Follow‑Up Support',
    description: 'We stay available for questions, re‑testing, and ongoing guidance after the engagement.',
  },
];

const HowWeWorkSection: React.FC = () => {
  return (
    <section id="how-we-work" className="section bg-[#0B0E14] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">How We Work</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E6EDF3]">
            A Clear, Professional Process
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8B949E]">
            Our recommendations align with Canadian laws, regulators, and business realities.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 rounded-lg border border-[#30363D] bg-[#161B22] hover:border-[#00D1FF] transition-all duration-300 group"
            >
              <span className="text-5xl font-extrabold text-[#2E5BFF]/20 absolute top-4 right-4 group-hover:text-[#2E5BFF]/40 transition-colors">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-[#E6EDF3] mb-2 mt-2">{step.title}</h3>
              <p className="text-[#8B949E] text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
