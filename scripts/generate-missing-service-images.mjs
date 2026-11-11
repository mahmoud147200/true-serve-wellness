import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const BRAIN_DIR =
  'C:/Users/Abo Hany ^_^/.gemini/antigravity/brain/a2ec1977-f0ff-489e-a32e-6c57a7b49dbe';
const SERVICES_DIR = path.resolve('public/assets/services');

const LOCAL_AI_GENERATED = [
  {
    name: 'cupping',
    src: path.join(BRAIN_DIR, 'cupping_1794429936419.jpg'),
  },
  {
    name: 'hot-stones',
    src: path.join(BRAIN_DIR, 'hot_stones_massage_1794429966443.jpg'),
  },
  {
    name: 'exercises',
    src: path.join(BRAIN_DIR, 'guided_therapeutic_exercises_1794430003479.jpg'),
  },
];

const REMOTE_AI_PROMPTS = [
  {
    name: 'ayurveda',
    prompt: 'luxury ayurveda warm herbal oil massage spa therapy photorealistic',
    width: 800,
    height: 450,
    seed: null,
  },
  {
    name: 'reflexology',
    prompt: 'foot reflexology massage spa therapy photorealistic',
    width: 768,
    height: 512,
    seed: 11,
  },
  {
    name: 'shiatsu',
    prompt: 'shiatsu back pressure massage therapy luxury wellness spa photorealistic',
    width: 768,
    height: 512,
    seed: 22,
  },
  {
    name: 'chiropractic',
    prompt: 'chiropractic spinal adjustment back therapy clinic photorealistic',
    width: 768,
    height: 512,
    seed: 33,
  },
  {
    name: 'foot-care',
    prompt: 'luxury spa foot soak warm water basin white towels photorealistic',
    width: 768,
    height: 512,
    seed: 44,
  },
  {
    name: 'fitness',
    prompt: 'luxury wellness fitness studio wooden interior dumbbells mat photorealistic',
    width: 768,
    height: 512,
    seed: 55,
  },
];

async function saveOptimizedPair(inputBufferOrPath, name, cropBottomWatermark = false) {
  let pipeline = sharp(inputBufferOrPath);
  if (cropBottomWatermark) {
    const meta = await pipeline.metadata();
    const w = meta.width || 768;
    const h = meta.height || 512;
    pipeline = sharp(inputBufferOrPath).extract({
      left: 16,
      top: 16,
      width: w - 32,
      height: h - 68,
    });
  }
  pipeline = pipeline.resize(640, 360, {
    fit: 'cover',
    position: 'center',
  });
  await pipeline
    .clone()
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(SERVICES_DIR, `${name}.jpg`));
  await pipeline
    .clone()
    .webp({ quality: 86 })
    .toFile(path.join(SERVICES_DIR, `${name}.webp`));
  console.log(`Saved clean ${name}.jpg and ${name}.webp`);
}

async function fetchWithBackoff(url, retries = 6) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const ab = await res.arrayBuffer();
        return Buffer.from(ab);
      }
      console.warn(`Attempt ${i + 1} status ${res.status}, waiting 16s...`);
    } catch (err) {
      console.warn(`Attempt ${i + 1} error: ${err.message}, waiting 16s...`);
    }
    await new Promise((r) => setTimeout(r, 16000));
  }
  throw new Error(`Failed to fetch ${url}`);
}

async function main() {
  await fs.mkdir(SERVICES_DIR, { recursive: true });

  for (const item of LOCAL_AI_GENERATED) {
    await saveOptimizedPair(item.src, item.name, false);
  }

  for (const item of REMOTE_AI_PROMPTS) {
    const seedParam = item.seed ? `&seed=${item.seed}` : '&nologo=true';
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      item.prompt
    )}?width=${item.width}&height=${item.height}${seedParam}`;
    console.log(`Generating ${item.name}...`);
    const buf = await fetchWithBackoff(url);
    await saveOptimizedPair(buf, item.name, true);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
