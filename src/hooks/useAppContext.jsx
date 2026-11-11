import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations } from '../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('truserve_lang');
      if (saved === 'ar' || saved === 'en') return saved;
      const params = new URLSearchParams(window.location.search);
      const qLang = params.get('lang');
      if (qLang === 'ar' || qLang === 'en') return qLang;
    } catch {
      // ignore storage errors
    }
    return 'ar';
  });

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('truserve_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const isRtl = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.title = translations[lang].meta.title;
    try {
      localStorage.setItem('truserve_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('truserve_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const selectServiceAndScroll = (serviceId) => {
    setSelectedServiceId(serviceId);
    const contactEl = document.getElementById('contact-form');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
    }
  };

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      isRtl: lang === 'ar',
      t: translations[lang],
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === 'dark',
      prefersReducedMotion,
      selectedServiceId,
      setSelectedServiceId,
      selectServiceAndScroll,
    }),
    [lang, theme, prefersReducedMotion, selectedServiceId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useLang() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useLang must be used within AppProvider');
  return ctx;
}
