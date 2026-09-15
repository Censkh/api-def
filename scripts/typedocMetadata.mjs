import { JSX } from "typedoc";

export function load(app) {
  app.renderer.hooks.on("head.end", (context) => {
    const title = context.page.model.isProject()
      ? "api-def API Reference"
      : `${context.page.model.name} | api-def API Reference`;
    const url = new URL(context.page.url === "index.html" ? "" : context.page.url, "https://api-def.com/api/").href;
    const metadata = {
      "og:title": title,
      "og:description": `TypeScript API reference for ${context.page.model.name}: types, methods and options in api-def.`,
      "og:type": "website",
      "og:site_name": "api-def",
      "og:locale": "en_GB",
      "og:url": url,
      "og:image": "https://api-def.com/img/api-def-social-card.png",
      "og:image:type": "image/png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": "api-def — Typed APIs. Clearly defined. Orange Interlock logo on a charcoal background.",
      "twitter:card": "summary_large_image",
    };
    metadata["twitter:image"] = metadata["og:image"];
    metadata["twitter:image:alt"] = metadata["og:image:alt"];
    return JSX.createElement(JSX.Fragment, null,
      context.page.url !== "index.html" && JSX.createElement("link", { rel: "canonical", href: url }),
      ...Object.entries(metadata).map(([key, content]) => JSX.createElement("meta", {
        [key.startsWith("og:") ? "property" : "name"]: key, content,
      })),
    );
  });
}
