import { ImageResponse } from "next/og";

import { logoMarkSvg } from "@/lib/logo-svg";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Transparent browser-tab icon, generated from the shared brand geometry. */
export default function Icon() {
  const svg = logoMarkSvg({ variant: "onDark" });

  return new ImageResponse(
    <img
      width={size.width}
      height={size.height}
      src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
    />,
    size,
  );
}
