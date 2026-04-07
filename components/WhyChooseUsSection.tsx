import React from 'react';

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us" className="section bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why Choose Us
          </h2>
        </div>

        {/* Three column layout */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Why Choose Us */}
          <div>
            <h3 className="text-xl font-bold text-[#0B0B0B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Why Choose Us
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We are independent consultants committed to established standards, reliable methodologies, and practical security guidance.
            </p>
          </div>

          {/* Engagement Models */}
          <div>
            <h3 className="text-xl font-bold text-[#0B0B0B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Engagement Models
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We offer flexible engagement models—fixed-scope assessments, project-based work, and ongoing advisory retainers.
            </p>
          </div>

          {/* Compare Us */}
          <div>
            <h3 className="text-xl font-bold text-[#0B0B0B] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Compare Us
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our assessments are transparent and our services come with clear deliverables and straightforward pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
