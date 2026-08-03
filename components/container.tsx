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
 * `tone` alternates the background so sections read as distinct registers.
 */
export function Section({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"section"> & { tone?: "default" | "muted" | "ink" }) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        tone === "muted" && "bg-surface-2",
        tone === "ink" && "bg-ink text-white",
        className
      )}
      {...props}
    />
  );
}
