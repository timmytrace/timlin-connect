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
    <section id="how-we-work" className="section bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — left-aligned */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>How We Work</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            A Clear, Professional Process
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Our recommendations align with Canadian laws, regulators, and business realities.
          </p>
        </div>

        {/* Image placeholder */}
        <div className="img-placeholder w-full aspect-[21/9] bg-[#E5E5E5] rounded-xl flex items-center justify-center mb-16">
          <span className="text-[#9CA3AF] text-sm">Process visual — Workflow or methodology diagram</span>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#A3E635] transition-all duration-300"
            >
              <span className="text-5xl font-bold text-[#A3E635]/30 absolute top-4 right-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-[#0B0B0B] mb-2 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
