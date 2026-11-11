import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const UPLOAD_DIR =
  'C:/Users/Abo Hany ^_^/.gemini/antigravity/brain/a2ec1977-f0ff-489e-a32e-6c57a7b49dbe/.user_uploaded';
const PUBLIC_ASSETS = path.resolve('public/assets');
const CROPPED_DIR = path.join(PUBLIC_ASSETS, 'cropped');
const SERVICES_DIR = path.join(PUBLIC_ASSETS, 'services');

const RAW_MAP = {
  'logo.png': 'media_1794400123684_efb347f2.png',
  'storefront.jpg': 'media_1794400161329_90006dc1.jpg',
  'reception.jpg': 'media_1794400161335_25f828f7.jpg',
  'lounge-tulips.jpg': 'media_1794400161353_6152a5b5.jpg',
  'lounge-clock.jpg': 'media_1794400161370_89ee23b3.jpg',
  'brand-render.jpg': 'media_1794400161383_be4574de.jpg',
  'poster-menu.jpg': 'media_1794400161396_c299a3ab.jpg',
  'poster-services.jpg': 'media_1794400161411_4773d104.jpg',
  'poster-benefits.jpg': 'media_1794400161428_641833dc.jpg',
};

async function ensureDirs() {
  await fs.mkdir(PUBLIC_ASSETS, { recursive: true });
  await fs.mkdir(CROPPED_DIR, { recursive: true });
  await fs.mkdir(SERVICES_DIR, { recursive: true });
}

async function copyOriginals() {
  for (const [targetName, sourceFile] of Object.entries(RAW_MAP)) {
    const srcPath = path.join(UPLOAD_DIR, sourceFile);
    const destPath = path.join(PUBLIC_ASSETS, targetName);
    await fs.copyFile(srcPath, destPath);
  }
  console.log('Copied 9 original assets to public/assets/');
}

/**
 * Convert white background of logo.png to true transparency while preserving smooth edges.
 */
async function processLogo() {
  const logoSrc = path.join(PUBLIC_ASSETS, 'logo.png');
  const { data, info } = await sharp(logoSrc)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    // Brightness and saturation check: pure white / near-white becomes transparent
    const minChannel = Math.min(r, g, b);
    const maxChannel = Math.max(r, g, b);
    const spread = maxChannel - minChannel;
    if (minChannel > 242 && spread < 15) {
      out[i + 3] = 0;
    } else if (minChannel > 220 && spread < 22) {
      // Smooth ramp for anti-aliased edge pixels
      const alphaFactor = (242 - minChannel) / 22;
      out[i + 3] = Math.round(255 * Math.max(0, Math.min(1, alphaFactor)));
    }
  }

  // Trim excess transparent padding around the logo
  const transparentLogo = sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).trim({ threshold: 5 });

  await transparentLogo.clone().png({ compressionLevel: 9 }).toFile(path.join(PUBLIC_ASSETS, 'logo.png'));
  await transparentLogo.clone().webp({ quality: 92 }).toFile(path.join(PUBLIC_ASSETS, 'logo.webp'));

  // Generate favicons with subtle padding on white rounded card
  await sharp(path.join(PUBLIC_ASSETS, 'logo.png'))
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_ASSETS, 'favicon-32x32.png'));

  await sharp(path.join(PUBLIC_ASSETS, 'logo.png'))
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_ASSETS, 'favicon-192x192.png'));

  await sharp(path.join(PUBLIC_ASSETS, 'logo.png'))
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(PUBLIC_ASSETS, 'apple-touch-icon.png'));

  // Generate Open Graph 1200x630 image
  await sharp(path.join(PUBLIC_ASSETS, 'logo.png'))
    .resize(900, 480, { fit: 'contain', background: { r: 251, g: 249, b: 245, alpha: 1 } })
    .extend({
      top: 75,
      bottom: 75,
      left: 150,
      right: 150,
      background: { r: 251, g: 249, b: 245, alpha: 1 },
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_ASSETS, 'og-image.jpg'));

  console.log('Processed transparent logo, favicons, and OG image.');
}

async function saveCrop(srcFile, destBaseDir, destName, region, resizeOpts = null) {
  const srcPath = path.join(PUBLIC_ASSETS, srcFile);
  let pipeline = sharp(srcPath).extract(region);
  if (resizeOpts) {
    pipeline = pipeline.resize(resizeOpts.width, resizeOpts.height, { fit: 'cover' });
  }
  await pipeline
    .clone()
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(destBaseDir, `${destName}.jpg`));
  await pipeline
    .clone()
    .webp({ quality: 86 })
    .toFile(path.join(destBaseDir, `${destName}.webp`));
}

