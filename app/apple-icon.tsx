import { ImageResponse } from "next/og";

import { logoMarkSvg } from "@/lib/logo-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Full-bleed white — iOS applies its own rounded mask,
 * so a radius here would be clipped twice and read as a dark seam.
 */
export default function AppleIcon() {
  const svg = logoMarkSvg({ background: "#ffffff" });

  return new ImageResponse(
    (
      <img
        width={size.width}
        height={size.height}
        src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
      />
    ),
    size
  );
}
