import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svg = readFileSync(join(root, 'public/logo.svg'));

// 1. favicon (32x32 png)
await sharp(svg, { density: 300 })
    .resize(32, 32)
    .png()
    .toFile(join(root, 'app/icon.png'));
console.log('✅ app/icon.png (32x32)');

// 2. apple-icon (180x180)
await sharp(svg, { density: 300 })
    .resize(180, 180)
    .png()
    .toFile(join(root, 'app/apple-icon.png'));
console.log('✅ app/apple-icon.png (180x180)');

// 3. OG image for WhatsApp (1200x630) — logo + text
const ogW = 1200, ogH = 630, logoSz = 200;

const logoBuf = await sharp(svg, { density: 300 })
    .resize(logoSz, logoSz)
    .png()
    .toBuffer();

const bgSvg = Buffer.from(`
<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a0a12"/>
      <stop offset="50%" stop-color="#2d1020"/>
      <stop offset="100%" stop-color="#1a0a12"/>
    </linearGradient>
  </defs>
  <rect width="${ogW}" height="${ogH}" fill="url(#bg)"/>
  <text x="${ogW / 2}" y="${ogH / 2 + 60}" text-anchor="middle"
        font-family="sans-serif" font-weight="700" font-size="52"
        fill="white">Viaja</text>
  <text x="${ogW / 2}" y="${ogH / 2 + 115}" text-anchor="middle"
        font-family="sans-serif" font-weight="400" font-size="28"
        fill="rgba(255,255,255,0.7)">Turismo Gastronómico · Colonia Tovar</text>
</svg>`);

await sharp(bgSvg)
    .composite([{
        input: logoBuf,
        top: Math.floor(ogH / 2 - logoSz / 2 - 60),
        left: Math.floor(ogW / 2 - logoSz / 2),
    }])
    .png()
    .toFile(join(root, 'public/og-image.png'));

console.log('✅ public/og-image.png (1200x630)');
console.log('Done!');
