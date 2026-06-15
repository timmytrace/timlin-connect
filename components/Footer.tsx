import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const isHomeRoute = window.location.pathname === '/';

  return (
    <footer className="bg-[#0B0B0B] border-t border-white/10">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/logo1.png" alt="Timlin Connect" className="h-10 w-10 rounded-md object-cover" />
            <div>
              <p className="text-white/60 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                &copy; {currentYear} Timlin Connect. All rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Practical Cybersecurity for Organizations Worldwide.
              </p>
              <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                MagNum AI is currently in development. Early access coming soon.
              </p>
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href={isHomeRoute ? '#services' : '/#services'} className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Services</a>
            <a href="/magnum-ai" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>MagNum AI</a>
            <a href={isHomeRoute ? '#about' : '/#about'} className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>About</a>
            <a href={isHomeRoute ? '#contact' : '/#contact'} className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
