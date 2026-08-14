/** Where an explicit light/dark choice is remembered. */
export const THEME_STORAGE_KEY = "praxes-theme";

/**
 * Runs before first paint, from a blocking inline <script> in the document
 * head, to re-apply a stored theme choice.
 *
 * Without this the first frame renders at the OS preference and then snaps to
 * the stored one — the classic dark-mode flash. It only has to handle the
 * explicit override: with no stored value we set nothing, and the CSS falls
 * through to `color-scheme: light dark`, which already follows the OS.
 *
 * Kept small and dependency-free because it is inlined verbatim and blocks
 * rendering.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})();`;
