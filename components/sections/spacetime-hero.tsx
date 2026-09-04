"use client";

import * as React from "react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { hero } from "@/content/manufacturing";
import { site } from "@/content/site";

/**
 * The home hero: the wordmark in the dark above a sheet of spacetime that
 * runs off to the horizon, with the brand mark sitting in the well its own
 * mass makes in the sheet.
 *
 * The sheet is a perspective grid drawn on a canvas from a low camera, so it
 * converges on a vanishing line a little past the middle of the screen; the
 * copy sits in the black above that line. The mark dents the sheet with a
 * Gaussian well; lines near it brighten toward the logo's pink, far lines
 * fade into the horizon.
 *
 * The mark is the shared SVG geometry, positioned each frame over the
 * projected floor of its well so it reads as resting on the dip rather than
 * sunk into it. The well breathes a little and the grid drifts toward the
 * viewer. Under prefers-reduced-motion one frame is drawn and nothing moves.
 */

/* --- Scene constants --------------------------------------------------- */

/** Plane extent in world units. x is left/right, z is depth away from us. */
const X_EXTENT = 4.4;
const Z_NEAR = -0.3;
const Z_FAR = 16;
/** Line spacing in world units — the same on both axes. */
const STEP = 0.16;
/** Samples per line: enough that the curve into a well is smooth. */
const SAMPLES = 80;

/** The mark's well. */
const WELL = { x: 0, z: 2.3 };
const WELL_SIGMA = 0.55;
const WELL_DEPTH = 0.38;

/** Camera: height above the plane, distance behind z=0, downward pitch. */
const CAM_H = 0.5;
const CAM_Z = -0.6;
const CAM_PITCH = (18 * Math.PI) / 180;
/** Where the vanishing line lands, as a fraction of the viewport height. */
const HORIZON = 0.56;

const PINK = [255, 110, 158] as const;
const HOT = [248, 32, 109] as const;
const GREY = [235, 220, 230] as const;

function mix(a: readonly number[], b: readonly number[], t: number) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function rgba(c: readonly number[], a: number) {
  return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;
}

function gauss(dx: number, dz: number, sigma: number) {
  return Math.exp(-(dx * dx + dz * dz) / (sigma * sigma));
}

/* --- Component --------------------------------------------------------- */

