/**
 * Brand mark: two crossing rings, light pink→magenta and magenta→plum.
 * Recreated as inline SVG (not a raster import) so it stays crisp at any
 * size and the gradient always renders correctly regardless of surrounding
 * theme.
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
        <linearGradient id="logo-ring-a" x1="50" y1="8" x2="50" y2="92">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#E0399A" />
        </linearGradient>
        <linearGradient id="logo-ring-b" x1="4" y1="58" x2="96" y2="58">
          <stop offset="0%" stopColor="#E0399A" />
          <stop offset="100%" stopColor="#7A1656" />
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
