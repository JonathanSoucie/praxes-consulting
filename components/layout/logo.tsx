import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Wordmark. Type-driven rather than an image so it stays crisp everywhere and
 * inherits colour from its context.
 */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-baseline gap-[0.1em] font-serif text-xl tracking-tight",
        tone === "inverse" ? "text-white" : "text-ink",
        className
      )}
    >
      <span className="font-medium">{site.name}</span>
      <span
        aria-hidden
        className="text-accent transition-opacity group-hover:opacity-70"
      >
        .
      </span>
    </Link>
  );
}
