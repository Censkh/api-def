const path = require("node:path");
const baseUrl = "/";
const apiReferenceUrl = "https://api-def.com/api/";
const codeTheme = {
  plain: { color: "rgba(255, 255, 255, 0.97)", backgroundColor: "#222429" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "rgba(255, 255, 255, 0.97)" } },
    { types: ["punctuation", "operator"], style: { color: "rgba(255, 255, 255, 0.97)" } },
    { types: ["keyword", "tag", "selector"], style: { color: "#c4b5fd", fontStyle: "normal" } },
    { types: ["string", "char", "attr-value", "regex"], style: { color: "#b6d6b0" } },
    { types: ["function", "class-name", "builtin"], style: { color: "#70b7ff" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#ffb183" } },
    { types: ["property", "attr-name", "variable"], style: { color: "rgba(255, 255, 255, 0.97)" } },
    { types: ["inserted"], style: { color: "#b6d6b0" } },
    { types: ["deleted"], style: { color: "#ffa5a5" } },
  ],
};

const config = {
  title: "api-def",
  tagline: "Typed API definitions with middleware support",
  favicon: "img/favicon.svg",
  url: "https://api-def.com",
  baseUrl,
  organizationName: "Censkh",
  projectName: "api-def",
  onBrokenLinks: "throw",
  trailingSlash: true,

  presets: [
    [
      "classic",
      {
        docs: {
          path: path.resolve(__dirname, "../docs"),
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: "https://github.com/Censkh/api-def/edit/master/docs/",
        },
        blog: false,
        pages: false,
        sitemap: { ignorePatterns: ["/search/**"] },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        injectButton: false,
        enabledActions: ["copy", "view"],
        generateMarkdownRoutes: true,
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexDocs: true,
        docsDir: "../docs",
        docsRouteBasePath: "/",
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        language: ["en"],
      },
    ],
  ],

  themeConfig: {
    image: "img/api-def-social-card.png",
    metadata: [
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "api-def" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "api-def — Typed APIs. Clearly defined. Orange Interlock logo on a charcoal background." },
      { name: "twitter:image:alt", content: "api-def — Typed APIs. Clearly defined. Orange Interlock logo on a charcoal background." },
      { name: "theme-color", content: "#191a1d" },
    ],
    colorMode: { defaultMode: "dark", disableSwitch: true, respectPrefersColorScheme: false },
    navbar: {
      title: "api-def",
      logo: { alt: "", src: "img/interlock.svg", width: 36, height: 36 },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Documentation",
        },
        {
          href: apiReferenceUrl,
          label: "API Reference",
          position: "left",
        },
        {
          href: "https://github.com/Censkh/api-def",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: codeTheme,
      darkTheme: codeTheme,
      additionalLanguages: ["bash", "diff", "json"],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Resources",
          items: [
            { label: "Documentation", to: "/" },
            { label: "API Reference", href: apiReferenceUrl },
            { label: "GitHub", href: "https://github.com/Censkh/api-def" },
          ],
        },
      ],
      copyright: `<div class="developer-credit"><div>Developed by James Waterhouse of <a href="https://knownquantity.net/">Known Quantity</a><br/><span>Copyright © ${new Date().getFullYear()} api-def contributors.</span></div><a class="known-quantity" href="https://knownquantity.net/" aria-label="Known Quantity website"><img src="/img/known-quantity.svg" alt="Known Quantity" width="181" height="48" /></a></div>`,
    },
  },
};

module.exports = config;
