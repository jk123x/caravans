import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { copyFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.goto(`file://${join(__dirname, 'og-image.html')}`, { waitUntil: 'networkidle0' });

// Let fonts fully render
await new Promise(r => setTimeout(r, 1500));

const outputPath = join(__dirname, 'og-image.png');
await page.screenshot({
  path: outputPath,
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});
console.log(`Rendered og-image.png`);

// Copy to site/public
const publicPath = join(__dirname, '..', 'site', 'public', 'og-image.png');
copyFileSync(outputPath, publicPath);
console.log(`Copied to site/public/og-image.png`);

await browser.close();
console.log('Done.');
