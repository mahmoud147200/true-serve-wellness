import React, { useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2, Shield, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../hooks/useAppContext';
import { siteConfig } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { lang, prefersReducedMotion, t } = useLang();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      gsap.to('.about-parallax-up', {
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.about-parallax-down', {
        y: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#FBF9F5] dark:bg-[#06101E]"
    >
      {/* Subtle Brand Render Mood Background Watermark */}
      <div
        className="absolute inset-y-0 start-0 w-1/3 opacity-[0.04] dark:opacity-[0.06] pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        <picture>
          <source srcSet={siteConfig.assets.brandRender.webp} type="image/webp" />
          <img
            src={siteConfig.assets.brandRender.jpg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Collage Column (3 Real Interior Photos + Brand Mood Concept Card) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative grid grid-cols-12 gap-4 sm:gap-5 items-center">
              {/* Decorative Gold Halo Ring */}
              <div
                className="absolute -inset-3 rounded-[2.25rem] border border-[#C9A66B]/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* Photo 1: Reception Area (Real) */}
              <div className="col-span-7 about-parallax-up about-animate">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#C9A66B]/45 bg-slate-900 group aspect-[4/4.6]">
                  <picture>
                    <source srcSet={siteConfig.assets.reception.webp} type="image/webp" />
                    <img
                      src={siteConfig.assets.reception.jpg}
                      alt={
                        lang === 'ar'
                          ? 'منطقة الاستقبال في مركز ترو سيرف للتدليك الصحي'
                          : 'Reception area at True Serve Therapeutic Massage'
                      }
                      width="575"
                      height="700"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </picture>
                  <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                    {t.about.realPhotoBadge}
                  </div>
                </div>
              </div>

              {/* Right Stack: Lounge Tulips (Real) + Brand Concept Mood */}
              <div className="col-span-5 flex flex-col gap-4 sm:gap-5 about-parallax-down">
                {/* Photo 2: Lounge Tulips (Real) */}
                <div className="about-animate relative rounded-3xl overflow-hidden shadow-lg border-2 border-[#C9A66B]/40 bg-slate-900 group aspect-square">
                  <picture>
                    <source srcSet={siteConfig.assets.loungeTulips.webp} type="image/webp" />
                    <img
                      src={siteConfig.assets.loungeTulips.jpg}
                      alt={
                        lang === 'ar'
                          ? 'صالة الضيافة والانتظار في مركز ترو سيرف'
                          : 'Waiting lounge with tulips and gold coffee table at True Serve'
                      }
                      width="750"
                      height="735"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </picture>
                </div>

                {/* Photo 3: Lounge with Wall Clock (Real) */}
                <div className="about-animate relative rounded-3xl overflow-hidden shadow-lg border-2 border-[#C9A66B]/40 bg-slate-900 group aspect-[4/3.6]">
                  <picture>
                    <source srcSet={siteConfig.assets.loungeClock.webp} type="image/webp" />
                    <img
                      src={siteConfig.assets.loungeClock.jpg}
                      alt={
                        lang === 'ar'
                          ? 'البهو الداخلي وصالة الاستقبال في مركز ترو سيرف'
                          : 'Interior lobby and reception desk at True Serve'
                      }
                      width="720"
                      height="715"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </picture>
                </div>
              </div>

              {/* Highlighted Floating Card: "The sessions are tailored to your condition" + Brand Mood thumbnail */}
              <div className="col-span-12 about-animate mt-1">
                <div className="glass-panel gold-border-glow rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#C9A66B]/50">
                    <picture>
                      <source srcSet={siteConfig.assets.brandRender.webp} type="image/webp" />
                      <img
                        src={siteConfig.assets.brandRender.jpg}
                        alt={t.about.renderCaption}
                        width="150"
                        height="200"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </picture>
                    <span className="sr-only">{t.about.conceptBadge}</span>
                  </div>
                  <div className="text-start flex-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A8F4A] dark:text-[#00C853] mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.about.tailoredCardTitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {t.about.tailoredCardDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Copy Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 text-start">
            <div className="about-animate inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A5CBA]/10 dark:bg-[#0A5CBA]/20 border border-[#0A5CBA]/25 text-[#0A5CBA] dark:text-[#38BDF8] text-xs sm:text-sm font-bold mb-4">
              <Compass className="w-4 h-4" />
              <span>{t.about.eyebrow}</span>
            </div>

            <h2 className="about-animate text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-snug mb-5">
              {t.about.title}
            </h2>

            <p className="about-animate text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">
              {t.about.lead}
            </p>

            <p className="about-animate text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {t.about.paragraph1}
            </p>

            <p className="about-animate text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {t.about.paragraph2}
            </p>

            {/* 3 Core Pillars */}
            <div className="about-animate grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.about.pillars.map((pillar, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-2xl p-4 border border-[#C9A66B]/30 hover:border-[#0A5CBA]/50 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A5CBA] to-[#0A8F4A] text-white flex items-center justify-center mb-3 shadow-sm">
                    {index === 0 ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : index === 1 ? (
                      <Sparkles className="w-4 h-4" />
                    ) : (
                      <Shield className="w-4 h-4" />
                    )}
                  </div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#C9A66B] mb-0.5">
                    {pillar.label}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
