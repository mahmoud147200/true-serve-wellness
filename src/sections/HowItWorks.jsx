import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { DynamicIcon } from '../components/ServiceIcon';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const { lang, isRtl, prefersReducedMotion, t } = useLang();
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.6,
            },
          }
        );
      }

      gsap.fromTo(
        '.how-step-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, prefersReducedMotion]);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#FBF9F5] dark:bg-[#06101E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B]/40 text-[#8B5E3C] dark:text-[#DFC394] text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{t.howItWorks.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.howItWorks.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4-Step Timeline Grid with Scroll-Drawing Line */}
        <div className="relative">
          {/* Desktop Connecting Line Track */}
          <div
            className="hidden lg:block absolute top-12 inset-x-16 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <div
              ref={progressLineRef}
              className={`h-full w-full bg-gradient-to-r from-[#0A5CBA] via-[#00C853] to-[#C9A66B] ${
                isRtl ? 'origin-right' : 'origin-left'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 relative z-10">
            {t.howItWorks.steps.map((step, index) => (
              <div
                key={step.step}
                className="how-step-card relative glass-panel rounded-3xl p-6 sm:p-7 border border-[#C9A66B]/30 hover:border-[#0A5CBA]/55 transition-all duration-300 flex flex-col justify-between text-start group"
              >
                <div>
                  {/* Step Node Circle & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A5CBA] via-[#0288D1] to-[#0A8F4A] text-white flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <DynamicIcon name={step.icon} className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-mono text-[#C9A66B]/80">
                        {step.step}
                      </span>
                      {index < 3 && (
                        <ArrowIcon
                          className="w-4 h-4 text-slate-400 dark:text-slate-500 hidden lg:inline-block"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom decorative gold accent bar */}
                <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-[#0A5CBA] to-[#C9A66B] group-hover:w-24 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
