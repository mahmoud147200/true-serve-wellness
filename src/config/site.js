export const siteConfig = {
  brand: {
    nameAr: 'مركز ترو سيرف للتدليك الصحي',
    nameEn: 'True Serve Therapeutic Massage',
    shortNameAr: 'ترو سيرف',
    shortNameEn: 'True Serve',
    typeAr: 'مركز عناية وتدليك صحي وعلاجي',
    typeEn: 'Medical & Therapeutic Wellness Center',
    taglineAr: 'صحتك .. توازنك — جسمك يستحق العناية',
    taglineEn: 'Your Health. Your Balance. Your Body Deserves Care.',
    posterSloganAr: 'الجلسات تحدد حسب الحالة واحتياج الجسم',
    posterSloganEn: 'Sessions are tailored to each condition and body need',
    pricingNoticeAr: 'الأسعار متوفرة في المركز، تواصل معنا للاستفسار',
    pricingNoticeEn: 'Prices are available at the center, contact us to inquire',
  },
  contact: {
    phoneDisplay: '+966 50 611 1075',
    phoneRaw: '+966506111075',
    whatsappNumber: '966506111075',
    whatsappBaseUrl: 'https://wa.me/966506111075',
    telUrl: 'tel:+966506111075',
    instagramUrl: 'https://www.instagram.com/truserve661/',
    instagramHandle: '@truserve661',
  },
  location: {
    cityAr: 'الرياض، المملكة العربية السعودية',
    cityEn: 'Riyadh, Saudi Arabia',
    districtAr: 'حي ظهرة لبن',
    districtEn: 'Dhahrat Laban District',
    addressAr: '2512 نجد، حي ظهرة لبن، RDLA6907، 6907، الرياض 13784، المملكة العربية السعودية',
    addressEn: '2512 Najd, Dhahrat Laban District, RDLA6907, Riyadh 13784, Saudi Arabia',
    coordinates: {
      lat: 24.6245242,
      lng: 46.5308175,
    },
    googleMapsPlaceUrl:
      'https://www.google.com/maps/place/%D9%85%D8%B1%D9%83%D8%B2+%D8%AA%D8%B1%D9%88+%D8%B3%D9%8A%D8%B1%D9%81+%D9%84%D9%84%D8%AA%D8%AF%D9%84%D9%8A%D9%83+%D8%A7%D9%84%D8%B5%D8%AD%D9%8A%E2%80%AD/@24.6245242,46.5308175,695m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e2f1f89815b9229:0x22f46d5b020dcc49!8m2!3d24.6245242!4d46.5308175!16s%2Fg%2F11p247klf8!5m1!1e1',
    googleMapsEmbedUrl: 'https://www.google.com/maps?q=24.6245242,46.5308175&z=17&output=embed',
  },
  hours: {
    isOpenAlways: true,
    badgeAr: 'مفتوح دائماً (24/7)',
    badgeEn: 'Open Always (24/7)',
    detailAr: 'نستقبلكم على مدار الساعة طوال أيام الأسبوع',
    detailEn: 'Welcoming guests 24 hours a day, 7 days a week',
  },
  colors: {
    blueDeep: '#0A5CBA',
    blueBright: '#0288D1',
    greenDeep: '#0A8F4A',
    greenBright: '#00C853',
    gold: '#C9A66B',
    cream: '#F5EBDD',
    wood: '#8B5E3C',
  },
  assets: {
    logo: '/assets/logo.webp',
    logoPng: '/assets/logo.png',
    storefront: {
      webp: '/assets/cropped/storefront.webp',
      jpg: '/assets/cropped/storefront.jpg',
      raw: '/assets/storefront.jpg',
    },
    reception: {
      webp: '/assets/cropped/reception.webp',
      jpg: '/assets/cropped/reception.jpg',
      raw: '/assets/reception.jpg',
    },
    loungeTulips: {
      webp: '/assets/cropped/lounge-tulips.webp',
      jpg: '/assets/cropped/lounge-tulips.jpg',
      raw: '/assets/lounge-tulips.jpg',
    },
    loungeClock: {
      webp: '/assets/cropped/lounge-clock.webp',
      jpg: '/assets/cropped/lounge-clock.jpg',
      raw: '/assets/lounge-clock.jpg',
    },
    brandRender: {
      webp: '/assets/cropped/brand-render.webp',
      jpg: '/assets/cropped/brand-render.jpg',
      raw: '/assets/brand-render.jpg',
    },
  },
};

/**
 * Helper to build a safe, sanitized WhatsApp URL with prefilled text.
 */
export function buildWhatsAppUrl(message) {
  const cleanMessage = String(message || '').trim().slice(0, 1200);
  return `${siteConfig.contact.whatsappBaseUrl}?text=${encodeURIComponent(cleanMessage)}`;
}
