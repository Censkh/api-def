// node scripts/checkAccessibilityInteractions.mjs http://127.0.0.1:4173 /path/to/axe.min.js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://127.0.0.1:4173';
const axePath = process.argv[3];
assert.ok(axePath && fs.existsSync(axePath), 'Pass axe-core/axe.min.js as the second argument.');
for (const route of ['index.html', 'config/index.html']) {
  const html = fs.readFileSync(`website/build/${route}`, 'utf8');
  assert.equal((html.match(/data-copy-page-button-trigger=/g) || []).length, 1,
    `Copy page must render once in the initial HTML: ${route}`);
}
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 900 }, colorScheme: 'dark', reducedMotion: 'reduce' });
const results = [];
const visit = route => page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
async function audit(state) {
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => (await window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
  })).violations.map(rule => ({ id: rule.id, targets: rule.nodes.map(node => node.target) })));
  results.push({ state, violations });
  assert.deepEqual(violations, [], state);
}
try {
  await visit('/');
  await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement.textContent), /Skip/);
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  assert.match(await page.evaluate(() => document.activeElement.textContent), /Get started/);
  const menu = page.getByRole('button', { name: 'Toggle navigation bar' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('dialog', { name: 'Navigation' }).waitFor();
  await audit('Mobile navigation open');
  await page.keyboard.press('Shift+Tab');
  assert.ok(await page.evaluate(() => document.activeElement.closest('[role="dialog"]')));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('.navbar__toggle').getAttribute('aria-expanded') === 'false');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Toggle navigation bar');
  await page.getByRole('button', { name: 'Copy page', exact: true }).focus();
  await page.keyboard.press('Enter');
  await audit('Copy menu open');
  await page.keyboard.press('Tab');
  assert.ok(await page.evaluate(() => document.activeElement.hasAttribute('data-copy-page-action')));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('[data-copy-page-button-trigger]').getAttribute('aria-expanded') === 'false');
  assert.ok(await page.evaluate(() => document.activeElement.hasAttribute('data-copy-page-button-trigger')));
  await page.setViewportSize({ width: 1280, height: 900 });
  await visit('/');
  await page.getByRole('textbox', { name: 'Search' }).fill('middleware');
  await page.locator('[role="option"]').first().waitFor();
  await audit('Search suggestions');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForURL(url => url.pathname === '/middleware/');
  await visit('/');
  await page.getByRole('textbox', { name: 'Search' }).fill('zzzznonexistentzzzz');
  await page.getByText('No results', { exact: true }).waitFor();
  await audit('Search with no results');
  for (const route of ['/', '/config/', '/api/classes/EndpointBuilder.html']) {
    await page.setViewportSize({ width: 320, height: 900 });
    await visit(route);
    await page.addStyleTag({ content: '* {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p {margin-bottom:2em!important}' });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Text spacing: ${route}`);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.addStyleTag({ content: 'html {font-size:200%!important}' });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `200% text: ${route}`);
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await visit('/config/');
  await page.locator('table').focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('table').scrollLeft > 0);
  fs.mkdirSync('output/accessibility', { recursive: true });
  fs.writeFileSync('output/accessibility/interaction-results.json', JSON.stringify(results, null, 2));
  console.log('Passed: skip link, mobile focus/escape, copy menu, search states/navigation, text spacing, 200% text, keyboard table scrolling.');
} finally {
  await browser.close();
}
