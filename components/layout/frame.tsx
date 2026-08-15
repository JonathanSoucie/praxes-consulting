/**
 * The fixed frame that mats the page.
 *
 * The side bands are much heavier than the top and bottom (see --frame-x /
 * --frame-y): even on all four edges it reads as a border, weighted on the
 * verticals it reads as a margin the page sits within.
 *
 * A single element pinned to the viewport whose *border* — not its background
 * — is painted in the page colour. That leaves the middle transparent, so the
 * document scrolls underneath and is clipped by a constant band on all four
 * sides. It reads as a margin the content slides beneath rather than as a bar.
 *
 * This is what stays put now that the navbar does not: the bar scrolls away
 * with the page and the frame is the only permanent chrome.
 *
 * `pointer-events: none` is load-bearing — the element covers the entire
 * viewport, so without it nothing underneath would be clickable. It sits above
 * the header (z-50) on purpose: the bar is positioned at the frame's inner
 * edge, so they meet rather than overlap, and anything that does reach the
 * edge is trimmed by the mat instead of running into it.
 */
export function Frame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] border-surface-2"
      style={{ borderWidth: "var(--frame-y) var(--frame-x)" }}
    />
  );
}
