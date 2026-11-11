import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
} from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { galleryImages } from '../i18n/translations';

export function Gallery() {
  const { lang, isRtl, t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
  const touchStartX = useRef(null);

  const isOpen = lightboxIndex !== null;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    setZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const showNext = useCallback(() => {
    setZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryImages.length
    );
  }, []);

  // Keyboard navigation + Focus Trap inside Lightbox
  useEffect(() => {
    if (!isOpen) return;

    const prevFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Focus the dialog container or close button on open
    const focusTimer = setTimeout(() => {
      const firstBtn = dialogRef.current?.querySelector('button');
      firstBtn?.focus();
    }, 30);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        isRtl ? showPrev() : showNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        isRtl ? showNext() : showPrev();
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (prevFocused && prevFocused.focus) {
        prevFocused.focus();
      }
    };
  }, [isOpen, isRtl, closeLightbox, showPrev, showNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        isRtl ? showNext() : showPrev();
      } else {
        isRtl ? showPrev() : showNext();
      }
    }
    touchStartX.current = null;
  };

  const currentPhoto = isOpen ? galleryImages[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-28 bg-[#FBF9F5] dark:bg-[#06101E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A8F4A]/12 dark:bg-[#00C853]/15 border border-[#0A8F4A]/30 text-[#0A8F4A] dark:text-[#00C853] text-xs sm:text-sm font-bold mb-4">
            <Camera className="w-4 h-4" />
            <span>{t.gallery.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.gallery.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {t.gallery.subtitle}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#C9A66B]/35 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-[#0A8F4A] dark:text-[#00C853] shrink-0" />
            <span>{t.gallery.realPhotosNote}</span>
          </div>
        </div>

        {/* 4 Real Photos Asymmetric Masonry / Bento Grid with 3D Hover Perspective */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {galleryImages.map((img, idx) => {
            const colSpan =
              idx === 0 || idx === 3 ? 'md:col-span-7' : 'md:col-span-5';
            return (
              <div
                key={img.id}
                className={`${colSpan} group relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#C9A66B]/35 hover:border-[#0A5CBA] dark:hover:border-[#38BDF8] bg-slate-900 aspect-[16/11] sm:aspect-[16/10] transition-all duration-500`}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(idx)}
                  aria-label={`${t.gallery.viewLarger}: ${img.title[lang]}`}
                  className="w-full h-full block text-start focus:outline-none"
                >
                  <picture>
                    <source srcSet={img.srcWebp} type="image/webp" />
                    <img
                      src={img.srcJpg}
                      alt={img.title[lang]}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </picture>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/90 via-[#06101E]/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Tag & Expand Icon */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0C1B30]/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-extrabold border border-[#C9A66B]/40 shadow-sm">
                      {img.tag[lang]}
                    </span>

                    <span className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[#0A5CBA] group-hover:text-white transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Title & Caption */}
                  <div className="absolute bottom-4 inset-x-5">
                    <h3 className="text-base sm:text-xl font-extrabold text-white mb-1">
                      {img.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                      {img.caption[lang]}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox Dialog */}
      {isOpen && currentPhoto && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title[lang]}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[110] bg-[#06101E]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-[fadeIn_0.2s_ease-out]"
        >
          {/* Top Bar: Counter, Zoom Toggle, Close Button */}
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 z-20">
            <span className="px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs sm:text-sm font-bold border border-[#C9A66B]/45 shadow-md">
              {t.gallery.counterText(lightboxIndex + 1, galleryImages.length)}
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={t.gallery.zoomIn}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-slate-900/90 hover:bg-[#0A5CBA] text-white border border-[#C9A66B]/45 shadow-md transition-colors"
              >
                {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label={t.gallery.closeLightbox}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-slate-900/90 hover:bg-rose-600 text-white border border-[#C9A66B]/45 shadow-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Stage + Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={isRtl ? showNext : showPrev}
              aria-label={isRtl ? t.gallery.nextImage : t.gallery.prevImage}
              className="absolute left-2 sm:left-6 z-20 inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full bg-white/15 hover:bg-[#0A5CBA] text-white border border-white/25 backdrop-blur-md transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              onClick={() => setZoomed((z) => !z)}
              className={`max-h-[72vh] max-w-[88vw] rounded-2xl overflow-hidden shadow-2xl border border-[#C9A66B]/40 transition-transform duration-300 cursor-zoom-in ${
                zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
              }`}
            >
              <picture>
                <source srcSet={currentPhoto.srcWebp} type="image/webp" />
                <img
                  src={currentPhoto.srcJpg}
                  alt={currentPhoto.title[lang]}
                  className="max-h-[72vh] w-auto object-contain select-none"
                />
              </picture>
            </div>

            <button
              type="button"
              onClick={isRtl ? showPrev : showNext}
              aria-label={isRtl ? t.gallery.prevImage : t.gallery.nextImage}
              className="absolute right-2 sm:right-6 z-20 inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full bg-white/15 hover:bg-[#0A5CBA] text-white border border-white/25 backdrop-blur-md transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Thumbnail Strip */}
          <div className="max-w-4xl mx-auto w-full text-center z-20">
            <h3 className="text-base sm:text-lg font-extrabold text-white mb-1">
              {currentPhoto.title[lang]}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4">
              {currentPhoto.caption[lang]}
            </p>

            <div className="flex items-center justify-center gap-2.5">
              {galleryImages.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setZoomed(false);
                  }}
                  aria-label={thumb.title[lang]}
                  className={`w-14 h-11 rounded-xl overflow-hidden border-2 transition-all ${
                    idx === lightboxIndex
                      ? 'border-[#00C853] scale-110 shadow-glow-green'
                      : 'border-white/25 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb.srcWebp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
