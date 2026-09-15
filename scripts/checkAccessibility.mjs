// Install axe-core outside the project, then pass its axe.min.js path as argument 2.
// node scripts/checkAccessibility.mjs http://127.0.0.1:4173 /path/to/axe.min.js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:4173';
const axePath = process.argv[3];
assert.ok(axePath && fs.existsSync(axePath), 'Pass the path to axe-core/axe.min.js as the second argument.');
const routes = [...new Set(['/', '/search/', '/404.html', ...['sitemap.xml', 'api/sitemap.xml'].flatMap(file =>
  [...fs.readFileSync(`website/build/${file}`, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
)])];
const cases = routes.flatMap(route => [1280, 320].map(width => ({ route, width })));
const browser = await chromium.launch({ headless: true });
const results = [];
let next = 0;
try {
  await Promise.all(Array.from({ length: 3 }, async () => {
    const context = await browser.newContext({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const page = await context.newPage();
    while (next < cases.length) {
      const item = cases[next++];
      await page.setViewportSize({ width: item.width, height: 900 });
      await page.goto(new URL(item.route, base).href, { waitUntil: 'networkidle' });
      await page.addScriptTag({ path: axePath });
      const result = await page.evaluate(async () => {
        if (document.title === 'Page Error') throw new Error(document.body.innerText);
        const audit = await window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
        });
        const summarise = rule => ({ id: rule.id, impact: rule.impact, nodes: rule.nodes.map(node => ({ target: node.target, html: node.html, summary: node.failureSummary })) });
        return {
          violations: audit.violations.map(summarise),
          incomplete: audit.incomplete.map(summarise),
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
        };
      });
      results.push({ ...item, ...result });
      if (result.violations.length || result.horizontalOverflow) console.log(JSON.stringify({ ...item, violations: result.violations.map(rule => rule.id), horizontalOverflow: result.horizontalOverflow }));
      if (results.length % 20 === 0) console.log(`Checked ${results.length}/${cases.length} page/viewport combinations`);
    }
    await context.close();
  }));
} finally {
  await browser.close();
}
fs.mkdirSync('output/accessibility', { recursive: true });
fs.writeFileSync('output/accessibility/axe-results.json', JSON.stringify({ standard: 'WCAG 2.2 A/AA automated rules', base, results }, null, 2));
const failures = results.filter(result => result.violations.length || result.horizontalOverflow);
console.log(`${results.length} page/viewport combinations checked; ${failures.length} with violations or horizontal page overflow.`);
assert.equal(failures.length, 0, 'See output/accessibility/axe-results.json. Incomplete results require review even when this check passes.');
