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
  gradient = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  deck?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  /** Paints the title in the logo's ramp instead of the flat accent. For the
      headings that name something — The Blackhole, The Rocket — not for the
      ones that merely label a section, which would spend the effect on
      "Common questions." and leave nothing to distinguish the two. */
  gradient?: boolean;
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

      {/* Heavy display grotesk in the page ink, sentence case — the
          reference sets its titles white and bold and lets the eyebrow carry
          the accent. `gradient` keeps the logo ramp for the one or two
          headings that name something rather than label a section. */}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.06] sm:text-4xl lg:text-[2.875rem]",
          inverse
            ? "text-white"
            : gradient
              ? "text-gradient animate-gradient-shift"
              : "text-ink",
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
