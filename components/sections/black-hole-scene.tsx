"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Boxes,
  ClipboardList,
  FileText,
  LayoutGrid,
  Search,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  CREST_BELOW_TOP,
  DOME_BAND_H_CSS,
  DOME_SIZE_CSS,
  HALO,
  HOLE_BACKGROUND,
  HOLE_SIZE_CSS,
  holeTopCss,
  R0_OF_LONG_SIDE,
  STAR_COLOR,
  starField,
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
 *
 * NOT ON A PHONE
 *
 * All of the above needs a viewport that can hold it — see SCRUB_MEDIA, which
 * asks for height as well as width. Everything else gets <PhoneScene>
 * instead: the same two beats, laid out in ordinary flow, and none of the
 * machinery. Three separate things made the scrub wrong at that size rather
 * than merely cramped:
 *
 *   1. The sticky frame is one viewport tall and clips. The problem block
 *      needs 980px on a 375x667 phone, so the fourth pain point was cut off
 *      the bottom and could not be reached by scrolling, because scrolling
 *      is what drives the camera.
 *   2. The frame is sized in `svh` but the camera is sized from
 *      `window.innerHeight`, which is the *large* viewport height while a
 *      mobile browser's toolbars are showing. The hole was therefore drawn
 *      for a taller box than the one it was in, and slid as the bar
 *      collapsed.
 *   3. It costs a rAF that repaints 260 stars to a full-screen canvas for
 *      three and a half viewports of scrolling, on the device least able to
 *      afford it.
 *
 * So the scrub is mounted but idle wherever it does not fit — see the media
 * query in the effect, which starts and stops it as the threshold is crossed
 * — and the phone layout draws the same hole with CSS instead. The two halves
 * of the opening frame (the hero's and this one's) come from one definition
 * in hole-geometry.ts, so the halo still crosses the seam without a step.
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

/** When the camera move runs at all. Below this the scene is <PhoneScene>
    and none of this file's machinery does anything.

    Height is in the test as well as width, because the sticky frame is one
    viewport tall and clips: a phone turned sideways is wide enough and three
    hundred and fifty pixels too short. Must match the `scrub:` variant
    declared in app/globals.css, which gates the markup this drives. */
