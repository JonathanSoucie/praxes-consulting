"use client";

import * as React from "react";
import { Play } from "lucide-react";

import { ContainerWide } from "@/components/container";

/**
 * The film, straddling the seam.
 *
 * The panel is white and the problem section's black rises to meet it: the
 * top 55% of the frame sits on the page, the bottom 45% on the black, and the
 * boundary between the two runs across it. The join is visible in the gutters
 * either side, where there is no panel covering it.
 *
 * Two things make that work without measuring anything in JavaScript:
 *
 *   - The riser is a child of a wrapper whose height IS the video's height
 *     (the frame is the wrapper's only in-flow child, and it is `aspect-video`).
 *     So `top: 55%` is 55% of the film, not 55% of the section — which is what
 *     you get if the caption shares the containing block.
 *   - It is anchored past the bottom with `bottom: -100vh` and the section
 *     clips it, so the black ends exactly on the section edge and the problem
 *     section below continues it seamlessly. No height to keep in step.
 *
 * TO ADD THE FILM
 *   1. Put the encoded file at /public/film/praxes.mp4 (H.264, and a .webm
 *      beside it if you have one), plus a poster frame at
 *      /public/film/poster.jpg.
 *   2. Set SRC and POSTER below.
 * Everything else — the aspect ratio, the control, the caption — already
 * works against a real source; the placeholder branch simply stops rendering.
 *
 * Autoplay is deliberately not used even once a source exists. A muted
 * autoplaying film in the second screen of a consultancy site is a cost
 * (bandwidth, battery, attention) paid by every visitor for something most
 * of them did not ask to watch. It plays when someone presses play.
 */
const SRC: string | null = null;
const POSTER: string | null = null;

/** Where the black crosses the frame. Just over half the film sits on white. */
const SEAM = "55%";

export function VideoBand() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  return (
    <section
      aria-labelledby="film-heading"
      className="relative overflow-hidden pb-10 lg:pb-14"
    >
      <ContainerWide>
        <h2 id="film-heading" className="sr-only">
          How this works, in ninety seconds
        </h2>

        <div className="relative">
          {/* The black, full-bleed. Its containing block is this wrapper,
              whose height is the film's, so SEAM reads against the film. */}
          <div
            aria-hidden
            className="absolute bg-deep"
            style={{
              top: SEAM,
              bottom: "-100vh",
              left: "calc(50% - 50vw)",
              right: "calc(50% - 50vw)",
            }}
          />

          <div className="card relative aspect-video w-full overflow-hidden">
            {SRC ? (
              <>
                <video
                  ref={videoRef}
                  className="size-full object-cover"
                  poster={POSTER ?? undefined}
                  controls={playing}
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src={SRC} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
                {!playing ? (
                  <button
                    type="button"
                    onClick={() => videoRef.current?.play()}
                    className="group absolute inset-0 grid place-items-center bg-page/20 transition-colors hover:bg-page/5"
                    aria-label="Play the film"
                  >
                    <PlayMark />
                  </button>
                ) : null}
              </>
            ) : (
              <Placeholder />
            )}
          </div>
        </div>

        {/* Below the seam, so this is on the black. */}
        <p className="relative mt-5 max-w-2xl text-sm text-white/55">
          Ninety seconds: what an audit measures, what comes out of it, and
          what the build looks like inside a business that already has its own
          software.
        </p>
      </ContainerWide>
    </section>
  );
}

function PlayMark() {
  return (
    <span className="grid size-20 place-items-center rounded-full border border-ink/15 bg-page transition-transform duration-300 group-hover:scale-105 sm:size-24">
      <Play aria-hidden className="size-7 translate-x-0.5 fill-ink text-ink" />
    </span>
  );
}

/**
 * The unfilmed state, on white.
 *
 * Just the control. Two attempts at giving it texture came out worse than
 * nothing: a pink horizon line put a second horizontal a few dozen pixels off
 * the seam behind it, which reads as a misalignment rather than as two
 * things; and a soft radial bloom banded into concentric rings, because a
 * long ramp between two nearly identical low alphas is exactly what 8-bit
 * colour cannot render smoothly.
 *
 * The panel is doing enough on its own — it is a white frame lying across the
 * boundary between the page and the black. Anything inside it competes with
 * that.
 */
function Placeholder() {
  return (
    <div className="group relative grid size-full place-items-center">
      <div className="relative text-center">
        <PlayMark />
        <p className="mt-6 font-display text-sm tracking-[0.18em] text-muted uppercase">
          Film in production
        </p>
      </div>
    </div>
  );
}
