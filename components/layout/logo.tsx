import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Wordmark with a small geometric mark. Type-driven so it stays crisp at any
 * size and inherits colour from its context.
 */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight transition-opacity hover:opacity-80",
        inverse ? "text-white" : "text-ink",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-7 place-items-center rounded-lg",
          inverse ? "bg-white/15 backdrop-blur-sm" : "bg-accent"
        )}
      >
        {/* Two arcs closing on a point — the measurement mark. */}
        <svg viewBox="0 0 16 16" className="size-4" fill="none">
          <path
            d="M3 12.5A6 6 0 0 1 12.5 3"
            stroke={inverse ? "#ffffff" : "#ffffff"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="11" cy="11" r="2" fill="#ffffff" />
        </svg>
      </span>
      {site.name}
    </Link>
  );
}
