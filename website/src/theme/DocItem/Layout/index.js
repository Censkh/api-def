import React, { useEffect } from "react";
import IconArrowDown from "@theme/Icon/ArrowDown";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import DocItemLayout from "@theme-original/DocItem/Layout";

export default function DocItemLayoutWrapper(props) {
  const { metadata } = useDoc();
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      const trigger = document.querySelector('[data-copy-page-button-trigger][aria-expanded="true"]');
      if (trigger) {
        event.preventDefault();
        trigger.click();
        trigger.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <>
      {metadata.id === "usage" && (
        <header className="landing-hero" aria-labelledby="hero-title">
          <div className="landing-intro">
            <h1 id="hero-title">Typed APIs.<br /><span>Clearly defined.</span></h1>
            <p className="landing-description">Define endpoints with confidence. Type your queries, bodies, responses and URL parameters, with middleware support.</p>
            <div className="landing-actions">
              <a className="button button--primary" href="#getting-started">Get started <IconArrowDown /></a>
              <a className="button button--secondary" href="/api/index.html">API reference</a>
            </div>
          </div>
          <div className="landing-mark" aria-hidden="true">
            <img src="/img/interlock.svg" alt="" width="240" height="240" />
          </div>
        </header>
      )}
      <DocItemLayout {...props} />
    </>
  );
}
