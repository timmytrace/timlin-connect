import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = window.location.pathname;
  const isHomeRoute = pathname === '/' || pathname === '/index.html';
  const isMagnumRoute = pathname === '/magnum-ai' || pathname === '/products/magnum-ai';
  const navIsSolid = !isHomeRoute || isScrolled;

  const navLinks = [
    { href: isHomeRoute ? '#services' : '/#services', label: 'Services' },
    { href: isHomeRoute ? '#who-we-help' : '/#who-we-help', label: 'Industries' },
    { href: isHomeRoute ? '#how-we-work' : '/#how-we-work', label: 'How We Work' },
    { href: isHomeRoute ? '#about' : '/#about', label: 'About' },
    { href: isHomeRoute ? '#contact' : '/#contact', label: 'Contact' },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navIsSolid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href={isHomeRoute ? '#home' : '/'} className="flex items-center hover:opacity-80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] rounded-md">
              <img src="/logo1.png" alt="Timlin Connect" className="h-12 w-12 rounded-md object-cover" />
              <span className={`ml-2 text-xl font-bold leading-tight ${navIsSolid ? 'text-[#0B0B0B]' : 'text-white'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Timlin Connect
              </span>
            </a>
          </div>
          <div className="hidden xl:flex items-center gap-2">
            <div className="flex items-center gap-1 whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavLinkClick}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${navIsSolid ? 'text-[#6B7280] hover:text-[#0B0B0B]' : 'text-white/70 hover:text-white'}`}
                  tabIndex={0}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/magnum-ai"
                onClick={handleNavLinkClick}
                aria-current={isMagnumRoute ? 'page' : undefined}
                className={`ml-1 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
                  isMagnumRoute
                    ? 'border-[#A3E635] bg-[#A3E635] text-[#0B0B0B]'
                    : navIsSolid
                      ? 'border-[#D1D5DB] text-[#0B0B0B] hover:border-[#0B0B0B]'
                      : 'border-white/25 text-white hover:border-white/70'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#A3E635]" aria-hidden="true" />
                MagNum AI
              </a>
              <a
                href={isHomeRoute ? '#contact' : '/#contact'}
                onClick={handleNavLinkClick}
                className={`ml-1 px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${navIsSolid ? 'bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white' : 'bg-white hover:bg-white/90 text-[#0B0B0B]'}`}
                tabIndex={0}
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] transition-all ${navIsSolid ? 'text-[#0B0B0B] hover:bg-[#F0F0F0]' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg className={`h-7 w-7 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-navigation" className={`xl:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}`} style={{background: navIsSolid ? 'rgba(250,250,250,0.98)' : 'rgba(11,11,11,0.95)'}}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${navIsSolid ? 'text-[#6B7280] hover:text-[#0B0B0B] hover:bg-[#F0F0F0]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/magnum-ai"
            onClick={handleNavLinkClick}
            aria-current={isMagnumRoute ? 'page' : undefined}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
              isMagnumRoute
                ? 'bg-[#A3E635] text-[#0B0B0B]'
                : navIsSolid
                  ? 'text-[#0B0B0B] hover:bg-[#F0F0F0]'
                  : 'text-white hover:bg-white/10'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#A3E635]" aria-hidden="true" />
            MagNum AI
          </a>
          <a
            href={isHomeRoute ? '#contact' : '/#contact'}
            onClick={handleNavLinkClick}
            className={`block text-center px-4 py-2.5 rounded-lg text-base font-semibold transition-all mt-2 ${navIsSolid ? 'bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white' : 'bg-white hover:bg-white/90 text-[#0B0B0B]'}`}
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
