import { siteConfig } from '../config/site';

export const servicesData = [
  {
    id: 'massage',
    number: '01',
    category: 'massage',
    featured: true,
    image: '/assets/services/massage-general.webp',
    imageFallback: '/assets/services/massage-general.jpg',
    icon: 'heart-handshake',
    title: {
      ar: 'التدليك',
      en: 'Therapeutic Massage',
    },
    shortDesc: {
      ar: 'جلسة تدليك متكاملة تساعد على إرخاء الجسم وتهدئة التوتر العضلي اليومي.',
      en: 'A full-body massage session designed to relax muscles and ease daily tension.',
    },
    details: {
      ar: 'جلسة عناية متكاملة بحركات انسيابية متناغمة تساعد على تهدئة الجهاز العصبي، إرخاء العضلات المجهدة، ومنح الجسم شعوراً بالسكينة والنشاط المتجدد.',
      en: 'A soothing full-body massage using flowing, harmonious strokes to calm the nervous system, relax tired muscles, and leave you feeling refreshed and balanced.',
    },
    tags: {
      ar: ['استرخاء شامل', 'تهدئة التوتر', 'عناية بالجسم'],
      en: ['Full Relaxation', 'Stress Relief', 'Body Care'],
    },
  },
  {
    id: 'fire-cupping',
    number: '02',
    category: 'cupping',
    featured: true,
    image: '/assets/services/fire-cupping.webp',
    imageFallback: '/assets/services/fire-cupping.jpg',
    icon: 'flame',
    title: {
      ar: 'كاسات النارية',
      en: 'Fire Cupping',
    },
    shortDesc: {
      ar: 'استخدام كاسات حرارية للمساعدة على الاسترخاء وتخفيف الشد العضلي.',
      en: 'Thermal cupping therapy to help soothe tight tissues and promote deep relaxation.',
    },
    details: {
      ar: 'تطبيق الكاسات الزجاجية الدافئة وفق أصول العناية التقليدية لتوليد شفط لطيف يساعد على تهدئة الأنسجة المشدودة وتحفيز الشعور بالدفء والاسترخاء العميق.',
      en: 'Traditional application of warmed glass cups to create gentle suction that soothes tight tissues, encourages local warmth, and promotes deep relaxation.',
    },
    tags: {
      ar: ['كاسات حرارية', 'استرخاء عميق', 'تدفئة العضلات'],
      en: ['Thermal Cups', 'Deep Relaxation', 'Warmth Therapy'],
    },
  },
  {
    id: 'cupping',
    number: '03',
    category: 'cupping',
    featured: true,
    image: '/assets/services/cupping.webp',
    imageFallback: '/assets/services/cupping.jpg',
    icon: 'circle-dot',
    title: {
      ar: 'كاسات الهواء',
      en: 'Air Cupping',
    },
    shortDesc: {
      ar: 'جلسات كاسات هوائية لتخفيف الشد العضلي وتنشيط التروية الموضعية.',
      en: 'Dry air suction cupping sessions to ease muscle tightness and support local circulation.',
    },
    details: {
      ar: 'استخدام كاسات هوائية مخصصة بدرجات شفط مدروسة تناسب طبيعة كل جسم، للمساعدة على إرخاء الأنسجة المشدودة في الظهر والكتفين وتعزيز الشعور بالراحة.',
      en: 'Application of specialized air cups with controlled suction tailored to your comfort level, helping loosen tight back and shoulder tissues.',
    },
    tags: {
      ar: ['شفط هوائي متوازن', 'تخفيف الشد', 'تروية موضعية'],
      en: ['Controlled Air Suction', 'Tension Relief', 'Local Circulation'],
    },
  },
  {
    id: 'sports-massage',
    number: '04',
    category: 'massage',
    featured: true,
    image: '/assets/services/sports-massage.webp',
    imageFallback: '/assets/services/sports-massage.jpg',
    icon: 'activity',
    title: {
      ar: 'التدليك الرياضي',
      en: 'Sports Massage',
    },
    shortDesc: {
      ar: 'تدليك للعضلات يساعد على تخفيف الشد والإجهاد العضلي واستعادة المرونة.',
      en: 'Targeted muscle massage that helps relieve tension, soreness, and muscle fatigue.',
    },
    details: {
      ar: 'جلسة مركّزة تستهدف المجموعات العضلية المجهدة بأساليب ضغط وتمديد مدروسة، مناسبة للرياضيين وأصحاب المجهود البدني اليومي لاستعادة مرونة العضلات والراحة الحركية.',
      en: 'A targeted session focusing on fatigued muscle groups through controlled pressure and stretching techniques, ideal for active individuals seeking muscular recovery and comfort.',
    },
    tags: {
      ar: ['تخفيف الشد العضلي', 'استشفاء حركي', 'عناية مخصصة'],
      en: ['Muscle Tension Relief', 'Active Recovery', 'Tailored Care'],
    },
  },
  {
    id: 'reflexology',
    number: '05',
    category: 'foot',
    featured: true,
    image: '/assets/services/reflexology.webp',
    imageFallback: '/assets/services/reflexology.jpg',
    icon: 'footprints',
    title: {
      ar: 'الرفلكسولوجي',
      en: 'Reflexology',
    },
    shortDesc: {
      ar: 'تحفيز نقاط الانعكاس في القدمين واليدين لدعم الاسترخاء العام وتوازن الجسم.',
      en: 'Stimulating reflex points on the feet and hands to support overall relaxation and balance.',
    },
    details: {
      ar: 'جلسة دقيقة تركز على نقاط الانعكاس العصبي في باطن القدمين لتخفيف ثقل الوقوف والمشي الطويل ومساعدة الجسم بأكمله على الشعور بالراحة والاتزان.',
      en: 'Focused pressure applied to specific reflex zones on the soles of the feet to relieve heaviness from standing or walking and promote whole-body relaxation.',
    },
    tags: {
      ar: ['نقاط الانعكاس', 'راحة القدمين', 'تنشيط لطيف'],
      en: ['Reflex Zones', 'Foot Comfort', 'Gentle Revitalization'],
    },
  },
  {
    id: 'foot-care',
    number: '06',
    category: 'foot',
    featured: true,
    image: '/assets/services/foot-care.webp',
    imageFallback: '/assets/services/foot-care.jpg',
    icon: 'feather',
    title: {
      ar: 'العناية بالقدمين',
      en: 'Foot Care',
    },
    shortDesc: {
      ar: 'جلسة عناية مريحة للقدمين لتخفيف الإجهاد واستعادة الخفة والانتعاش.',
      en: 'Soothing foot care session to relieve fatigue and restore lightness and comfort.',
    },
    details: {
      ar: 'عناية مخصصة للقدمين تشمل النقع الدافئ والتدليك المريح والترطيب لتخفيف آثار التعب اليومي ومنح القدمين إحساساً فورياً بالانتعاش والخفة.',
      en: 'Dedicated foot pampering combining warm soaking, soothing massage, and conditioning care to erase daily fatigue and leave feet feeling light and refreshed.',
    },
    tags: {
      ar: ['انتعاش القدمين', 'ترطيب وعناية', 'راحة فورية'],
      en: ['Foot Refresh', 'Skin Softness', 'Instant Comfort'],
    },
  },
  {
    id: 'joint-correction',
    number: '07',
    category: 'massage',
    featured: true,
    image: '/assets/services/joint-correction.webp',
    imageFallback: '/assets/services/joint-correction.jpg',
    icon: 'bone',
    title: {
      ar: 'براكتك رياضي',
      en: 'Sports Practice & Joint Care',
    },
    shortDesc: {
      ar: 'تقنيات يدوية رياضية لتحسين حركة المفاصل وتخفيف التيبّس حسب الحالة.',
      en: 'Manual sports practice techniques to improve joint mobility and alignment according to the case.',
    },
    details: {
      ar: 'تطبيق تقنيات تحريك يدوية رياضية مدروسة ولطيفة تهدف إلى دعم المدى الحركي الطبيعي للمفاصل والظهر وتقليل الشعور بالتيبّس، وتُحدد خطواتها بدقة بعد تقييم احتياج الجسم.',
      en: 'Carefully controlled manual sports mobilization techniques designed to support natural joint range of motion and reduce stiffness, tailored individually after assessment.',
    },
    tags: {
      ar: ['مرونة المفاصل', 'براكتك يدوي', 'حسب الحالة'],
      en: ['Joint Mobility', 'Manual Practice', 'Condition-Based'],
    },
  },
  {
    id: 'sports-shiatsu',
    number: '08',
    category: 'massage',
    featured: true,
    image: '/assets/services/sports-shiatsu.webp',
    imageFallback: '/assets/services/sports-shiatsu.jpg',
    icon: 'hand',
    title: {
      ar: 'سيتاتشو تدليك عميق للعضلات والمفاصل',
      en: 'Deep Muscle & Joint Shiatsu',
    },
    shortDesc: {
      ar: 'ضغط يدوي عميق ومباشر على نقاط العضلات والمفاصل لتخفيف الشد العضلي المزمن والاسترخاء.',
      en: 'Deep manual point-pressure targeting muscles and joints to release deep-seated tension.',
    },
    details: {
      ar: 'يعتمد على ضغط الأصابع وراحة اليد بعمق وإيقاع متوازن على مسارات العضلات والمفاصل لتفكيك عقد التوتر العميقة وتخفيف التيبّس الناتج عن المجهود البدني أو الجلوس الطويل.',
      en: 'Uses deep, rhythmic finger and palm pressure along key muscular pathways and around joints to release stubborn knots, ease stiffness, and restore natural mobility.',
    },
    tags: {
      ar: ['تدليك عميق', 'العضلات والمفاصل', 'تخفيف التيبّس'],
      en: ['Deep Tissue Pressure', 'Muscles & Joints', 'Stiffness Relief'],
    },
  },
];

