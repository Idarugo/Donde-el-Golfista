"use client";

import { motion } from "framer-motion";
import { drawLine, viewportOnce } from "@/lib/motion";
import { cx } from "@/lib/utils";

type SectionLabelProps = {
  /** Número de "hoyo": ordena la narrativa del scroll. */
  index: string;
  label: string;
  className?: string;
  tone?: "dark" | "light";
};

export function SectionLabel({ index, label, className, tone = "dark" }: SectionLabelProps) {
  return (
    <div
      className={cx(
        "flex items-center gap-4",
        tone === "dark" ? "text-ink-faint" : "text-cream/65",
        className,
      )}
    >
      <span className="eyebrow tabular-nums">{index}</span>
      <motion.span
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={cx(
          "h-px w-10 origin-left md:w-16",
          tone === "dark" ? "bg-ink/25" : "bg-cream/30",
        )}
      />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
