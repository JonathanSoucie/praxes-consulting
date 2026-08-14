"use client";

import * as React from "react";

export type ResolvedTheme = "light" | "dark";

function read(): ResolvedTheme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * The theme actually in effect — the stored override if there is one, else the
 * OS preference.
 *
 * The site's own styling never needs this; CSS `light-dark()` handles it. It
 * exists for the third-party booking iframe, which paints itself and has to be
 * told which palette to use.
 *
 * Starts as "light" and corrects after mount. The server has no way to know
 * the real value, so anything else would be a hydration mismatch.
 */
export function useResolvedTheme(): ResolvedTheme {
  const [theme, setTheme] = React.useState<ResolvedTheme>("light");

  React.useEffect(() => {
    const sync = () => setTheme(read());
    sync();

    // Two independent sources: the toggle writes data-theme, and the OS can
    // change under a visitor who never pressed it.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  return theme;
}
