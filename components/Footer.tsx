import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0B] border-t border-[#E5E5E5]/10">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-white/60 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              &copy; {currentYear} Timlin Connect. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Practical Cybersecurity for Canadian Organizations.
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#services" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Services</a>
            <a href="#about" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>About</a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
