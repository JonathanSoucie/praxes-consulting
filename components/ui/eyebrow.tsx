import { cn } from "@/lib/utils";

/** Plain pink section label, with no badge container or decorative glyph. */
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
        "font-sans text-[0.8125rem] leading-normal font-medium tracking-[0.02em]",
        tone === "onDark" ? "text-[#ffa3c2]" : "text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}
