import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Nothing here is served by a version-specific URL, so leaking the Next
  // version in a response header only helps someone fingerprinting the stack.
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // The only raster images on the site are the team portraits, capped at
    // 160px CSS. Trimming the generated set keeps the build and the image
    // cache small instead of producing a dozen unused widths per photo.
    imageSizes: [64, 96, 128, 160, 256, 384],
    // A year — filenames are content-hashed, so a stale cache can't serve the
    // wrong image.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
