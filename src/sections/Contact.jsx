import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  Navigation,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLang } from '../hooks/useAppContext';
import { servicesData } from '../i18n/translations';
import { siteConfig, buildWhatsAppUrl } from '../config/site';

function sanitizeField(val) {
  return String(val || '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 350);
}

export function Contact() {
  const { lang, selectedServiceId, setSelectedServiceId, t } = useLang();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    dateTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Sync service dropdown when user clicks "Select in Booking Form" on a service card
  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({ ...prev, service: selectedServiceId }));
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  }, [selectedServiceId]);

  const validate = () => {
    const newErrors = {};
    const cleanName = sanitizeField(formData.name);
    const cleanPhone = sanitizeField(formData.phone);

    if (cleanName.length < 2) {
      newErrors.name = t.contact.form.errors.nameRequired;
    }

    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      newErrors.phone = t.contact.form.errors.phoneRequired;
    }

    if (!formData.service) {
      newErrors.service = t.contact.form.errors.serviceRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanName = sanitizeField(formData.name);
    const cleanPhone = sanitizeField(formData.phone);
    const cleanDateTime = sanitizeField(formData.dateTime);
    const cleanNotes = sanitizeField(formData.notes);

    const matchedService = servicesData.find((s) => s.id === formData.service);
    const serviceLabel = matchedService
      ? `${matchedService.title[lang]} (${
          lang === 'ar' ? matchedService.title.en : matchedService.title.ar
        })`
      : t.contact.form.serviceUndecided;

    const lines =
      lang === 'ar'
        ? [
            'السلام عليكم، أرغب في طلب حجز / استفسار في مركز ترو سيرف للتدليك الصحي:',
            `• الاسم: ${cleanName}`,
            `• رقم الجوال: ${cleanPhone}`,
            `• الخدمة المطلوبة: ${serviceLabel}`,
            cleanDateTime ? `• الموعد المفضل: ${cleanDateTime}` : null,
            cleanNotes ? `• ملاحظات الحالة: ${cleanNotes}` : null,
          ]
        : [
            'Hello, I would like to request a booking / inquiry at True Serve Therapeutic Massage:',
            `• Name: ${cleanName}`,
            `• Phone: ${cleanPhone}`,
            `• Preferred Service: ${serviceLabel}`,
            cleanDateTime ? `• Preferred Date/Time: ${cleanDateTime}` : null,
            cleanNotes ? `• Condition / Notes: ${cleanNotes}` : null,
          ];

    const message = lines.filter(Boolean).join('\n');
    const url = buildWhatsAppUrl(message);

    setSubmittedSuccess(true);
    window.open(url, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4500);
  };

  const directWhatsappUrl = buildWhatsAppUrl(t.hero.defaultWhatsappText);

  return (
    <section
      id="visit-us"
      className="relative py-20 sm:py-28 bg-[#FBF9F5] dark:bg-[#06101E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/12 dark:bg-emerald-500/20 border border-emerald-500/35 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C853] animate-ping" />
            <span>{t.contact.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Main 2-Column Layout: Contact Info + Map (Left/Start) & Booking Form (Right/End) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Contact Cards + Embedded Google Map */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-start">
            <div className="glass-panel gold-border-glow rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {t.contact.infoTitle}
                </h3>

                {/* Pulsing Open Always 24/7 Badge */}
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping" />
                  <span>{ lang === 'ar' ? siteConfig.hours.badgeAr : siteConfig.hours.badgeEn }</span>
                </span>
              </div>

              <div className="space-y-4 mb-7">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-100/75 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-[#0A5CBA] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {t.contact.addressLabel}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                      {t.contact.addressValue}
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-100/75 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-[#0A8F4A] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {t.contact.phoneLabel}
                    </span>
                    <a
                      href={siteConfig.contact.telUrl}
                      dir="ltr"
                      className="text-base sm:text-lg font-extrabold text-[#0A5CBA] dark:text-[#38BDF8] hover:underline inline-block"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-100/75 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A66B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {t.contact.hoursLabel}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {t.contact.hoursValue}
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-100/75 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {t.contact.instagramLabel}
                    </span>
                    <a
                      href={siteConfig.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-pink-500 transition-colors inline-block"
                    >
                      {siteConfig.contact.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#0A8F4A] to-[#00C853] shadow-md hover:opacity-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.contact.whatsappBtn}</span>
                </a>

                <a
                  href={siteConfig.contact.telUrl}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-2xl font-bold text-sm text-white bg-[#0A5CBA] hover:bg-[#063B7A] shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.contact.callNowBtn}</span>
                </a>

                <a
                  href={siteConfig.location.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-2xl font-bold text-sm text-slate-800 dark:text-white glass-panel border border-[#C9A66B]/45 hover:border-[#0A5CBA] transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#0A5CBA] dark:text-[#38BDF8]" />
                  <span>{t.contact.directionsBtn}</span>
                </a>

                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-2xl font-bold text-sm text-slate-800 dark:text-white glass-panel border border-[#C9A66B]/45 hover:border-pink-500 transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>{t.contact.instagramBtn}</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Container + Graceful Fallback */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-[#C9A66B]/40 bg-slate-200 dark:bg-slate-900 h-72 sm:h-80">
              {!mapError ? (
                <iframe
                  title={t.contact.mapTitle}
                  src={siteConfig.location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onError={() => setMapError(true)}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-10 h-10 text-[#0A5CBA] mb-3" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {t.contact.mapFallbackTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                    {t.contact.mapFallbackDesc}
                  </p>
                  <a
                    href={siteConfig.location.googleMapsPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A5CBA] text-white text-xs font-bold shadow"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.contact.directionsBtn}</span>
                  </a>
                </div>
              )}

              {/* Floating "Get Directions" Pill Over Map Corner */}
              <div className="absolute bottom-3 end-3 z-10">
                <a
                  href={siteConfig.location.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 dark:bg-[#0C1B30]/95 backdrop-blur-md text-slate-900 dark:text-white text-xs font-extrabold shadow-lg border border-[#C9A66B]/50 hover:bg-[#0A5CBA] hover:text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0A8F4A]" />
                  <span>{t.contact.directionsBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Validated Booking Request Form (Prefills WhatsApp) */}
          <div id="contact-form" className="lg:col-span-6 text-start">
            <div className="glass-panel gold-border-glow rounded-3xl p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5CBA]/10 dark:bg-[#0A5CBA]/20 text-[#0A5CBA] dark:text-[#38BDF8] text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{siteConfig.brand.posterSloganAr === t.services.sloganBadge ? siteConfig.brand.posterSloganAr : siteConfig.brand.posterSloganEn}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                {t.contact.form.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {t.contact.form.subtitle}
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.form.nameLabel}
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, name: e.target.value }));
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder={t.contact.form.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:border-[#0A5CBA] dark:focus:border-[#38BDF8]'
                    }`}
                  />
                  {errors.name && (
                    <p id="err-name" className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.form.phoneLabel}
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, phone: e.target.value }));
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    placeholder={t.contact.form.phonePlaceholder}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 text-start focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:border-[#0A5CBA] dark:focus:border-[#38BDF8]'
                    }`}
                  />
                  {errors.phone && (
                    <p id="err-phone" className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Service Dropdown (All 17 Services + Consultation Option) */}
                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.form.serviceLabel}
                  </label>
                  <select
                    id="booking-service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, service: e.target.value }));
                      setSelectedServiceId(e.target.value);
                      if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
                    }}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? 'err-service' : undefined}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border text-sm text-slate-900 dark:text-white focus:outline-none transition-colors ${
                      errors.service
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 dark:border-slate-700 focus:border-[#0A5CBA] dark:focus:border-[#38BDF8]'
                    }`}
                  >
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    <option value="undecided">{t.contact.form.serviceUndecided}</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.number}. {s.title[lang]} — {lang === 'ar' ? s.title.en : s.title.ar}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="err-service" className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.service}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Date / Time */}
                <div>
                  <label
                    htmlFor="booking-datetime"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.form.dateTimeLabel}
                  </label>
                  <input
                    id="booking-datetime"
                    name="dateTime"
                    type="text"
                    value={formData.dateTime}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, dateTime: e.target.value }))
                    }
                    placeholder={t.contact.form.dateTimePlaceholder}
                    className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#0A5CBA] dark:focus:border-[#38BDF8] focus:outline-none transition-colors"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    {t.contact.form.notesLabel}
                  </label>
                  <textarea
                    id="booking-notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, notes: e.target.value }))
                    }
                    placeholder={t.contact.form.notesPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#0A5CBA] dark:focus:border-[#38BDF8] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Gentle Pricing Notice inside Booking Form */}
                <div className="p-3.5 rounded-2xl bg-[#0A5CBA]/5 dark:bg-white/5 border border-[#C9A66B]/30 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>{t.contact.form.pricingReminder}</span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full min-h-[52px] px-6 py-3.5 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-[#0A5CBA] via-[#0288D1] to-[#0A8F4A] shadow-glow hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
                >
                  <Send className="w-5 h-5" />
                  <span>{t.contact.form.submitBtn}</span>
                </button>

                {submittedSuccess && (
                  <div
                    role="status"
                    className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t.contact.form.successHint}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
