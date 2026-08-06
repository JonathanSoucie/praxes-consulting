import { ImageResponse } from "next/og";

import { logoMarkSvg } from "@/lib/logo-svg";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Default Open Graph card — the hero gradient, type-driven. Individual pages
 * can override with their own opengraph-image file.
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
          backgroundImage:
            "linear-gradient(150deg, #1a0410 0%, #6e1140 55%, #d6146e 100%)",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            width={48}
            height={48}
            src={`data:image/svg+xml;base64,${Buffer.from(
              logoMarkSvg()
            ).toString("base64")}`}
          />
          <div style={{ fontSize: 30, fontWeight: 600, color: "#ffffff" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            We&apos;ll tell you when AI
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 600,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "-0.03em",
            }}
          >
            isn&apos;t worth building.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 30,
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ display: "flex" }}>AI consulting · measured ROI</div>
          <div style={{ display: "flex" }}>Free 15-minute discovery call</div>
        </div>
      </div>
    ),
    size
  );
}
