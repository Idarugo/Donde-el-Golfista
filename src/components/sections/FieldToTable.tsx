"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DURATION, EASE, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Parallax } from "@/components/ui/Parallax";
import { LogoMark } from "@/components/ui/Logo";

/** Satélites de la composición radial: cada uno orbita a su propia velocidad. */
const orbit = [
  { src: "/images/p-tomate.jpg", alt: "Tomates en rama", pos: "md:top-[1%] md:left-[4%] md:w-[21%]", depth: 46 },
  { src: "/images/p-lechuga.jpg", alt: "Lechuga mantecosa recién cortada", pos: "md:top-[9%] md:left-[74%] md:w-[19%]", depth: -60 },
  { src: "/images/p-naranja.jpg", alt: "Naranjas de jugo en el árbol", pos: "md:top-[42%] md:left-[-1%] md:w-[16%]", depth: -34 },
  { src: "/images/p-zanahoria.jpg", alt: "Zanahorias con su follaje", pos: "md:top-[70%] md:left-[13%] md:w-[19%]", depth: 56 },
  { src: "/images/p-brocoli.jpg", alt: "Brócoli de floretes cerrados", pos: "md:top-[76%] md:left-[60%] md:w-[22%]", depth: -48 },
  { src: "/images/p-palta.jpg", alt: "Palta Hass abierta", pos: "md:top-[52%] md:left-[83%] md:w-[16%]", depth: 40 },
] as const;

/**
 * SECCIÓN 02 — Del campo a tu mesa.
 * El producto orbita alrededor del green: la huerta y el campo compartiendo
 * el mismo centro de gravedad.
 */
export function FieldToTable() {
  const ref = useRef<HTMLDivElement>(null);
  const { cinematic } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.06]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section className="relative bg-bone py-24 md:py-36 lg:py-44">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="02" label="Del campo a tu mesa" />
            <MaskedHeading
              lines={["Todo empieza", "mucho antes", "del mesón."]}
              className="display-md mt-8 font-display font-normal text-ink"
            />
          </div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-end gap-6 lg:col-span-6 lg:col-start-7"
          >
            <motion.p variants={fadeUp} className="lede text-ink-soft">
              A las cinco de la mañana la fruta todavía está fría. Se elige mirando el color,
              apretando apenas con el pulgar, oliendo el tallo. Nada llega al mesón sin haber
              pasado por esa prueba.
            </motion.p>
            <motion.p variants={fadeUp} className="max-w-[46ch] text-ink-faint">
              Es el mismo criterio con el que un jugador lee el green antes de golpear:
              paciencia, atención al detalle y una sola decisión correcta.
            </motion.p>
          </motion.div>
        </div>

        {/* Composición radial — un único juego de imágenes.
            En móvil es una cuadrícula; en escritorio, una órbita.
            Duplicar el marcado obligaba al navegador a descargar cada foto
            dos veces, así que aquí solo cambia el posicionamiento. */}
        <div ref={ref} className="relative mt-20 md:mt-28">
          <div className="relative mx-auto grid grid-cols-3 gap-3 md:block md:aspect-square md:w-full md:max-w-[62rem]">
            <div className="absolute inset-[8%] hidden rounded-full border border-ink/8 md:block" />
            <div className="absolute inset-[20%] hidden rounded-full border border-ink/6 md:block" />

            {/* Núcleo: el green visto desde arriba */}
            <motion.div
              style={cinematic ? { scale: coreScale, rotate: coreRotate } : undefined}
              className="col-span-3 md:absolute md:top-1/2 md:left-1/2 md:w-[42%] md:-translate-x-1/2 md:-translate-y-1/2"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:aspect-square md:rounded-full md:shadow-[0_40px_90px_-40px_rgba(8,23,15,0.55)]">
                <Image
                  src="/images/turf.jpg"
                  alt="Textura de césped de green de golf, recién cortado"
                  fill
                  sizes="(max-width: 767px) 100vw, 26rem"
                  quality={50}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-forest/38" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-cream md:gap-3">
                  <span className="h-8 w-8 md:h-10 md:w-10">
                    <LogoMark />
                  </span>
                  <span className="eyebrow text-cream/85">Un solo criterio</span>
                </div>
              </div>
            </motion.div>

            {/* Satélites */}
            {orbit.map((planet, index) => (
              <motion.div
                key={planet.src}
                initial={{ opacity: 0, scale: 0.72 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: DURATION.base, ease: EASE, delay: 0.08 * index }}
                className={`aspect-square md:absolute ${planet.pos}`}
              >
                <Parallax distance={planet.depth} className="h-full w-full">
                  <div className="relative h-full w-full overflow-hidden rounded-xl ring-1 ring-ink/10 md:rounded-full">
                    <Image
                      src={planet.src}
                      alt={planet.alt}
                      fill
                      sizes="(max-width: 767px) 33vw, 14rem"
                      className="object-cover"
                    />
                  </div>
                </Parallax>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
