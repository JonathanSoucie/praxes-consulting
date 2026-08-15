"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Light/dark switch.
 *
 * Holds no React state on purpose. The palette lives in CSS — every token is
 * a `light-dark()` pair resolved against the root's `color-scheme` — so the
 * only job here is to flip one attribute and remember the choice. Which icon
 * shows is decided in CSS too (see [data-theme-icon] in globals.css), which
 * is what lets this render correctly on the server: React never has to guess
 * the visitor's OS preference, so there is nothing to mismatch on hydration.
 *
 * Until someone presses this, no `data-theme` is set and the site simply
 * follows the OS.
 */
/** Must outlast the 260ms transition in globals.css. */
const SHIFT_MS = 320;

export function ThemeToggle({ className }: { className?: string }) {
  const shiftTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (shiftTimer.current) clearTimeout(shiftTimer.current);
    },
    [],
  );

  const toggle = () => {
    const root = document.documentElement;
    // Read the live value rather than a cached one: the visitor may have
    // changed their OS theme since the page loaded.
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";

    // Arm the cross-fade before the repaint that changes the palette, and
    // disarm it once the fade is done — a permanent colour transition on `*`
    // would smear every hover on the page.
    root.dataset.themeShifting = "";
    if (shiftTimer.current) clearTimeout(shiftTimer.current);
    shiftTimer.current = setTimeout(() => {
      delete root.dataset.themeShifting;
      shiftTimer.current = null;
    }, SHIFT_MS);

    root.dataset.theme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Safari in private mode throws on write. The theme still applies for
      // this page view; it just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // A state-independent label. The button's effect is the same in both
      // directions, and this way the accessible name is correct on the server
      // too, where the current theme is unknowable.
      aria-label="Toggle light or dark theme"
      title="Toggle light or dark theme"
      className={cn(
        // The press state is not decoration: on touch there is no hover at
        // all, so without `active:` this button gives no acknowledgement
        // whatsoever between the tap and the palette changing.
        "inline-flex size-10 items-center justify-center rounded-full text-muted transition-[background-color,color,transform] duration-150 ease-out-soft hover:bg-accent-soft hover:text-accent-ink active:scale-90 active:bg-accent-soft active:text-accent-ink",
        className,
      )}
    >
      {/* Each icon shows the theme you'd be switching *to*, not the one you
          are in — so the moon appears while the site is light. */}
      <Moon aria-hidden data-theme-icon="light" className="size-5" />
      <Sun aria-hidden data-theme-icon="dark" className="size-5" />
    </button>
  );
}
