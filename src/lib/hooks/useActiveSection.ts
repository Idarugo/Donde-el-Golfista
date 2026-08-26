"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección que el lector está recorriendo.
 *
 * Usa un modelo de "última sección cruzada" en vez de intersección pura: entre
 * dos secciones con ancla (por ejemplo, durante el tramo narrativo del golf)
 * no hay ninguna visible, y con IntersectionObserver el indicador se quedaba
 * congelado en un valor obsoleto. Aquí siempre hay una respuesta correcta.
 *
 * La lectura va throttled por rAF y solo consulta rects: es trabajo despreciable
 * frente a las animaciones ligadas al scroll.
 */
export function useActiveSection(ids: readonly string[], offset = 0): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // Línea de lectura: un tercio bajo el borde superior de la ventana.
      const readingLine = window.innerHeight * 0.35;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top - offset <= readingLine) {
          current = section.id;
        }
      }

      setActive(current);
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}
