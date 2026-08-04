import { cn } from "@/lib/utils";

/**
 * Small pill label that sits above a section headline — the section's
 * "eyebrow". Soft violet on light backgrounds, translucent white on the
 * dark gradient.
 */
export function Badge({
  children,
  tone = "soft",
  className,
}: {
  children: React.ReactNode;
  tone?: "soft" | "onDark" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium",
        tone === "soft" && "bg-accent-soft text-accent-ink",
        tone === "onDark" &&
          "border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm",
        tone === "outline" && "border border-line-strong bg-surface text-muted",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "onDark" ? "bg-white/70" : "bg-accent"
        )}
      />
      {children}
    </span>
  );
}
