"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Desplazamiento total en píxeles a lo largo del recorrido. */
  distance?: number;
  /** Invierte la dirección respecto al scroll. */
  reverse?: boolean;
};

/**
 * Parallax vertical ligado al scroll. Se apaga por completo en móvil y con
 * `prefers-reduced-motion`: solo transformamos `y`, nunca layout.
 */
export function Parallax({ children, className, distance = 80, reverse = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { cinematic } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shift = reverse ? distance : -distance;
  const y = useTransform(scrollYProgress, [0, 1], [-shift, shift]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={cinematic ? { y } : undefined} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
