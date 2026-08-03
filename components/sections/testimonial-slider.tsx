"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * One quote at a time, manually advanced. No autoplay — a rotating carousel
 * reads as decoration, and these are meant to be read.
 */
export function TestimonialSlider({
  testimonials,
  tone = "default",
}: {
  testimonials: Testimonial[];
  tone?: "default" | "inverse";
}) {
  const [index, setIndex] = React.useState(0);
  const inverse = tone === "inverse";
  const current = testimonials[index];
  const count = testimonials.length;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div>
      <blockquote>
        <p
          className={cn(
            "font-serif text-xl leading-snug text-balance sm:text-2xl lg:text-[1.75rem] lg:leading-[1.4]",
            inverse ? "text-white" : "text-ink"
          )}
        >
          <span aria-hidden className="text-accent">
            “
          </span>
          {current.quote}
          <span aria-hidden className="text-accent">
            ”
          </span>
        </p>

        <footer className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <cite
            className={cn(
              "font-medium not-italic",
              inverse ? "text-white" : "text-ink"
            )}
          >
            {current.name}
          </cite>
          <span className={inverse ? "text-white/60" : "text-muted"}>
            {current.title}, {current.company}
          </span>
          {current.caseStudy ? (
            <Link
              href={`/case-studies/${current.caseStudy}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              Read the study
            </Link>
          ) : null}
        </footer>
      </blockquote>

      {count > 1 ? (
        <div className="mt-10 flex items-center gap-4">
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
            className={cn(
              "figure-num text-xs",
              inverse ? "text-white/50" : "text-muted"
            )}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
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
        "inline-flex size-10 items-center justify-center rounded-sm border transition-colors",
        inverse
          ? "border-white/25 text-white hover:border-white/60"
          : "border-line-strong text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}
