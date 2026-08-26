"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Menu } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { navItems, site } from "@/lib/site";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { useScrolledPast } from "@/lib/hooks/useScrolledPast";
import { DURATION, EASE } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cx } from "@/lib/utils";

const NAV_IDS = navItems.map((item) => item.id);

/**
 * Navbar premium: nace transparente sobre el hero y, al hacer scroll,
 * se condensa en una píldora de vidrio oscuro. El indicador de sección
 * activa viaja con `layoutId`.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const condensed = useScrolledPast(64);
  const active = useActiveSection(NAV_IDS, 96);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out",
          condensed ? "px-3 pt-3 md:px-6 md:pt-4" : "px-0 pt-0",
        )}
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: condensed ? "rgba(8, 23, 15, 0.82)" : "rgba(8, 23, 15, 0)",
            borderRadius: condensed ? 999 : 0,
          }}
          transition={{ duration: DURATION.fast, ease: EASE }}
          className={cx(
            "mx-auto flex max-w-[90rem] items-center justify-between gap-6 text-cream",
            condensed
              ? "border border-cream/10 px-4 py-2.5 backdrop-blur-xl md:px-6 md:py-3"
              : "border border-transparent px-5 py-5 md:px-10 md:py-7",
          )}
        >
          <a
            href="#inicio"
            className="flex min-h-11 shrink-0 items-center rounded-sm transition-opacity duration-200 hover:opacity-80"
            aria-label={`${site.name} — ir al inicio`}
          >
            <Logo />
          </a>

          {/* Navegación de escritorio */}
          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cx(
                    "relative flex min-h-11 cursor-pointer items-center rounded-full px-4 text-[0.78rem] tracking-[0.1em] uppercase transition-colors duration-200",
                    isActive ? "text-cream" : "text-cream/60 hover:text-cream",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-cream/12"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 cursor-pointer items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[0.75rem] font-medium tracking-[0.14em] text-forest uppercase transition-colors duration-200 hover:bg-gold-light md:inline-flex"
            >
              <WhatsAppIcon />
              Pedir
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/25 transition-colors duration-200 hover:bg-cream/10 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </>
  );
}
