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
