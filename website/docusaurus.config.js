module.exports = {
  title                : "ApiDef",
  tagline              : "The tagline of my site",
  url                  : "https://censkh.github.io/",
  baseUrl              : "/api-def/",
  onBrokenLinks        : "throw",
  onBrokenMarkdownLinks: "warn",
  favicon              : "img/favicon.ico",
  organizationName     : "Censkh", // Usually your GitHub org/user name.
  projectName          : "api-def", // Usually your repo name.
  themeConfig          : {
    navbar: {
      title: "ApiDef",
      /*logo : {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },*/
      items: [
        {
          to            : "/",
          activeBasePath: "/",
          label         : "Docs",
          position      : "left",
        },
        //{to: "blog", label: "Blog", position: "left"},
        {
          href    : "https://github.com/censkh/api-def",
          label   : "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style    : "dark",
      links    : [
        {
          title: "Docs",
          items: [
            {
              label: "Usage",
              to   : "/",
            },
          ],
        },
        /*{
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href : "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href : "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href : "https://twitter.com/docusaurus",
            },
          ],
        },*/
        {
          title: "More",
          items: [
            /*{
               label: "Blog",
               to   : "blog",
             },*/
            {
              label: "GitHub",
              href : "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      //copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  themes          : [
    "@docusaurus/theme-live-codeblock",
  ],
  plugins         : ["docusaurus-plugin-sass"],
  presets              : [
    [
      "@docusaurus/preset-classic",
      {
        pages: false,
        docs : {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/censkh/api-def/edit/master/website/",
        },
       /* blog : {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },*/
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
