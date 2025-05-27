import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900/30 min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden animate-fade-in">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl animate-pulse-slower"></div>
      </div>
      <div className="relative text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          <span className="block text-slate-100">Timlin Connect:</span>
          <span className="block text-sky-400 mt-2 sm:mt-3">Innovate. Secure. Support.</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-lg sm:text-xl text-slate-300 md:max-w-2xl">
          Your partners in modern development, robust cybersecurity, and reliable IT solutions, empowering your business for a digital future.
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <a
            href="#services"
            className="inline-block bg-sky-500 hover:bg-sky-600 focus-visible:ring-2 focus-visible:ring-sky-400 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none text-base sm:text-lg"
            aria-label="Discover our services"
          >
            Discover Our Services
          </a>
          <a
            href="#contact"
            className="inline-block bg-slate-700 hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-sky-400 text-slate-100 font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none text-base sm:text-lg"
            aria-label="Contact us for a consultation"
          >
            Get In Touch
          </a>
        </div>
      </div>
      {/* Fix: Remove jsx prop from style tag */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.03); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;