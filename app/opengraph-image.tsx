import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Default Open Graph card. Type-driven and in the brand palette — no stock
 * imagery, no gradient. Individual pages can override with their own
 * opengraph-image file.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 2, background: "#0f766e" }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6b7280",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            AI Consulting
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.08,
              color: "#111111",
              letterSpacing: "-0.02em",
            }}
          >
            AI that pays for itself.
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.08,
              color: "#6b7280",
              letterSpacing: "-0.02em",
            }}
          >
            And the numbers to prove it.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e5e5",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 34,
              color: "#111111",
            }}
          >
            {site.name}
            <span style={{ color: "#0f766e" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#6b7280",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Free 15-minute discovery call
          </div>
        </div>
      </div>
    ),
    size
  );
}
