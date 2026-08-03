"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Subtle scroll reveal: a short fade + 8px rise, once, on first intersection.
 * Falls back to visible immediately when IntersectionObserver is unavailable
 * or the user prefers reduced motion (handled globally in globals.css).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms. Keep small — this should never feel like choreography. */
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out-soft",
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