const SCRUB_MEDIA = "(min-width: 48rem) and (min-height: 40rem)";
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

  // Final: the whole circle in view, centred in what is left under the
  // heading, sized so the orbit and a label at the top and the bottom of it
  // all fit. Height is what binds on a laptop; width binds on a tall narrow
  // tablet, which is why both are measured.
  //
  // There is no small-screen branch. Anything that cannot hold the orbit gets
  // <PhoneScene> and never reaches this function — see SCRUB_MEDIA.
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
  /* Mounted at every size, but only ever *running* where the camera fits:
     everywhere else the scene is <PhoneScene> and there is nothing to drive.
     The media query is watched rather than read once, so crossing it —
     rotating a phone, dragging a window narrow or short — starts or stops the
     loop instead of leaving it in the wrong mode. */
  React.useEffect(() => {
    const mq = window.matchMedia(SCRUB_MEDIA);
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      stop = mq.matches ? start() : undefined;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      stop?.();
    };

    function start() {
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

      let previousTime = 0;
      const tick = (time: number) => {
        // Keep the camera easing consistent on 60 Hz and high-refresh displays.
        const frameDuration = previousTime ? Math.min(time - previousTime, 64) : 1000 / 60;
        previousTime = time;
        const target = clamp01((progress() - HOLD_IN) / (1 - HOLD_IN - HOLD_OUT));
        if (eased < 0 || reduceMotion) eased = target;
        else {
          eased += (target - eased) * (1 - Math.pow(1 - EASE, frameDuration / (1000 / 60)));
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
    }
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
      // The tall box is what the scrub travels through, so it belongs to the
      // camera and not to the content: on a phone the section is exactly as
      // tall as what is in it.
      className="relative bg-surface-2 scrub:h-[340svh]"
      aria-label="The problem, and what Channel Intelligence answers"
    >
      <PhoneScene chip={chip} onChip={setChip} />

      <div
        ref={stickyRef}
        className="hidden overflow-hidden scrub:sticky scrub:top-0 scrub:block scrub:h-svh"
      >
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

        {/* Orbit: the dashed line and its labels. Nothing is painted behind
            a label — the dashes are held off the word by the shadow the
            glyphs cast. See `orbit-label` in globals.css. */}
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
            <ProblemCopy />
          </Container>
        </div>

        {/* ---- The solutions, around the hole ------------------------- */}
        <div
          ref={solutionsRef}
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{ opacity: 0 }}
        >
          <Container className="pt-20 sm:pt-24">
            <SolutionIntro />
          </Container>

          {/* Large screens: labels on the orbit, each opening a card beside
              itself on hover or focus. */}
          <ul className="hidden scrub:block">
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
                  aria-label={solution.label}
                  className={cn(
                    // One notch down from the old size: Plus Jakarta Sans is
                    // a wider face than the one this was set in, and at the
                    // previous size the longest labels reached the hole.
                    "orbit-label px-3 py-1 font-heading text-base font-semibold whitespace-nowrap transition-colors duration-150 ease-out-soft lg:text-lg",
                    card?.solution === solution
                      ? "text-accent"
                      : "text-white hover:text-accent",
                  )}
                >
                  {solution.short}
                </button>
              </li>
            ))}
          </ul>

          {/* The hover card. Stays open while the pointer is on it so the
              link can be reached. */}
          <div
            className={cn(
              "absolute hidden transition-[opacity,transform] duration-200 ease-out-soft scrub:block",
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

/* ==========================================================================
   The two beats, written once
   ==========================================================================
   Both layouts say the same thing; only the staging differs. Keeping the
   copy here means the phone is never a stale fork of the desktop — a wording
   change lands in both, or in neither.
   ========================================================================== */

/** The problem: the claim, the account of it, and the four questions a
    manufacturer cannot answer today. */
function ProblemCopy() {
  return (
    <>
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow tone="onDark">The problem</Eyebrow>
        <h2 className="mt-6 text-[1.75rem] leading-[1.05] text-white min-[400px]:text-3xl sm:text-4xl lg:text-5xl">
          The market exists.
          <br />
          The channel hides it.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
          Everything you need to know about your channel is already published —
          on the websites of the distributors you fund. It sits there across
          dozens of domains and tens of thousands of listings, which is exactly
          why no manufacturer has read it. Meanwhile your competitors may
          already know which distributors carry them, and which ones do not.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-5xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-12 lg:gap-y-8">
        {painPoints.map((p) => (
          <li key={p.n} className="border-t border-white/15 pt-4 text-left">
            <span className="label-tech text-accent">{p.n}</span>
            <h3 className="mt-2 font-heading text-base font-semibold text-white sm:text-lg">
              {p.title}
            </h3>
          </li>
        ))}
      </ul>
    </>
  );
}

/** The turn: one system, and how to read what is around it. */
function SolutionIntro() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      <div>
        <Eyebrow>The solution</Eyebrow>
        <h2 className="mt-5 text-[1.75rem] leading-[1.05] text-ink min-[400px]:text-3xl sm:text-4xl lg:text-5xl">
          One system:
          <br />
          Channel Intelligence
        </h2>
      </div>
      <div className="lg:pt-2">
        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
          One crawl of your distributor network, read six ways. Every answer
          carries the source URL it came from.{" "}
          {/* The instruction has to match the input. In the flow layout the
              six are chips you pick, by tap or by click; on the orbit they
              are points a pointer opens — so the sentence changes with the
              layout it is describing. */}
          <span className="scrub:hidden">
            Choose a name to see what it does.
          </span>
          <span className="hidden scrub:inline">
            Hover a label to see what it does.
          </span>
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   The phone layout
   ========================================================================== */

/** A different seed again, so the three static skies on the home page (hero,
    here, services) are not one arrangement of dots repeated. */
const PHONE_STARS = starField(70, 0x31c7);

/**
 * The scene on a phone: the same two beats, one after the other, on a page
 * that simply scrolls.
 *
 * The hole is still here — it is the whole identity of the page — but drawn
 * rather than scrubbed. It arrives twice:
 *
 *   At the top, as the continuation of the hero's halo. The hero clips the
 *   circle at its bottom edge and this clips the same circle at its top, both
 *   from `holeTopCss` in hole-geometry.ts, so the two boxes paint one
 *   picture and the seam does not show. What lands in this half is the
 *   photon ring cresting about 40px down and flattening out toward the edges,
 *   with the disc below it — which is why the copy starts under `pt-28`
 *   rather than over the ring, where it was unreadable.
 *
 *   At the foot, as the dome the desktop scrub settles on, closing the
 *   section the way the camera move does.
 */
function PhoneScene({
  chip,
  onChip,
}: {
  chip: Solution;
  onChip: (solution: Solution) => void;
}) {
  return (
    <div className="relative isolate overflow-hidden scrub:hidden">
      {/* The sky, faded out where the copy begins — the same treatment the
          hero gives it, and for the same reason: a field that just stopped
          would draw a line across the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 30%, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 30%, transparent 70%)",
        }}
      >
        {PHONE_STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.d}px`,
              height: `${star.d}px`,
              opacity: star.a,
              backgroundColor: STAR_COLOR,
            }}
          />
        ))}
      </div>

      {/* The hole, continued down from the hero.

          Faded out below its own middle. Unmasked, the far side of the same
          ring comes back up through the copy a thousand pixels further down —
          on a phone that landed across the solution's eyebrow, which is pink
          type on the brightest pink on the page. The disc it is fading is
          within a shade of the page colour, so nothing is lost by dissolving
          it: what goes is the second ring, and the halo's glow returns to the
          page before the next beat starts. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 rounded-full"
        style={{
          width: HOLE_SIZE_CSS,
          height: HOLE_SIZE_CSS,
          top: holeTopCss("0px"),
          background: HOLE_BACKGROUND,
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 38%, transparent 66%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 38%, transparent 66%)",
        }}
      />

      <Container className="pt-28 pb-4">
        <ProblemCopy />
      </Container>

      <Container className="hidden pt-24 pb-12 md:block">
        <SolutionIntro />

        {/* No orbit to hang the six names on at this width, so they are
            chips, and the card that a hover opens upstairs sits open under
            them instead. */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {solutions.map((s) => (
            <li key={s.label}>
              <button
                type="button"
                aria-pressed={s === chip}
                onClick={() => onChip(s)}
                className={cn(
                  "border px-3 py-2 font-heading text-sm font-semibold transition-colors duration-150 ease-out-soft",
                  s === chip
                    ? "border-accent bg-accent-soft text-accent-ink"
                    : "border-line-strong text-ink-soft active:border-accent active:text-accent",
                )}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <SolutionCard solution={chip} className="mt-4" />
      </Container>

      {/* The dome the camera would have settled on, closing the section.

          Faded out at the foot rather than cut there. Upstairs the same shape
          is clipped by the bottom of the viewport, which reads as a circle
          continuing past the screen; a clip in the middle of a scrolling page
          reads as a box, with the two cut ends of a bright ring sitting on
          the line. So the band dissolves the ring instead of ending it. */}
      <div
        aria-hidden
        className="pointer-events-none relative hidden overflow-hidden md:block"
        style={{
          height: DOME_BAND_H_CSS,
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 62%, transparent 97%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 62%, transparent 97%)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: DOME_SIZE_CSS,
            height: DOME_SIZE_CSS,
            background: HOLE_BACKGROUND,
          }}
        />
      </div>
    </div>
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
  "Channel census": Search,
  "Displacement mapping": Boxes,
  "Whitespace mapping": LayoutGrid,
  "Change monitoring": Activity,
  "Distributor qualification": ClipboardList,
  "Interchange harvesting": FileText,
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
