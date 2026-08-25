import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Nothing here is served by a version-specific URL, so leaking the Next
  // version in a response header only helps someone fingerprinting the stack.
  poweredByHeader: false,
  compress: true,
  // /process was folded into the home page's "How it works" band and the
  // per-service process sections in the 2026 redesign. It had inbound links,
  // so it redirects permanently rather than 404ing.
  async redirects() {
    return [
      { source: "/process", destination: "/services/automations-audit", permanent: true },
      { source: "/services/audit", destination: "/services/automations-audit", permanent: true },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // The only raster images on the site are the team portraits. They are no
    // longer thumbnails — they fill a 4:5 card and are zoomed into on top of
    // that — so the large widths in the default deviceSizes are the ones that
    // actually get requested. This list only covers the sub-640px cases.
    imageSizes: [64, 96, 128, 160, 256, 384],
    // A year — filenames are content-hashed, so a stale cache can't serve the
    // wrong image.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
