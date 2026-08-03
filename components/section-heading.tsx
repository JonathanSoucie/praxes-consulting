import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

/**
 * Standard section header: eyebrow label with a thin teal rule, a serif
 * headline, and optional deck. Used on every page so the rhythm stays exact.
 */
export function SectionHeading({
  eyebrow,
  title,
  deck,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  deck?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
}) {
  const inverse = tone === "inverse";

  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden className="h-px w-6 bg-accent" />
          <span
            className={cn(
              "label-eyebrow",
              inverse ? "text-white/60" : "text-muted"
            )}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}

      <h2
        className={cn(
          "text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]",
          inverse && "text-white"
        )}
      >
        {title}
      </h2>

      {deck ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            inverse ? "text-white/70" : "text-muted"
          )}
        >
          {deck}
        </p>
      ) : null}
    </Reveal>
  );
}
