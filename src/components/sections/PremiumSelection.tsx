"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { stats } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Counter } from "@/components/ui/Counter";
import { Parallax } from "@/components/ui/Parallax";

/**
 * SECCIÓN 05 — Selección premium.
 * Aire, tipografía grande y cifras. Aquí el sitio deja de mostrar producto
 * y empieza a afirmar un estándar.
 */
export function PremiumSelection() {
  return (
    <section className="relative overflow-hidden bg-pine py-24 text-cream md:py-40">
      <div className="grain absolute inset-0" />

      <div className="shell relative">
        <SectionLabel index="05" label="Selección premium" tone="light" />

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <MaskedHeading
              lines={["No elegimos", "productos.", "Elegimos", "calidad."]}
              className="display-md font-display font-normal"
              lineClassName="text-cream"
            />

            <motion.div
              variants={stagger(0.1, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-10 max-w-[42ch] space-y-5 md:mt-14"
            >
              <motion.p variants={fadeUp} className="lede text-cream/75">
                Trabajar con producto fresco es aceptar que la mitad del oficio consiste
                en decir que no.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm leading-relaxed text-cream/55">
                No a la caja que llegó golpeada. No al tomate que aguanta una semana pero no
                sabe a nada. No al precio bajo que después se paga en la cocina. Lo que queda
                después de todos esos noes es, exactamente, lo que encontrará en el mesón.
              </motion.p>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Parallax distance={44} className="h-full">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/produce-dark.jpg"
                  alt="Bodegón de verduras frescas sobre fondo oscuro: tomate, berenjena, rabanitos, zanahorias y repollo morado"
                  fill
                  sizes="(max-width: 1024px) 92vw, 34rem"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </div>
        </div>

        {/* Cifras */}
        <motion.dl
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-cream/12 bg-cream/12 sm:grid-cols-2 lg:grid-cols-4 md:mt-28"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="bg-pine p-6 md:p-8">
              <dd className="font-display text-[2.75rem] leading-none font-normal text-gold md:text-[3.5rem]">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
              <dt className="mt-4 text-sm font-medium text-cream">{stat.label}</dt>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-cream/50">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
