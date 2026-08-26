"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Interruptor global de movimiento.
 *
 * Cada sección ya decide por su cuenta qué animar (ver `useMotionProfile`),
 * pero `reducedMotion="user"` garantiza que ninguna animación de transformación
 * se escape: si el sistema pide menos movimiento, Framer Motion desactiva
 * desplazamientos y escalados y conserva solo los cambios de opacidad.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
