const path = require("node:path");
const baseUrl = "/api-def/";
const apiReferenceUrl = "https://censkh.github.io/api-def/api/";

const config = {
  title: "api-def",
  tagline: "Typed API definitions with middleware support",
  favicon: "img/favicon.svg",
  url: "https://censkh.github.io",
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
        enabledActions: ["copy", "view"],
        generateMarkdownRoutes: true,
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        indexDocs: true,
        highlightSearchTermsOnTargetPage: true,
        language: ["en"],
      },
    ],
  ],

  themeConfig: {
    image: "img/api-def-social-card.svg",
    navbar: {
      title: "api-def",
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
      copyright: `Copyright © ${new Date().getFullYear()} api-def contributors.`,
    },
  },
};

module.exports = config;
