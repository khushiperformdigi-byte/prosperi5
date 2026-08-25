const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const imagePath = 'public/ChatGPT Image Aug 25, 2026, 11_07_34 AM.png';
  const outputPath = 'public/ChatGPT Image Aug 25, 2026, 11_07_34 AM_purple.png';

  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Image dimensions: ${info.width} x ${info.height}, channels: ${info.channels}`);

  // Target homepage purple: #7C1FA8 (R: 124, G: 31, B: 168) or #6E1C98 / #5E1683
  // In the image, "Stronger Future." is located around Y: 20% to 50%, X: 0% to 55%
  // Let's identify the dark purple/blue text pixels of "Stronger Future." and map them to rich homepage purple #7C1FA8!

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Check if pixel is part of the "Stronger Future." text region (roughly y between 28% and 48%, x between 3% and 52%)
      const relX = x / width;
      const relY = y / height;

      if (relY >= 0.26 && relY <= 0.46 && relX >= 0.05 && relX <= 0.55) {
        // Detect non-white/dark purple text pixels
        // Background is near white (r > 240, g > 240, b > 240)
        // Text pixels have lower brightness (r < 200 || g < 200 || b < 200) with purple/blue tint
        const brightness = (r + g + b) / 3;

        if (brightness < 220) {
          // Calculate intensity weight (0 = darkest core of font, 1 = background blend edge)
          const weight = Math.max(0, Math.min(1, (220 - brightness) / 220));

          // Target homepage purple: R=124 (#7C), G=31 (#1F), B=168 (#A8)
          // We blend homepage purple based on font weight
          const targetR = Math.round(124 * weight + r * (1 - weight));
          const targetG = Math.round(31 * weight + g * (1 - weight));
          const targetB = Math.round(168 * weight + b * (1 - weight));

          data[idx] = Math.min(255, targetR);
          data[idx + 1] = Math.min(255, targetG);
          data[idx + 2] = Math.min(255, targetB);
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Saved recolored image to ${outputPath}`);
}

processImage().catch(console.error);
