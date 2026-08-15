import { cn } from "@/lib/utils";

/**
 * The large card everything below the hero sits on.
 *
 * The page colour becomes a margin and the content rides on a raised sheet
 * inset within it — a document on a desk. The hero stays outside and full
 * bleed, so the field still runs edge to edge above the card.
 *
 * The inset is the same colour as the fixed frame (components/layout/
 * frame.tsx), so the two read as one continuous margin rather than as a mat
 * and a gap that happen to meet.
 *
 * `card-surfaces` shifts the surface tokens up one step for everything inside
 * (see globals.css). Without it every `bg-surface` card in the page would be
 * exactly the colour of the card it is sitting on and disappear; with it, all
 * the existing sections and cards keep working untouched.
 */
export function PageCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-2.5 mb-2.5 overflow-hidden rounded-2xl bg-surface sm:mx-5 sm:mb-5 sm:rounded-3xl lg:mx-9 lg:mb-9 xl:mx-14 xl:mb-14",
        className,
      )}
    >
      <div className="card-surfaces">{children}</div>
    </div>
  );
}
