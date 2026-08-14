"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The hero's slow background drift: two linked rings that rotate, swell and
 * rise as the hero scrolls past.
 *
 * The rings stay put via `position: sticky` while the copy above them scrolls
 * normally. That is the opposite of a pinned hero — nothing holds the reader
 * in place or delays the content below, but the background still reads as one
 * continuous field behind all three beats rather than three separate panels.
 *
 * Progress is published as a CSS variable and everything else is done in CSS,
 * so the scroll handler never touches layout: it writes one custom property
 * per frame and the compositor does the rest.
 */
export function OrbitField({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;

    // A background that swells and turns under the copy is exactly the
    // full-field motion reduced-motion asks you to drop. Leave it at rest.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress =
        span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      el.style.setProperty("--hero-progress", progress.toFixed(4));
    };

    // Coalesce to one write per frame: scroll fires far more often than the
    // display refreshes, and the extra writes are invisible work.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ "--hero-progress": 0 } as React.CSSProperties}
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <svg
          viewBox="0 0 600 600"
          // `meet`, not `slice`. Slicing a 600-square into a landscape
          // viewport blows the shapes up so far that only fragments of each
          // curve remain on screen, and a fragment of a ring does not read as
          // a ring — it reads as a stray line across the copy.
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
          style={{
            // Rotation and scale are small on purpose. The motion should be
            // noticed only if you look for it — it is a background, and the
            // headline has to stay the loudest thing on the screen.
            transform:
              "rotate(calc(var(--hero-progress) * 16deg)) scale(calc(1 + var(--hero-progress) * 0.16)) translateY(calc(var(--hero-progress) * -5vh))",
            opacity: "calc(0.5 + var(--hero-progress) * 0.3)",
            transformOrigin: "58% 42%",
            willChange: "transform",
          }}
        >
          <defs>
            <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-bright)" />
              <stop offset="55%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-accent-bright)" />
            </linearGradient>
          </defs>

          {/* Two rounded squares, overlapping on the diagonal, so the pair
              reads as linked without either one dominating. Drawn as outlines
              rather than filled shapes: a fill at this size would compete
              with the copy no matter how low the opacity went. */}
          <g
            fill="none"
            stroke="url(#orbit-stroke)"
            strokeOpacity="0.18"
            strokeWidth="1.1"
          >
            <rect
              x="96"
              y="104"
              width="286"
              height="286"
              rx="104"
              transform="rotate(-21 239 247)"
            />
            <rect
              x="222"
              y="196"
              width="286"
              height="286"
              rx="104"
              transform="rotate(14 365 339)"
            />
            <rect
              x="160"
              y="150"
              width="286"
              height="286"
              rx="104"
              strokeOpacity="0.08"
              transform="rotate(-4 303 293)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
