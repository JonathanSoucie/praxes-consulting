import { cn } from "@/lib/utils";

/**
 * Small label above a section headline. Deliberately plain text — no pill,
 * no chip, no background.
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
        "text-xs font-medium tracking-[0.14em] uppercase",
        tone === "onDark" ? "text-white/55" : "text-muted",
        className
      )}
    >
      {children}
    </p>
  );
}
