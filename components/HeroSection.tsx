import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900/30 min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden animate-fade-in">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl animate-pulse-slower"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block text-slate-100">Practical Cybersecurity</span>
            <span className="block text-sky-400 mt-2 sm:mt-3">for Canadian Organizations</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
            Risk assessments, compliance support, and advisory services tailored to Canada's privacy and regulatory landscape. Clear guidance without unnecessary complexity.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="inline-block bg-sky-500 hover:bg-sky-600 focus-visible:ring-2 focus-visible:ring-sky-400 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none text-base sm:text-lg"
              aria-label="Request a consultation"
            >
              Request a Consultation
            </a>
            <a
              href="#services"
              className="inline-block bg-slate-700 hover:bg-slate-600 focus-visible:ring-2 focus-visible:ring-sky-400 text-slate-100 font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none text-base sm:text-lg"
              aria-label="View our cybersecurity services"
            >
              View Services
            </a>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-sky-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <span className="text-slate-300 text-sm font-medium">PIPEDA‑Aligned</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-sky-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <span className="text-slate-300 text-sm font-medium">ISO / NIST‑Based</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-sky-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 9.749c0 .832-.117 1.637-.332 2.399M2.332 12.148A8.96 8.96 0 002 9.75c0-.833.117-1.637.332-2.4" />
            </svg>
            <span className="text-slate-300 text-sm font-medium">Vendor‑Neutral</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-sky-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-slate-300 text-sm font-medium">Serving Canada</span>
          </div>
        </div>
      </div>
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