export const benefitsData = {
  massage: [
    {
      ar: 'إخراج الرطوبة والبرودة من الجسم',
      en: 'Helps expel dampness and coldness from the body',
      icon: 'droplets',
    },
    {
      ar: 'إزالة ألم الظهر والكتفين والمفاصل والرقبة',
      en: 'Relieves discomfort in the back, shoulders, joints, and neck',
      icon: 'user-check',
    },
    {
      ar: 'علاج العديد من الأمراض كالأرق والتوتر وآلام الظهر والصداع',
      en: 'Helps alleviate common complaints such as insomnia, stress, backache, and headaches',
      icon: 'brain',
    },
    {
      ar: 'يساعد على التخسيس وشد الجسم',
      en: 'Supports body toning and silhouette firming',
      icon: 'sparkles',
    },
    {
      ar: 'يؤدي إلى صفاء الذهن',
      en: 'Promotes mental clarity and calm focus',
      icon: 'sun',
    },
    {
      ar: 'يحافظ على نعومة الجلد',
      en: 'Maintains skin softness and suppleness',
      icon: 'feather',
    },
    {
      ar: 'يخفف من حدة الضغوط',
      en: 'Eases the intensity of daily stress and pressure',
      icon: 'flower-2',
    },
    {
      ar: 'يخلص الجسم من الخلايا الميتة أو أي مادة ضارة',
      en: 'Helps rid the skin surface of dead cells and impurities',
      icon: 'shield-check',
    },
    {
      ar: 'يحافظ على مرونة الجسم',
      en: 'Preserves natural body flexibility and suppleness',
      icon: 'activity',
    },
    {
      ar: 'يساعد على إرخاء العضلات',
      en: 'Helps deeply relax tight and fatigued muscles',
      icon: 'heart-handshake',
    },
    {
      ar: 'يساعد على الاسترخاء النفسي',
      en: 'Supports emotional calm and psychological relaxation',
      icon: 'smile',
    },
    {
      ar: 'يساعد على تدفق الدم',
      en: 'Supports healthy blood flow throughout the tissues',
      icon: 'heart-pulse',
    },
    {
      ar: 'يساعد على التفكير الإيجابي',
      en: 'Encourages a refreshed, positive mindset',
      icon: 'sparkles',
    },
    {
      ar: 'يفتح المسامات ويزيل السموم من الجسم',
      en: 'Opens skin pores and supports natural detoxification',
      icon: 'leaf',
    },
    {
      ar: 'ينشط الدورة الدموية',
      en: 'Stimulates and revitalizes blood circulation',
      icon: 'refresh-cw',
    },
  ],
  moroccanBath: [
    {
      ar: 'إزالة خلايا الجلد الميتة المتراكمة',
      en: 'Removes accumulated dead skin cells',
      icon: 'sparkles',
    },
    {
      ar: 'تنقية الجسم من السموم عن طريق إزالة الماء الزائد من الجسم',
      en: 'Helps purify the body by releasing excess retained water through steam',
      icon: 'droplets',
    },
    {
      ar: 'المساعدة على التخسيس، وإذابة الدهون الموجودة على المفاصل',
      en: 'Supports body toning and helps reduce heaviness around the joints',
      icon: 'activity',
    },
    {
      ar: 'تنشيط الدورة الدموية',
      en: 'Stimulates blood circulation across the body',
      icon: 'heart-pulse',
    },
    {
      ar: 'تهدئة الأعصاب والتقليل من الإجهاد والتوتر',
      en: 'Calms the nerves and reduces fatigue and tension',
      icon: 'flower-2',
    },
    {
      ar: 'المحافظة على حيوية، وشباب، ونعومة البشرة',
      en: 'Preserves the vitality, youthful glow, and softness of the skin',
      icon: 'sun',
    },
    {
      ar: 'إزالة الأوساخ، ومنع انسداد مسام البشرة',
      en: 'Deeply cleanses impurities and prevents clogged pores',
      icon: 'shield-check',
    },
    {
      ar: 'تحفيز إنتاج الكولاجين في البشرة',
      en: 'Supports natural collagen renewal in the skin',
      icon: 'gem',
    },
    {
      ar: 'التخلص من البشرة الجافة',
      en: 'Relieves dry skin and restores lasting moisture',
      icon: 'feather',
    },
  ],
};

