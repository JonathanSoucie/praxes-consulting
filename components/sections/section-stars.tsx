import { STAR_COLOR, starField } from "@/components/sections/hole-geometry";

/** Static stars use the same geometry as the hero, with no animation or media. */
export function SectionStars({ seed }: { seed: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(transparent, #000 12%, #000 85%, transparent)",
      }}
    >
      {starField(85, seed).map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.d}px`,
            height: `${star.d}px`,
            opacity: star.a * 0.7,
            backgroundColor: STAR_COLOR,
          }}
        />
      ))}
    </div>
  );
}
