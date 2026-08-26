"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { productCategories, products, site, type Product, type ProductFilter } from "@/lib/site";
import { DURATION, EASE, spring, viewportOnce } from "@/lib/motion";
import { useMotionProfile } from "@/lib/hooks/useMotionProfile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { cx, formatPrice } from "@/lib/utils";

/**
 * SECCIÓN 04 — La selección.
 * Catálogo tipo editorial: la ficha vive dentro de la fotografía y se despliega
 * al acercarse (hover) o al enfocar con teclado.
 */
export function Products() {
  const [filter, setFilter] = useState<ProductFilter>("Todo");
  const { reduced } = useMotionProfile();

  const visible = useMemo(
    () => (filter === "Todo" ? products : products.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section id="productos" className="scroll-mt-24 bg-bone py-24 md:py-36">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04" label="La selección" />
            <MaskedHeading
              lines={["Lo que hoy", "está en el mesón."]}
              className="display-md mt-8 font-display font-normal text-ink"
            />
          </div>
          <p className="text-ink-soft lg:col-span-5">
            Precios de referencia: cambian con la temporada y con lo que llegó esa mañana.
            Lo que no cambia es el criterio con el que se eligió.
          </p>
        </div>

        {/* Filtros */}
        <div
          role="group"
          aria-label="Filtrar productos por categoría"
          className="mt-12 flex flex-wrap gap-2 border-y border-ink/10 py-4 md:mt-16"
        >
          {productCategories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={cx(
                  "relative min-h-11 cursor-pointer rounded-full px-5 py-2 text-[0.78rem] tracking-[0.1em] uppercase transition-colors duration-200",
                  isActive ? "text-cream" : "text-ink-faint hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="product-filter"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={spring}
                  />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Cuadrícula */}
        <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                index={index}
                reduced={reduced}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  reduced,
}: {
  product: Product;
  index: number;
  reduced: boolean;
}) {
  const message = encodeURIComponent(`Hola, quería consultar por ${product.name}.`);

  return (
    <motion.li
      layout
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
      viewport={viewportOnce}
      transition={{ duration: DURATION.base, ease: EASE, delay: Math.min(index, 5) * 0.05 }}
      className="group relative overflow-hidden rounded-xl bg-forest md:rounded-2xl"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 48vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        {product.wasPrice && (
          <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[0.6rem] font-semibold tracking-[0.16em] text-forest uppercase">
            Oferta
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3.5 text-cream md:p-5">
          <p className="eyebrow text-cream/55">{product.category}</p>
          <h3 className="mt-2 font-display text-lg leading-tight font-normal md:text-2xl">
            {product.name}
          </h3>

          {product.price && (
            <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm text-cream/85">
              <span className="font-medium whitespace-nowrap">
                {formatPrice(product.price)}
                {product.unit && <span className="text-cream/50"> / {product.unit}</span>}
              </span>
              {product.wasPrice && (
                <span className="whitespace-nowrap text-cream/55 line-through">
                  {formatPrice(product.wasPrice)}
                </span>
              )}
            </p>
          )}

          {/* Panel que se despliega al acercarse o enfocar */}
          <div className="product-panel">
            <div>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-cream/70">{product.note}</p>
              <a
                href={`${site.whatsapp}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[0.7rem] tracking-[0.14em] text-gold-light uppercase transition-colors duration-200 hover:text-gold"
              >
                Consultar
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