export const galleryImages = [
  {
    id: 'storefront',
    srcWebp: siteConfig.assets.storefront.webp,
    srcJpg: siteConfig.assets.storefront.jpg,
    width: 780,
    height: 755,
    title: {
      ar: 'الواجهة الرئيسية لمركز ترو سيرف للتدليك الصحي',
      en: 'True Serve Therapeutic Massage Main Storefront',
    },
    caption: {
      ar: 'مدخل المركز في حي ظهرة لبن بالرياض — نرحب بكم على مدار الساعة 24/7',
      en: 'Our entrance in Dhahrat Laban District, Riyadh — welcoming you 24/7',
    },
    tag: {
      ar: 'واجهة المركز',
      en: 'Exterior & Entrance',
    },
  },
  {
    id: 'reception',
    srcWebp: siteConfig.assets.reception.webp,
    srcJpg: siteConfig.assets.reception.jpg,
    width: 575,
    height: 700,
    title: {
      ar: 'منطقة الاستقبال والترحيب بالضيوف',
      en: 'Guest Reception & Welcome Desk',
    },
    caption: {
      ar: 'استقبال راقٍ وتوجيه شخصي لاختيار الجلسة المناسبة لحالتك واحتياج جسمك',
      en: 'Warm hospitality and personalized guidance to tailor your session',
    },
    tag: {
      ar: 'الاستقبال',
      en: 'Reception Area',
    },
  },
  {
    id: 'lounge-tulips',
    srcWebp: siteConfig.assets.loungeTulips.webp,
    srcJpg: siteConfig.assets.loungeTulips.jpg,
    width: 750,
    height: 735,
    title: {
      ar: 'صالة الانتظار والاسترخاء الهادئة',
      en: 'Sunlit Relaxation & Waiting Lounge',
    },
    caption: {
      ar: 'جلسات مريحة بتفاصيل دافئة وإضاءة طبيعية تهيئك لتجربة استرخاء متكاملة',
      en: 'Comfortable seating with warm gold accents and natural light',
    },
    tag: {
      ar: 'صالة الضيافة',
      en: 'Hospitality Lounge',
    },
  },
  {
    id: 'lounge-clock',
    srcWebp: siteConfig.assets.loungeClock.webp,
    srcJpg: siteConfig.assets.loungeClock.jpg,
    width: 720,
    height: 715,
    title: {
      ar: 'البهو الداخلي وتصميم المركز العصري',
      en: 'Spacious Interior Lobby & Lounge',
    },
    caption: {
      ar: 'مساحات واسعة ونظيفة تجمع بين الفخامة والخصوصية والهدوء التام',
      en: 'Spacious, spotless surroundings blending luxury, privacy, and calm',
    },
    tag: {
      ar: 'البهو الداخلي',
      en: 'Interior Lobby',
    },
  },
];

