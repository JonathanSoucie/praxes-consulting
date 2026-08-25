import { cn } from "@/lib/utils";

/**
 * The opener for a section: a tracked label, a headline, and an optional
 * standfirst.
 *
 * The colour rule lives here rather than at each call site, because it is the
 * rule most easily got wrong. Per the brand direction, the main pink is for
 * H1 and H2 and for emphasis — and only at display sizes, where its 4.0:1 on
 * the page ground clears AA for large text. So `accent` marks the *emphasised
 * fragment* of a headline, and there is no prop for tinting a whole heading:
 * a fully pink H2 is both louder than intended and, once it wraps to three
 * lines, harder to read than the ink it replaced.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  standfirst,
  align = "left",
  size = "lg",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** The emphasised tail of the headline, set in the main pink. */
  accent?: React.ReactNode;
  standfirst?: React.ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow text-muted", align === "center" && "mx-auto")}>
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          size === "lg" ? "display-lg" : "display-md",
          eyebrow && "mt-6",
        )}
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span className="text-pink-em">{accent}</span>
          </>
        ) : null}
      </Tag>
      {standfirst ? (
        <div
          className={cn(
            "mt-7 text-lg text-ink-soft sm:text-xl",
            align === "center" ? "measure-wide mx-auto" : "measure-wide",
          )}
        >
          {standfirst}
        </div>
      ) : null}
    </div>
  );
}

/** The small tracked label on its own, for places that need no heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow text-muted", className)}>{children}</p>;
}
