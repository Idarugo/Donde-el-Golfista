"use client";

import { motion } from "framer-motion";
import { EASE_SOFT } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";

/** Indicador sutil de que la historia continúa hacia abajo. */
export function ScrollCue({ label = "Desliza" }: { label?: string }) {
  const { reduced } = useMotionProfile();

  return (
    <div className="flex items-center gap-3 text-cream/70">
      <span className="eyebrow">{label}</span>
      <span className="relative h-10 w-px overflow-hidden bg-cream/25">
        {!reduced && (
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gold"
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 2.1, ease: EASE_SOFT, repeat: Infinity, repeatDelay: 0.25 }}
          />
        )}
      </span>
    </div>
  );
}
