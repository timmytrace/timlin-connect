import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0E14] text-[#E6EDF3] selection:bg-[#00D1FF] selection:text-[#0B0E14]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
