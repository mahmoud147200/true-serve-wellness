import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppProvider, useLang } from './hooks/useAppContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { FloatingActions } from './components/FloatingActions';
import { WaveDivider } from './components/WaveDivider';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { HowItWorks } from './sections/HowItWorks';
import { Benefits } from './sections/Benefits';
import { Gallery } from './sections/Gallery';
import { WhyUs } from './sections/WhyUs';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function SmoothScrollLayout() {
  const { prefersReducedMotion, lang } = useLang();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#06101E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <FloatingActions />

      <main id="main-content" className="flex-1">
        <Hero />
        <WaveDivider variant="hero-about" />
        <About />
        <WaveDivider variant="about-services" flip />
        <Services />
        <WaveDivider variant="services-how" />
        <HowItWorks />
        <WaveDivider variant="how-benefits" flip />
        <Benefits />
        <WaveDivider variant="benefits-gallery" />
        <Gallery />
        <WaveDivider variant="gallery-why" flip />
        <WhyUs />
        <WaveDivider variant="why-contact" />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <SmoothScrollLayout />
    </AppProvider>
  );
}
