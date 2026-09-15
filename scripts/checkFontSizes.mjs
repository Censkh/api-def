// Build first, then serve website/build on port 4173.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:4173';
const routes = [...new Set(['/', '/search/?q=api', '/404.html', ...['sitemap.xml', 'api/sitemap.xml'].flatMap(file =>
  [...fs.readFileSync(`website/build/${file}`, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
)])];
const cases = routes.flatMap(route => [1280, 320].map(width => ({ route, width })));
const results = [];
const browser = await chromium.launch();
let next = 0;
async function check(page, label) {
  const small = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(element => {
    const text = [...element.childNodes].some(node => node.nodeType === 3 && node.textContent.trim());
    return (text || element.matches('input[placeholder]')) && element.checkVisibility() &&
      parseFloat(getComputedStyle(element).fontSize) < 14;
  }).map(element => ({ tag: element.tagName, className: element.className, size: getComputedStyle(element).fontSize, text: element.textContent.slice(0, 60) })));
  results.push({ ...label, small });
  if (small.length) console.log(JSON.stringify({ ...label, small }));
}
try {
  await Promise.all(Array.from({ length: 3 }, async () => {
    const page = await browser.newPage();
    while (next < cases.length) {
      const item = cases[next++];
      await page.setViewportSize({ width: item.width, height: 900 });
      await page.goto(new URL(item.route, base).href, { waitUntil: 'networkidle' });
      await check(page, item);
    }
    await page.close();
  }));
  const page = await browser.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Copy page', exact: true }).click();
  await check(page, { state: 'Copy menu' });
  await page.keyboard.press('Escape');
  await page.getByRole('textbox', { name: 'Search' }).fill('middleware');
  await page.locator('[role="option"]').first().waitFor();
  await check(page, { state: 'Search suggestions' });
} finally {
  await browser.close();
}
fs.mkdirSync('output/accessibility', { recursive: true });
fs.writeFileSync('output/accessibility/font-sizes.json', JSON.stringify(results, null, 2));
assert.equal(results.filter(result => result.small.length).length, 0, 'Text smaller than 14px found.');
console.log(`All text is at least 14px in ${results.length} page/viewport and interactive states.`);
