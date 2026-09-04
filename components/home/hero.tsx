import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { pull } from "@/content/positioning";

/**
 * The hero.
 *
 * On the deep ground, and the first of an unbroken dark run down to the end of
 * the problem section. `on-deep` rather than a hand-set background, because it
 * also remaps the ink tokens — so the headline, the muted booking note and the
 * outline button all invert without any of them being told they moved.
 *
 * Copy on the left, support on the right, the object full-bleed underneath and
 * cropped by the fold. The crop is the point: we see the top of it and it
 * carries on past the bottom of the section, which is what makes it read as
 * large rather than as an illustration sitting in a box.
 *
 * WHAT IS STATIC AND WHY
 *
 * Everything here is server-rendered DOM and CSS. The seven labels, the arcs
 * they sit on and the bloom at the centre all exist with JavaScript off, and
 * the canvas that lands on top of this is decoration over a hero that is
 * already finished. That ordering is the same argument `.reveal` makes in
 * globals.css: nothing a reader needs should exist only if a script succeeded.
 *
 * The labels are HTML rather than SVG <text> for one specific reason — SVG
 * text sizes in user units, so it would scale with the viewBox and stop being
 * a 11px tracked label the moment the box changed width. HTML positioned by
 * calc() against a shared radius keeps the type at a fixed size while the
 * geometry scales.
 *
 * The emphasis colours follow the brand rule: main pink carries the emphasised
 * fragment of the H1 at display size, where it measures 4.3:1 on #181818. In
 * the supporting paragraph, which is body size, the same emphasis resolves to
 * --color-pink-ink — 7.0:1 here, because `on-deep` has already remapped it.
 */

/**
 * Where the horizon sits inside the object box — measured up from the bottom
 * edge, not as a fraction of the box.
 *
 * A percentage puts the object in the middle of whatever the box happens to
 * be, so on a tall viewport it floats with clear space under it and stops
 * reading as cropped. Anchoring it a third of a radius above the bottom means
 * the section's edge always cuts the same third off the object, at every
 * viewport height. The crop is what makes it read as large rather than as an
 * illustration sitting in a box.
 */
const HOLE_Y = "calc(100% - 0.34 * var(--r))";
/** Label radius, in multiples of the horizon radius `--r`. */
const LABEL_R = 1.62;
/** The arcs are drawn in a square viewBox where 100 units = one `--r`. */
const U = 100;

/** Angles across the top, left to right. 0° is east, 90° is straight up. */
const ANGLES = [172, 144.7, 117.3, 90, 62.7, 35.3, 8];

/**
 * A short logarithmic-spiral segment falling inward from under a label.
 *
 * A straight radial tick would read as a diagram callout. A spiral reads as
 * something being drawn in, and it is the same geometry as the arms in the
 * brand mark (lib/logo-svg.ts) — the mark is a spiral galaxy, and the object
 * in the hero should look like the same family of thing.
 */
function spiral(deg: number) {
  const from = LABEL_R * U - 14;
  const to = U * 1.18;
  const sweep = 16;
  const steps = 18;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = from + (to - from) * t;
    const a = ((deg + sweep * t) * Math.PI) / 180;
    d += `${i === 0 ? "M" : "L"}${(r * Math.cos(a)).toFixed(2)} ${(-r * Math.sin(a)).toFixed(2)} `;
  }
  return d.trim();
}

export function Hero() {
  return (
    <section
      data-hero="deep"
      className="on-deep relative overflow-hidden pt-32 sm:pt-36 lg:pt-40"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-2.5 text-muted">
              <LogoMark size={15} />
              The work nobody designed
            </p>

            <h1 className="display-hero-xl mt-8 max-w-[13ch]">
              There&rsquo;s a <span className="text-pink-em">black hole</span> in
              your business.
            </h1>
          </div>

          <div className="lg:pb-4">
            <p className="max-w-md text-lg leading-[1.5] text-ink-soft">
              It eats <strong className="font-normal">hours</strong> every week.
              We find it, name it, and close it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <BookACall size="lg" withArrow />
              <Link
                href="/services/automations-audit"
                className="group inline-flex items-center gap-2 border-b border-line-strong pb-1 font-ui text-[0.9375rem] text-ink transition-colors hover:border-pink-ink hover:text-pink-ink"
              >
                How the audit works
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <BookingNote className="mt-5" />
          </div>
        </div>
      </Container>

      {/* The object.
      
          Height is a multiple of the radius rather than a slice of the
          viewport. A vh box leaves the labels floating in dead space at the
          top of it on a tall screen, because the horizon is pinned to the
          bottom edge and the ring is sized off `--r` — the two ends of the
          box stop being related to each other. 2.15r is the ring plus the
          third of the object that hangs below the fold, and nothing else.
      
          The radius takes the smaller of a width and a height fraction, so a
          short laptop gets a smaller object instead of one that pushes the
          horizon off the bottom of the screen entirely.
      
          Either way the height is explicit before anything paints, so nothing
          here can shift the copy above it. */}
      <div
        className="relative mt-12 h-[calc(2.15*var(--r))] lg:mt-16"
        style={
          {
            "--r": "clamp(4.5rem, min(22vw, 30vh), 20rem)",
            "--hole-y": HOLE_Y,
          } as React.CSSProperties
        }
      >
        {/* Bloom, and the horizon inside it. One gradient does both: the hard
            stop at the centre is the absence, the wash around it is the light
            falling in. Hard stops do not band — long low-alpha ramps do, which
            is the mistake the film placeholder made before it was removed. */}
        <div
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: "50%",
            top: "var(--hole-y)",
            width: "calc(7 * var(--r))",
            height: "calc(7 * var(--r))",
            background:
              "radial-gradient(circle, #000 0%, #000 13.4%, rgba(248,32,109,0.55) 14.2%, rgba(181,17,91,0.20) 20%, rgba(181,17,91,0.10) 32%, rgba(181,17,91,0.04) 46%, transparent 66%)",
          }}
        />

        {/* The arcs. Square viewBox on a square box, so the dash pattern never
            stretches — 100 user units is one `--r`, the same unit the labels
            are positioned in. */}
        <svg
          aria-hidden
          viewBox="-200 -200 400 400"
          className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible"
          style={{
            left: "50%",
            top: "var(--hole-y)",
            width: "calc(4 * var(--r))",
            height: "calc(4 * var(--r))",
          }}
        >
          {ANGLES.map((deg) => (
            <path
              key={deg}
              d={spiral(deg)}
              fill="none"
              stroke="var(--color-line-strong)"
              strokeOpacity="0.55"
              strokeWidth="1.1"
              strokeDasharray="4 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Real text, positioned by calc against the same radius. */}
        <ul>
          {pull.map((label, i) => {
            const a = (ANGLES[i] * Math.PI) / 180;
            return (
              <li
                key={label}
                className="arc-label absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${(Math.cos(a) * LABEL_R).toFixed(4)} * var(--r))`,
                  top: `calc(var(--hole-y) - ${(Math.sin(a) * LABEL_R).toFixed(4)} * var(--r))`,
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
