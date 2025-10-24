import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import CVSection from '@/components/CVSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import guideLeft from '@/assets/guide-left-new.png';
import guideRight from '@/assets/guide-right-new.png';
import '@/i18n/i18n';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <LoadingScreen />}</AnimatePresence>

      {!loading && (
        // outer container holds background decorative images and main content
        <div className="min-h-screen relative">
          {/* Decorative characters: fixed, behind content, non-interactive, responsive */}
          <img
            src={guideLeft}
            alt=""
            aria-hidden="true"
            className="hidden lg:block pointer-events-none fixed left-4 bottom-8 w-40 max-w-[18rem] opacity-90 z-0 select-none"
            style={{ transform: 'translateZ(0)' }}
          />
          <img
            src={guideRight}
            alt=""
            aria-hidden="true"
            className="hidden lg:block pointer-events-none fixed right-4 bottom-8 w-40 max-w-[18rem] opacity-90 z-0 select-none"
            style={{ transform: 'translateZ(0)' }}
          />

          {/* Main page content sits above the decorative images */}
          <div className="relative z-10">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <CVSection />
            <ContactSection />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
