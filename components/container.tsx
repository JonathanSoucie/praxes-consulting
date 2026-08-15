import { cn } from "@/lib/utils";

/** Page gutter + max width. Wraps the body of every section. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}

/**
 * A full-width band with consistent vertical rhythm.
 *
 * Sections no longer carry a background of their own. The page is one colour
 * throughout — surface-2 — and elevation is expressed by cards sitting on it
 * rather than by alternating full-width bands. Banding gave every page a
 * different colour depending on where you happened to be scrolled, which is
 * exactly what made the site feel like several sites.
 *
 * tone:
 *   default — inherits the page colour
 *   deep    — the dark indigo gradient, kept for the closing CTA only
 */
export function Section({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "default" | "deep";
}) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        tone === "deep" && "gradient-deep text-white",
        className
      )}
      {...props}
    />
  );
}
