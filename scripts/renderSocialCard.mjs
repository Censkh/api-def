import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const source = 'website/static/img/api-def-social-card.svg';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<style>body{margin:0}svg{display:block}</style>${await fs.readFile(source, 'utf8')}`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('svg').screenshot({ path: source.replace('.svg', '.png') });
} finally {
  await browser.close();
}
