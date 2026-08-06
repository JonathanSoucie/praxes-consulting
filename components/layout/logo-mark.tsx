/**
 * Brand mark: two crossing rings, blue→violet and violet→pink. Recreated as
 * inline SVG (not a raster import) so it stays crisp at any size and the
 * gradient always renders correctly regardless of surrounding theme.
 *
 * The mark keeps its own fixed blue→pink gradient even though the rest of
 * the UI runs on a single pink accent — a multi-hue mark distinct from the
 * interface palette is normal for a wordmark and reads as more "designed."
 */
export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="logo-ring-a" x1="20" y1="90" x2="80" y2="10">
          <stop offset="0%" stopColor="#4C7DFF" />
          <stop offset="100%" stopColor="#9B5CF6" />
        </linearGradient>
        <linearGradient id="logo-ring-b" x1="8" y1="70" x2="92" y2="46">
          <stop offset="0%" stopColor="#9B5CF6" />
          <stop offset="100%" stopColor="#FF4FA3" />
        </linearGradient>
      </defs>

      <ellipse
        cx="50"
        cy="50"
        rx="26"
        ry="42"
        transform="rotate(18 50 50)"
        stroke="url(#logo-ring-a)"
        strokeWidth="11"
      />
      <ellipse
        cx="50"
        cy="58"
        rx="46"
        ry="18"
        transform="rotate(-14 50 58)"
        stroke="url(#logo-ring-b)"
        strokeWidth="11"
      />
    </svg>
  );
}
