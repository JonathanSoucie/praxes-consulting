"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  FileText,
  Plug,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  CREST_BELOW_TOP,
  HALO,
  HOLE_BACKGROUND,
  R0_OF_LONG_SIDE,
} from "@/components/sections/hole-geometry";
import { painPoints, solutions, type Solution } from "@/content/manufacturing";
import { cn } from "@/lib/utils";

/**
 * The problem and the solutions, told as one camera move.
 *
 * The section is tall and its content is sticky, so scrolling through it
 * scrubs a single animation rather than moving the page. At the start the
 * black hole fills the viewport — we are close enough that only its top arc
 * shows, and the pain points sit inside it. Scrolling pulls the camera back:
 * the hole shrinks to a dome resting on the bottom edge, a dashed orbit
 * appears around it, and the solutions are arranged along that orbit.
 *
 * Nothing is re-rendered per frame. Scroll progress is read in a rAF, eased
 * toward (wheel scrolling arrives in steps; the camera should not), turned
 * into a scale and a centre, and written straight to styles through refs.
 * The stars on the canvas are positioned in the hole's own coordinate space
 * and scaled by the same factor, which is what sells the zoom — the hole does
 * not just get smaller, everything around it does too.
 *
 * Reduced motion: the scroll still scrubs (it is the user's own scrolling),
 * but the easing lag and the star drift are dropped.
 */

/** Hold at each end of the scrub, as fractions of the section's travel, so
    the reader has time with the problem before it moves and with the
    solutions once it has settled. */
const HOLD_IN = 0.14;
const HOLD_OUT = 0.2;
/** Per-frame easing toward the scroll target. Lower is smoother and lags
    more; 0.09 settles in roughly a third of a second at 60fps. */
const EASE = 0.09;

/** Orbit radius, as a multiple of the final hole radius. */
const ORBIT = 1.58;

/** Angles (degrees, counter-clockwise from +x) for the solution labels along
    the orbit. Evenly around the whole circle, the first at the top and the
    rest clockwise from it, so the ring reads as a cycle rather than as an
    arc with two ends. */
function labelAngles(n: number) {
  return Array.from({ length: n }, (_, i) => 90 - (360 * i) / n);
}

type Layout = {
  vw: number;
  vh: number;
  /** Final hole radius and centre y (px). */
  r1: number;
  cy1: number;
  /** Initial hole radius and centre y (px). */
  r0: number;
  cy0: number;
};

/** Where the orbit labels appear. Below this the labels are chips in the
    flow instead, so there is no ring to fit and no reason to shrink the
    hole for one — see the markup. Matches Tailwind's `md`. */
const MD = 768;
/** Vertical room the heading block above the circle needs. */
const HEAD = 250;
/** Room a label needs beyond the orbit it is centred on: half its height,
    plus enough that it is not touching the dashes. */
const LABEL_ROOM = 34;

