import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement proper form submission handling with backend API
    // For now, log to console and clear form
    console.log('Form submitted:', formData);
    // TODO: Replace with proper toast notification system
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section bg-[#0B0E14] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">Get In Touch</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E6EDF3]">
            Contact Our Team
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8B949E]">
            Let's discuss how we can help secure and scale your business
          </p>
        </div>

        {/* Glassmorphism Contact Container */}
        <div className="glass-effect rounded-lg p-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#00D1FF] icon-drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Connection
                </h3>
                <p className="text-[#8B949E] text-sm">
                  Your privacy and security are our top priorities
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-[#00D1FF] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-[#8B949E] text-sm font-semibold mb-1">Email</p>
                  <a href="mailto:contact@timlinconnect.com" className="text-[#00D1FF] hover:text-[#00D1FF]/80 transition-colors">
                    contact@timlinconnect.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-[#00D1FF] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-[#8B949E] text-sm font-semibold mb-1">Phone</p>
                  <a href="tel:+14372630314" className="text-[#00D1FF] hover:text-[#00D1FF]/80 transition-colors">
                    +1 (437) 263-0314
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-[#30363D]">
                <p className="text-[#8B949E] text-sm font-semibold mb-2">Hours of Operation</p>
                <p className="text-[#8B949E] text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p className="text-[#8B949E] text-sm">Saturday - Sunday: Emergency Support Only</p>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center space-x-2 pt-4">
                <div className="w-3 h-3 rounded-full bg-green-400 pulse-animation"></div>
                <span className="text-green-400 text-sm font-semibold">Online - Available Now</span>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#E6EDF3] text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#161B22] border border-[#30363D] rounded-lg text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#E6EDF3] text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#161B22] border border-[#30363D] rounded-lg text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#E6EDF3] text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-[#161B22] border border-[#30363D] rounded-lg text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#E6EDF3] text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 bg-[#161B22] border border-[#30363D] rounded-lg text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF] transition-all resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2E5BFF] hover:bg-[#2E5BFF]/80 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2E5BFF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]"
                >
                  Send Message
                </button>

                <p className="text-[#8B949E] text-xs text-center mt-4 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1 text-[#00D1FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Your data is encrypted and secure
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;