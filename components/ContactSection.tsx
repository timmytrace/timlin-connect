import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    helpWith: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will respond within one business day.');
    setFormData({ name: '', organization: '', email: '', helpWith: '', message: '' });
  };

  return (
    <section id="contact" className="section bg-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side — Header + Contact Info + Image */}
          <div>
            <span className="text-sm font-semibold text-[#A3E635] uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Get Started</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-[#6B7280]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Whether you need a one‑time assessment or ongoing security support, we'll help you move forward with clarity and confidence.
            </p>

            {/* Image placeholder */}
            <div className="img-placeholder w-full aspect-[16/10] bg-[#E5E5E5] rounded-xl flex items-center justify-center mt-8 mb-8">
              <span className="text-[#9CA3AF] text-sm">Contact visual — Office or meeting photo</span>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <p className="text-sm font-semibold text-[#0B0B0B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Email</p>
                <a href="mailto:info@timlinconnect.com" className="text-[#6B7280] hover:text-[#0B0B0B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  info@timlinconnect.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm font-semibold text-[#0B0B0B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Phone</p>
                <a href="tel:+14372630314" className="text-[#6B7280] hover:text-[#0B0B0B] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  +1 (437) 263-0314
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm font-semibold text-[#0B0B0B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Location</p>
                <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Canada‑Based</p>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-[#E5E5E5]">
                <p className="text-sm font-semibold text-[#0B0B0B] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Hours of Operation</p>
                <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                <p className="text-[#6B7280] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Saturday – Sunday: Emergency Support Only</p>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2 pt-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A3E635] pulse-animation"></div>
                <span className="text-[#0B0B0B] text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Available Now</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-[#0B0B0B] text-sm font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-all"
                  placeholder="Your name"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-[#0B0B0B] text-sm font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-all"
                  placeholder="Your organization"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#0B0B0B] text-sm font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-all"
                  placeholder="your.email@example.com"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="helpWith" className="block text-[#0B0B0B] text-sm font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  What can we help with?
                </label>
                <select
                  id="helpWith"
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0B0B0B] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="">Select a service...</option>
                  <option value="risk-assessment">Cybersecurity Risk Assessment</option>
                  <option value="vulnerability">Vulnerability Assessment</option>
                  <option value="pentest">Penetration Testing</option>
                  <option value="compliance">Compliance &amp; Privacy Readiness</option>
                  <option value="vciso">Virtual CISO (vCISO)</option>
                  <option value="incident-response">Incident Response Planning</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#0B0B0B] text-sm font-semibold mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635] transition-all resize-none"
                  placeholder="Tell us about your organization and security needs..."
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Request a Proposal
              </button>

              <p className="text-[#9CA3AF] text-xs text-center mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No obligation. We'll respond within one business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;