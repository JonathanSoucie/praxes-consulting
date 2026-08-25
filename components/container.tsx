import { cn } from "@/lib/utils";

/** Page gutter + max width. Wraps the body of every section. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}

/** The wider gutter, for full-bleed bands that still align to the grid. */
export function ContainerWide({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("container-wide", className)} {...props} />;
}

/**
 * A full-width band with the site's vertical rhythm.
 *
 * `tone` decides which ground the band sits on, and that decision is the
 * site's main structural device rather than a styling preference: white is
 * the business working, black is the black hole. `on-deep` (globals.css)
 * redefines the colour tokens inside the band, so children written for the
 * light ground land correctly inside a dark one without knowing where they
 * are.
 */
export function Section({
  className,
  tone = "light",
  size = "default",
  ...props
}: React.ComponentProps<"section"> & {
  tone?: "light" | "deep";
  size?: "default" | "sm" | "none";
}) {
  return (
    <section
      className={cn(
        size === "default" && "section-y",
        size === "sm" && "section-y-sm",
        tone === "deep" && "on-deep",
        className,
      )}
      {...props}
    />
  );
}
