import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Timlin Connect. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Practical Cybersecurity for Canadian Organizations.
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#services" className="text-slate-400 hover:text-slate-300 transition-colors">Services</a>
            <a href="#about" className="text-slate-400 hover:text-slate-300 transition-colors">About</a>
            <a href="#contact" className="text-slate-400 hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
