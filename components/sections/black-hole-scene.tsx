"use client";

import * as React from "react";

import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui/eyebrow";
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
/** How far the halo reaches, as a multiple of the hole radius. The hole
    element is drawn this much larger than the hole, with the disc, the
    photon ring and the halo all stops of one radial gradient. */
const HALO = 1.5;
const DISC = 1 / HALO;
const pct = (k: number) => `${(k * DISC * 100).toFixed(2)}%`;
const HOLE_BACKGROUND = `radial-gradient(circle farthest-side at 50% 50%, #0b0a0c 0%, #0f0d10 ${pct(0.6)}, #17131a ${pct(0.84)}, #2a1520 ${pct(0.95)}, #ff6e9e ${pct(0.985)}, #f8206d ${pct(1)}, rgba(248,32,109,0.5) ${pct(1.02)}, rgba(255,110,158,0.2) ${pct(1.1)}, rgba(181,17,91,0.08) ${pct(1.25)}, rgba(181,17,91,0) 100%)`;

/** Angles (degrees, counter-clockwise from +x) for the solution labels along
    the orbit. Spread from just above the left edge, over the top, to just
    above the right edge — the reference's layout. */
function labelAngles(n: number) {
  const start = 168;
  const end = 12;
  return Array.from({ length: n }, (_, i) => start - ((start - end) * i) / (n - 1));
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

function computeLayout(vw: number, vh: number): Layout {
  // Final: a dome sitting on the bottom edge, its centre just below it.
  const r1 = Math.min(300, Math.max(140, vw * 0.22));
  const cy1 = vh - r1 * 0.12;
  // Initial: so large only the crown shows, its crest a little below the top
  // of the viewport with the corners of the page still visible around it.
  const r0 = Math.max(vw, vh) * 0.66;
  const cy0 = r0 + vh * 0.05;
  return { vw, vh, r1, cy1, r0, cy0 };
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
  const [active, setActive] = React.useState<Solution>(solutions[0]);

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
    <section
      ref={sectionRef}
      className="relative bg-surface-2"
      style={{ height: "340svh" }}
      aria-label="The problem, and what we build for it"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
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
              <h2 className="mt-6 font-display text-3xl leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                Hours the floor never
                <br />
                gets back
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
                Every plant has one. It is never the machine people complain
                about — it is the quoting, the scheduling, the paperwork and the
                rework around it. None of it shows on a timesheet, and it pulls
                hours in whether anyone is watching or not.
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
                <h2 className="mt-5 font-display text-3xl leading-[1.05] text-ink sm:text-4xl lg:text-5xl">
                  Built around
                  <br />
                  your operation
                </h2>
              </div>
              <div className="lg:pt-2">
                <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                  Each one reads from the systems you already run and writes
                  back to them. Pick one below to see what it does on the floor.
                </p>
                {/* Detail for the active label. `aria-live` so keyboard and
                    hover users hear the change. */}
                <div
                  aria-live="polite"
                  className="mt-5 max-w-md border-l-2 border-accent pl-4"
                >
                  <p className="font-heading text-sm font-semibold text-white sm:text-base">
                    {active.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {active.body}
                  </p>
                </div>
              </div>
            </div>

            {/* Small screens: the orbit has no room for labels, so they
                become a row of chips under the header instead. */}
            <ul className="mt-8 flex flex-wrap gap-2 md:hidden">
              {solutions.map((s) => (
                <li key={s.label}>
                  <SolutionButton
                    solution={s}
                    active={s === active}
                    onActivate={setActive}
                  />
                </li>
              ))}
            </ul>
          </Container>

          {/* Large screens: labels on the orbit. */}
          <ul className="hidden md:block">
            {labels.map(({ solution, x, y }) => (
              <li
                key={solution.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
              >
                <SolutionButton
                  solution={solution}
                  active={solution === active}
                  onActivate={setActive}
                  onOrbit
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SolutionButton({
  solution,
  active,
  onActivate,
  onOrbit = false,
}: {
  solution: Solution;
  active: boolean;
  onActivate: (s: Solution) => void;
  onOrbit?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onActivate(solution)}
      onMouseEnter={() => onActivate(solution)}
      onFocus={() => onActivate(solution)}
      className={cn(
        "font-heading font-semibold whitespace-nowrap transition-colors duration-150 ease-out-soft",
        onOrbit
          ? // Page-coloured fill and padding are what knock the dashes out
            // behind the word, like the reference's arc.
            "bg-surface-2 px-3 py-1 text-lg lg:text-xl"
          : "border px-3 py-1.5 text-sm",
        active
          ? onOrbit
            ? "text-accent"
            : "border-accent bg-accent-soft text-accent-ink"
          : onOrbit
            ? "text-white hover:text-accent"
            : "border-line-strong text-ink-soft hover:border-accent hover:text-accent",
      )}
    >
      {solution.label}
    </button>
  );
}
