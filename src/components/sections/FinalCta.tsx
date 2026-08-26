"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { DURATION, EASE } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { CtaLink } from "@/components/ui/CtaLink";

/**
 * SECCIÓN 08 — El cierre.
 * La última imagen retoma la luz del hero: la historia termina donde empezó,
 * al borde del campo.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { cinematic } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-forest">
      <motion.div
        style={cinematic ? { y, scale } : undefined}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="/images/golf-sunset.jpg"
          alt="Atardecer sobre un campo de golf con la bandera recortada contra el cielo"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-forest/72" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell flex min-h-[85vh] flex-col justify-center py-28 text-cream md:py-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.slow, ease: EASE }}
          className="eyebrow text-gold-light"
        >
          08 — El golpe final
        </motion.p>

        <MaskedHeading
          lines={["La selección", "perfecta."]}
          className="display-lg mt-8 font-display font-normal"
          lineClassName="text-cream"
        />

        <p className="lede mt-8 text-cream/75">
          Frescura, calidad y precisión. Todos los días, en {site.address.street}.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <CtaLink
            href="#productos"
            tone="light"
            variant="solid"
            icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
          >
            Descubre nuestros productos
          </CtaLink>
          <CtaLink
            href={site.whatsapp}
            tone="light"
            variant="outline"
            icon={<WhatsAppIcon />}
          >
            Conócenos
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
