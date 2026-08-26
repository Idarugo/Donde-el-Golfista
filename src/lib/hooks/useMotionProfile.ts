"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type MotionProfile = {
  /** El usuario pidió menos movimiento en su sistema. */
  reduced: boolean;
  /** Viewport pequeño: reducimos parallax y capas para proteger el rendimiento. */
  compact: boolean;
  /** Atajo: ¿podemos permitirnos animación scroll-linked completa? */
  cinematic: boolean;
};

const COMPACT_QUERY = "(max-width: 767px)";

/**
 * Una sola fuente de verdad para decidir cuánta animación se permite.
 * En móvil y con `prefers-reduced-motion` el sitio sigue contando la misma
 * historia, pero sin transformaciones caras ligadas al scroll.
 */
export function useMotionProfile(): MotionProfile {
  const reduced = useReducedMotion() ?? false;
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { reduced, compact, cinematic: !reduced && !compact };
}
