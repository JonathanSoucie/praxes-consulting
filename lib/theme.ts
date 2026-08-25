/**
 * The site renders in one palette. There is no toggle and no OS following —
 * app/globals.css defines one light palette; there is no second half to switch to.
 *
 * This constant exists for the third-party booking embeds, which paint
 * themselves inside an iframe and have to be told which palette to use.
 */
export const SITE_THEME = "light";
