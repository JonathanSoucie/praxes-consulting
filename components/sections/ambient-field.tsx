import { cn } from "@/lib/utils";
import styles from "./ambient-field.module.css";

/** Decorative CSS lighting with no video, canvas, or pointer tracking. */
export function AmbientField({
  className,
  scrim = "upper-left",
  fadeBottom = true,
  intensity = 1,
}: {
  className?: string;
  /** Keep the copy's area quiet while the light sits toward the edges. */
  scrim?: "upper-left" | "center";
  fadeBottom?: boolean;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(styles.field, fadeBottom && styles.fadeBottom, className)}
      data-placement={scrim}
      style={{ opacity: Math.max(0, Math.min(1, intensity)) }}
    >
      <div className={styles.light} />
      <div className={styles.grid} />
    </div>
  );
}
