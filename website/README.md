# api-def documentation

The documentation site is built with Docusaurus. Its content lives in the repository root at `docs/` so the same MDX is easy to review alongside the library source.

## Commands

From the repository root:

- `npm run docs:dev` generates the API reference and starts the local site.
- `npm run docs:build` validates examples, generates the API reference, and builds the production site.

The build also publishes `llms.txt`, `llms-full.txt`, and clean Markdown pages under `markdown/` for AI agents and other automated documentation consumers.

The production output is `website/build/`. CI deploys that directory to Cloudflare Workers for `api-def.com`.

After building, run `node scripts/checkSeo.mjs` from the repository root to check page metadata, canonical URLs, sitemaps, crawler rules and the README social image.

## Accessibility checks

Build the site, then serve the complete output without rewriting TypeDoc `.html` URLs:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory website/build
```

In another terminal, from the repository root:

```sh
npm install --prefix /tmp/api-def-a11y --no-save --ignore-scripts axe-core
node scripts/checkAccessibility.mjs http://127.0.0.1:4173 /tmp/api-def-a11y/node_modules/axe-core/axe.min.js
node scripts/checkAccessibilityInteractions.mjs http://127.0.0.1:4173 /tmp/api-def-a11y/node_modules/axe-core/axe.min.js
```

Results are written to `output/accessibility/`. The checks cover WCAG 2.2 A/AA automated rules, keyboard interactions, text resizing and page overflow. Review axe's incomplete findings and perform screen-reader testing before claiming full conformance.

Run `node scripts/checkFontSizes.mjs` against the same local server to verify the 14px minimum across documentation routes, desktop/mobile widths, and copy/search menus.

## Shared branding

The docs and API reference load `static/fonts/fonts.css` (JetBrains Sans body, JetBrains Mono headings/code). The OG SVG embeds its font files so rendering does not depend on installed fonts. After editing it, run `node scripts/renderSocialCard.mjs` from the root to update the PNG used by metadata and the README, then rebuild.
