"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Cifra que cuenta al entrar en pantalla. Con reduced-motion muestra el valor final. */
export function Counter({ value, prefix = "", suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduced } = useMotionProfile();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: DURATION.cinematic,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{reduced ? value : display}</span>
      {suffix}
    </span>
  );
}
