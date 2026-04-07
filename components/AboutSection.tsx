import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            About Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <div>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our mission is to help Canadian organizations navigate cybersecurity with clarity and confidence, guided by experienced professionals in cybersecurity and regulatory compliance.
            </p>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We are experienced cybersecurity professionals with advanced tools and methodologies, helping organizations mitigate risk across Canada's privacy and regulatory landscape. Clear guidance without unnecessary complexity.
            </p>

            <ul className="space-y-2 mt-6">
              <li className="flex items-start text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0B] mr-2.5 mt-1.5 flex-shrink-0"></span>
                Practical, actionable security guidance
              </li>
              <li className="flex items-start text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0B] mr-2.5 mt-1.5 flex-shrink-0"></span>
                Privacy and compliance-focused approach
              </li>
              <li className="flex items-start text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0B] mr-2.5 mt-1.5 flex-shrink-0"></span>
                Industry-recognized certifications and standards
              </li>
              <li className="flex items-start text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0B0B] mr-2.5 mt-1.5 flex-shrink-0"></span>
                Community and social responsibility focus
              </li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="w-full aspect-[4/3] bg-[#E5E5E5] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
              alt="Team at work"
              className="w-full h-full object-cover grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
