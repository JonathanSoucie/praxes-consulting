"use client";

import * as React from "react";

/**
 * Brand mark: two crossing rings, periwinkle→violet and violet→indigo.
 * Recreated as inline SVG (not a raster import) so it stays crisp at any
 * size and the gradient always renders correctly regardless of surrounding
 * theme.
 *
 * Gradient ids are namespaced per instance. Every page renders this at least
 * twice (navbar + footer), and a `url(#id)` paint reference resolves to the
 * first matching element in the document — so with shared ids, every mark on
 * the page paints from the navbar's gradient. If that first copy ever sits in
 * a `display: none` subtree, all of them silently render invisible.
 */
export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const uid = React.useId();
  const ringA = `logo-ring-a-${uid}`;
  const ringB = `logo-ring-b-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        {/* userSpaceOnUse: the coordinates below are viewBox units. Without
            it they are read as bounding-box ratios (x1="50" meaning 5000%),
            which puts the whole ramp off the shape and paints each ring a
            flat first-stop colour. */}
        <linearGradient
          id={ringA}
          gradientUnits="userSpaceOnUse"
          x1="50"
          y1="8"
          x2="50"
          y2="92"
        >
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient
          id={ringB}
          gradientUnits="userSpaceOnUse"
          x1="4"
          y1="58"
          x2="96"
          y2="58"
        >
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#243B63" />
        </linearGradient>
      </defs>

      <ellipse
        cx="50"
        cy="50"
        rx="26"
        ry="42"
        transform="rotate(18 50 50)"
        stroke={`url(#${ringA})`}
        strokeWidth="11"
      />
      <ellipse
        cx="50"
        cy="58"
        rx="46"
        ry="18"
        transform="rotate(-14 50 58)"
        stroke={`url(#${ringB})`}
        strokeWidth="11"
      />
    </svg>
  );
}
