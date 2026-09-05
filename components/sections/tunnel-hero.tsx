import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { hero } from "@/content/manufacturing";

/**
 * The home hero: a statement, centred, inside a wireframe room.
 *
 * The room is a one-point-perspective box drawn in SVG — four walls of
 * hairlines converging on a vanishing point behind the copy, crossed by a
 * run of depth rings that tighten toward the far wall. It is drawn once,
 * server-side, and scales with the viewport; there is nothing to animate,
 * because the picture is the depth, not the motion.
 *
 * The composition is the reference's: one heavy headline that says what the
 * firm is, one plain line under it, and nothing else on the screen — the
 * action lives in the bar above. The band beneath the hero carries the one
 * true line about who this is for, where the reference puts its "trusted
 * by" strip. There is no logo row under it because there are no client
 * logos that can honestly be shown yet; when there are, that is where they
 * go.
 */

/* --- The room ---------------------------------------------------------- */

/** Drawing space. `slice` on the SVG crops it to the viewport, so the
    vanishing point stays put whatever the box's shape. */
const W = 1600;
const H = 900;
/** Vanishing point — a little above centre, so the floor is deeper than the
    ceiling and the room reads as something you are standing in. */
const VP = { x: 800, y: 420 };
/** Outer rect: past the drawing space on every side, so no line ends at the
    edge of the screen. */
const OUTER = { hw: 900, hh: 520 };
/** How far away the far wall is, as a screen scale of the outer rect. */
const FAR = 0.34;
/** Depth rings between the outer edge and the far wall. */
const RINGS = 7;
/** Lines across the ceiling and floor, and up the two walls. */
const ACROSS = 14;
const UP = 8;

/** Screen scale of a plane at depth z, for a camera at unit distance. */
const scaleAt = (z: number) => 1 / (1 + z);
const zFar = 1 / FAR - 1;

function rect(s: number) {
  const hw = OUTER.hw * s;
  const hh = OUTER.hh * s;
  return { x: VP.x - hw, y: VP.y - hh, w: hw * 2, h: hh * 2 };
}

/** The converging lines: each joins a point on the outer rect to the same
    point on the far wall, which is what makes walls out of them. */
function edges() {
  const o = rect(1);
  const f = rect(FAR);
  const d: string[] = [];
  for (let i = 0; i <= ACROSS; i++) {
    const t = i / ACROSS;
    d.push(`M${o.x + o.w * t} ${o.y}L${f.x + f.w * t} ${f.y}`);
    d.push(`M${o.x + o.w * t} ${o.y + o.h}L${f.x + f.w * t} ${f.y + f.h}`);
  }
  for (let i = 1; i < UP; i++) {
    const t = i / UP;
    d.push(`M${o.x} ${o.y + o.h * t}L${f.x} ${f.y + f.h * t}`);
    d.push(`M${o.x + o.w} ${o.y + o.h * t}L${f.x + f.w} ${f.y + f.h * t}`);
  }
  return d.join("");
}

/** The depth rings, spaced evenly in depth rather than on screen, so they
    crowd toward the far wall the way real distance does. */
function rings() {
  const d: string[] = [];
  for (let i = 0; i <= RINGS; i++) {
    const r = rect(scaleAt((zFar * i) / RINGS));
    d.push(`M${r.x} ${r.y}h${r.w}v${r.h}h${-r.w}Z`);
  }
  return d.join("");
}

function Room() {
  const far = rect(FAR);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    >
      <defs>
        {/* The far wall carries a flat grid of its own, fainter than the
            walls, so the room has a back rather than a hole. */}
        <pattern
          id="room-wall"
          x={far.x}
          y={far.y}
          width={far.w / 10}
          height={far.h / 6}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M${far.w / 10} 0V${far.h / 6}M0 ${far.h / 6}H${far.w / 10}`}
            strokeOpacity={0.4}
            vectorEffect="non-scaling-stroke"
          />
        </pattern>
      </defs>
      <rect
        x={far.x}
        y={far.y}
        width={far.w}
        height={far.h}
        fill="url(#room-wall)"
        stroke="none"
      />
      <path d={edges()} strokeOpacity={0.55} vectorEffect="non-scaling-stroke" />
      <path d={rings()} strokeOpacity={0.8} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* --- The section ------------------------------------------------------- */

export function TunnelHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-surface-2"
      aria-labelledby="hero-title"
    >
      {/* The room, in the hairline colour at low strength. */}
      <div aria-hidden className="absolute inset-0 text-white/[0.13]">
        <Room />
      </div>

      {/* A soft dark pool behind the copy, so the headline sits on the room
          rather than in the middle of its lines. Tight, like the field scrim
          on every other masthead — gone well before the edges. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 40% at 50% 52%, rgba(24,24,24,0.92) 0%, rgba(24,24,24,0.72) 45%, rgba(24,24,24,0) 100%)",
        }}
      />

      <Container className="relative z-10 flex min-h-svh flex-col items-center justify-center pt-28 pb-24 text-center sm:pt-32">
        <Reveal className="flex flex-col items-center">
          <h1
            id="hero-title"
            className="max-w-[17ch] font-display text-[2.25rem] leading-[1.02] font-extrabold tracking-[-0.028em] text-ink sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            {hero.headline}
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-soft sm:text-xl">
            {hero.sub}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
