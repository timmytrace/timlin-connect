import React, { useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhoWeHelpSection from './components/WhoWeHelpSection';
import HowWeWorkSection from './components/HowWeWorkSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import MagnumTeaserSection from './components/MagnumTeaserSection';
import MagnumAIPage from './components/MagnumAIPage';

const HOME_TITLE = 'Timlin Connect | Cybersecurity Services - Risk Assessments, Pen Testing & vCISO';
const HOME_DESCRIPTION = 'Timlin Connect provides practical cybersecurity services including risk assessments, penetration testing, compliance readiness (SOC 2, ISO 27001, GDPR, CCPA), and Virtual CISO advisory. Clear guidance, real results.';
const MAGNUM_TITLE = 'MagNum AI | AI Security Gateway by Timlin Connect';
const MAGNUM_DESCRIPTION = 'MagNum AI is an upcoming AI security gateway from Timlin Connect, designed to help protect LLM applications from prompt injection, sensitive data leakage, unsafe outputs, and risky AI agent behavior.';

const setMetaContent = (selector: string, content: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', content);
  }
};


const App: React.FC = () => {
  const pathname = window.location.pathname;

  const isMagnumPage = useMemo(
    () => pathname === '/magnum-ai' || pathname === '/products/magnum-ai',
    [pathname]
  );

  useEffect(() => {
    if (isMagnumPage) {
      document.title = MAGNUM_TITLE;
      setMetaContent('meta[name="description"]', MAGNUM_DESCRIPTION);
      setMetaContent('meta[property="og:title"]', MAGNUM_TITLE);
      setMetaContent('meta[property="og:description"]', MAGNUM_DESCRIPTION);
      setMetaContent('meta[name="twitter:title"]', MAGNUM_TITLE);
      setMetaContent('meta[name="twitter:description"]', MAGNUM_DESCRIPTION);
      return;
    }

    document.title = HOME_TITLE;
    setMetaContent('meta[name="description"]', HOME_DESCRIPTION);
    setMetaContent('meta[property="og:title"]', 'Timlin Connect | Cybersecurity Services');
    setMetaContent('meta[property="og:description"]', "Practical cybersecurity services - risk assessments, pen testing, compliance readiness, and vCISO advisory. Protect what you've built.");
    setMetaContent('meta[name="twitter:title"]', 'Timlin Connect | Cybersecurity Services');
    setMetaContent('meta[name="twitter:description"]', 'Practical cybersecurity - risk assessments, pen testing, compliance readiness, and vCISO advisory.');
  }, [isMagnumPage]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0B0B0B] selection:bg-[#A3E635] selection:text-[#0B0B0B]">
      <Navbar />
      {isMagnumPage ? (
        <MagnumAIPage />
      ) : (
        <main className="flex-grow">
          <HeroSection />
          <ServicesSection />
          <WhoWeHelpSection />
          <HowWeWorkSection />
          <WhyChooseUsSection />
          <MagnumTeaserSection />
          <AboutSection />
          <ContactSection />
        </main>
      )}
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default App;
