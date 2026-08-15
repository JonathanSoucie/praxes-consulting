import { cn } from "@/lib/utils";

/**
 * Small label above a headline: a bordered chip carrying a glyph and tracked
 * uppercase mono, matching the reference layout's section and hero labels.
 *
 * Square, hairline, no fill — the same card language as everything else.
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
        "inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase",
        tone === "onDark"
          ? "border-white/25 text-white/70"
          : "border-line-strong text-accent",
        className,
      )}
    >
      {/* Four-point star, the reference's own label glyph. Decorative. */}
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="size-2.5 shrink-0 fill-current"
      >
        <path d="M6 0 7.2 4.8 12 6 7.2 7.2 6 12 4.8 7.2 0 6l4.8-1.2Z" />
      </svg>
      {children}
    </p>
  );
}