export function SpacetimeHero() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const markRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const mark = markRef.current;
    const section = sectionRef.current;
    if (!canvas || !mark || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cos = Math.cos(CAM_PITCH);
    const sin = Math.sin(CAM_PITCH);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let f = 1;
    let oy = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      f = Math.max(width, height) * 0.5;
      // The projection origin is placed so the true horizon of the plane
      // lands at HORIZON regardless of viewport shape.
      oy = HORIZON * height + f * Math.tan(CAM_PITCH);
    };

    /** World point -> canvas pixels. Null behind the camera. */
    const project = (x: number, y: number, z: number) => {
      const py = y - CAM_H;
      const pz = z - CAM_Z;
      const ry = py * cos + pz * sin;
      const rz = -py * sin + pz * cos;
      if (rz <= 0.05) return null;
      return { x: width / 2 + (f * x) / rz, y: oy - (f * ry) / rz, d: rz };
    };

    const draw = (time: number) => {
      const t = reduceMotion ? 0 : time / 1000;

      const depth = WELL_DEPTH * (1 + 0.05 * Math.sin(t * 0.8));
      const drift = reduceMotion ? 0 : (t * 0.05) % STEP;

      const surface = (x: number, z: number) =>
        -depth * gauss(x - WELL.x, z - WELL.z, WELL_SIGMA);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      // Glow under the mark's well.
      const floor = project(WELL.x, surface(WELL.x, WELL.z), WELL.z);
      if (floor) {
        const r = f / floor.d;
        const g = ctx.createRadialGradient(
          floor.x,
          floor.y,
          0,
          floor.x,
          floor.y,
          r * 0.9,
        );
        g.addColorStop(0, rgba(HOT, 0.2));
        g.addColorStop(0.5, rgba(PINK, 0.07));
        g.addColorStop(1, rgba(PINK, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      /** Stroke one polyline. `closeness` is how near it passes to a well,
          `dist` its depth for the horizon fade. */
      const strokeLine = (
        points: Array<{ x: number; y: number } | null>,
        closeness: number,
        far: number,
      ) => {
        const c = mix(GREY, PINK, Math.min(1, closeness));
        const fade = 1 / (1 + far * 0.5);
        ctx.strokeStyle = rgba(c, (0.1 + 0.45 * closeness) * fade);
        ctx.beginPath();
        let pen = false;
        for (const p of points) {
          if (!p) {
            pen = false;
            continue;
          }
          if (!pen) {
            ctx.moveTo(p.x, p.y);
            pen = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      };

      const closenessX = (x: number) => gauss(x - WELL.x, 0, WELL_SIGMA);
      const closenessZ = (z: number) => gauss(0, z - WELL.z, WELL_SIGMA);

      // Lines running away from us (constant x). Sampled densely near the
      // camera, where the wells are, and sparsely toward the horizon.
      for (let x = -X_EXTENT; x <= X_EXTENT + 1e-6; x += STEP) {
        const pts = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const u = i / SAMPLES;
          const z = Z_NEAR + (Z_FAR - Z_NEAR) * u * u;
          pts.push(project(x, surface(x, z), z));
        }
        strokeLine(pts, closenessX(x), 0);
      }

      // Lines running across (constant z), drifting toward the viewer.
      // Toward the horizon they land within a pixel of each other and
      // would pile into a bright band, so any line closer than 2px to the
      // last one drawn is skipped.
      let lastY = Infinity;
      for (let z = Z_NEAR + drift; z <= Z_FAR; z += STEP) {
        const edge = project(X_EXTENT, 0, z);
        if (edge && Math.abs(lastY - edge.y) < 2) continue;
        if (edge) lastY = edge.y;
        const pts = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const x = -X_EXTENT + ((2 * X_EXTENT) * i) / SAMPLES;
          pts.push(project(x, surface(x, z), z));
        }
        strokeLine(pts, closenessZ(z), Math.max(0, z - WELL.z));
      }

      // Seat the mark over its well, its base at the floor and most of it
      // above the rim. It scales with distance like everything else on the
      // sheet, so it reads as part of the scene.
      if (floor) {
        const size = (f / floor.d) * 0.84;
        mark.style.transform = `translate(${floor.x - size / 2}px, ${floor.y - size * 0.74}px)`;
        mark.style.width = `${size}px`;
        mark.style.height = `${size}px`;
        mark.style.opacity = "1";
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    // Pause the loop while the hero is off screen — it is the most expensive
    // thing on the page, and nothing of it is visible past the first scroll.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!running) {
          running = true;
          raf = requestAnimationFrame(loop);
        }
      } else {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
      io.observe(section);
    }
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-svh overflow-hidden bg-surface-2"
      aria-labelledby="hero-title"
    >
      {/* The sheet. Runs to the bottom edge, where the black hole of the
          next scene crests up over it. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <canvas ref={canvasRef} className="block h-full w-full" />
        <div
          ref={markRef}
          className="absolute top-0 left-0 opacity-0 will-change-transform"
          style={{ filter: "drop-shadow(0 0 32px rgba(248,32,109,0.45))" }}
        >
          <LogoMark size={100} className="h-full w-full" />
        </div>
        {/* The horizon fades into the dark rather than ending on a line. */}
        <div
          className="absolute inset-x-0 bg-linear-to-b from-surface-2 via-surface-2/85 to-transparent"
          style={{ top: `${HORIZON * 100 - 8}%`, height: "14%" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[10%] bg-linear-to-t from-surface-2 to-transparent" />
      </div>

      {/* Copy sits in the dark above the horizon. The fixed-height block
          keeps it there on any viewport instead of letting it slide down
          into the sheet. */}
      <Container
        className="relative z-10 flex flex-col items-center justify-end pt-24 text-center"
        style={{ minHeight: `${HORIZON * 100 - 4}svh` }}
      >
        <p className="label-section text-accent">{hero.kicker}</p>
        <h1
          id="hero-title"
          className="mt-5 font-display text-[3.25rem] leading-none font-extrabold tracking-[-0.03em] text-ink sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
        >
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:text-xl">
          {hero.sub}
        </p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <BookACall size="lg" withArrow />
          <BookingNote />
        </div>
      </Container>
    </section>
  );
}
