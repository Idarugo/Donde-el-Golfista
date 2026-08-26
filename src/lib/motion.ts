import type { Transition, Variants } from "framer-motion";

/**
 * Vocabulario de movimiento de la marca.
 * Una sola curva domina todo el sitio para que el scroll se sienta como
 * una sola pieza y no como una suma de efectos.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  micro: 0.22,
  fast: 0.45,
  base: 0.75,
  slow: 1.1,
  cinematic: 1.6,
} as const;

export const spring: Transition = { type: "spring", stiffness: 220, damping: 32, mass: 0.9 };

/** Viewport compartido: dispara una sola vez, con un margen que evita el "pop". */
export const viewportOnce = { once: true, amount: 0.12, margin: "0px 0px -8% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.cinematic, ease: EASE },
  },
};

/** Contenedor con escalonado; los hijos usan `fadeUp` o `maskWord`. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/**
 * Reveal editorial: la palabra sube desde detrás de una máscara.
 * Se aplica al hijo; el padre debe tener `overflow: hidden`.
 */
export const maskWord: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

/** Línea que se dibuja (timeline, subrayados, separadores). */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};
