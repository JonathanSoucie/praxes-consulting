"use client";

import * as React from "react";

import {
  LOGO_ARMS,
  LOGO_CORE,
  LOGO_STOPS,
  LOGO_TRANSFORM,
  LOGO_VIEWBOX,
} from "@/lib/logo-svg";

/**
 * Brand mark: the spiral galaxy, in the delivered pink→crimson gradient.
 *
 * Inline SVG rather than an <img> of the file in public/, for two reasons.
 * The delivered artwork has its background tile baked in, which would paint a
 * black square onto every surface it sits on; and inline geometry stays crisp
 * at any size and can be sized by CSS. The file itself is untouched — the
 * geometry it shares with the generated icons lives in lib/logo-svg.ts.
 *
 * The gradient id is namespaced per instance. Every page renders this at least
 * twice (navbar + footer), and a `url(#id)` paint reference resolves to the
 * first matching element in the document — so with shared ids, every mark on
 * the page paints from the navbar's gradient. If that first copy ever sits in
 * a `display: none` subtree, all of them silently render invisible.
 */
export function LogoMark({
  size = 28,
  variant = "onDark",
  className,
}: {
  size?: number;
  /** Brighter stops for dark grounds, deeper for light. */
  variant?: keyof typeof LOGO_STOPS;
  className?: string;
}) {
  const uid = React.useId();
  const gradient = `logo-galaxy-${uid}`;
  const [from, mid, to] = LOGO_STOPS[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox={LOGO_VIEWBOX}
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        {/* Left in objectBoundingBox units and set on the group below, which
            is how the artwork is authored: each arm resolves the ramp against
            its own box, so the three run the gradient individually rather
            than sharing one across the whole mark. */}
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="48%" stopColor={mid} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      <g transform={LOGO_TRANSFORM}>
        <g fill={`url(#${gradient})`}>
          {LOGO_ARMS.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </g>
        <ellipse
          cx={LOGO_CORE.cx}
          cy={LOGO_CORE.cy}
          rx={LOGO_CORE.rx}
          ry={LOGO_CORE.ry}
          transform={`rotate(${LOGO_CORE.rotate} ${LOGO_CORE.cx} ${LOGO_CORE.cy})`}
          fill={`url(#${gradient})`}
        />
      </g>
    </svg>
  );
}
