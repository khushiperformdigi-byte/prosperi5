import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const files = fs.readdirSync(publicDir);

let count = 0;
let savedBytes = 0;

async function run() {
  for (const file of files) {
    if (file.endsWith('.png')) {
      const filePath = path.join(publicDir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.size > 200 * 1024) {
          const fileData = fs.readFileSync(filePath);
          const buffer = await sharp(fileData)
            .png({ quality: 60, compressionLevel: 9, palette: true })
            .toBuffer();
          
          if (buffer.length < stat.size) {
            savedBytes += (stat.size - buffer.length);
            fs.writeFileSync(filePath, buffer);
            count++;
          }
        }
      } catch (err) {
        // continue
      }
    }
  }
  console.log(`SUCCESS: Optimized ${count} PNG images! Saved ${(savedBytes / (1024 * 1024)).toFixed(2)} MB`);
}

run();
