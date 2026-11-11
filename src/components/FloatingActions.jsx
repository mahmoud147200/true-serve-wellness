import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { buildWhatsAppUrl } from '../config/site';

export function FloatingActions() {
  const { t } = useLang();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const whatsappHref = buildWhatsAppUrl(t.hero.defaultWhatsappText);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 inset-x-0 z-[70] h-1 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#0A5CBA] via-[#00C853] to-[#C9A66B] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Logical-positioned Floating WhatsApp CTA (flips automatically in RTL vs LTR via end-5/end-7) */}
      <div className="fixed bottom-5 end-5 sm:bottom-7 sm:end-7 z-[65] flex items-center group">
        <span className="hidden sm:inline-flex items-center me-3 px-3.5 py-2 rounded-full text-xs font-semibold glass-panel text-slate-800 dark:text-slate-100 shadow-glass opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          {t.floating.whatsappTooltip}
        </span>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.floating.whatsappLabel}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0A8F4A] to-[#00C853] text-white shadow-glow-green hover:scale-105 active:scale-95 transition-transform duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00C853]/50"
        >
          {/* Soft pulsing aura */}
          <span
            className="absolute inset-0 rounded-full bg-[#00C853] opacity-40 animate-ping"
            style={{ animationDuration: '2.5s' }}
            aria-hidden="true"
          />
          <MessageCircle className="relative z-10 w-7 h-7 fill-white/15" />
        </a>
      </div>
    </>
  );
}
