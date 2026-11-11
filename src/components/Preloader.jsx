import React, { useState, useEffect } from 'react';
import { useLang } from '../hooks/useAppContext';
import { siteConfig } from '../config/site';

export function Preloader() {
  const { t, prefersReducedMotion, lang } = useLang();
  const [visible, setVisible] = useState(() => {
    try {
      if (sessionStorage.getItem('truserve_preloader_seen') === '1') {
        return false;
      }
    } catch {
      // ignore
    }
    return true;
  });
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible) return;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const closeTimer = setTimeout(() => {
      setClosing(true);
      try {
        sessionStorage.setItem('truserve_preloader_seen', '1');
      } catch {
        // ignore
      }
    }, 1250);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible, prefersReducedMotion]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={t.preloader.loading}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FBF9F5] dark:bg-[#06101E] transition-transform duration-500 ease-in-out ${
        closing ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0A5CBA]/20 via-[#0288D1]/15 to-[#00C853]/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md">
        {/* Animated SVG Leaf + Spine Wave Frame around Logo */}
        <div className="relative w-44 h-36 flex items-center justify-center mb-5">
          <svg
            viewBox="0 0 220 180"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="preload-leaf" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A8F4A" />
                <stop offset="100%" stopColor="#00C853" />
              </linearGradient>
              <linearGradient id="preload-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A5CBA" />
                <stop offset="100%" stopColor="#0288D1" />
              </linearGradient>
            </defs>
            {/* Animated outer arc */}
            <path
              d="M25,135 C75,105 145,155 195,115"
              fill="none"
              stroke="url(#preload-wave)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="animate-[pulse_1.4s_ease-in-out_infinite]"
            />
            <path
              d="M65,55 C105,15 160,15 190,48 C150,72 110,72 65,55 Z"
              fill="url(#preload-leaf)"
              fillOpacity="0.16"
            />
          </svg>

          <picture>
            <source srcSet={siteConfig.assets.logo} type="image/webp" />
            <img
              src={siteConfig.assets.logoPng}
              alt={lang === 'ar' ? siteConfig.brand.nameAr : siteConfig.brand.nameEn}
              width="176"
              height="118"
              className="w-36 h-auto object-contain drop-shadow-md animate-[fadeIn_0.6s_ease-out]"
            />
          </picture>
        </div>

        <p className="text-base sm:text-lg font-bold brand-text-gradient mb-3">
          {t.preloader.subtitle}
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0A5CBA] via-[#0288D1] to-[#00C853] rounded-full animate-[preloadBar_1.2s_ease-out_forwards]" />
        </div>
      </div>

      <style>{`
        @keyframes preloadBar {
          0% { width: 8%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
