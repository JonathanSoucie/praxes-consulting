import { ImageResponse } from "next/og";

import { logoMarkSvg } from "@/lib/logo-svg";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon — the brand mark on a white tile, generated from the shared SVG so
 * there is no binary asset to keep in sync. White rather than transparent so
 * the darker end of the mark still reads against a dark browser tab strip.
 */
export default function Icon() {
  const svg = logoMarkSvg({ background: "#ffffff", radius: 24 });

  return new ImageResponse(
    <img
      width={size.width}
      height={size.height}
      src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
    />,
    size,
  );
}
