import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — generated so there is no binary asset to keep in sync. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f766e",
          color: "#ffffff",
          fontSize: 22,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.02em",
        }}
      >
        P
      </div>
    ),
    size
  );
}
