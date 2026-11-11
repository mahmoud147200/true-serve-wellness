import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { DynamicIcon } from '../components/ServiceIcon';

const AccentOrb3D = lazy(() => import('../components/AccentOrb3D'));

export function WhyUs() {
  const { isDark, prefersReducedMotion, t } = useLang();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F4EFE6] via-[#FBF9F5] to-[#F4EFE6] dark:from-[#0A192F] dark:via-[#06101E] dark:to-[#0A192F] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Section Header + Secondary 3D Floating Logo-Sphere & Leaf */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 sm:mb-14">
          <div className="lg:col-span-8 text-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A5CBA]/10 dark:bg-[#0A5CBA]/20 border border-[#0A5CBA]/25 text-[#0A5CBA] dark:text-[#38BDF8] text-xs sm:text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{t.whyUs.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-snug">
              {t.whyUs.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.whyUs.subtitle}
            </p>
          </div>

          {/* Secondary 3D Moment (or Static SVG Fallback on Reduced Motion) */}
          <div className="lg:col-span-4 flex items-center justify-center">
            {!prefersReducedMotion ? (
              <Suspense
                fallback={
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#0A5CBA]/20 to-[#00C853]/20 animate-pulse" />
                }
              >
                <AccentOrb3D isDark={isDark} inView={inView} />
              </Suspense>
            ) : (
              <div className="w-36 h-36 rounded-full glass-panel gold-border-glow flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-[#0A5CBA] dark:text-[#38BDF8]" />
              </div>
            )}
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyUs.cards.map((card, index) => (
            <div
              key={index}
              className="group relative glass-panel rounded-3xl p-6 sm:p-7 border border-[#C9A66B]/35 hover:border-[#0A5CBA] dark:hover:border-[#38BDF8] shadow-glass dark:shadow-glass-dark hover:-translate-y-2 transition-all duration-300 text-start flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A5CBA] via-[#0288D1] to-[#0A8F4A] text-white flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <DynamicIcon name={card.icon} className="w-6 h-6" />
                </div>

                <span className="block text-xs font-bold text-[#0A8F4A] dark:text-[#00C853] mb-1">
                  {card.subtitle}
                </span>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2.5">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/70 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C9A66B]">
                  0{index + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0A8F4A] dark:bg-[#00C853] group-hover:scale-150 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
