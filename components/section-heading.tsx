import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Standard section header: a pill eyebrow, a display headline, optional deck.
 * Centred by default — the reference layout leads with centred section heads
 * and reserves left-alignment for two-column text sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  deck,
  align = "center",
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
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={inverse ? "onDark" : "default"} className="mb-5">
          {eyebrow}
        </Eyebrow>
      ) : null}

      {/* Uppercase display serif in the accent, per the reference layout.
          --color-accent is the text-safe accent (5.7:1 light / 7.1:1 dark),
          not --color-accent-bright, which is documented decoration-only. */}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.06] uppercase sm:text-4xl lg:text-[2.875rem]",
          inverse ? "text-white" : "text-accent",
        )}
      >
        {title}
      </h2>

      {deck ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            centered ? "mx-auto max-w-2xl" : "max-w-xl",
            inverse ? "text-white/70" : "text-muted",
          )}
        >
          {deck}
        </p>
      ) : null}
    </Reveal>
  );
}