export const translations = {
  ar: {
    meta: {
      title: 'مركز ترو سيرف للتدليك الصحي | True Serve Therapeutic Massage — الرياض',
      skipToContent: 'تخطي إلى المحتوى الرئيسي',
    },
    preloader: {
      subtitle: 'صحتك .. توازنك — جسمك يستحق العناية',
      loading: 'جاري تجهيز تجربة العناية الخاصة بك...',
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن المركز',
      services: 'الخدمات',
      howItWorks: 'رحلة العناية',
      benefits: 'الفوائد',
      gallery: 'المعرض',
      whyUs: 'لماذا ترو سيرف',
      visitUs: 'زورونا',
      contact: 'تواصل',
      bookNow: 'احجز الآن',
      switchLang: 'English',
      switchLangLabel: 'التبديل إلى اللغة الإنجليزية',
      toggleThemeLabel: 'تبديل الوضع الليلي / النهاري',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      openAlways: siteConfig.hours.badgeAr,
    },
    hero: {
      badge: siteConfig.hours.badgeAr,
      locationPill: 'الرياض • حي ظهرة لبن',
      eyebrow: 'مركز ترو سيرف للتدليك الصحي',
      headlinePart1: 'صحتك .. توازنك',
      headlinePart2: 'جسمك يستحق العناية',
      subtitle:
        'وجهتك المتخصصة للتدليك الصحي والعناية المتكاملة بالعضلات والمفاصل في الرياض. الجلسات تُحدد بعناية حسب الحالة واحتياج الجسم داخل بيئة هادئة وراقية.',
      posterSlogan: siteConfig.brand.posterSloganAr,
      primaryCta: 'احجز عبر واتساب',
      secondaryCta: 'استكشف الخدمات',
      scrollHint: 'مرّر لاكتشاف المزيد',
      highlights: [
        {
          title: 'جلسات مخصصة',
          desc: 'تُحدد حسب الحالة واحتياج الجسم',
        },
        {
          title: '8 خدمات متخصصة',
          desc: 'تدليك، كاسات نارية وهواء، شياتسو، وبراكتك رياضي',
        },
        {
          title: 'مفتوح دائماً 24/7',
          desc: 'نستقبلكم في أي وقت طوال الأسبوع',
        },
      ],
      defaultWhatsappText:
        'السلام عليكم، أرغب في الاستفسار عن جلسات مركز ترو سيرف للتدليك الصحي وحجز موعد.',
    },
    about: {
      eyebrow: 'عن مركز ترو سيرف',
      title: 'مساحة هادئة تجمع بين العناية المتخصصة والرفاهية الأصيلة',
      lead: 'في مركز ترو سيرف للتدليك الصحي بحي ظهرة لبن في الرياض، نؤمن بأن كل جسم له احتياجه الخاص؛ لذلك لا نقدّم قوالب جاهزة، بل نحدد كل جلسة بعناية حسب حالتك.',
      paragraph1:
        'يركّز مركزنا على أساليب التدليك المتكامل والتدليك الرياضي، كاسات النارية وكاسات الهواء، سيتاتشو التدليك العميق للعضلات والمفاصل، البراكتك الرياضي، وجلسات الرفلكسولوجي والعناية بالقدمين.',
      paragraph2:
        'صُمّمت مرافق المركز وصالات الاستقبال لتمنحك شعوراً فورياً بالسكينة والخصوصية منذ لحظة وصولك، مع التزامنا التام بالنظافة والاهتمام بأدق التفاصيل على مدار الساعة (24/7).',
      tailoredCardTitle: 'الجلسات تحدد حسب الحالة واحتياج الجسم',
      tailoredCardDesc:
        'نبدأ بالاستماع إليك ومعرفة مواطن الإجهاد أو الشد العضلي لنختار الأسلوب الأنسب لراحتك واستعادة توازنك.',
      renderCaption: 'رؤية العلامة: استرخِ، استعد حيويتك، وكن في أفضل حالاتك (تصور فني للهوية)',
      realPhotoBadge: 'صورة حقيقية من المركز',
      conceptBadge: 'تصميم تعبيري للهوية',
      pillars: [
        {
          title: 'تقييم فردي مخصص',
          label: 'عناية مصممة لك',
          desc: 'اختيار التقنية المناسبة بناءً على طبيعة المجهود وحالة العضلات والمفاصل.',
        },
        {
          title: 'تخصص في العضلات والمفاصل',
          label: 'تقنيات مركّزة',
          desc: 'تدليك رياضي، سيتاتشو عميق للعضلات والمفاصل، براكتك رياضي، وكاسات نارية وهواء.',
        },
        {
          title: 'بيئة مريحة',
          label: 'هدوء وخصوصية',
          desc: 'مساحات استقبال وغرف عناية مجهزة بأجواء دافئة تبعث على الطمأنينة.',
        },
      ],
    },
    services: {
      eyebrow: 'قائمة الخدمات المتخصصة',
      title: 'خدمات العناية والتدليك الصحي',
      sloganBadge: siteConfig.brand.posterSloganAr,
      subtitle:
        'نقدّم 8 خدمات أساسية متخصصة تركز على التدليك، التدليك الرياضي، كاسات النارية وكاسات الهواء، سيتاتشو التدليك العميق للعضلات والمفاصل، البراكتك الرياضي، الرفلكسولوجي والعناية بالقدمين.',
      categories: {
        all: 'جميع الخدمات (8)',
        massage: 'التدليك والشياتسو والبراكتك',
        cupping: 'كاسات النارية وكاسات الهواء',
        foot: 'الرفلكسولوجي والعناية بالقدمين',
      },
      cardFlipHint: 'التفاصيل',
      cardBackBtn: 'عودة',
      askWhatsapp: 'استفسر عبر واتساب',
      selectInForm: 'اختر في نموذج الحجز',
      pricingBannerTitle: siteConfig.brand.pricingNoticeAr,
      pricingBannerSub:
        'نظراً لأن الجلسات تُحدد حسب الحالة واحتياج الجسم، يسعدنا تواصلكم معنا مباشرة عبر واتساب أو الهاتف للرد على كافة استفساراتكم.',
      pricingCtaWhatsapp: 'تواصل عبر واتساب للاستفسار',
      pricingCtaCall: 'اتصل بنا مباشرة',
      whatsappServiceTemplate: (serviceName) =>
        `السلام عليكم، أود الاستفسار عن جلسة "${serviceName}" في مركز ترو سيرف للتدليك الصحي.`,
    },
    howItWorks: {
      eyebrow: 'خطوات بسيطة نحو الراحة',
      title: 'كيف تسير رحلة العناية في ترو سيرف؟',
      subtitle:
        'صممنا خطوات واضحة وسلسة لتبدأ جلستك بكل راحة واطمئنان في أي وقت على مدار اليوم.',
      steps: [
        {
          step: '01',
          title: 'تواصل معنا',
          desc: 'تواصل معنا عبر واتساب أو الاتصال الهاتفي أو تفضل بزيارتنا مباشرة في حي ظهرة لبن بالرياض — نحن مفتوحون دائماً 24/7.',
          icon: 'message-circle',
        },
        {
          step: '02',
          title: 'تقييم حالتك',
          desc: 'نستمع إلى احتياجك ومواطن الشد أو الإجهاد العضلي لتحديد نوع الجلسة والتقنية الأكثر ملاءمة لجسمك.',
          icon: 'clipboard-check',
        },
        {
          step: '03',
          title: 'جلسة مخصصة',
          desc: 'تُنفذ الجلسة المختارة بعناية وهدوء باستخدام الأساليب المناسبة لحالتك في أجواء مريحة وخصوصية تامة.',
          icon: 'sparkles',
        },
        {
          step: '04',
          title: 'استرخِ واستعد توازنك',
          desc: 'اختبر شعور الخفة والراحة العضلية وصفاء الذهن بعد جلستك مع إرشادات بسيطة للحفاظ على حيويتك.',
          icon: 'heart-handshake',
        },
      ],
    },
    benefits: {
      eyebrow: 'التوعية الصحية وفوائد العناية',
      title: 'فوائد التدليك الصحي والعناية بالعضلات والمفاصل',
      subtitle:
        'تعرّف على الفوائد المتعددة لجلسات التدليك الصحي والعناية العضلية المتخصصة كما يقدّمها مركز ترو سيرف.',
      tabMassage: 'فوائد التدليك الصحي (15 فائدة)',
      massagePosterTitle: 'فوائد التدليك الصحي',
      MassagePosterSub: 'عناية متكاملة لراحة العضلات والمفاصل، تنشيط الدورة الدموية، وصفاء الذهن.',
      disclaimerTitle: 'ملاحظة توعوية هامة',
      disclaimerText:
        'النتائج تختلف من شخص لآخر، والجلسات تُحدد حسب الحالة واحتياج الجسم. هذه المعلومات للتوعية ولا تغني عن استشارة الطبيب.',
    },
    gallery: {
      eyebrow: 'جولة داخل المركز',
      title: 'معرض الصور الحقيقية للمركز',
      subtitle:
        'لقطات حقيقية من واجهة مركز ترو سيرف للتدليك الصحي وصالات الاستقبال والضيافة في حي ظهرة لبن بالرياض.',
      realPhotosNote: 'جميع الصور المعروضة في هذا القسم هي صور فوتوغرافية حقيقية من داخل المركز وواجهته.',
      viewLarger: 'تكبير الصورة',
      closeLightbox: 'إغلاق العارض',
      prevImage: 'الصورة السابقة',
      nextImage: 'الصورة التالية',
      zoomIn: 'تكبير / تصغير',
      counterText: (current, total) => `${current} من ${total}`,
    },
    whyUs: {
      eyebrow: 'لماذا تختار ترو سيرف؟',
      title: 'معايير عناية تضع راحتك وتوازنك في المقام الأول',
      subtitle:
        'نحرص في مركز ترو سيرف للتدليك الصحي على تقديم تجربة متكاملة تجمع بين التخصيص، التركيز العضلي والحركي، والبيئة الهادئة.',
      cards: [
        {
          title: 'جلسات مخصصة',
          subtitle: 'حسب الحالة واحتياج الجسم',
          desc: 'لا نعتمد نمطاً واحداً للجميع؛ بل نوجّه كل جلسة لتلائم مواطن الإجهاد العضلي أو الحركي لديك.',
          icon: 'sliders',
        },
        {
          title: 'تخصص دقيق',
          subtitle: '8 خدمات أساسية متكاملة',
          desc: 'تدليك، تدليك رياضي، كاسات نارية وكاسات هواء، سيتاتشو تدليك عميق للعضلات والمفاصل، براكتك رياضي، رفلكسولوجي وعناية بالقدمين.',
          icon: 'layers',
        },
        {
          title: 'مكان راقٍ ومريح',
          subtitle: 'فخامة وهدوء على مدار الساعة',
          desc: 'صالات استقبال أنيقة وأجواء دافئة تمنحك الخصوصية والسكينة، مع جاهزية لاستقبالك دائماً 24/7.',
          icon: 'sparkles',
        },
        {
          title: 'عناية بالجسد والعقل',
          subtitle: 'استرخاء عضلي وصفاء ذهني',
          desc: 'تهدف جلساتنا إلى تخفيف ضغوط اليوم واستعادة التوازن الطبيعي بين راحة الجسد وهدوء الذهن.',
          icon: 'heart',
        },
      ],
    },
    contact: {
      eyebrow: 'زورونا أو تواصلوا معنا',
      title: 'نستقبلكم على مدار الساعة (24/7) في الرياض',
      subtitle:
        'تفضلوا بزيارة المركز في حي ظهرة لبن أو أرسلوا طلب حجز الجلسة عبر النموذج أدناه ليتم فتح محادثة واتساب جاهزة ببياناتكم.',
      infoTitle: 'بيانات التواصل والموقع',
      addressLabel: 'العنوان',
      addressValue: siteConfig.location.addressAr,
      phoneLabel: 'الهاتف والواتساب',
      instagramLabel: 'حساب إنستغرام',
      hoursLabel: 'ساعات العمل',
      hoursValue: `${siteConfig.hours.badgeAr} — ${siteConfig.hours.detailAr}`,
      callNowBtn: 'اتصل الآن',
      whatsappBtn: 'محادثة واتساب',
      directionsBtn: 'افتح في الخريطة',
      instagramBtn: 'تابعنا على إنستغرام',
      mapTitle: 'موقع مركز ترو سيرف للتدليك الصحي على خرائط جوجل',
      mapFallbackTitle: 'تعذر تحميل الخريطة التفاعلية في المتصفح',
      mapFallbackDesc: 'يمكنك فتح الموقع الدقيق للمركز مباشرة في تطبيق خرائط جوجل:',
      pricingNote: siteConfig.brand.pricingNoticeAr,
      form: {
        title: 'نموذج طلب حجز أو استفسار سريع',
        subtitle:
          'أدخل بياناتك والخدمة المطلوبة وسيتم تجهيز رسالة واتساب مباشرة إلى المركز بدون أي التزام مالي مسبق.',
        nameLabel: 'الاسم الكريم *',
        namePlaceholder: 'مثال: محمد العتيبي',
        phoneLabel: 'رقم الجوال *',
        phonePlaceholder: '05XXXXXXXX',
        serviceLabel: 'الخدمة المطلوبة *',
        servicePlaceholder: 'اختر الخدمة أو التوجيه حسب الحالة',
        serviceUndecided: 'تحديد الجلسة بعد تقييم الحالة في المركز',
        dateTimeLabel: 'الوقت أو اليوم المفضل (اختياري)',
        dateTimePlaceholder: 'مثال: اليوم الساعة 8 مساءً / غداً عصراً',
        notesLabel: 'ملاحظات إضافية أو وصف مختصر للحالة (اختياري)',
        notesPlaceholder: 'مثال: أعاني من شد في أسفل الظهر والكتفين...',
        submitBtn: 'إرسال الطلب عبر واتساب',
        pricingReminder: 'الأسعار متوفرة في المركز، تواصل معنا للاستفسار.',
        errors: {
          nameRequired: 'يرجى إدخال الاسم الكريم (حرفين على الأقل).',
          phoneRequired: 'يرجى إدخال رقم جوال صحيح للتواصل.',
          serviceRequired: 'يرجى اختيار الخدمة المطلوبة.',
        },
        successHint: 'تم تجهيز رسالتك! جاري فتح واتساب...',
      },
    },
    footer: {
      description:
        'مركز ترو سيرف للتدليك الصحي في الرياض (حي ظهرة لبن) — جلسات مخصصة حسب الحالة واحتياج الجسم في أجواء هادئة وراقية على مدار الساعة.',
      quickLinksTitle: 'روابط سريعة',
      contactTitle: 'معلومات المركز',
      hoursBadge: siteConfig.hours.badgeAr,
      pricingNote: siteConfig.brand.pricingNoticeAr,
      rights: `جميع الحقوق محفوظة © ${new Date().getFullYear()} مركز ترو سيرف للتدليك الصحي (True Serve Therapeutic Massage).`,
      backToTop: 'العودة للأعلى',
    },
    floating: {
      whatsappLabel: 'تواصل معنا عبر واتساب',
      whatsappTooltip: 'احجز أو استفسر عبر واتساب',
    },
  },
  en: {
    meta: {
      title: 'True Serve Therapeutic Massage | مركز ترو سيرف للتدليك الصحي — Riyadh',
      skipToContent: 'Skip to main content',
    },
    preloader: {
      subtitle: 'Your Health. Your Balance. Your Body Deserves Care.',
      loading: 'Preparing your wellness experience...',
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      howItWorks: 'How It Works',
      benefits: 'Benefits',
      gallery: 'Gallery',
      whyUs: 'Why True Serve',
      visitUs: 'Visit Us',
      contact: 'Contact',
      bookNow: 'Book Now',
      switchLang: 'العربية',
      switchLangLabel: 'Switch language to Arabic',
      toggleThemeLabel: 'Toggle dark or light mode',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      openAlways: siteConfig.hours.badgeEn,
    },
    hero: {
      badge: siteConfig.hours.badgeEn,
      locationPill: 'Riyadh • Dhahrat Laban District',
      eyebrow: 'True Serve Therapeutic Massage',
      headlinePart1: 'Your Health. Your Balance.',
      headlinePart2: 'Your Body Deserves Care.',
      subtitle:
        'Your dedicated destination for therapeutic massage and specialized muscle & joint care in Riyadh. Every session is thoughtfully tailored to your condition and body need in a serene, luxurious setting.',
      posterSlogan: siteConfig.brand.posterSloganEn,
      primaryCta: 'Book via WhatsApp',
      secondaryCta: 'Explore Services',
      scrollHint: 'Scroll to explore',
      highlights: [
        {
          title: 'Tailored Sessions',
          desc: 'Customized to your condition & body need',
        },
        {
          title: '8 Specialized Therapies',
          desc: 'Massage, fire & air cupping, shiatsu, reflexology & foot care',
        },
        {
          title: 'Open Always 24/7',
          desc: 'Welcoming guests around the clock',
        },
      ],
      defaultWhatsappText:
        'Hello, I would like to inquire about sessions at True Serve Therapeutic Massage and book an appointment.',
    },
    about: {
      eyebrow: 'About True Serve',
      title: 'A Serene Sanctuary Blending Specialized Care with Refined Luxury',
      lead: 'At True Serve Therapeutic Massage in Dhahrat Laban District, Riyadh, we believe every body has unique needs. Rather than one-size-fits-all routines, each session is tailored to your condition.',
      paragraph1:
        'Our center focuses on therapeutic and sports massage, fire cupping and air cupping, deep muscle & joint shiatsu, sports practice & joint care, reflexology, and dedicated foot care.',
      paragraph2:
        'Every detail of our reception lounges and therapy suites has been crafted to inspire calm, privacy, and trust from the moment you arrive — open 24 hours a day, 7 days a week.',
      tailoredCardTitle: 'Sessions are tailored to each condition and body need',
      tailoredCardDesc:
        'We begin by listening to your goals and areas of muscular fatigue so we can recommend the most effective approach for your comfort and balance.',
      renderCaption: 'Brand Vision: "Relax, Restore, Be Your Best" (Brand Concept Render)',
      realPhotoBadge: 'Real Center Photo',
      conceptBadge: 'Brand Mood Concept',
      pillars: [
        {
          title: 'Personal Assessment',
          label: 'Tailored to You',
          desc: 'Selecting the right modality based on your physical activity and muscle or joint condition.',
        },
        {
          title: 'Muscle & Joint Focus',
          label: 'Targeted Modalities',
          desc: 'Sports massage, deep muscle & joint shiatsu, sports practice, fire cupping, and air cupping.',
        },
        {
          title: 'Refined Atmosphere',
          label: 'Calm & Private',
          desc: 'Warm, spotless lounges and therapy rooms designed for peace of mind.',
        },
      ],
    },
    services: {
      eyebrow: 'Specialized Service Menu',
      title: 'Therapeutic Massage & Wellness Services',
      sloganBadge: siteConfig.brand.posterSloganEn,
      subtitle:
        'Discover our 8 focused therapies: Therapeutic Massage, Fire Cupping, Air Cupping, Sports Massage, Reflexology, Foot Care, Sports Practice, and Deep Muscle & Joint Shiatsu.',
      categories: {
        all: 'All Services (8)',
        massage: 'Massage, Shiatsu & Practice',
        cupping: 'Fire & Air Cupping',
        foot: 'Reflexology & Foot Care',
      },
      cardFlipHint: 'Details',
      cardBackBtn: 'Back',
      askWhatsapp: 'Ask on WhatsApp',
      selectInForm: 'Select in Booking Form',
      pricingBannerTitle: siteConfig.brand.pricingNoticeEn,
      pricingBannerSub:
        'Because sessions are tailored to each condition and body need, please reach out to us via WhatsApp or phone and our team will gladly assist you.',
      pricingCtaWhatsapp: 'Inquire on WhatsApp',
      pricingCtaCall: 'Call Us Directly',
      whatsappServiceTemplate: (serviceName) =>
        `Hello, I would like to inquire about the "${serviceName}" session at True Serve Therapeutic Massage.`,
    },
    howItWorks: {
      eyebrow: 'Your Seamless Wellness Journey',
      title: 'How Your Visit Works at True Serve',
      subtitle:
        'Four simple steps designed around your comfort, schedule, and individual body needs — any hour of the day or night.',
      steps: [
        {
          step: '01',
          title: 'Contact Us',
          desc: 'Reach out via WhatsApp, call us directly, or visit our center in Dhahrat Laban, Riyadh — we are Open Always (24/7).',
          icon: 'message-circle',
        },
        {
          step: '02',
          title: 'Assessment of Your Condition',
          desc: 'Share your areas of tension or fatigue so we can determine the ideal session and technique for your body need.',
          icon: 'clipboard-check',
        },
        {
          step: '03',
          title: 'Tailored Session',
          desc: 'Experience your customized therapy in a tranquil, private environment with attentive professional care.',
          icon: 'sparkles',
        },
        {
          step: '04',
          title: 'Relax & Restore',
          desc: 'Step out feeling lighter, looser, and mentally refreshed, with gentle tips to maintain your balance.',
          icon: 'heart-handshake',
        },
      ],
    },
    benefits: {
      eyebrow: 'Wellness Awareness & Benefits',
      title: 'Benefits of Therapeutic Massage & Muscle Care',
      subtitle:
        'Explore the restorative benefits of regular therapeutic massage and targeted muscle and joint care at True Serve.',
      tabMassage: 'Massage Benefits (15 Items)',
      massagePosterTitle: 'Therapeutic Massage Benefits',
      MassagePosterSub: 'Holistic care for muscular and joint relief, healthy circulation, and mental calm.',
      disclaimerTitle: 'Important Wellness & Medical Awareness Note',
      disclaimerText:
        'Results vary from person to person; sessions are tailored to each condition. This information is for awareness only and does not replace medical advice.',
    },
    gallery: {
      eyebrow: 'Inside True Serve',
      title: 'Real Photo Gallery of Our Center',
      subtitle:
        'Authentic photographs of our storefront, reception desk, and guest lounges in Dhahrat Laban District, Riyadh.',
      realPhotosNote: 'All photographs shown in this gallery are real photos of our storefront and interior spaces.',
      viewLarger: 'View Larger',
      closeLightbox: 'Close Lightbox',
      prevImage: 'Previous photo',
      nextImage: 'Next photo',
      zoomIn: 'Toggle Zoom',
      counterText: (current, total) => `${current} of ${total}`,
    },
    whyUs: {
      eyebrow: 'Why True Serve?',
      title: 'Dedicated Standards Centered on Your Comfort & Balance',
      subtitle:
        'Every aspect of True Serve Therapeutic Massage is built to deliver personalized care in a calm, trustworthy environment.',
      cards: [
        {
          title: 'Personalized Sessions',
          subtitle: 'Tailored to each condition',
          desc: 'Every session is adapted to your specific muscular tension, posture, and comfort preferences.',
          icon: 'sliders',
        },
        {
          title: 'Focused Specialization',
          subtitle: '8 core therapies under one roof',
          desc: 'Therapeutic & sports massage, fire & air cupping, deep muscle & joint shiatsu, sports practice, reflexology & foot care.',
          icon: 'layers',
        },
        {
          title: 'Relaxing Luxurious Space',
          subtitle: 'Open Always 24/7 in Riyadh',
          desc: 'Warm, sunlit lounges and private rooms ready to welcome you any hour of the day or night.',
          icon: 'sparkles',
        },
        {
          title: 'Care for Body & Mind',
          subtitle: 'Physical relief & mental calm',
          desc: 'Thoughtful treatments that ease physical fatigue while restoring calm and clarity to your mind.',
          icon: 'heart',
        },
      ],
    },
    contact: {
      eyebrow: 'Visit Us or Get in Touch',
      title: 'Welcoming You 24/7 in Dhahrat Laban, Riyadh',
      subtitle:
        'Visit our center directly or complete the booking inquiry form below to compose a prefilled WhatsApp message to our reception team.',
      infoTitle: 'Contact & Location Details',
      addressLabel: 'Address',
      addressValue: siteConfig.location.addressEn,
      phoneLabel: 'Phone & WhatsApp',
      instagramLabel: 'Instagram',
      hoursLabel: 'Working Hours',
      hoursValue: `${siteConfig.hours.badgeEn} — ${siteConfig.hours.detailEn}`,
      callNowBtn: 'Call Now',
      whatsappBtn: 'Chat on WhatsApp',
      directionsBtn: 'Get Directions',
      instagramBtn: 'Follow on Instagram',
      mapTitle: 'True Serve Therapeutic Massage Location on Google Maps',
      mapFallbackTitle: 'Interactive Map Could Not Be Loaded',
      mapFallbackDesc: 'You can open our exact location directly in Google Maps:',
      pricingNote: siteConfig.brand.pricingNoticeEn,
      form: {
        title: 'Booking & Session Inquiry Form',
        subtitle:
          'Fill in your details and preferred therapy below to open a prefilled WhatsApp message to +966 50 611 1075.',
        nameLabel: 'Full Name *',
        namePlaceholder: 'e.g. Abdullah Al-Otaibi',
        phoneLabel: 'Mobile Number *',
        phonePlaceholder: '+966 5X XXX XXXX',
        serviceLabel: 'Preferred Service *',
        servicePlaceholder: 'Choose a service or consultation',
        serviceUndecided: 'Decide after condition assessment at the center',
        dateTimeLabel: 'Preferred Date / Time (Optional)',
        dateTimePlaceholder: 'e.g. Today at 8:00 PM / Tomorrow evening',
        notesLabel: 'Additional Notes or Condition Brief (Optional)',
        notesPlaceholder: 'e.g. Experiencing lower back and shoulder tension...',
        submitBtn: 'Send Request via WhatsApp',
        pricingReminder: 'Prices are available at the center, contact us to inquire.',
        errors: {
          nameRequired: 'Please enter your name (at least 2 characters).',
          phoneRequired: 'Please enter a valid phone number.',
          serviceRequired: 'Please select a preferred service.',
        },
        successHint: 'Message ready! Opening WhatsApp...',
      },
    },
    footer: {
      description:
        'True Serve Therapeutic Massage in Riyadh (Dhahrat Laban District) — tailored therapeutic and relaxation sessions in a calm, luxurious environment, Open Always 24/7.',
      quickLinksTitle: 'Quick Links',
      contactTitle: 'Center Info',
      hoursBadge: siteConfig.hours.badgeEn,
      pricingNote: siteConfig.brand.pricingNoticeEn,
      rights: `All rights reserved © ${new Date().getFullYear()} True Serve Therapeutic Massage (مركز ترو سيرف للتدليك الصحي).`,
      backToTop: 'Back to top',
    },
    floating: {
      whatsappLabel: 'Contact us on WhatsApp',
      whatsappTooltip: 'Book or inquire via WhatsApp',
    },
  },
};
