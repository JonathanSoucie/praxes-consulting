"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll reveal.
 *
 * One IntersectionObserver, one data attribute, and the transition itself
 * lives in the `reveal` utility in globals.css. No animation library: this is
 * an opacity and a translate, and the observer below is the entire mechanism.
 *
 * It unobserves on first intersection, so an element never animates twice —
 * content re-fading every time it scrolls back into view reads as a glitch
 * rather than as polish.
 *
 * `delay` staggers items in a grid. Keep it under ~250ms total across a row;
 * beyond that the last card arrives after the reader has already looked at it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "header";
}) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything at or above the fold on mount is shown immediately, without
    // going through the observer at all. This covers two cases that both end
    // in permanently invisible content:
    //
    //   - above-the-fold content, which would otherwise sit at opacity 0
    //     waiting for a scroll that may never come;
    //   - a hash landing (/#how-it-works, or a back-navigation restoring
    //     scroll), where everything above the landing point is off the top of
    //     the viewport, never intersects, and stays hidden even as the reader
    //     scrolls up into it.
    //
    // The second case is why the test is `top < innerHeight` rather than a
    // visibility check: an element the reader has already passed should be
    // shown, not animated in.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.dataset.shown = "true";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "true";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
