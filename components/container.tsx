import { cn } from "@/lib/utils";

/**
 * Page gutter + max width. Wraps the body of every section.
 *
 * `wide` drops back to a minimal gutter — just enough to clear the fixed
 * frame. Body copy sits inside the generous --gutter margin; the navbar, the
 * home hero and the page mastheads opt out of it so they still run edge to
 * edge. Two utilities rather than one with an override, because tailwind-merge
 * has no way to know these two set the same property.
 */
export function Container({
  className,
  wide = false,
  ...props
}: React.ComponentProps<"div"> & { wide?: boolean }) {
  return (
    <div
      className={cn(wide ? "container-wide" : "container-page", className)}
      {...props}
    />
  );
}

/**
 * A full-width band with consistent vertical rhythm.
 *
 * tone:
 *   default — the lavender page background
 *   card    — a white band, for sections that should feel lifted
 *   wash    — a soft lavender gradient, used as relief between white bands
 *   deep    — the dark indigo gradient (closing CTA)
 */
export function Section({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "default" | "card" | "wash" | "deep";
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        tone === "card" && "bg-surface",
        tone === "wash" && "gradient-wash",
        tone === "deep" && "gradient-deep text-white",
        className
      )}
      {...props}
    />
  );
}
