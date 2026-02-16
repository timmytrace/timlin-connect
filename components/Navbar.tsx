import React, { useState, useEffect } from 'react';
import logo from './logo.jpg';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-800/80 shadow-2xl backdrop-blur-md' : 'bg-transparent'} border-b border-slate-700/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center text-2xl font-extrabold text-sky-400 hover:text-sky-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md">
              <img 
                src={logo} 
                alt="Timlin Connect Logo" 
                className="h-10 w-auto mr-3 drop-shadow-lg" 
              />
              Timlin<span className="text-slate-100">Connect</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavLinkClick}
                  className="text-slate-300 hover:bg-sky-700/20 hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  tabIndex={0}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sky-400 hover:text-sky-300 hover:bg-slate-700/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all"
              aria-label="Toggle navigation menu"
            >
              <svg className={`h-7 w-7 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`} style={{background: 'rgba(15,23,42,0.98)'}}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavLinkClick}
              className="block text-slate-300 hover:bg-sky-700/20 hover:text-sky-400 px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
