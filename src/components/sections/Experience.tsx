"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { assortment, schedule, site } from "@/lib/site";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { CtaLink } from "@/components/ui/CtaLink";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECCIÓN 07 — La experiencia.
 * Todo lo práctico —horario, dirección, surtido— tratado con el mismo
 * cuidado editorial que el resto del relato.
 */
export function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-24 bg-bone py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionLabel index="07" label="La experiencia" />
            <MaskedHeading
              lines={["Venga a ver", "el mesón."]}
              className="display-md mt-8 font-display font-normal text-ink"
            />
            <p className="lede mt-6 text-ink-soft">
              El pasillo es ancho, el precio está escrito a mano y siempre hay alguien
              dispuesto a decirle qué está en su mejor momento hoy.
            </p>

            <motion.dl
              variants={stagger(0.1, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-12 space-y-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10"
            >
              {schedule.map((block) => (
                <motion.div
                  key={block.days}
                  variants={fadeUp}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-bone px-5 py-5 md:px-7"
                >
                  <dt className="flex items-center gap-3 text-ink">
                    <Clock className="h-4 w-4 text-fairway" strokeWidth={1.6} aria-hidden="true" />
                    <span className="font-medium">{block.days}</span>
                  </dt>
                  <dd className="ml-7 md:ml-0">
                    <span className="font-display text-xl text-ink">{block.hours}</span>
                    {block.note && (
                      <span className="mt-0.5 block text-[0.75rem] text-ink-faint">{block.note}</span>
                    )}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <Reveal className="mt-8" delay={0.1}>
              <address className="flex items-start gap-3 text-ink-soft not-italic">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-fairway" strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <span className="block text-ink">{site.address.street}</span>
                  {site.address.district}
                  <br />
                  {site.address.city}
                </span>
              </address>

              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink
                  href={site.whatsapp}
                  variant="solid"
                  icon={<WhatsAppIcon />}
                >
                  Escribir por WhatsApp
                </CtaLink>
                <CtaLink href={site.address.maps} variant="outline">
                  Cómo llegar
                </CtaLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Parallax distance={50} className="h-full">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/market.jpg"
                  alt="Repisas de la verdulería con frutas y verduras ordenadas por variedad"
                  fill
                  sizes="(max-width: 1024px) 92vw, 32rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/55 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl text-cream">
                  {site.claim}
                </p>
              </div>
            </Parallax>
          </div>
        </div>

        {/* Surtido */}
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 grid gap-8 border-t border-ink/10 pt-12 md:mt-28 md:grid-cols-2 lg:grid-cols-4"
        >
          {assortment.map((group) => (
            <motion.div key={group.title} variants={fadeUp}>
              <h3 className="font-display text-xl font-normal text-ink">{group.title}</h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-faint">{group.items}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
