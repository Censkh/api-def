# api-def documentation

The documentation site is built with Docusaurus. Its content lives in the repository root at `docs/` so the same MDX is easy to review alongside the library source.

## Commands

From the repository root:

- `npm run docs:dev` generates the API reference and starts the local site.
- `npm run docs:build` validates examples, generates the API reference, and builds the production site.

The build also publishes `llms.txt`, `llms-full.txt`, and clean Markdown pages under `markdown/` for AI agents and other automated documentation consumers.

The production output is `website/build/`. CI deploys that directory to Cloudflare Workers for `api-def.com`.
