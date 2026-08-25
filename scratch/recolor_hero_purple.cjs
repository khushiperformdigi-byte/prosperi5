const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const imagePath = 'public/ChatGPT Image Aug 25, 2026, 11_07_34 AM.png';
  const outputPath = 'public/ChatGPT Image Aug 25, 2026, 11_07_34 AM_purple.png';

  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Image dimensions: ${info.width} x ${info.height}, channels: ${info.channels}`);

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // In the image, "Stronger Future." text is located around Y: 22% to 48%, X: 5% to 65%
  // Target homepage purple: #7C1FA8 -> R: 124, G: 31, B: 168

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const relX = x / width;
      const relY = y / height;

      // Select region of "Stronger Future." line
      if (relY >= 0.22 && relY <= 0.48 && relX >= 0.05 && relX <= 0.65) {
        const brightness = (r + g + b) / 3;

        // Detect text pixels (non-background)
        if (brightness < 225) {
          // Calculate anti-aliased font pixel intensity weight
          const weight = Math.max(0, Math.min(1, (225 - brightness) / 225));

          // Homepage primary purple: R=124 (#7C), G=31 (#1F), B=168 (#A8)
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

  console.log(`Successfully generated ${outputPath}`);
}

processImage().catch(console.error);
