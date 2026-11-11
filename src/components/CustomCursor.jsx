import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../hooks/useAppContext';

export function CustomCursor() {
  const { prefersReducedMotion } = useLang();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia('(pointer: fine)');
    setEnabled(finePointer.matches);

    const handleChange = (e) => setEnabled(e.matches);
    finePointer.addEventListener('change', handleChange);
    return () => finePointer.removeEventListener('change', handleChange);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      const target = e.target;
      const isInteractive =
        target &&
        target.closest &&
        target.closest('a, button, input, select, textarea, [role="tab"], [data-cursor-hover]');
      setHovered(Boolean(isInteractive));
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden hidden lg:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#0288D1] dark:bg-[#00C853] transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 ${
          hovered
            ? '-ml-6 -mt-6 w-12 h-12 border-[#C9A66B] bg-[#0A5CBA]/10 dark:bg-[#00C853]/15'
            : '-ml-4 -mt-4 w-8 h-8 border-[#0A5CBA]/40 dark:border-[#38BDF8]/40 bg-transparent'
        }`}
      />
    </div>
  );
}
