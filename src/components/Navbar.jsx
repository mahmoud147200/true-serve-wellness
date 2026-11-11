import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe, Instagram, Menu, X, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { siteConfig, buildWhatsAppUrl } from '../config/site';

const NAV_ITEMS = [
  { id: 'home', key: 'home', href: '#home' },
  { id: 'about', key: 'about', href: '#about' },
  { id: 'services', key: 'services', href: '#services' },
  { id: 'benefits', key: 'benefits', href: '#benefits' },
  { id: 'gallery', key: 'gallery', href: '#gallery' },
  { id: 'visit-us', key: 'visitUs', href: '#visit-us' },
  { id: 'contact-form', key: 'contact', href: '#contact-form' },
];

export function Navbar() {
  const { lang, toggleLang, isDark, toggleTheme, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPos = window.scrollY + 180;
      let current = 'home';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const whatsappHref = buildWhatsAppUrl(t.hero.defaultWhatsappText);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[120] focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#0A5CBA] focus:text-white focus:font-bold focus:shadow-lg"
      >
        {t.meta.skipToContent}
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled
            ? 'py-2.5 glass-panel shadow-glass dark:shadow-glass-dark'
            : 'py-4 bg-white/70 dark:bg-[#06101E]/75 backdrop-blur-md border-b border-[#C9A66B]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="flex items-center gap-3 group shrink-0 focus:outline-none"
            aria-label={lang === 'ar' ? siteConfig.brand.nameAr : siteConfig.brand.nameEn}
          >
            <div className="relative w-12 h-11 sm:w-14 sm:h-12 rounded-xl bg-white/95 dark:bg-white/95 p-1.5 shadow-sm border border-[#C9A66B]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <picture>
                <source srcSet={siteConfig.assets.logo} type="image/webp" />
                <img
                  src={siteConfig.assets.logoPng}
                  alt={lang === 'ar' ? siteConfig.brand.shortNameAr : siteConfig.brand.shortNameEn}
                  width="52"
                  height="36"
                  className="w-full h-full object-contain"
                />
              </picture>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {lang === 'ar' ? siteConfig.brand.shortNameAr : siteConfig.brand.shortNameEn}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-[#0A5CBA] dark:text-[#38BDF8] leading-tight">
                {lang === 'ar' ? 'للتدليك الصحي' : 'Therapeutic Massage'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main Navigation'}
            className="hidden xl:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/70 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0A5CBA] to-[#0288D1] text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#0A5CBA] dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {t.nav[item.key]}
                </a>
              );
            })}
          </nav>

          {/* Actions: Lang Toggle, Dark Mode, Instagram, Book Now CTA, Mobile Trigger */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.nav.switchLangLabel}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 rounded-full text-xs sm:text-sm font-bold border border-[#C9A66B]/40 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 hover:border-[#0A5CBA] dark:hover:border-[#38BDF8] transition-colors"
            >
              <Globe className="w-4 h-4 text-[#0A5CBA] dark:text-[#38BDF8]" />
              <span>{t.nav.switchLang}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.nav.toggleThemeLabel}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-amber-300 hover:border-[#C9A66B] transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Instagram Icon */}
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${siteConfig.contact.instagramHandle}`}
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-400/50 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Primary Book Now WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0A5CBA] via-[#0288D1] to-[#0A8F4A] hover:opacity-95 shadow-md hover:shadow-glow transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.bookNow}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="xl:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <div
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'ar' ? 'قائمة الجوال' : 'Mobile Navigation'}
        className={`fixed inset-0 z-[58] xl:hidden bg-[#FBF9F5]/98 dark:bg-[#06101E]/98 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto w-full flex flex-col gap-2">
          {/* Open Always 24/7 Pill */}
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 self-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C853] animate-ping" />
            <span>{t.nav.openAlways}</span>
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-base font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0A5CBA] to-[#0288D1] text-white shadow-md'
                    : 'text-slate-800 dark:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{t.nav[item.key]}</span>
                <span className="w-2 h-2 rounded-full bg-current opacity-60" />
              </a>
            );
          })}
        </div>

        <div className="max-w-md mx-auto w-full pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0A8F4A] to-[#00C853] shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.bookNow}</span>
            </a>
            <a
              href={siteConfig.contact.telUrl}
              className="flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-2xl font-bold text-sm text-white bg-[#0A5CBA] shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>

          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-[#C9A66B]/40 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            <span dir="ltr">{siteConfig.contact.instagramHandle}</span>
          </a>
        </div>
      </div>
    </>
  );
}
