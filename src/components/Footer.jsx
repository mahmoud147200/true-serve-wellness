import React from 'react';
import {
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
  ArrowUp,
  Sparkles,
} from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { siteConfig, buildWhatsAppUrl } from '../config/site';

export function Footer() {
  const { lang, t } = useLang();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = buildWhatsAppUrl(t.hero.defaultWhatsappText);

  const quickLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#benefits', label: t.nav.benefits },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#why-us', label: t.nav.whyUs },
    { href: '#visit-us', label: t.nav.visitUs },
  ];

  return (
    <footer className="relative bg-[#06101E] text-slate-200 pt-16 pb-10 border-t border-[#C9A66B]/30 overflow-hidden">
      {/* Subtle Top Glow */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80 text-start">
          {/* Column 1: Brand Logo & Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-16 h-14 rounded-2xl bg-white p-2 shadow-md border border-[#C9A66B]/40 flex items-center justify-center shrink-0">
                <picture>
                  <source srcSet={siteConfig.assets.logo} type="image/webp" />
                  <img
                    src={siteConfig.assets.logoPng}
                    alt={lang === 'ar' ? siteConfig.brand.nameAr : siteConfig.brand.nameEn}
                    width="58"
                    height="40"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">
                  {lang === 'ar' ? siteConfig.brand.nameAr : siteConfig.brand.nameEn}
                </h2>
                <p className="text-xs font-semibold text-[#38BDF8]">
                  {lang === 'ar' ? siteConfig.brand.taglineAr : siteConfig.brand.taglineEn}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-md">
              {t.footer.description}
            </p>

            {/* Pulsing Open Always 24/7 Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00C853]" />
              </span>
              <span>{t.footer.hoursBadge}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#DFC394]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{t.footer.pricingNote}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#C9A66B] mb-4">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white hover:underline transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Address, Phone, Socials */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#C9A66B] mb-4">
              {t.footer.contactTitle}
            </h3>

            <ul className="space-y-3.5 text-sm text-slate-300 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-1" />
                <a
                  href={siteConfig.location.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {lang === 'ar'
                    ? siteConfig.location.addressAr
                    : siteConfig.location.addressEn}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00C853] shrink-0" />
                <a
                  href={siteConfig.contact.telUrl}
                  dir="ltr"
                  className="font-bold text-white hover:text-[#38BDF8] transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="hover:text-pink-300 transition-colors"
                >
                  {siteConfig.contact.instagramHandle}
                </a>
              </li>
            </ul>

            {/* Social & Direct Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-[#0A8F4A] hover:bg-[#00C853] text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href={siteConfig.contact.telUrl}
                aria-label="Phone"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-[#0A5CBA] hover:bg-[#0288D1] text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl bg-white/10 hover:bg-pink-600 text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-start">{t.footer.rights}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-white/10 hover:bg-[#0A5CBA] text-white font-bold border border-white/15 transition-colors"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
