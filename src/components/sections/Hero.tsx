"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { schedule, site } from "@/lib/site";
import { DURATION, EASE } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { Marquee } from "@/components/ui/Marquee";

const claims = [
  "Frescura",
  "Calidad",
  "Buen precio",
  "Selección diaria",
  "Olivar · Rancagua",
  "Frutas y verduras",
] as const;

/**
 * SECCIÓN 01 — La apertura.
 * Al bajar, la imagen hace zoom y se desenfoca mientras el texto se eleva:
 * la sensación es la de una cámara que abandona el campo.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { cinematic } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.75], ["blur(0px)", "blur(7px)"]);
  const veil = useTransform(scrollYProgress, [0, 1], [0.55, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} id="inicio" className="relative h-[125vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Capa 1 — fotografía */}
        <motion.div
          style={cinematic ? { scale: imageScale, y: imageY, filter: imageBlur } : undefined}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/hero-fairway.jpg"
            alt="Amanecer sobre el fairway de un campo de golf, con la luz filtrándose entre los árboles"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </motion.div>

        {/* Capa 2 — velo de marca */}
        <motion.div
          style={cinematic ? { opacity: veil } : { opacity: 0.68 }}
          className="absolute inset-0 bg-gradient-to-b from-forest/85 via-forest/45 to-forest"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_10%,rgba(8,23,15,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/75 via-forest/15 to-transparent" />
        <div className="grain absolute inset-0" />

        {/* Capa 3 — la trayectoria del golpe perfecto */}
        <svg
          viewBox="0 0 900 400"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-[24%] left-1/2 hidden w-[62rem] -translate-x-1/2 opacity-45 md:block"
        >
          <motion.path
            d="M40 372C168 128 372 36 596 92c118 30 196 106 250 196"
            stroke="var(--color-gold)"
            strokeWidth="1"
            strokeDasharray="2 7"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: EASE, delay: 0.8 }}
          />
          <motion.circle
            cx="596"
            cy="92"
            r="4"
            fill="var(--color-gold-light)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: DURATION.base, ease: EASE, delay: 2.4 }}
          />
        </svg>

        {/* Capa 4 — contenido */}
        <motion.div
          style={cinematic ? { y: contentY, opacity: contentOpacity } : undefined}
          className="relative flex h-full flex-col justify-end pb-[4.5rem] text-cream md:pb-24"
        >
          <div className="shell">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE, delay: 0.25 }}
              className="eyebrow mb-6 text-cream/85 md:mb-9"
            >
              <span className="block sm:inline">{site.address.district}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">Av. Santa María 185</span>
            </motion.p>

            <MaskedHeading
              as="h1"
              immediate
              delay={0.35}
              lines={["La frescura,", "perfeccionada."]}
              className="display-lg max-w-[16ch] font-display font-normal"
              lineClassName="text-cream"
            />

            <div className="mt-8 grid gap-8 border-t border-cream/15 pt-8 md:mt-12 md:grid-cols-12 md:gap-10 md:pt-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, ease: EASE, delay: 0.9 }}
                className="lede text-cream/80 md:col-span-6 lg:col-span-5"
              >
                Frutas y verduras elegidas una a una, cada mañana, con la misma precisión
                con la que se estudia un green antes del golpe.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, ease: EASE, delay: 1.05 }}
                className="flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end lg:col-span-7"
              >
                <CtaLink
                  href="#productos"
                  tone="light"
                  variant="solid"
                  icon={<ArrowDownRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
                >
                  Ver la selección
                </CtaLink>
                <CtaLink
                  href="#historia"
                  tone="light"
                  variant="outline"
                  icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
                >
                  Nuestra historia
                </CtaLink>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.slow, ease: EASE, delay: 1.35 }}
              className="mt-10 flex flex-wrap items-center justify-between gap-6 md:mt-14"
            >
              <ScrollCue />
              <p className="text-[0.8rem] text-cream/55">
                <span className="text-cream/80">Hoy abierto</span> · {schedule[0].days.toLowerCase()}{" "}
                {schedule[0].hours}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Capa 5 — cinta inferior */}
        <div className="absolute inset-x-0 bottom-0 border-t border-cream/10 bg-forest/50 py-3 text-cream/60 backdrop-blur-sm">
          <Marquee items={claims} />
        </div>
      </div>
    </section>
  );
}
