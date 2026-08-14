/**
 * First frame of public/galaxy.mp4 at 160x90, inlined as a data URI.
 *
 * The hero paints one dithered frame from this the moment the component
 * mounts, so the panel never shows a beat of bare cream while the video
 * decodes. It is deliberately tiny: the dither samples one buffer pixel per
 * 6px output block, so 160x90 already carries more detail than the grid can
 * resolve at typical hero sizes, and 1.7KB inline always beats a second
 * network round trip.
 */
export const GALAXY_POSTER =
  "data:image/jpeg;base64," +
  "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" +
  "bGORasdp2+GVU4fKUUKSWuhUxWo//9k=";