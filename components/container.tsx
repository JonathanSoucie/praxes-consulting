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
 * Sections carry no background of their own. The page is one colour from the
 * hero down, and elevation is expressed by bordered cards sitting on it rather
 * than by alternating full-width bands.
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
        className,
      )}
      {...props}
    />
  );
}
