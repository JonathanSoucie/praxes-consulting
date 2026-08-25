import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * The default social card.
 *
 * The site's own opening image: the horizon on the black ground, with the
 * headline over it. Drawn with layout primitives rather than an <img>, so it
 * regenerates whenever the copy changes and never goes stale against the page
 * it represents.
 *
 * Satori (which renders this) has no access to the self-hosted display face
 * and does not support every CSS property — notably no `gap` shorthand
 * ambiguity, no background-clip on text. So the type here is system sans and
 * the pink emphasis is a coloured span rather than a gradient. That is a
 * deliberate limit: a card that fails to render is worse than one set in a
 * substitute face.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#181818",
        padding: "72px 80px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* The horizon. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 315,
          height: 2,
          background:
            "linear-gradient(90deg, rgba(24,24,24,0) 0%, #b5115b 22%, #f8206d 46%, #ff6e9e 50%, #f8206d 54%, #b5115b 78%, rgba(24,24,24,0) 100%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#f8206d",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 30, fontWeight: 600, color: "#fafafa" }}>
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 82,
            lineHeight: 1.02,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.035em",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span>Every business has a&nbsp;</span>
          <span style={{ color: "#ff6e9e" }}>black hole</span>
          <span>.</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#c6c0c3",
            maxWidth: 880,
          }}
        >
          {site.tagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "#989296",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {site.address.locality}, {site.address.region}
      </div>
    </div>,
    { ...size },
  );
}
