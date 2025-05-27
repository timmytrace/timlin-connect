import React from 'react';

// Basic SVG icons for contact details
const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
  </svg>
);


const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section bg-slate-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
            Let's Build Something <span className="text-sky-400">Amazing</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Ready to transform your business with cutting-edge technology? We're here to help. Reach out to us for a consultation or to discuss your project ideas.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Contact Info Card */}
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold text-sky-400 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MailIcon className="flex-shrink-0 h-6 w-6 text-sky-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-medium text-slate-100">Email Us</h4>
                    <a href="mailto:info@timlinconnect.com" className="text-slate-300 hover:text-sky-300 transition-colors">
                      info@timlinconnect.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="flex-shrink-0 h-6 w-6 text-sky-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-medium text-slate-100">Call Us</h4>
                    <a href="tel:+15551234567" className="text-slate-300 hover:text-sky-300 transition-colors">
                      +1 (555) 123-4567
                    </a>
                    <p className="text-xs text-slate-400">(Mon-Fri, 9am - 5pm EST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for a contact form or map if needed later */}
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl flex flex-col justify-center items-center">
               <h3 className="text-2xl font-semibold text-sky-400 mb-4">Connect With Us</h3>
                <p className="text-slate-300 text-center mb-6">
                    We're excited to hear about your project and discuss how we can help you achieve your goals.
                </p>
                <a
                    href="mailto:info@timlinconnect.com?subject=Project Inquiry from Website"
                    className="w-full max-w-xs text-center bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    aria-label="Send us an email inquiry"
                >
                    Send an Inquiry
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
