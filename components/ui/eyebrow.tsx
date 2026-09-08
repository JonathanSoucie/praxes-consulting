import { cn } from "@/lib/utils";

/** Plain pink section label, with no badge container or decorative glyph. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "onDark";
  className?: string;
}) {
  return (
    <p className={cn("label-section text-accent", className)}>{children}</p>
  );
}