function computeLayout(vw: number, vh: number): Layout {
  // Initial: so large only the crown shows, its crest a little below the top
  // of the viewport with the corners of the page still visible around it.
  // The hero above draws the same halo from these numbers (hole-geometry.ts),
  // which is what lets the two meet at the seam. Both are independent of r1,
  // so the final frame can be sized freely without moving the seam.
  const r0 = Math.max(vw, vh) * R0_OF_LONG_SIDE;
  const cy0 = r0 + vh * CREST_BELOW_TOP;

  // Final, small screens: a dome on the bottom edge, its centre just below
  // it. There is no orbit here, and the chips and the card need the height
  // more than a whole circle does.
  if (vw < MD) {
    const r1 = Math.min(300, Math.max(140, vw * 0.22));
    return { vw, vh, r1, cy1: vh - r1 * 0.12, r0, cy0 };
  }

  // Final, from md up: the whole circle in view, centred in what is left
  // under the heading, sized so the orbit and a label at the top and the
  // bottom of it all fit. Height is what binds on a laptop; width binds on a
  // tall narrow tablet, which is why both are measured.
  const cy1 = HEAD + (vh - HEAD) / 2;
  const fitsVertically = (vh - HEAD) / 2 - LABEL_ROOM - 16;
  const fitsHorizontally = vw / 2 - 150;
  const orbit = Math.max(120, Math.min(fitsVertically, fitsHorizontally));
  return { vw, vh, r1: orbit / ORBIT, cy1, r0, cy0 };
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
function smooth(v: number) {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
}

export function BlackHoleScene() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const holeRef = React.useRef<HTMLDivElement>(null);
  const orbitRef = React.useRef<SVGGElement>(null);
  const problemRef = React.useRef<HTMLDivElement>(null);
  const solutionsRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [layout, setLayout] = React.useState<Layout | null>(null);
  // The solution whose card is open, and where the card goes. `anchor` is
  // null on small screens, where the card sits statically under the chips.
  const [card, setCard] = React.useState<{
    solution: Solution;
    left: number;
    top: number;
  } | null>(null);
  const [chip, setChip] = React.useState<Solution>(solutions[0]);
  const closeTimer = React.useRef<number | null>(null);

  const stickyRef = React.useRef<HTMLDivElement>(null);

  /** Open the card for a label, placed beside it and kept on screen. */
  const openCard = React.useCallback((solution: Solution, el: HTMLElement) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    const host = stickyRef.current;
    if (!host) return;
    const h = host.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const label = { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height };
    // The other labels, so the card can be kept off them.
    const others = Array.from(
      host.querySelectorAll<HTMLElement>("[data-orbit-label]"),
    )
      .filter((n) => n !== el)
      .map((n) => {
        const o = n.getBoundingClientRect();
        return { x: o.left - h.left, y: o.top - h.top, w: o.width, h: o.height };
      });
    setCard({ solution, ...placeCard(label, others, h.width, h.height) });
  }, []);
  const scheduleClose = React.useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setCard(null), 160);
  }, []);
  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  /* Scroll scrub ------------------------------------------------------- */
  React.useEffect(() => {
    const section = sectionRef.current;
    const hole = holeRef.current;
    const orbit = orbitRef.current;
    const problem = problemRef.current;
    const sol = solutionsRef.current;
    const canvas = canvasRef.current;
    if (!section || !hole || !orbit || !problem || !sol || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let L = computeLayout(window.innerWidth, window.innerHeight);
    let dpr = 1;
    let raf = 0;
    let lastT = -1;
    // Eased progress. Starts wherever the page is so a reload mid-scene
    // does not play the whole move from the beginning.
    let eased = -1;

    // Stars, in units of the final hole radius around its centre. Spread
    // wide enough that the sky is still populated when fully zoomed out.
    const stars = Array.from({ length: 260 }, () => {
      const a = Math.random() * Math.PI * 2;
      const d = 1.25 + Math.pow(Math.random(), 0.7) * 6;
      return {
        x: Math.cos(a) * d,
        y: Math.sin(a) * d,
        m: 0.4 + Math.random() * 0.6, // brightness
        s: 0.6 + Math.random() * 1.1, // size
      };
    });

    const resize = () => {
      L = computeLayout(window.innerWidth, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = L.vw * dpr;
      canvas.height = L.vh * dpr;
      setLayout(L);
      lastT = -1;
    };

    const progress = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - L.vh;
      return travel > 0 ? clamp01(-rect.top / travel) : 0;
    };

    const paint = (t: number, time: number) => {
      // Camera: log-interpolate the radius so the zoom feels even.
      const s = Math.pow(L.r0 / L.r1, 1 - t); // scale relative to final
      const cy = L.cy0 + (L.cy1 - L.cy0) * t;
      const cx = L.vw / 2;

      // Sized per frame rather than transform-scaled: a scaled layer is
      // rasterised once and stretched, which turns the soft halo into
      // visible tiles. Re-laying out one element is cheap.
      const R = L.r1 * s * HALO;
      hole.style.width = `${R * 2}px`;
      hole.style.height = `${R * 2}px`;
      hole.style.left = `${cx - R}px`;
      hole.style.top = `${cy - R}px`;

      // Orbit ring and labels share the hole's camera.
      orbit.setAttribute(
        "transform",
        `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-L.cy1})`,
      );
      const solIn = smooth((t - 0.55) / 0.4);
      orbit.style.opacity = String(solIn);

      const probOut = smooth(t / 0.4);
      problem.style.opacity = String(1 - probOut);
      problem.style.transform = `translateY(${-probOut * 48}px) scale(${1 + probOut * 0.08})`;
      problem.style.pointerEvents = t < 0.3 ? "auto" : "none";
      sol.style.opacity = String(solIn);
      sol.style.transform = `translateY(${(1 - solIn) * 24}px)`;
      sol.style.pointerEvents = solIn > 0.5 ? "auto" : "none";

      // Stars.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, L.vw, L.vh);
      const drift = reduceMotion ? 0 : time * 0.00004;
      const fade = clamp01((6 - s) / 5); // most stars are off screen when close
      for (const st of stars) {
        const ang = drift * st.m;
        const cos = Math.cos(ang);
        const sin = Math.sin(ang);
        const x = cx + (st.x * cos - st.y * sin) * L.r1 * s;
        const y = cy + (st.x * sin + st.y * cos) * L.r1 * s;
        if (x < -4 || x > L.vw + 4 || y < -4 || y > L.vh + 4) continue;
        ctx.globalAlpha = st.m * 0.7 * fade;
        ctx.fillStyle = "#f5f3f4";
        ctx.beginPath();
        ctx.arc(x, y, st.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      const target = clamp01((progress() - HOLD_IN) / (1 - HOLD_IN - HOLD_OUT));
      if (eased < 0 || reduceMotion) eased = target;
      else {
        eased += (target - eased) * EASE;
        if (Math.abs(target - eased) < 0.0005) eased = target;
      }
      const t = smooth(eased);
      if (t !== lastT || !reduceMotion) {
        paint(t, time);
        lastT = t;
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* Label geometry (final frame only) ----------------------------------- */
  const labels = React.useMemo(() => {
    if (!layout) return [];
    const R = layout.r1 * ORBIT;
    return labelAngles(solutions.length).map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return {
        solution: solutions[i],
        x: layout.vw / 2 + Math.cos(a) * R,
        y: layout.cy1 - Math.sin(a) * R,
      };
    });
  }, [layout]);

  const orbitR = layout ? layout.r1 * ORBIT : 0;

  return (
    // Anchor for in-page links to the solutions. The scrub starts from the
    // top of the section either way, so landing here plays the whole move.
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-surface-2"
      style={{ height: "340svh" }}
      aria-label="The problem, and what we build for it"
    >
      <div ref={stickyRef} className="sticky top-0 h-svh overflow-hidden">
        {/* Sky */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* The hole. A near-black disc with a hot photon ring and a soft
            pink halo, all stops of one gradient, so it stays crisp at any
            size the scrub puts it through. */}
        <div
          ref={holeRef}
          aria-hidden
          className="absolute rounded-full"
          style={{ background: HOLE_BACKGROUND }}
        />

        {/* Orbit: the dashed line and its labels. Dashes are knocked out
            behind each label by the label's own page-coloured fill. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={layout ? `0 0 ${layout.vw} ${layout.vh}` : undefined}
          preserveAspectRatio="none"
        >
          <g ref={orbitRef} style={{ opacity: 0 }}>
            {layout ? (
              <circle
                cx={layout.vw / 2}
                cy={layout.cy1}
                r={orbitR}
                fill="none"
                stroke="rgba(245,243,244,0.7)"
                strokeWidth={1}
                strokeDasharray="6 7"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </g>
        </svg>

        {/* ---- The problem, inside the hole -------------------------- */}
        <div
          ref={problemRef}
          className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform]"
        >
          <Container className="pt-16">
            <div className="mx-auto max-w-4xl text-center">
              <Eyebrow tone="onDark">The problem</Eyebrow>
              <h2 className="mt-6 text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                The data exists.
                <br />
                Nothing connects it.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
                Your trusted data is already there — scattered across ERP
                screens, spreadsheets, PDFs, drawings, supplier files, emails
                and distributor portals. Sales, parts, procurement and export
                become the human bridge between systems that should already
                work together.
              </p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-5xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-12 lg:gap-y-8">
              {painPoints.map((p) => (
                <li
                  key={p.n}
                  className="border-t border-white/15 pt-4 text-left"
                >
                  <span className="label-tech text-accent">{p.n}</span>
                  <h3 className="mt-2 font-heading text-base font-semibold text-white sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-white/65 sm:block">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </div>

        {/* ---- The solutions, around the hole ------------------------- */}
        <div
          ref={solutionsRef}
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{ opacity: 0 }}
        >
          <Container className="pt-20 sm:pt-24">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <Eyebrow>Our solutions</Eyebrow>
                <h2 className="mt-5 text-3xl leading-[1.05] text-ink sm:text-4xl lg:text-5xl">
                  One connected
                  <br />
                  workflow
                </h2>
              </div>
              <div className="lg:pt-2">
                <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                  Each one reads from the systems you already run and writes
                  back to them, under your approval. Hover a label to see what
                  it does.
                </p>
              </div>
            </div>

            {/* Small screens: the orbit has no room for labels, so they
                become a row of chips with the card fixed beneath them. */}
            <div className="md:hidden">
              <ul className="mt-8 flex flex-wrap gap-2">
                {solutions.map((s) => (
                  <li key={s.label}>
                    <button
                      type="button"
                      aria-pressed={s === chip}
                      onClick={() => setChip(s)}
                      className={cn(
                        "border px-3 py-1.5 font-heading text-sm font-semibold transition-colors duration-150 ease-out-soft",
                        s === chip
                          ? "border-accent bg-accent-soft text-accent-ink"
                          : "border-line-strong text-ink-soft hover:border-accent hover:text-accent",
                      )}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
              <SolutionCard solution={chip} className="mt-4" />
            </div>
          </Container>

          {/* Large screens: labels on the orbit, each opening a card beside
              itself on hover or focus. */}
          <ul className="hidden md:block">
            {labels.map(({ solution, x, y }) => (
              <li
                key={solution.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  data-orbit-label
                  aria-expanded={card?.solution === solution}
                  onMouseEnter={(e) => openCard(solution, e.currentTarget)}
                  onFocus={(e) => openCard(solution, e.currentTarget)}
                  onBlur={scheduleClose}
                  onClick={(e) => openCard(solution, e.currentTarget)}
                  className={cn(
                    // Page-coloured fill and padding are what knock the
                    // dashes out behind the word, like the reference's arc.
                    "bg-surface-2 px-3 py-1 font-heading text-lg font-semibold whitespace-nowrap transition-colors duration-150 ease-out-soft lg:text-xl",
                    card?.solution === solution
                      ? "text-accent"
                      : "text-white hover:text-accent",
                  )}
                >
                  {solution.label}
                </button>
              </li>
            ))}
          </ul>

          {/* The hover card. Stays open while the pointer is on it so the
              link can be reached. */}
          <div
            className={cn(
              "absolute hidden transition-[opacity,transform] duration-200 ease-out-soft md:block",
              card
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0",
            )}
            style={{
              left: card?.left ?? 0,
              top: card?.top ?? 0,
              width: CARD_W,
            }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            onFocus={cancelClose}
            onBlur={scheduleClose}
          >
            {card ? <SolutionCard solution={card.solution} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Card footprint used for placement. Height is an estimate; the card
    is clamped to the viewport with this much room. */
const CARD_W = 320;
const CARD_H = 236;
const GAP = 28;
const PAD = 16;

/** One glyph per solution, keyed by label. */
/** Keyed by the `label` in content/manufacturing.ts. Rename one there and
    it falls back to the document glyph until it is renamed here too. */
const ICONS: Record<string, LucideIcon> = {
  "Part intelligence": Search,
  "RFQ automation": FileText,
  "Catalog intelligence": Boxes,
  "ERP integration": Plug,
  "Export documents": ClipboardList,
  Obsolescence: Wrench,
};

type Rect = { x: number; y: number; w: number; h: number };

function intersects(a: Rect, b: Rect, margin = 8) {
  return (
    a.x < b.x + b.w + margin &&
    a.x + a.w > b.x - margin &&
    a.y < b.y + b.h + margin &&
    a.y + a.h > b.y - margin
  );
}

/** Where a label's card goes: beside the label on the side away from the
    hole, lifted a little; if that runs off the viewport (the lowest labels
    sit near the edges) it goes above the label instead. Either way it is
    then pushed up until it clears every other label, and finally pulled
    back inside the viewport. Returns the card's top-left, relative to the
    sticky viewport. */
function placeCard(label: Rect, others: Rect[], vw: number, vh: number) {
  const outwardLeft = label.x + label.w / 2 < vw / 2;
  let left = outwardLeft ? label.x - GAP - CARD_W : label.x + label.w + GAP;
  let top = label.y + label.h / 2 - CARD_H / 2 - 24;
  if (left < PAD || left + CARD_W > vw - PAD) {
    left = outwardLeft ? label.x + label.w / 2 - CARD_W : label.x + label.w / 2;
    top = label.y - GAP - CARD_H;
  }
  left = Math.min(Math.max(left, PAD), vw - PAD - CARD_W);

  // Climb over any label the card would sit on.
  for (let pass = 0; pass < 4; pass++) {
    const hit = others.find((o) =>
      intersects({ x: left, y: top, w: CARD_W, h: CARD_H }, o),
    );
    if (!hit) break;
    top = hit.y - GAP - CARD_H;
  }

  top = Math.min(Math.max(top, PAD), vh - PAD - CARD_H);
  return { left, top };
}

function slug(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function SolutionCard({
  solution,
  className,
}: {
  solution: Solution;
  className?: string;
}) {
  const Icon = ICONS[solution.label] ?? FileText;
  return (
    <div
      className={cn(
        "rounded-[14px] border border-line-strong bg-surface p-5 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-surface-3 text-white">
          <Icon aria-hidden className="size-5" />
        </span>
        <p className="font-heading text-base font-bold text-white">
          {solution.label}
        </p>
      </div>
      <p className="mt-4 font-heading text-lg leading-snug font-semibold text-white">
        {solution.title}
      </p>
      <p className="mt-2 text-base leading-relaxed text-ink-soft">
        {solution.summary}
      </p>
      <Link
        href={`/solutions/${slug(solution.label)}`}
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.12em] text-accent uppercase underline-offset-4 hover:underline"
      >
        More details
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </div>
  );
}