async function processInteriorAndStorefrontCrops() {
  // 1. storefront.jpg (1024x1024):
  // Top-left watermark ends around y=195, x=240.
  // The main storefront sign "ترو سيرف للتدليك الصحي / True Serve Therapeutic Massage" starts at y=210, x=150..885,
  // and the glass entrance doors go down to y=965.
  await saveCrop('storefront.jpg', CROPPED_DIR, 'storefront', {
    left: 120,
    top: 205,
    width: 780,
    height: 755,
  });

  // 2. reception.jpg (1024x1024):
  // Left & bottom have the reception desk, staff, warm wood panels, and orange tulips on gold coffee table.
  // Right side (x > 650) fades into white diagonal stripes, and top-left (x < 250, y < 200) has the logo watermark.
  // Cropping left: 55, top: 235, width: 575, height: 700 gives a clean interior shot without the watermark or right white fade!
  await saveCrop('reception.jpg', CROPPED_DIR, 'reception', {
    left: 55,
    top: 235,
    width: 575,
    height: 700,
  });

  // 3. lounge-tulips.jpg (1024x1024):
  // Top-left watermark is at x < 240, y < 200. Right border white fade starts around x > 815.
  // Cropping left: 45, top: 215, width: 750, height: 735 shows the indoor plant, sunny window, armchairs, and tulip coffee table cleanly!
  await saveCrop('lounge-tulips.jpg', CROPPED_DIR, 'lounge-tulips', {
    left: 45,
    top: 215,
    width: 750,
    height: 735,
  });

  // 4. lounge-clock.jpg (1024x1024):
  // Top-left watermark is at x < 240, y < 200. Wall clock starts at y=250. Reception desk & wood wall go to x=755.
  // Cropping left: 40, top: 235, width: 720, height: 715 captures the wall clock, luxury sofas, reception desk, and sunlit floor!
  await saveCrop('lounge-clock.jpg', CROPPED_DIR, 'lounge-clock', {
    left: 40,
    top: 235,
    width: 720,
    height: 715,
  });

  // 5. brand-render.jpg (768x1024):
  // Already unframed full-bleed render; create optimized WebP & JPG in cropped/
  await saveCrop('brand-render.jpg', CROPPED_DIR, 'brand-render', {
    left: 0,
    top: 0,
    width: 768,
    height: 1024,
  });

  console.log('Processed interior & storefront crops.');
}

async function processServicePosterCrops() {
  // poster-services.jpg is 682 x 1024
  // Tightened crops inward by ~14-18px to completely remove the poster's rounded corner borders:
  // 1. Sports Massage (left photo, row 1)
  await saveCrop('poster-services.jpg', SERVICES_DIR, 'sports-massage', {
    left: 46,
    top: 264,
    width: 206,
    height: 94,
  });

  // 2. Fire Cupping (right photo, row 2)
  await saveCrop('poster-services.jpg', SERVICES_DIR, 'fire-cupping', {
    left: 484,
    top: 386,
    width: 152,
    height: 92,
  });

  // 3. Chinese Acupuncture (left photo, row 3)
  await saveCrop('poster-services.jpg', SERVICES_DIR, 'acupuncture', {
    left: 48,
    top: 504,
    width: 200,
    height: 90,
  });

  // 4. Sliding Cupping (right photo, row 4)
  await saveCrop('poster-services.jpg', SERVICES_DIR, 'sliding-cupping', {
    left: 488,
    top: 622,
    width: 148,
    height: 88,
  });

  // 5. Sports Shiatsu (left photo, row 5)
  await saveCrop('poster-services.jpg', SERVICES_DIR, 'sports-shiatsu', {
    left: 48,
    top: 742,
    width: 178,
    height: 84,
  });

  // 6. Joint Correction (right photo, row 6)
  await saveCrop('poster-services.jpg', SERVICES_DIR, 'joint-correction', {
    left: 484,
    top: 858,
    width: 150,
    height: 84,
  });

  // From poster-benefits.jpg (696 x 1024):
  // Top-left photo (Massage therapy) — tightened to avoid top arch and bottom-left curve
  await saveCrop('poster-benefits.jpg', SERVICES_DIR, 'massage-general', {
    left: 54,
    top: 195,
    width: 230,
    height: 325,
  });

  // Bottom-left photo (Moroccan bath traditional brass bowl, brush, black soap, towels) — tightened inside arch
  await saveCrop('poster-benefits.jpg', SERVICES_DIR, 'moroccan-bath', {
    left: 54,
    top: 665,
    width: 205,
    height: 245,
  });

  console.log('Processed 8 service & benefit photo crops.');
}

async function main() {
  await ensureDirs();
  await copyOriginals();
  await processLogo();
  await processInteriorAndStorefrontCrops();
  await processServicePosterCrops();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
