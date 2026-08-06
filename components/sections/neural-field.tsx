"use client";

import * as React from "react";

/**
 * The hero/header background: a faint network of nodes and connecting lines,
 * with a handful of pulses travelling the edges like signals firing.
 *
 * Layout is a fixed, hand-generated scatter (see the generator note below) —
 * not computed at runtime — so the static network is identical on server and
 * client and never causes a hydration mismatch. Only the animated pulses are
 * client-only, added after mount so a reduced-motion visitor never receives
 * them at all (checked once, matching the pattern in components/reveal.tsx).
 *
 * A radial mask keeps the network faint behind whatever text sits on top of
 * it and lets it show more toward the edges — visible, not distracting.
 */

// Generated once by a throwaway script (jittered grid + nearest-neighbour
// edges, seeded for repeatability) and pasted in as static data. [x, y, r].
const NODES: [number, number, number][] = [
  [82, 39, 2.2], [250, 52, 2.2], [325, 44, 3.4], [477, 49, 2.2],
  [679, 40, 2.2], [761, 64, 2.2], [953, 31, 2.2], [41, 126, 3.4],
  [233, 133, 2.2], [308, 124, 2.2], [534, 100, 3.4], [652, 98, 3.4],
  [762, 100, 2.2], [897, 143, 2.2], [74, 182, 2.2], [182, 230, 2.2],
  [356, 228, 2.2], [482, 207, 3.4], [597, 184, 3.4], [791, 216, 2.2],
  [903, 219, 2.2], [42, 282, 2.2], [238, 315, 3.4], [358, 277, 3.4],
  [478, 282, 2.2], [600, 303, 2.2],
];

// Quadratic edges: [x1, y1, cx, cy, x2, y2].
const EDGES: [number, number, number, number, number, number][] = [
  [82, 39, 64, 83, 41, 126], [82, 39, 74, 110, 74, 182],
  [250, 52, 287, 44, 325, 44], [250, 52, 239, 92, 233, 133],
  [325, 44, 321, 85, 308, 124], [477, 49, 501, 79, 534, 100],
  [477, 49, 401, 57, 325, 44], [477, 49, 482, 128, 482, 207],
  [679, 40, 659, 66, 652, 98], [679, 40, 718, 58, 761, 64],
  [761, 64, 755, 82, 762, 100], [953, 31, 910, 79, 897, 143],
  [953, 31, 932, 126, 903, 219], [41, 126, 57, 155, 74, 182],
  [41, 126, 53, 204, 42, 282], [233, 133, 269, 118, 308, 124],
  [233, 133, 201, 178, 182, 230], [308, 124, 274, 92, 250, 52],
  [534, 100, 557, 148, 597, 184], [534, 100, 593, 116, 652, 98],
  [652, 98, 637, 149, 597, 184], [762, 100, 720, 71, 679, 40],
  [897, 143, 891, 182, 903, 219], [74, 182, 71, 236, 42, 282],
  [74, 182, 120, 224, 182, 230], [182, 230, 220, 266, 238, 315],
  [356, 228, 353, 253, 358, 277], [356, 228, 339, 173, 308, 124],
  [482, 207, 487, 245, 478, 282], [482, 207, 539, 192, 597, 184],
  [482, 207, 495, 147, 534, 100], [791, 216, 847, 224, 903, 219],
  [791, 216, 770, 160, 762, 100], [791, 216, 837, 169, 897, 143],
  [42, 282, 114, 262, 182, 230], [238, 315, 303, 312, 358, 277],
  [238, 315, 292, 264, 356, 228], [358, 277, 417, 292, 478, 282],
  [600, 303, 594, 244, 597, 184], [600, 303, 536, 308, 478, 282],
];

/** Edge indices that carry a pulse, each with its own duration and delay. */
const PULSES: { edge: number; dur: number; delay: number }[] = [
  { edge: 1, dur: 4.2, delay: 0 },
  { edge: 5, dur: 5, delay: 0.8 },
  { edge: 11, dur: 4.6, delay: 2.1 },
  { edge: 18, dur: 5.4, delay: 1.2 },
  { edge: 23, dur: 4.8, delay: 3 },
  { edge: 29, dur: 5.2, delay: 0.4 },
  { edge: 33, dur: 4.4, delay: 2.6 },
  { edge: 37, dur: 5, delay: 1.7 },
];

export function NeuralField({
  className,
  tone = "light",
}: {
  className?: string;
  /** "light" for white/near-white sections, "dark" for the pink CTA bands. */
  tone?: "light" | "dark";
}) {
  const [motionAllowed, setMotionAllowed] = React.useState(false);
  // Most pages render this twice (a header + the closing CTA band). Edge ids
  // must stay unique per instance, or every <mpath> on the page resolves to
  // whichever <path id="neuron-edge-0"> happens to come first in the DOM.
  const uid = React.useId();

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionAllowed(!query.matches);
  }, []);

  const lineColor = tone === "dark" ? "#ffffff" : "var(--color-accent)";

  return (
    <div
      aria-hidden
      className={className}
      style={{
        maskImage:
          "radial-gradient(ellipse 65% 60% at 50% 42%, transparent 0%, transparent 30%, black 90%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 65% 60% at 50% 42%, transparent 0%, transparent 30%, black 90%)",
      }}
    >
      <svg
        viewBox="0 0 1000 420"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g
          stroke={lineColor}
          strokeOpacity={tone === "dark" ? "0.16" : "0.16"}
          fill="none"
        >
          {EDGES.map(([x1, y1, cx, cy, x2, y2], i) => (
            <path
              key={i}
              id={`neuron-edge-${uid}-${i}`}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              strokeWidth="1.2"
            />
          ))}
        </g>

        <g fill={lineColor} fillOpacity={tone === "dark" ? "0.3" : "0.28"}>
          {NODES.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>

        {motionAllowed
          ? PULSES.map(({ edge, dur, delay }, i) => (
              <circle key={i} r="2.4" fill="var(--color-accent-bright)">
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#neuron-edge-${uid}-${edge}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.9;0"
                  keyTimes="0;0.5;1"
                  dur={`${dur}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))
          : null}
      </svg>
    </div>
  );
}
