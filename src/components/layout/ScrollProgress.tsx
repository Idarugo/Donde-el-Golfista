"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";

/** Hilo dorado en el borde superior: cuánto de la historia llevas recorrido. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { reduced } = useMotionProfile();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-fairway via-gold to-gold-light"
    />
  );
}
