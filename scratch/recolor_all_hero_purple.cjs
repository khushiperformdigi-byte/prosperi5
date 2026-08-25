const sharp = require('sharp');

async function processFullImage() {
  const imagePath = 'public/ChatGPT Image Aug 25, 2026, 11_07_34 AM.png';
  const outputPath = 'public/ChatGPT Image Aug 25, 2026, 11_07_34 AM_all_purple.png';

  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Image dimensions: ${info.width} x ${info.height}, channels: ${info.channels}`);

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Target homepage purple: #7C1FA8 -> R: 124, G: 31, B: 168
  // Dark text target: #1E1135 or #5E1683 for headings
  const purpleR = 124;
  const purpleG = 31;
  const purpleB = 168;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const relX = x / width;
      const relY = y / height;

      // Target left side content area (X from 2% to 60%, Y from 5% to 95%)
      if (relX >= 0.02 && relX <= 0.60 && relY >= 0.05 && relY <= 0.95) {
        const brightness = (r + g + b) / 3;

        // Detect non-white pixels (text, borders, button backgrounds)
        if (brightness < 240) {
          // If pixel is part of solid button background (e.g. blue/purple button)
          const isButtonBg = relY >= 0.70 && relY <= 0.92 && relX >= 0.04 && relX <= 0.28;
          
          if (isButtonBg) {
            // Recolor button background to vibrant homepage purple #7C1FA8
            if (brightness > 60 && brightness < 230) {
              data[idx] = purpleR;
              data[idx + 1] = purpleG;
              data[idx + 2] = purpleB;
            }
          } else {
            // Text & Outline Button elements
            const weight = Math.max(0, Math.min(1, (240 - brightness) / 240));

            // Shift hue/color to homepage purple #7C1FA8
            const targetR = Math.round(purpleR * weight + r * (1 - weight));
            const targetG = Math.round(purpleG * weight + g * (1 - weight));
            const targetB = Math.round(purpleB * weight + b * (1 - weight));

            data[idx] = Math.min(255, targetR);
            data[idx + 1] = Math.min(255, targetG);
            data[idx + 2] = Math.min(255, targetB);
          }
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

processFullImage().catch(console.error);
