import { cn } from "@/lib/utils";

/**
 * Small label above a section headline: a soft pulsing dot plus tracked
 * uppercase text. No pill background — just an indicator glyph, the same
 * device the reference site uses ahead of its own section labels.
 */
export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "onDark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] uppercase",
        tone === "onDark" ? "text-white/60" : "text-muted",
        className
      )}
    >
      <span className="relative inline-flex size-1.5 shrink-0">
        <span
          aria-hidden
          className={cn(
            "absolute inline-flex size-full animate-eyebrow-ping rounded-full",
            tone === "onDark" ? "bg-white/60" : "bg-accent"
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            tone === "onDark" ? "bg-white/80" : "bg-accent"
          )}
        />
      </span>
      {children}
    </p>
  );
}
