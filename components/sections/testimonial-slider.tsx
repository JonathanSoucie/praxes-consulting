"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import type { Testimonial } from "@/content/testimonials";
import { features } from "@/content/site";
import { projectEndpoint, rubberband } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One quote at a time, manually advanced. No autoplay — a rotating carousel
 * reads as decoration, and these are meant to be read.
 *
 * The quotes sit on a track that can be dragged directly. Buttons alone make
 * this a thing you operate; a track you can grab makes it a thing you handle,
 * and on touch the swipe is the gesture people try first anyway. The buttons
 * stay, because they are the keyboard and assistive path.
 */

/** Movement before we commit to an axis, in px. Below this, intent is unclear. */
const AXIS_THRESHOLD = 10;
/** Pointer samples kept for the release-velocity estimate. */
const HISTORY = 5;
/** Fraction of the width the projected endpoint must pass to advance. */
const COMMIT_RATIO = 0.28;

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  /** Track offset when the grab began — the presentation value, not the target. */
  originX: number;
  axis: "undecided" | "x" | "y";
  history: { x: number; t: number }[];
};

export function TestimonialSlider({
  testimonials,
  tone = "default",
}: {
  testimonials: Testimonial[];
  tone?: "default" | "inverse";
}) {
  const [index, setIndex] = React.useState(0);
  const inverse = tone === "inverse";
  const count = testimonials.length;

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<DragState | null>(null);
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const width = () => viewportRef.current?.clientWidth ?? 0;
  const restingX = (i: number) => -i * width();

  /** The live on-screen offset — what an interrupted animation must resume from. */
  const presentationX = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const t = getComputedStyle(el).transform;
    if (!t || t === "none") return 0;
    return new DOMMatrixReadOnly(t).m41;
  };

  const setX = React.useCallback((x: number, durationMs = 0) => {
    const el = trackRef.current;
    if (!el) return;
    // A duration of 0 means "follow the finger": no transition at all, so the
    // track is glued to the pointer rather than chasing it a frame behind.
    el.style.transition = durationMs
      ? `transform ${durationMs}ms var(--ease-out-soft)`
      : "none";
    el.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  /** Settle to a slide. Duration falls out of the distance and the speed the
   *  finger was already moving, so a hard flick lands fast and a gentle drag
   *  eases home — there is no seam between the drag and the animation. */
  const settle = React.useCallback(
    (i: number, releaseVelocity = 0) => {
      const target = restingX(i);
      const distance = Math.abs(target - presentationX());
      const speed = Math.abs(releaseVelocity);
      const duration = speed
        ? Math.min(520, Math.max(200, (distance / speed) * 1000))
        : 420;
      setX(target, duration);
      setIndex(i);
    },
    [setX],
  );

  const go = (next: number) => settle((next + count) % count);

  // Keep the resting offset correct across resizes and orientation changes.
  React.useEffect(() => {
    const onResize = () => {
      if (drag.current) return;
      setX(-indexRef.current * (viewportRef.current?.clientWidth ?? 0));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setX]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (count < 2 || event.button !== 0) return;
    // Grabbing mid-settle must pick the track up where it visibly is. Reading
    // the target instead would snap it forward a frame before it follows.
    const originX = presentationX();
    setX(originX, 0);

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX,
      axis: "undecided",
      history: [{ x: event.clientX, t: event.timeStamp }],
    };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.pointerId !== event.pointerId) return;

    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;

    if (d.axis === "undecided") {
      if (Math.hypot(dx, dy) < AXIS_THRESHOLD) return;
      // Both readings are compared from the first real movement, then the
      // loser is dropped for good — no re-deciding halfway through a swipe.
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.axis === "y") {
        drag.current = null; // vertical: hand the gesture back to the page
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    d.history.push({ x: event.clientX, t: event.timeStamp });
    if (d.history.length > HISTORY) d.history.shift();

    const w = width();
    const min = -(count - 1) * w;
    let x = d.originX + dx;
    // Past either end there is nothing to reveal, so resist instead of
    // stopping dead.
    if (x > 0) x = rubberband(x, w);
    else if (x < min) x = min + rubberband(x - min, w);

    setX(x, 0);
  };

  const endDrag = (event: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.pointerId !== event.pointerId) return;
    drag.current = null;
    if (d.axis !== "x") return;

    const w = width();
    const first = d.history[0];
    const last = d.history[d.history.length - 1];
    const elapsed = last.t - first.t;
    const velocity = elapsed > 0 ? ((last.x - first.x) / elapsed) * 1000 : 0;

    // Land where the flick was going, not where the finger stopped.
    const projected = presentationX() + projectEndpoint(velocity);
    const raw = -projected / (w || 1);
    const from = indexRef.current;
    const travelled = raw - from;

    // The threshold decides *whether* to move; the projection decides how
    // far. Rounding alone would refuse a deliberate short swipe, and ceiling
    // alone would turn a barely-past-one flick into a two-slide jump.
    let next = from;
    if (Math.abs(travelled) > COMMIT_RATIO) {
      const steps = Math.max(1, Math.round(Math.abs(travelled)));
      next = from + Math.sign(travelled) * steps;
    }
    // A drag reveals adjacent quotes only, so it never wraps — clamp rather
    // than modulo, or a flick at the last quote would fly back to the first.
    next = Math.min(count - 1, Math.max(0, next));

    settle(next, velocity);
  };

  const current = testimonials[index];

  return (
    <div
      className={cn(
        "rounded-2xl p-8 sm:p-10",
        inverse ? "bg-white/8 backdrop-blur-sm" : "card-raise bg-surface",
      )}
    >
      <Quote
        aria-hidden
        className={cn("size-7", inverse ? "text-white/40" : "text-accent/40")}
      />

      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // pan-y keeps vertical scrolling with the page while we claim the
        // horizontal axis. Without it the browser resolves the swipe first
        // and the pointermove stream stops mid-gesture.
        className="mt-6 overflow-hidden [touch-action:pan-y]"
      >
        <div
          ref={trackRef}
          className={cn(
            "flex items-stretch",
            count > 1 && "cursor-grab active:cursor-grabbing",
          )}
        >
          {testimonials.map((t, i) => (
            <blockquote
              key={`${t.name}-${i}`}
              // Only the visible quote is exposed; the neighbours are real
              // rendered content for the drag to reveal, not extra reading.
              aria-hidden={i !== index}
              className="w-full shrink-0"
            >
              <p
                className={cn(
                  "font-display text-xl leading-snug font-medium text-balance select-none sm:text-2xl lg:text-[1.6rem] lg:leading-[1.42]",
                  inverse ? "text-white" : "text-ink",
                )}
              >
                {t.quote}
              </p>

              <footer className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <cite
                  className={cn(
                    "font-medium not-italic",
                    inverse ? "text-white" : "text-ink",
                  )}
                >
                  {t.name}
                </cite>
                <span className={inverse ? "text-white/60" : "text-muted"}>
                  {t.title}, {t.company}
                </span>
                {/* Only link out while the case study section is published. */}
                {features.caseStudies && t.caseStudy ? (
                  <Link
                    href={`/case-studies/${t.caseStudy}`}
                    tabIndex={i === index ? undefined : -1}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    Read the study
                  </Link>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      {count > 1 ? (
        <div className="mt-9 flex items-center gap-4 border-t border-line pt-6">
          <div className="flex gap-2">
            <SliderButton
              label="Previous testimonial"
              onClick={() => go(index - 1)}
              inverse={inverse}
            >
              <ArrowLeft aria-hidden className="size-4" />
            </SliderButton>
            <SliderButton
              label="Next testimonial"
              onClick={() => go(index + 1)}
              inverse={inverse}
            >
              <ArrowRight aria-hidden className="size-4" />
            </SliderButton>
          </div>

          <span
            aria-live="polite"
            className={cn(
              "figure-num text-xs",
              inverse ? "text-white/50" : "text-muted",
            )}
          >
            <span className="sr-only">Testimonial </span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
            <span className="sr-only">, {current.name}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  inverse,
  children,
}: {
  label: string;
  onClick: () => void;
  inverse: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-sm border transition-[background-color,border-color,color,transform] duration-150 ease-out-soft active:scale-90",
        inverse
          ? "border-white/25 text-white hover:bg-white/15 active:bg-white/25"
          : "border-line-strong text-ink hover:border-accent hover:text-accent active:bg-accent-soft active:text-accent-ink",
      )}
    >
      {children}
    </button>
  );
}
