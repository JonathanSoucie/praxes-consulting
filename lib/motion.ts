/**
 * Small motion helpers shared by the gesture-driven components.
 *
 * There is deliberately no spring library behind these. A spring earns its
 * weight when a value is continuously re-targeted mid-flight; this site has
 * exactly one draggable surface, and the settle after a flick is a single
 * uninterrupted move to a known position. What actually matters there —
 * starting from the on-screen value, and inheriting the release velocity — is
 * done directly in the component, and costs nothing.
 */

/**
 * Where a flick would come to rest if you let it decelerate.
 *
 * This is the exponential-decay projection UIScrollView uses, not the
 * textbook `v² / 2a`. It is what makes a fast flick feel like it *throws* the
 * content: you decide the landing target from the projected endpoint rather
 * than from wherever the finger happened to lift.
 *
 * @param velocity px/s at the moment of release.
 * @param decelerationRate 0.998 is normal scroll feel; 0.99 is snappier.
 * @returns Signed distance travelled after release, in px.
 */
export function projectEndpoint(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary.
 *
 * A hard stop at the end of a list reads as "frozen" — the surface stops
 * answering. Continuous resistance reads as "still responding, but there is
 * nothing more this way", which is the honest message.
 *
 * @param overshoot How far past the bound the pointer has travelled, in px.
 * @param dimension The size of the surface being dragged, in px.
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55
) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}
