"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * ¿El lector pasó ya cierto umbral de scroll?
 *
 * Se usa `useSyncExternalStore` en vez de estado + efecto porque el navegador
 * restaura la posición de scroll al recargar sin emitir ningún evento: con
 * estado inicializado en `false` la barra se quedaba transparente sobre una
 * sección clara, es decir, invisible. Aquí el valor se lee siempre del DOM.
 */
export function useScrolledPast(threshold: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  // En el servidor la página siempre se sirve desde arriba.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
