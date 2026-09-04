"use client";

import * as React from "react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { hero } from "@/content/manufacturing";
import { site } from "@/content/site";

/**
 * The home hero: the wordmark over a sheet of spacetime, with the brand mark
 * sitting in the well its own mass makes in it.
 *
 * The sheet is a perspective grid drawn on a canvas: a plane of lines seen
 * from a raised camera, with a Gaussian dip at the mark's position. Lines
 * near the dip brighten toward the logo's pink; far lines fade into the page.
 * The mark itself is the shared SVG geometry, positioned each frame at the
 * projected floor of the well so it reads as resting in the dip rather than
 * floating over a picture of one.
 *
 * Motion is quiet: the well breathes slightly, the grid drifts toward the
 * viewer, and the camera leans a few degrees toward the pointer. Under
 * prefers-reduced-motion one frame is drawn and nothing moves.
 */

/* --- Scene constants --------------------------------------------------- */

/** Plane extent in world units. x is left/right, z is depth away from us. */
const X_EXTENT = 2.2;
const Z_NEAR = -0.35;
const Z_FAR = 4.2;
/** Line spacing in world units — the same on both axes. */
const STEP = 0.16;
/** Samples per line: enough that the curve into the well is smooth. */
const SAMPLES = 72;

/** Where the mass sits on the plane. */
const WELL = { x: 0, z: 1.55 };
/** Well width (sigma) and depth, world units. */
const WELL_SIGMA = 0.62;
const WELL_DEPTH = 0.72;

/** Camera: height above the plane, distance behind z=0, downward pitch. */
const CAM_H = 0.78;
const CAM_Z = -0.6;
const CAM_PITCH = (23 * Math.PI) / 180;

const PINK = [255, 110, 158] as const;
const HOT = [248, 32, 109] as const;
const GREY = [255, 255, 255] as const;

function mix(a: readonly number[], b: readonly number[], t: number) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function rgba(c: readonly number[], a: number) {
  return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
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

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    // Pointer lean, in world units of camera offset; eased toward the target.
    const lean = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    /** Project a world point to canvas pixels. Returns null behind camera. */
    const project = (x: number, y: number, z: number, f: number) => {
      const px = x - lean.x;
      const py = y - CAM_H - lean.y;
      const pz = z - CAM_Z;
      const cos = Math.cos(CAM_PITCH);
      const sin = Math.sin(CAM_PITCH);
      // Pitch the camera down: rotate the world up about the x axis.
      const ry = py * cos + pz * sin;
      const rz = -py * sin + pz * cos;
      if (rz <= 0.05) return null;
      return {
        x: width / 2 + (f * px) / rz,
        // The horizon sits below the copy: the sheet is the lower part of
        // the screen, the wordmark and the subhead stay above it.
        y: height * 0.6 - (f * ry) / rz,
        d: rz,
      };
    };

    const draw = (time: number) => {
      const t = reduceMotion ? 0 : time / 1000;
      const f = Math.max(width, height) * 0.62;

      // Breathe the depth by a few percent; drift the grid toward the viewer.
      const depth = WELL_DEPTH * (1 + 0.04 * Math.sin(t * 0.9));
      const drift = reduceMotion ? 0 : (t * 0.06) % STEP;

      lean.x += (lean.tx - lean.x) * 0.06;
      lean.y += (lean.ty - lean.y) * 0.06;

      const well = (x: number, z: number) => {
        const dx = x - WELL.x;
        const dz = z - WELL.z;
        return -depth * Math.exp(-(dx * dx + dz * dz) / (WELL_SIGMA * WELL_SIGMA));
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      // Glow under the well, in the plane's own colour ramp.
      const floor = project(WELL.x, well(WELL.x, WELL.z), WELL.z, f);
      if (floor) {
        const r = f / floor.d;
        const g = ctx.createRadialGradient(
          floor.x,
          floor.y,
          0,
          floor.x,
          floor.y,
          r * 1.15,
        );
        g.addColorStop(0, rgba(HOT, 0.22));
        g.addColorStop(0.45, rgba(PINK, 0.08));
        g.addColorStop(1, rgba(PINK, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      /** Stroke one polyline, coloured by how close it passes to the well. */
      const strokeLine = (
        points: Array<{ x: number; y: number } | null>,
        closeness: number,
      ) => {
        const c = mix(GREY, PINK, Math.min(1, closeness));
        const alpha = 0.08 + 0.42 * closeness;
        ctx.strokeStyle = rgba(c, alpha);
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

      // Lines running away from us (constant x).
      for (let x = -X_EXTENT; x <= X_EXTENT + 1e-6; x += STEP) {
        const pts = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const z = Z_NEAR + ((Z_FAR - Z_NEAR) * i) / SAMPLES;
          pts.push(project(x, well(x, z), z, f));
        }
        const dist = Math.abs(x - WELL.x);
        strokeLine(pts, Math.exp(-(dist * dist) / (WELL_SIGMA * WELL_SIGMA)));
      }

      // Lines running across (constant z), drifting toward the viewer.
      for (let z = Z_NEAR + drift; z <= Z_FAR; z += STEP) {
        const pts = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const x = -X_EXTENT + ((2 * X_EXTENT) * i) / SAMPLES;
          pts.push(project(x, well(x, z), z, f));
        }
        const dist = Math.abs(z - WELL.z);
        strokeLine(pts, Math.exp(-(dist * dist) / (WELL_SIGMA * WELL_SIGMA)));
      }

      // Seat the mark at the floor of the well. It scales with distance like
      // everything else on the sheet, so it reads as part of the scene.
      if (floor) {
        const size = (f / floor.d) * 0.5;
        mark.style.transform = `translate(${floor.x - size / 2}px, ${floor.y - size * 0.58}px)`;
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

    const onPointer = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      lean.tx = -nx * 0.14;
      lean.ty = ny * 0.08;
    };
    const onLeave = () => {
      lean.tx = 0;
      lean.ty = 0;
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
      section.addEventListener("pointermove", onPointer);
      section.addEventListener("pointerleave", onLeave);
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
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-svh overflow-hidden bg-surface-2"
      aria-labelledby="hero-title"
    >
      {/* The sheet. Sits under the copy and runs to the bottom edge, where
          the black hole of the next scene crests up over it. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <canvas ref={canvasRef} className="block h-full w-full" />
        <div
          ref={markRef}
          className="absolute top-0 left-0 opacity-0 will-change-transform"
          style={{ filter: "drop-shadow(0 0 28px rgba(248,32,109,0.45))" }}
        >
          <LogoMark size={100} className="h-full w-full" />
        </div>
        {/* Far edge fades into the page; near edge fades so the grid does
            not slam into the section boundary. */}
        <div className="absolute inset-x-0 top-0 h-[42%] bg-linear-to-b from-surface-2 via-surface-2/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[14%] bg-linear-to-t from-surface-2 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-svh flex-col items-center pt-28 text-center sm:pt-32">
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
        <div className="mt-8 flex flex-col items-center gap-3">
          <BookACall size="lg" withArrow />
          <BookingNote />
        </div>
      </Container>
    </section>
  );
}
