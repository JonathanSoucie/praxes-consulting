"use client";

import * as React from "react";
import { Play } from "lucide-react";

import { ContainerWide } from "@/components/container";

/**
 * The film.
 *
 * A full-bleed 16:9 band under the hero. There is no film yet, so what ships
 * is the frame it will sit in, drawn properly rather than left as a grey box:
 * the black ground the finished piece will open on, the horizon line the
 * brand mark is built from, and a real play control.
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

export function VideoBand() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  return (
    <section aria-labelledby="film-heading" className="pb-24 lg:pb-32">
      <ContainerWide>
        <h2 id="film-heading" className="sr-only">
          How this works, in ninety seconds
        </h2>

        <div className="relative aspect-video w-full overflow-hidden bg-deep">
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
                  className="absolute inset-0 grid place-items-center bg-deep/30 transition-colors hover:bg-deep/15"
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

        <p className="mt-5 max-w-2xl text-sm text-muted">
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
    <span className="grid size-20 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:size-24">
      <Play aria-hidden className="size-7 translate-x-0.5 fill-white text-white" />
    </span>
  );
}

/**
 * The unfilmed state.
 *
 * A horizon: light falling into a line, which is the same geometry as the
 * brand mark and the same idea as the copy above it. It is drawn in CSS
 * gradients rather than shipped as an image so it costs nothing and stays
 * sharp at any width.
 */
function Placeholder() {
  return (
    <div className="group relative size-full">
      {/* The disk, seen edge-on. */}
      <div
        aria-hidden
        className="absolute inset-x-[-10%] top-1/2 h-px -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, #b5115b 18%, #f8206d 42%, #ff6e9e 50%, #f8206d 58%, #b5115b 82%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-[-10%] top-1/2 h-40 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(248,32,109,0.55), rgba(181,17,91,0.18) 45%, transparent 72%)",
        }}
      />
      {/* The hole itself. */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#050406] shadow-[0_0_60px_20px_rgba(5,4,6,0.9)] sm:size-44"
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <PlayMark />
          <p className="mt-6 font-display text-sm tracking-[0.18em] text-white/60 uppercase">
            Film in production
          </p>
        </div>
      </div>
    </div>
  );
}
