import React, { useState, useEffect, useRef } from 'react';

/**
 * Navigation grouped as Platform / Services / Research / Company.
 *
 * A flat row of six links (Services, Industries, How We Work, Blog, About,
 * Contact) reads as a consultancy's site map. Grouping puts the product first
 * and gives the services and research work somewhere to live as practices
 * rather than as page anchors.
 *
 * Only destinations that exist are listed. The strategy this follows also
 * proposes Agent Security, an AI Security API, a documentation section and
 * careers; none of those exist yet, and a menu that opens onto nothing costs
 * more trust than an extra heading buys.
 */

type MenuItem = { label: string; href: string; description?: string };
type Menu = { label: string; items: MenuItem[] };

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Trailing slashes are stripped before comparison: /gateway is served from a
  // prerendered directory index, so the browser may show either form and the
  // active-nav state must not depend on which one it lands on.
  const pathname = window.location.pathname.replace(/(.)\/+$/, '$1');
  const isHomeRoute = pathname === '/' || pathname === '/index.html';
  const isGatewayRoute =
    pathname === '/gateway' ||
    pathname === '/magnum-ai' ||
    pathname === '/products/magnum-ai';
  const isBlogRoute = pathname === '/blog' || pathname.startsWith('/blog/');
  // Routes whose page starts with a dark hero can carry a transparent navbar until scroll.
  const hasDarkHero = isHomeRoute || isBlogRoute;
  const navIsSolid = !hasDarkHero || isScrolled;

  /** Section anchors only resolve on the homepage; elsewhere they need the path. */
  const home = (anchor: string) => (isHomeRoute ? anchor : `/${anchor}`);

  const menus: Menu[] = [
    {
      label: 'Platform',
      items: [
        {
          label: 'Timlin Gateway',
          href: '/gateway',
          description: 'Inspect and control every AI interaction',
        },
      ],
    },
    {
      label: 'Services',
      items: [
        { label: 'AI Security', href: home('#services-ai'), description: 'Assessments, red teaming, governance' },
        { label: 'Offensive Security', href: home('#services-offensive'), description: 'Penetration and vulnerability testing' },
        { label: 'Security Advisory', href: home('#services-advisory'), description: 'Risk, compliance, vCISO, incident response' },
      ],
    },
    {
      label: 'Research',
      items: [
        { label: 'Research & Insights', href: '/blog', description: 'Everything we publish' },
        { label: 'Threat Research', href: '/blog?category=Threat%20Research', description: 'What we tested, and what it found' },
        { label: 'AI Security', href: '/blog?category=AI%20Security', description: 'Prompt injection, leakage, agents' },
      ],
    },
    {
      label: 'Company',
      items: [
        { label: 'About', href: home('#about') },
        { label: 'How We Work', href: home('#how-we-work') },
        { label: 'Industries', href: home('#who-we-help') },
        { label: 'Contact', href: home('#contact') },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // A menu closes on Escape or on a click outside it, so it can never be left
  // hanging over the page.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [openMenu]);

  const handleNavLinkClick = () => {
    setOpenMenu(null);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const triggerClass = `inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
    navIsSolid ? 'text-[#6B7280] hover:text-[#0B0B0B]' : 'text-white/70 hover:text-white'
  }`;

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

          <div ref={navRef} className="hidden xl:flex items-center gap-2">
            <div
              className="flex items-center gap-1 whitespace-nowrap"
              onMouseLeave={() => setOpenMenu(null)}
            >
              {menus.map((menu) => (
                <div key={menu.label} className="relative" onMouseEnter={() => setOpenMenu(menu.label)}>
                  <button
                    type="button"
                    className={triggerClass}
                    aria-expanded={openMenu === menu.label}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
                  >
                    {menu.label}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${openMenu === menu.label ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5l5 5 5-5" />
                    </svg>
                  </button>

                  {openMenu === menu.label && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="min-w-[17rem] rounded-xl border border-[#E5E5E5] bg-white p-2 shadow-[0_24px_50px_-24px_rgba(11,11,11,0.45)]">
                        {menu.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={handleNavLinkClick}
                            className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                          >
                            <span className="block text-sm font-semibold text-[#0B0B0B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="mt-0.5 block text-xs text-[#6B7280]">{item.description}</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <a
                href="/gateway"
                onClick={handleNavLinkClick}
                aria-current={isGatewayRoute ? 'page' : undefined}
                className={`ml-1 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${
                  isGatewayRoute
                    ? 'border-[#A3E635] bg-[#A3E635] text-[#0B0B0B]'
                    : navIsSolid
                      ? 'border-[#D1D5DB] text-[#0B0B0B] hover:border-[#0B0B0B]'
                      : 'border-white/25 text-white hover:border-white/70'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-[#A3E635]" aria-hidden="true" />
                Timlin Gateway
              </a>
              <a
                href={home('#contact')}
                onClick={handleNavLinkClick}
                className={`ml-1 px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${navIsSolid ? 'bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white' : 'bg-white hover:bg-white/90 text-[#0B0B0B]'}`}
                tabIndex={0}
              >
                Request a Demo
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

      {/* Mobile: every group expanded, since a phone has no hover. */}
      <div
        id="mobile-navigation"
        className={`xl:hidden transition-all duration-300 overflow-y-auto ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: navIsSolid ? 'rgba(250,250,250,0.98)' : 'rgba(11,11,11,0.95)' }}
      >
        <div className="px-4 pt-2 pb-4 space-y-4">
          {menus.map((menu) => (
            <div key={menu.label}>
              <p className={`px-3 pb-1 text-xs font-semibold uppercase tracking-[0.14em] ${navIsSolid ? 'text-[#9CA3AF]' : 'text-white/40'}`}>
                {menu.label}
              </p>
              {menu.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavLinkClick}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] ${navIsSolid ? 'text-[#6B7280] hover:text-[#0B0B0B] hover:bg-[#F0F0F0]' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                  tabIndex={0}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
          <a
            href={home('#contact')}
            onClick={handleNavLinkClick}
            className={`block text-center px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${navIsSolid ? 'bg-[#0B0B0B] hover:bg-[#0B0B0B]/85 text-white' : 'bg-white hover:bg-white/90 text-[#0B0B0B]'}`}
            tabIndex={0}
          >
            Request a Demo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
