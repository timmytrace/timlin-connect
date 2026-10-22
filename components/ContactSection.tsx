import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    helpWith: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const encode = (data: Record<string, string>) =>
    Object.entries(data)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', organization: '', email: '', helpWith: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section bg-[#0B0B0B] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/*
            A stock photograph of six people in a meeting used to sit here,
            captioned "Team meeting", beside copy that names a sole founder.
            Generic office stock is the clearest template signal a page can
            send, and it was hotlinked from Unsplash's CDN, so every visitor's
            browser called a third party.

            What replaces it is what someone actually wants before sending a
            message to a stranger: who reads it, how fast, and what to put in
            it. The space was never doing visual work the form needed.
          */}
          <div className="order-last lg:order-first">
            <h3
              className="text-xl font-semibold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              What happens next
            </h3>
            <dl className="mt-6 space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <div className="border-l-[3px] border-[#A3E635] pl-5">
                <dt className="text-white font-medium">Timilehin reads it</dt>
                <dd className="mt-1 text-white/60 leading-relaxed">
                  Not a form queue. The person who does the work replies, usually within one
                  business day.
                </dd>
              </div>
              <div className="border-l-[3px] border-white/15 pl-5">
                <dt className="text-white font-medium">A straight answer on fit</dt>
                <dd className="mt-1 text-white/60 leading-relaxed">
                  If this is not work we should take on, we will say so and point you somewhere
                  better. We would rather lose an engagement than take one we cannot do well.
                </dd>
              </div>
              <div className="border-l-[3px] border-white/15 pl-5">
                <dt className="text-white font-medium">Then a scoped proposal</dt>
                <dd className="mt-1 text-white/60 leading-relaxed">
                  Fixed scope, fixed price, named deliverables and a retest. No open-ended
                  retainers.
                </dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-white/10 pt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p className="text-white/60 text-sm leading-relaxed">
                Helpful to include: what the model is used for, what data reaches it, and whether
                it can call tools or retrieve documents. If you would rather just email,{' '}
                <a
                  href="mailto:info@timlinconnect.com"
                  className="text-white underline underline-offset-4 decoration-[#A3E635] hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded"
                >
                  info@timlinconnect.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact Us
            </h2>

            <form name="contact" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="contact" />
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
                  {/*
                    These must match the services actually offered in
                    components/ServicesSection.tsx. They did not: the form
                    listed six services, none of them the AI work, while the
                    site said the AI practice led. A contact form offering
                    something the site does not is its own kind of overclaim.
                  */}
                  <option value="">Select a service</option>
                  <option value="ai-assessment">AI Security Assessment</option>
                  <option value="ai-red-team">AI Red Teaming</option>
                  <option value="llm-app-testing">LLM &amp; Application Security Testing</option>
                  <option value="ai-governance">AI Governance Readiness</option>
                  <option value="design-partner">Timlin Gateway design partner</option>
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
                disabled={status === 'loading'}
                className="w-full bg-white hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed text-[#0B0B0B] font-semibold px-6 py-3.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {status === 'loading' ? 'Sending…' : 'Request a Proposal'}
              </button>

              {status === 'success' && (
                <p className="text-[#A3E635] text-sm text-center pt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Thank you! We'll be in touch within one business day.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center pt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Something went wrong. Please email us at{' '}
                  <a href="mailto:info@timlinconnect.com" className="underline">info@timlinconnect.com</a>.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;