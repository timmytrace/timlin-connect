import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-slate-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-sky-400 tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
            Driving Innovation, Together
          </p>
        </div>
        <div className="mt-10 max-w-3xl mx-auto text-lg text-slate-300 space-y-6">
          <p>
            Timlin Connect is a dynamic tech startup born from a passion for leveraging technology to solve real-world business challenges. We are a team of dedicated developers, cybersecurity experts, and IT professionals committed to delivering excellence and innovation.
          </p>
          <p>
            Our mission is to be your trusted partner in navigating the complexities of the digital landscape. We believe in building strong, collaborative relationships with our clients, understanding their unique needs, and crafting tailored solutions that drive growth, efficiency, and security.
          </p>
          <p>
            Whether you're looking to build a groundbreaking application, fortify your defenses against cyber threats, or ensure your IT infrastructure is robust and reliable, Timlin Connect is here to help you succeed.
          </p>
        </div>
         <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 text-base"
            aria-label="Learn how we can help your business"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
