"use client";

import { motion } from "framer-motion";
import { createElement } from "react";
import { maskWord, stagger, viewportOnce } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { cx } from "@/lib/utils";

type MaskedHeadingProps = {
  /** Cada string es una línea; se anima palabra a palabra. */
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Anima al montar en vez de al entrar en viewport (para el hero). */
  immediate?: boolean;
};

/**
 * Titular editorial: las palabras suben desde detrás de una máscara.
 * Es el gesto tipográfico firma del sitio; se usa una vez por sección.
 */
export function MaskedHeading({
  lines,
  className,
  lineClassName,
  as = "h2",
  delay = 0,
  immediate = false,
}: MaskedHeadingProps) {
  const { reduced } = useMotionProfile();

  if (reduced) {
    return createElement(
      as,
      { className },
      lines.map((line) => (
        <span key={line} className={cx("block", lineClassName)}>
          {line}
        </span>
      )),
    );
  }

  const animation = immediate
    ? ({ animate: "visible" } as const)
    : ({ whileInView: "visible", viewport: viewportOnce } as const);

  return (
    <motion.div
      variants={stagger(0.09, delay)}
      initial="hidden"
      {...animation}
      className={className}
    >
      {createElement(
        as,
        { className: "contents" },
        lines.map((line) => (
          <span key={line} className={cx("block overflow-hidden pb-[0.08em]", lineClassName)}>
            <motion.span variants={maskWord} className="block will-change-transform">
              {line}
            </motion.span>
          </span>
        )),
      )}
    </motion.div>
  );
}
