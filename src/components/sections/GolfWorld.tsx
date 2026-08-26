"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const beats = [
  { text: "Una hoja.", range: [0.04, 0.16, 0.28] },
  { text: "Un green.", range: [0.36, 0.5, 0.62] },
  { text: "La misma obsesión.", range: [0.68, 0.8, 0.95] },
] as const;

/**
 * SECCIÓN 03 — El mundo del golf.
 * La macro de una hoja se abre en círculo hasta convertirse en el green:
 * el puente visual entre la huerta y el campo. Toda la animación va ligada
 * al scroll, sin secuestrarlo.
 */
export function GolfWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced, cinematic } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // La hoja retrocede mientras el green se abre
  const leafScale = useTransform(scrollYProgress, [0, 0.55], [1.25, 1]);
  const leafBlurValue = useTransform(scrollYProgress, [0.2, 0.6], [0, 9]);
  const leafBlur = useMotionTemplate`blur(${leafBlurValue}px)`;

  const revealRadius = useTransform(scrollYProgress, [0.18, 0.62], [0, 82]);
  const clip = useMotionTemplate`circle(${revealRadius}% at 50% 50%)`;

  const greenScale = useTransform(scrollYProgress, [0.18, 1], [1.3, 1.02]);
  const veil = useTransform(scrollYProgress, [0.55, 1], [0.2, 0.62]);
  const outroY = useTransform(scrollYProgress, [0.7, 1], [40, 0]);
  const outroOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);

  if (reduced) {
    return (
      <section className="bg-forest py-24 text-cream md:py-32">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionLabel index="03" label="El mundo del golf" tone="light" />
            <h2 className="display-md mt-8 font-display font-normal">
              De la hoja al green.
            </h2>
            <p className="lede mt-6 text-cream/75">
              Un green se corta a tres milímetros y se revisa todos los días. Una lechuga se
              elige por el mismo motivo: porque el detalle se nota al final, en la mesa.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image src="/images/p-lechuga.jpg" alt="Lechuga mantecosa vista de cerca" fill sizes="45vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image src="/images/golf-green.jpg" alt="Green de golf con la bandera al fondo" fill sizes="45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[300vh] bg-forest">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Capa 1 — la hoja */}
        <motion.div
          style={{ scale: leafScale, filter: cinematic ? leafBlur : undefined }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/p-lechuga.jpg"
            alt="Lechuga mantecosa vista de muy cerca, con la tierra aún en las hojas"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Capa 2 — el green se abre en círculo */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale: greenScale }} className="absolute inset-0 will-change-transform">
            <Image
              src="/images/golf-green.jpg"
              alt="Green de golf perfectamente cortado con la bandera al fondo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-forest" />
        <div className="grain absolute inset-0" />

        {/* Capa 3 — los tres tiempos del relato */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {beats.map((beat) => (
            <Beat key={beat.text} progress={scrollYProgress} beat={beat} />
          ))}
        </div>

        {/* Capa 4 — cierre de la sección */}
        <motion.div
          style={{ y: outroY, opacity: outroOpacity }}
          className="absolute inset-x-0 bottom-0 pb-14 text-cream md:pb-20"
        >
          <div className="shell grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5">
              <SectionLabel index="03" label="El mundo del golf" tone="light" />
              <h2 className="display-sm mt-5 font-display font-normal">
                Tres milímetros de diferencia.
              </h2>
            </div>
            <p className="text-cream/75 md:col-span-6 md:col-start-7">
              Un green se corta a tres milímetros y se revisa cada mañana. Nosotros elegimos la
              verdura con esa misma manía por el detalle: porque el trabajo invisible es
              exactamente lo que se nota después, en la mesa.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

type BeatProps = {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  beat: (typeof beats)[number];
};

function Beat({ progress, beat }: BeatProps) {
  const [start, peak, end] = beat.range;
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(progress, [start, end], [30, -30]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="display-md absolute text-center font-display font-normal text-cream drop-shadow-[0_12px_40px_rgba(8,23,15,0.65)]"
    >
      {beat.text}
    </motion.p>
  );
}

/** Bloque editorial que continúa el relato ya en tierra firme. */
export function GolfDetails() {
  return (
    <section className="bg-forest pb-24 text-cream md:pb-36">
      <div className="shell">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 border-t border-cream/12 pt-14 md:grid-cols-3 md:gap-10"
        >
          {[
            { title: "Precisión", body: "Ningún cajón se pone en el mesón sin revisar pieza por pieza." },
            { title: "Constancia", body: "Seis días a la semana, con reposición diaria y precio escrito a mano." },
            { title: "Cercanía", body: "Le decimos cuál palta abrir hoy y cuál guardar para el jueves." },
          ].map((pillar) => (
            <motion.div key={pillar.title} variants={fadeUp}>
              <h3 className="font-display text-2xl font-normal">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{pillar.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="mt-16 grid grid-cols-2 gap-4 md:mt-24 md:grid-cols-3 md:gap-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[3/4]">
            <Image src="/images/golf-balls.jpg" alt="Dos pelotas de golf sobre césped recién cortado" fill sizes="(max-width: 768px) 45vw, 30vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[3/4]">
            <Image src="/images/golf-hole.jpg" alt="Pelota junto al hoyo, vista cenital" fill sizes="(max-width: 768px) 45vw, 30vw" className="object-cover" />
          </div>
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl md:col-span-1 md:aspect-[3/4]">
            <Image src="/images/harvest-dark.jpg" alt="Manos cosechando verduras sobre fondo oscuro" fill sizes="(max-width: 768px) 92vw, 30vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
