import React, { useState, useEffect } from 'react';
import logo from './logo.jpg';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#who-we-help', label: 'Industries' },
    { href: '#how-we-work', label: 'How We Work' },
    { href: '#about', label: 'About' },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'} border-b border-[#E5E5E5]/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center text-2xl font-bold text-[#0B0B0B] hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded-md" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <img
                src={logo}
                alt="Timlin Connect Logo"
                className="h-10 w-auto mr-3"
              />
              Timlin<span className="text-[#6B7280]">Connect</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavLinkClick}
                  className="text-[#6B7280] hover:text-[#0B0B0B] px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                  tabIndex={0}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleNavLinkClick}
                className="bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                tabIndex={0}
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0B0B0B] hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] transition-all"
              aria-label="Toggle navigation menu"
            >
              <svg className={`h-7 w-7 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} style={{background: 'rgba(250,250,250,0.98)'}}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavLinkClick}
              className="block text-[#6B7280] hover:text-[#0B0B0B] hover:bg-[#F0F0F0] px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavLinkClick}
            className="block text-center bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white px-4 py-2.5 rounded-lg text-base font-semibold transition-all mt-2"
            tabIndex={0}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
