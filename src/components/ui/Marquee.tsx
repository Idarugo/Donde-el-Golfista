"use client";

import { cx } from "@/lib/utils";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Segundos por vuelta completa. */
  speed?: number;
};

/**
 * Cinta continua de texto. Se anima con CSS (no JS) para que el hilo
 * principal quede libre durante el scroll.
 */
export function Marquee({ items, className, speed = 46 }: MarqueeProps) {
  const { reduced } = useMotionProfile();
  const track = [...items, ...items];

  return (
    <div className={cx(
        "relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]",
        className,
      )} aria-hidden="true">
      <div
        className={cx("flex shrink-0 items-center", !reduced && "marquee-track")}
        style={!reduced ? { animationDuration: `${speed}s` } : undefined}
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
            <span className="eyebrow px-6 md:px-9">{item}</span>
            <span className="h-1 w-1 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}
