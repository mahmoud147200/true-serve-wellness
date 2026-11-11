# مركز ترو سيرف للتدليك الصحي | True Serve Therapeutic Massage

A production-ready, bilingual (**Arabic RTL default** + **English LTR toggle**) marketing website for **True Serve Therapeutic Massage (مركز ترو سيرف للتدليك الصحي)** in Riyadh, Saudi Arabia (`2512 Najd, Dhahrat Laban District`).

---

## ✨ Key Features

- **Bilingual RTL/LTR Architecture**: Arabic (`ar`, `dir="rtl"`) by default with instant toggle to English (`en`, `dir="ltr"`), persisted in `localStorage` (`truserve_lang`). Built with CSS logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`).
- **Light & Dark Luxury Themes**: Warm cream/gold/blue/green medical-spa light theme by default with a deep navy/gold/emerald dark mode toggle (`truserve_theme`).
- **Interactive Three.js 3D Scenes**:
  - **Hero 3D Scene (`src/components/HeroScene3D.jsx`)**: Floating glossy brand-blue spheres echoing the True Serve spine-sphere logo motif, organic green leaf canopy and drifting leaf particles, and a flowing blue/gold wave ribbon reacting to pointer movement and mobile device tilt. Automatically pauses when off-screen (`IntersectionObserver`) and falls back to an SVG/CSS gradient artwork when `prefers-reduced-motion` is enabled or WebGL is unavailable.
  - **Secondary 3D Emblem (`src/components/AccentOrb3D.jsx`)**: Lightweight floating wellness orb in the "Why True Serve" section.
- **Complete 17-Service Catalog (`src/sections/Services.jsx`)**:
  - Category filtering (`All`, `Massage & Manual Therapy`, `Cupping & Acupuncture`, `Body Care & Spa`, `Exercise & Fitness`), 3D hover tilt with glare, expandable detail view, prefilled WhatsApp inquiry links per service, and no prices displayed anywhere (with a gentle inquiry banner).
- **Animated Benefits Tabs (`src/sections/Benefits.jsx`)**:
  - 15 Massage Benefits and 9 Moroccan Bath Benefits with staggered GSAP animations, custom icons, cropped photography, and an explicit medical-awareness disclaimer.
- **Real Photo Gallery & Accessible Lightbox (`src/sections/Gallery.jsx`)**:
  - Displays only the 4 real, un-watermarked cropped photographs of the center (`storefront`, `reception`, `lounge-tulips`, `lounge-clock`) with a keyboard-navigable (`ArrowLeft`, `ArrowRight`, `Escape`), focus-trapped, touch-swipeable, zoomable Lightbox.
- **Validated WhatsApp Booking Request Form (`src/sections/Contact.jsx`)**:
  - Validates Name, Phone, and Service selection, sanitizes inputs, and opens a prefilled WhatsApp message to `+966 50 611 1075` in the active language.

---

## 🚀 Quick Start (Install, Dev, Build & Preview)

### Prerequisites
- **Node.js** `>= 18.x` and **npm** `>= 9.x`

### 1. Install Dependencies
```bash
npm install
```

### 2. Process & Optimize Image Assets (Optional — already pre-generated in `public/assets/`)
```bash
npm run process-assets
```
This script (`scripts/process-assets.mjs`) copies the original images into `public/assets/`, removes the white background from `logo.png`, crops out the frames/watermarks from the 4 real interior/storefront photos into `public/assets/cropped/` (`.jpg` and `.webp`), crops the 8 individual therapy photos from the service and benefits posters into `public/assets/services/`, and generates favicons and Open Graph images.

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview the Production Build Locally
```bash
npm run preview
```

---

## 🛠️ How to Edit Business Config & Translations

1. **Business Info, Phone, WhatsApp, Coordinates & Map Links**:
   - Edit [`src/config/site.js`](./src/config/site.js). All contact details, working hours (`24/7`), Google Maps links, and asset paths are centralized in `siteConfig`.
2. **All Arabic & English Copy, Services (1–17), and Benefits**:
   - Edit [`src/i18n/translations.js`](./src/i18n/translations.js).
   - `servicesData` holds all 17 services (`title`, `shortDesc`, `details`, `tags`, `category`, `icon`, `image`).
   - `benefitsData` holds the 15 Massage Benefits and 9 Moroccan Bath Benefits.
   - `translations.ar` and `translations.en` hold all UI strings for every section.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push this repository to GitHub/GitLab/Bitbucket or use the Vercel CLI (`npx vercel`).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Deploy to Netlify
1. Connect your repository in Netlify or run `npx netlify-cli deploy --prod --dir=dist`.
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### Deploy to GitHub Pages
1. If deploying to a subpath (`https://<username>.github.io/<repo>/`), set `base: '/<repo>/'` in `vite.config.js`.
2. Run `npm run build` and deploy the `dist/` folder using `gh-pages` or GitHub Actions (`actions/deploy-pages`).
