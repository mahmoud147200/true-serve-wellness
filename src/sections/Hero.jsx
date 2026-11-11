import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles, MapPin, ChevronDown, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useLang } from '../hooks/useAppContext';
import { siteConfig, buildWhatsAppUrl } from '../config/site';

const HeroScene3D = lazy(() => import('../components/HeroScene3D'));

export function Hero() {
  const { lang, isRtl, isDark, prefersReducedMotion, t } = useLang();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }, contentRef);
    return () => ctx.revert();
  }, [lang, prefersReducedMotion]);

  const whatsappHref = buildWhatsAppUrl(t.hero.defaultWhatsappText);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('services');
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FBF9F5] to-[#F4EFE6] dark:from-[#040B16] dark:via-[#06101E] dark:to-[#0A192F]"
    >
      {/* Ambient Radial Luxury Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 start-1/4 w-[28rem] h-[28rem] rounded-full bg-[#0A5CBA]/12 dark:bg-[#0A5CBA]/20 blur-[110px]" />
        <div className="absolute top-1/3 end-10 w-[24rem] h-[24rem] rounded-full bg-[#00C853]/10 dark:bg-[#00C853]/15 blur-[100px]" />
        <div className="absolute bottom-0 start-1/3 w-[30rem] h-[18rem] rounded-full bg-[#C9A66B]/15 dark:bg-[#C9A66B]/10 blur-[95px]" />
      </div>

      {/* Masked Storefront / Reception Visual Blend Layer */}
      <div
        className="absolute inset-y-0 end-0 w-full lg:w-[54%] pointer-events-none opacity-20 lg:opacity-30 dark:opacity-20 select-none"
        style={{
          maskImage: isRtl
            ? 'radial-gradient(circle at 28% 50%, black 20%, transparent 76%)'
            : 'radial-gradient(circle at 72% 50%, black 20%, transparent 76%)',
          WebkitMaskImage: isRtl
            ? 'radial-gradient(circle at 28% 50%, black 20%, transparent 76%)'
            : 'radial-gradient(circle at 72% 50%, black 20%, transparent 76%)',
        }}
        aria-hidden="true"
      >
        <picture>
          <source srcSet={siteConfig.assets.storefront.webp} type="image/webp" />
          <img
            src={siteConfig.assets.storefront.jpg}
            alt=""
            width="780"
            height="755"
            fetchpriority="high"
            className="w-full h-full object-cover object-center scale-105"
          />
        </picture>
      </div>

      {/* Interactive 3D Three.js Scene */}
      <Suspense fallback={null}>
        <HeroScene3D
          isDark={isDark}
          prefersReducedMotion={prefersReducedMotion}
          inView={inView}
        />
      </Suspense>

      {/* Foreground Content Grid */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Primary Text Column */}
          <div className="lg:col-span-7 relative flex flex-col items-start text-start">
            {/* Soft radial readability veil behind Hero text */}
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-[#FBF9F5]/65 dark:bg-[#06101E]/65 backdrop-blur-[3px] -z-10 pointer-events-none"
              aria-hidden="true"
            />
            {/* Top Status Badges: Open Always 24/7 + Riyadh Location */}
            <div className="hero-reveal flex flex-wrap items-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/12 dark:bg-emerald-500/20 border border-emerald-500/35 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00C853]" />
                </span>
                <span>{t.hero.badge}</span>
              </div>

              <a
                href={siteConfig.location.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:border-[#0A5CBA] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0A5CBA] dark:text-[#38BDF8]" />
                <span>{t.hero.locationPill}</span>
              </a>
            </div>

            {/* Eyebrow Brand Name */}
            <p className="hero-reveal text-sm sm:text-base font-bold tracking-wide text-[#0A5CBA] dark:text-[#38BDF8] mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#C9A66B] rounded-full inline-block" />
              <span>{t.hero.eyebrow}</span>
            </p>

            {/* Split-Text Reveal Headline */}
            <h1 className="hero-reveal text-3xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.28] sm:leading-[1.22] mb-5">
              <span className="block mb-1">{t.hero.headlinePart1}</span>
              <span className="brand-text-gradient block">{t.hero.headlinePart2}</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-reveal text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mb-6 leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Highlighted Poster Slogan Pill */}
            <div className="hero-reveal inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0A5CBA]/10 via-[#0A8F4A]/10 to-[#C9A66B]/15 border border-[#C9A66B]/40 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold mb-8">
              <Sparkles className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <span>{t.hero.posterSlogan}</span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="hero-reveal flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#0A5CBA] via-[#0288D1] to-[#0A8F4A] shadow-glow hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.hero.primaryCta}</span>
              </a>

              <a
                href="#services"
                onClick={handleExploreClick}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3.5 rounded-2xl font-bold text-base text-slate-800 dark:text-white glass-panel hover:border-[#0A5CBA] dark:hover:border-[#38BDF8] hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300"
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>

            {/* 3 Key Highlights Row */}
            <div className="hero-reveal grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
              {t.hero.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-4 border border-[#C9A66B]/30 shadow-sm hover:border-[#0A5CBA]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#0A8F4A] dark:text-[#00C853] shrink-0" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right/End Visual Showcase Card (Cleaned Storefront + Lounge Preview) */}
          <div className="lg:col-span-5 hero-reveal">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Gold Frame Offset */}
              <div
                className="absolute -inset-3 rounded-[2rem] border border-[#C9A66B]/45 rotate-2 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Masked Photo Card */}
              <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl border-2 border-white/80 dark:border-slate-800/90 bg-slate-900 aspect-[4/4.2]">
                <picture>
                  <source srcSet={siteConfig.assets.storefront.webp} type="image/webp" />
                  <img
                    src={siteConfig.assets.storefront.jpg}
                    alt={
                      lang === 'ar'
                        ? 'واجهة مركز ترو سيرف للتدليك الصحي في الرياض'
                        : 'True Serve Therapeutic Massage storefront in Riyadh'
                    }
                    width="780"
                    height="755"
                    className="w-full h-full object-cover object-center"
                  />
                </picture>

                {/* Subtle bottom gradient overlay for glass caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/90 via-[#06101E]/25 to-transparent" />

                {/* Floating Glass Badge inside Hero Visual */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/90 dark:bg-[#0C1B30]/90 backdrop-blur-md border border-[#C9A66B]/40 flex items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white p-1.5 shadow-sm border border-slate-100 shrink-0 flex items-center justify-center">
                      <img
                        src={siteConfig.assets.logo}
                        alt=""
                        width="38"
                        height="26"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                        {lang === 'ar' ? siteConfig.brand.nameAr : siteConfig.brand.nameEn}
                      </p>
                      <p className="text-[11px] text-[#0A8F4A] dark:text-[#00C853] font-semibold">
                        {lang === 'ar' ? siteConfig.location.districtAr : siteConfig.location.districtEn} • 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label={t.hero.scrollHint}
            className="inline-flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#0A5CBA] dark:hover:text-[#38BDF8] transition-colors"
          >
            <span>{t.hero.scrollHint}</span>
            <span className="w-8 h-8 rounded-full glass-panel flex items-center justify-center border border-[#C9A66B]/40 animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
