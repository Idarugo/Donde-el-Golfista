"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { milestones } from "@/lib/site";
import { DURATION, EASE, viewportOnce } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

/**
 * SECCIÓN 06 — Nuestra historia.
 * Línea de tiempo editorial: el hilo se dibuja al ritmo del scroll y cada
 * hito entra alternando lado, como una doble página de revista.
 */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="historia" className="scroll-mt-24 bg-cream py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="06" label="Nuestra historia" />
            <MaskedHeading
              lines={["De una mesa", "en la vereda", "a un mesón propio."]}
              className="display-md mt-8 font-display font-normal text-ink"
            />
          </div>
          <p className="text-ink-soft lg:col-span-5">
            Nadie planificó esto como una marca. Se armó de a poco, cajón por cajón, con la
            gente del barrio corrigiendo el rumbo.
          </p>
        </div>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* El hilo */}
          <div className="absolute top-0 bottom-0 left-[9px] w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-fairway via-turf to-gold"
            />
            {!reduced && (
              <motion.span
                style={{ top: glowY }}
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_5px_rgba(193,157,71,0.16)]"
              />
            )}
          </div>

          <ol className="space-y-16 md:space-y-28">
            {milestones.map((milestone, index) => {
              const flipped = index % 2 === 1;
              return (
                <li key={milestone.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 left-[5px] h-2.5 w-2.5 rounded-full bg-forest ring-4 ring-cream md:left-1/2 md:-translate-x-1/2"
                  />

                  <div className="grid gap-6 pl-10 md:grid-cols-2 md:items-center md:gap-12 md:pl-0">
                    <motion.div
                      initial={reduced ? false : { opacity: 0, x: flipped ? 40 : -40 }}
                      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ duration: DURATION.base, ease: EASE }}
                      className={
                        flipped
                          ? "md:order-2 md:pl-16 md:text-left"
                          : "md:order-1 md:pr-16 md:text-right"
                      }
                    >
                      <p className="eyebrow text-fairway">{milestone.year}</p>
                      <h3 className="display-sm mt-3 font-display font-normal text-ink">
                        {milestone.title}
                      </h3>
                      <p
                        className={`mt-4 text-ink-soft ${
                          flipped ? "md:ml-0" : "md:ml-auto"
                        } max-w-[42ch]`}
                      >
                        {milestone.body}
                      </p>
                    </motion.div>

                    {milestone.image && (
                      <motion.div
                        initial={reduced ? false : { opacity: 0, scale: 1.06 }}
                        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: DURATION.slow, ease: EASE, delay: 0.12 }}
                        className={
                          flipped ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16"
                        }
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[4/5]">
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            sizes="(max-width: 768px) 88vw, 34vw"
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
