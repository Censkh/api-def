import fs from "node:fs";
import path from "node:path";

const repositoryRoot = process.cwd();
const docsDirectory = path.join(repositoryRoot, "docs");
const agentDocsDirectory = path.join(repositoryRoot, "website", "static", "markdown");
const llmsIndexPath = path.join(repositoryRoot, "website", "static", "llms.txt");
const llmsFullPath = path.join(repositoryRoot, "website", "static", "llms-full.txt");
const siteUrl = "https://api-def.com/";
const repositoryUrl = "https://github.com/Censkh/api-def/blob/master/docs/";

const descriptions = {
  usage: "Install api-def and define typed endpoints with params, query, body, and response types.",
  config: "Configure defaults, headers, retries, caching, credentials, locks, and acceptable statuses.",
  middleware: "Add API- and endpoint-level middleware, event handlers, and request mutation.",
  caching: "Use client-side local caching or browser and Axios cache controls.",
  "query-handling": "Pass query objects or strings and configure custom query parsing and stringification.",
  validation: "Validate query, body, response, and middleware state with Zod schemas.",
  "errors-and-retries": "Handle RequestError values, retry failed requests, and define acceptable statuses.",
  "advanced-requests": "Use response types, WebSockets, typed headers, URL resolution, locks, and hot requests.",
  mocking: "Create endpoint mocks for disconnected development and tests.",
  node: "Configure Fetch and Axios backends for Node.js, browsers, and other runtimes.",
  "api-reference": "Browse the generated TypeScript API reference.",
};

const orderedIds = fs
  .readFileSync(path.join(docsDirectory, "_order.txt"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const allDocIds = fs
  .readdirSync(docsDirectory)
  .filter((fileName) => fileName.endsWith(".mdx"))
  .map((fileName) => fileName.slice(0, -4));

const docIds = [...new Set([...orderedIds, ...allDocIds])];

const cleanMarkdown = (content) => {
  const withoutFrontmatter = content.replace(/^---\s*[\s\S]*?---\s*/, "");
  const withoutJsxLinks = withoutFrontmatter.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)");
  return withoutJsxLinks.trim();
};

const getHumanUrl = (docId) => (docId === "usage" ? siteUrl : `${siteUrl}${docId}/`);
const getMarkdownUrl = (docId) => `${siteUrl}markdown/${docId}.md`;

fs.rmSync(agentDocsDirectory, { recursive: true, force: true });
fs.mkdirSync(agentDocsDirectory, { recursive: true });

const documents = docIds.map((docId) => {
  const sourcePath = path.join(docsDirectory, `${docId}.mdx`);
  const markdown = cleanMarkdown(fs.readFileSync(sourcePath, "utf8"));
  const outputPath = path.join(agentDocsDirectory, `${docId}.md`);
  fs.writeFileSync(outputPath, `${markdown}\n`);
  return { docId, markdown };
});

const indexSections = documents
  .map(({ docId }) => {
    const description = descriptions[docId] ?? "api-def documentation.";
    return `- [${docId}](${getHumanUrl(docId)}): ${description}\n  - [Markdown](${getMarkdownUrl(docId)})\n  - [Source](${repositoryUrl}${docId}.mdx)`;
  })
  .join("\n");

const llmsIndex = `# api-def

> Typed API definitions for TypeScript applications, with middleware, validation, retries, caching, mocking, and multiple request backends.

The current documentation targets api-def 0.15.x, Node.js 22+, ES2020 browser builds, and ESM/CommonJS consumers.

## Documentation

${indexSections}

## Machine-readable resources

- [Full documentation](${siteUrl}llms-full.txt): All current guides in one Markdown document.
- [Generated API reference](${siteUrl}api/): Public TypeScript API reference.
- [Repository](${repositoryUrl.replace("/blob/master/docs/", "")}): Source, tests, changelog, and issue tracker.
`;

const fullDocumentation = `# api-def Documentation

This document combines the current api-def documentation pages. Prefer the individual Markdown links in llms.txt when retrieving a focused topic.

${documents
  .map(({ docId, markdown }) => `\n---\n\n<!-- Source: ${getMarkdownUrl(docId)} -->\n\n${markdown}`)
  .join("\n")}
`;

fs.writeFileSync(llmsIndexPath, llmsIndex);
fs.writeFileSync(llmsFullPath, fullDocumentation);

console.log(`Generated ${documents.length} Markdown documents plus llms.txt and llms-full.txt`);
