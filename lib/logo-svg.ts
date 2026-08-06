/**
 * The brand mark as a standalone SVG string, for the contexts that render
 * outside React — the generated favicon and the Apple touch icon.
 *
 * Geometry and colours must stay in step with
 * components/layout/logo-mark.tsx.
 */
export function logoMarkSvg({
  background,
  radius = 0,
}: {
  /** Fill behind the mark. Omit for a transparent icon. */
  background?: string;
  /** Corner radius of that fill, in the 116-unit canvas. */
  radius?: number;
} = {}) {
  // The mark overflows a 0–100 box slightly, so the canvas is padded by 8
  // on every side to keep the rings off the edge.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 116 116">
${
  background
    ? `<rect x="-8" y="-8" width="116" height="116" rx="${radius}" fill="${background}"/>`
    : ""
}
<defs>
<linearGradient id="a" gradientUnits="userSpaceOnUse" x1="50" y1="8" x2="50" y2="92">
<stop offset="0%" stop-color="#F9A8D4"/><stop offset="100%" stop-color="#E0399A"/>
</linearGradient>
<linearGradient id="b" gradientUnits="userSpaceOnUse" x1="4" y1="58" x2="96" y2="58">
<stop offset="0%" stop-color="#E0399A"/><stop offset="100%" stop-color="#7A1656"/>
</linearGradient>
</defs>
<ellipse cx="50" cy="50" rx="26" ry="42" transform="rotate(18 50 50)" fill="none" stroke="url(#a)" stroke-width="11"/>
<ellipse cx="50" cy="58" rx="46" ry="18" transform="rotate(-14 50 58)" fill="none" stroke="url(#b)" stroke-width="11"/>
</svg>`;
}
