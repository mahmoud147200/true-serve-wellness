import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Info } from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { benefitsData } from '../i18n/translations';
import { DynamicIcon } from '../components/ServiceIcon';

export function Benefits() {
  const { lang, prefersReducedMotion, t } = useLang();
  const listRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.benefit-item',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          stagger: 0.04,
          ease: 'power2.out',
        }
      );
    }, listRef);

    return () => ctx.revert();
  }, [lang, prefersReducedMotion]);

  const currentItems = benefitsData.massage;

  const currentImage = {
    webp: '/assets/services/massage-general.webp',
    jpg: '/assets/services/massage-general.jpg',
    title: t.benefits.massagePosterTitle,
    sub: t.benefits.MassagePosterSub,
  };

  return (
    <section
      id="benefits"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F4EFE6] via-[#FBF9F5] to-[#F4EFE6] dark:from-[#0A192F] dark:via-[#06101E] dark:to-[#0A192F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A5CBA]/10 dark:bg-[#0A5CBA]/20 border border-[#0A5CBA]/25 text-[#0A5CBA] dark:text-[#38BDF8] text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{t.benefits.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.benefits.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Highlight Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0A5CBA] via-[#0288D1] to-[#0A8F4A] text-white text-sm sm:text-base font-extrabold shadow-glow">
            <Sparkles className="w-4 h-4" />
            <span>{t.benefits.tabMassage}</span>
          </div>
        </div>

        {/* Benefits Content */}
        <div
          id="panel-benefits"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* Visual Card Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C9A66B]/45 bg-slate-900 aspect-[4/5]">
              <picture>
                <source srcSet={currentImage.webp} type="image/webp" />
                <img
                  src={currentImage.jpg}
                  alt={currentImage.title}
                  width="260"
                  height="325"
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </picture>

              <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/92 via-[#06101E]/30 to-transparent" />

              <div className="absolute bottom-5 inset-x-5 text-start">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00C853]/25 border border-[#00C853]/50 text-emerald-200 text-xs font-bold mb-2 backdrop-blur-sm">
                  15 {lang === 'ar' ? 'فوائد صحية واسترخائية' : 'Key Wellness Benefits'}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-1">{currentImage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentImage.sub}
                </p>
              </div>
            </div>
          </div>

          {/* Staggered Benefits Grid Column */}
          <div
            ref={listRef}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
          >
            {currentItems.map((item, idx) => (
              <div
                key={`massage-${idx}`}
                className="benefit-item glass-panel rounded-2xl p-4 sm:p-5 border border-[#C9A66B]/30 hover:border-[#0A8F4A]/60 dark:hover:border-[#00C853]/60 transition-all duration-200 flex items-start gap-3.5 text-start group"
              >
                <div
                  className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-br from-[#0A5CBA] to-[#0288D1]'
                      : 'bg-gradient-to-br from-[#0A8F4A] to-[#00C853]'
                  }`}
                >
                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <span className="text-[11px] font-mono font-bold text-[#C9A66B] block mb-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                    {item[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft, Visible Medical & Wellness Awareness Note */}
        <div className="mt-10 sm:mt-12 glass-panel rounded-2xl p-5 sm:p-6 border border-[#C9A66B]/40 bg-amber-50/60 dark:bg-slate-900/70 flex items-start gap-3.5 text-start max-w-4xl mx-auto">
          <div className="w-9 h-9 rounded-xl bg-[#C9A66B]/20 text-[#8B5E3C] dark:text-[#DFC394] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mb-1">
              {t.benefits.disclaimerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.benefits.disclaimerText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
