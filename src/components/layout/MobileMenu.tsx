"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { navItems, site } from "@/lib/site";
import { DURATION, EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/Logo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: string;
};

const panel = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DURATION.base, ease: EASE, staggerChildren: 0.06, delayChildren: 0.16 },
  },
  exit: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: DURATION.fast, ease: EASE } },
} as const;

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
} as const;

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  // Bloquea el scroll del documento y permite cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          id="menu-movil"
          className="grain fixed inset-0 z-[70] flex flex-col bg-forest text-cream lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación principal"
        >
          <div className="flex items-center justify-between px-5 py-5">
            <span className="h-10 w-10 text-cream">
              <LogoMark />
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-200 hover:bg-cream/10"
            >
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
            {navItems.map((navItem, index) => (
              <motion.a
                key={navItem.id}
                variants={item}
                href={`#${navItem.id}`}
                onClick={onClose}
                aria-current={active === navItem.id ? "true" : undefined}
                className="group flex items-baseline gap-4 border-b border-cream/10 py-4 transition-colors duration-200 hover:text-gold-light"
              >
                <span className="eyebrow w-8 shrink-0 text-cream/60 tabular-nums">
                  0{index + 1}
                </span>
                <span className="font-display text-[2rem] leading-none tracking-[-0.02em]">
                  {navItem.label}
                </span>
                {active === navItem.id && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 self-center rounded-full bg-gold" />
                )}
              </motion.a>
            ))}
          </nav>

          <motion.div variants={item} className="space-y-1 px-5 pt-6 pb-10 text-sm text-cream/70">
            <p className="eyebrow mb-3 text-cream/60">Visítanos</p>
            <p>{site.address.street}</p>
            <p>{site.address.district}</p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center text-gold-light transition-colors duration-200 hover:text-gold"
            >
              {site.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
