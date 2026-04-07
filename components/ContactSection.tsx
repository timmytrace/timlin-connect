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
    <section id="contact" className="section bg-[#0B0B0B] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side — Image */}
          <div className="hidden lg:block">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Team meeting"
                className="w-full h-full object-cover grayscale opacity-60"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  placeholder="Your name"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-white/70 text-sm font-medium mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  placeholder="Your organization"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  placeholder="your.email@example.com"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label htmlFor="helpWith" className="block text-white/70 text-sm font-medium mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Service
                </label>
                <select
                  id="helpWith"
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-[#0B0B0B] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="">Select a service</option>
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
                <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-[#0B0B0B] placeholder-[#9CA3AF] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                  placeholder="Tell us about your organization and security needs..."
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-white/90 text-[#0B0B0B] font-semibold px-6 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Request a Proposal
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;