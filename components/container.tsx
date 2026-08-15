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
 */
export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-20 sm:py-24 lg:py-28", className)} {...props} />
  );
}
