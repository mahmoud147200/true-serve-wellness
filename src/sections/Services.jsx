import React, { useState, useRef } from 'react';
import { MessageCircle, Phone, Sparkles, Info, RotateCcw, CalendarCheck } from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { servicesData } from '../i18n/translations';
import { siteConfig, buildWhatsAppUrl } from '../config/site';
import { DynamicIcon, ServiceArtwork } from '../components/ServiceIcon';

const CATEGORIES = ['all', 'massage', 'cupping', 'foot'];

function ServiceTiltCard({ service, lang, t, prefersReducedMotion, onSelectForForm }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
      2
    )}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22), transparent 65%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  const primaryTitle = service.title[lang];
  const secondaryTitle = lang === 'ar' ? service.title.en : service.title.ar;
  const whatsappUrl = buildWhatsAppUrl(t.services.whatsappServiceTemplate(primaryTitle));

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl glass-panel border border-[#C9A66B]/30 hover:border-[#0A5CBA]/55 dark:hover:border-[#38BDF8]/55 shadow-glass dark:shadow-glass-dark transition-[border-color,box-shadow,transform] duration-200 ease-out flex flex-col overflow-hidden h-full"
    >
      {/* Interactive Glare Overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Top Visual Media Header (Cropped Poster Photo OR Bespoke SVG Artwork) */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 shrink-0">
        {service.image ? (
          <picture>
            <source srcSet={service.image} type="image/webp" />
            <img
              src={service.imageFallback}
              alt={`${service.title.ar} - ${service.title.en}`}
              width="320"
              height="180"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </picture>
        ) : (
          <ServiceArtwork
            serviceId={service.id}
            iconName={service.icon}
            category={service.category}
          />
        )}

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/85 via-[#06101E]/20 to-transparent" />

        {/* Number & Icon Badge */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-white/90 dark:bg-[#0C1B30]/90 backdrop-blur-md border border-[#C9A66B]/40 flex items-center justify-center text-[#0A5CBA] dark:text-[#38BDF8] shadow-md group-hover:rotate-6 transition-transform">
            <DynamicIcon name={service.icon} className="w-5 h-5" />
          </div>

          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-xs font-mono font-bold border border-white/15">
            {service.number}
          </span>
        </div>

        {/* Toggle Details Button */}
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          aria-expanded={flipped}
          className="absolute bottom-3 end-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold border border-[#C9A66B]/40 hover:bg-[#0A5CBA] hover:text-white transition-colors min-h-[34px]"
        >
          {flipped ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.services.cardBackBtn}</span>
            </>
          ) : (
            <>
              <Info className="w-3.5 h-3.5" />
              <span>{t.services.cardFlipHint}</span>
            </>
          )}
        </button>
      </div>

      {/* Card Body (Front vs Expanded Detail View) */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-start">
        <div>
          {/* Bilingual Title Header */}
          <div className="mb-2.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {primaryTitle}
            </h3>
            <p className="text-xs font-semibold text-[#0A5CBA] dark:text-[#38BDF8] tracking-wide">
              {secondaryTitle}
            </p>
          </div>

          {!flipped ? (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {service.shortDesc[lang]}
            </p>
          ) : (
            <div className="mb-4 animate-[fadeIn_0.25s_ease-out]">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-[#0A5CBA]/5 dark:bg-white/5 p-3 rounded-2xl border border-[#0A5CBA]/15 mb-3">
                {service.details[lang]}
              </p>
            </div>
          )}

          {/* Service Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.tags[lang].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer CTAs: Ask on WhatsApp + Select in Booking Form */}
        <div className="pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0A5CBA] to-[#0A8F4A] hover:opacity-95 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{t.services.askWhatsapp}</span>
          </a>

          <button
            type="button"
            onClick={() => onSelectForForm(service.id)}
            title={t.services.selectInForm}
            aria-label={`${t.services.selectInForm}: ${primaryTitle}`}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 rounded-xl border border-[#C9A66B]/45 text-slate-700 dark:text-slate-200 hover:bg-[#C9A66B]/15 transition-colors"
          >
            <CalendarCheck className="w-4 h-4 text-[#0A5CBA] dark:text-[#38BDF8]" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const { lang, prefersReducedMotion, selectServiceAndScroll, t } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  const generalPricingWhatsapp = buildWhatsAppUrl(t.hero.defaultWhatsappText);

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F4EFE6] via-[#FBF9F5] to-[#F4EFE6] dark:from-[#0A192F] dark:via-[#06101E] dark:to-[#0A192F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A8F4A]/12 dark:bg-[#00C853]/15 border border-[#0A8F4A]/30 text-[#0A8F4A] dark:text-[#00C853] text-xs sm:text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{t.services.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.services.title}
          </h2>

          {/* Required Slogan Banner Above Grid */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0A8F4A] via-[#0288D1] to-[#0A5CBA] text-white font-extrabold text-sm sm:text-lg shadow-glow mb-5">
            <Sparkles className="w-5 h-5 text-[#F5EBDD] shrink-0" />
            <span>{t.services.sloganBadge}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Category Filter Chips */}
        <div
          role="tablist"
          aria-label={t.services.title}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0A5CBA] to-[#0288D1] text-white shadow-glow scale-[1.02]'
                    : 'glass-panel text-slate-700 dark:text-slate-300 hover:border-[#0A5CBA] dark:hover:border-[#38BDF8]'
                }`}
              >
                {t.services.categories[cat]}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid of 17 Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceTiltCard
              key={service.id}
              service={service}
              lang={lang}
              t={t}
              prefersReducedMotion={prefersReducedMotion}
              onSelectForForm={selectServiceAndScroll}
            />
          ))}
        </div>

        {/* Gentle Pricing Inquiry Notice Under the Grid (No Prices Shown Anywhere) */}
        <div className="mt-12 sm:mt-16 glass-panel gold-border-glow rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A8F4A] dark:text-[#00C853] mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{t.services.sloganBadge}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t.services.pricingBannerTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.services.pricingBannerSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0 w-full sm:w-auto">
            <a
              href={generalPricingWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0A8F4A] to-[#00C853] shadow-glow-green hover:opacity-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.services.pricingCtaWhatsapp}</span>
            </a>

            <a
              href={siteConfig.contact.telUrl}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl font-bold text-sm text-white bg-[#0A5CBA] hover:bg-[#063B7A] shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
