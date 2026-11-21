import React, { useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { Navbar } from '@/src/components/Navbar';
import { DayNightMode, HeroDayNight } from '@/src/components/HeroDayNight';
import { TrustStrip } from '@/src/components/TrustStrip';
import { Services } from '@/src/components/Services';
import { Process } from '@/src/components/Process';
import { Capabilities } from '@/src/components/Capabilities';
import { Projects } from '@/src/components/Projects';
import { ClientMarquee } from '@/src/components/ClientMarquee';
import { About } from '@/src/components/About';
import { Gallery } from '@/src/components/Gallery';
import { Contact } from '@/src/components/Contact';
import { Footer } from '@/src/components/Footer';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<DayNightMode>('morning');
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const [selectedService, setSelectedService] = useState<
    'Ground Mounted' | 'Rooftop' | 'Others'
  >('Ground Mounted');

  // Sync Tailwind .dark class on <html> with Morning (light) / Night (dark) mode
  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'night') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  // Auto-switch between Morning and Night every 6s only while user is at top of hero and hasn't clicked toggle
  useEffect(() => {
    if (prefersReducedMotion || !autoPlayActive) return;
    const timer = window.setInterval(() => {
      if (window.scrollY < 140) {
        setMode((prev) => (prev === 'morning' ? 'night' : 'morning'));
      }
    }, 6000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, autoPlayActive]);

  const handleModeSelect = (nextMode: DayNightMode) => {
    setAutoPlayActive(false);
    setMode(nextMode);
  };

  const scrollToContact = (service?: 'Ground Mounted' | 'Rooftop') => {
    if (service) {
      setSelectedService(service);
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#241912] transition-colors duration-500 dark:bg-[#07100C] dark:text-[#F5F5F0]">
        <Navbar onQuoteClick={() => scrollToContact()} />

        <main>
          <HeroDayNight
            mode={mode}
            onSelectMode={handleModeSelect}
            onConsultClick={() => scrollToContact()}
          />
          <TrustStrip />
          <Services onSelectService={(service) => scrollToContact(service)} />
          <Process />
          <Capabilities />
          <Projects onInquireProject={(type) => scrollToContact(type)} />
          <ClientMarquee />
          <About />
          <Gallery />
          <Contact preselectedService={selectedService} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
