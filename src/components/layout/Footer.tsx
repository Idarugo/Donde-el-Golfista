import { MapPin } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { navItems, schedule, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

const year = new Date().getFullYear();

/** Cierre minimalista: identidad, contacto y navegación, sin ruido. */
export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-cream/10 bg-forest text-cream">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-[32ch] text-sm leading-relaxed text-cream/55">
              {site.tagline}. Frutas, verduras, frutos secos y despensa seleccionados cada
              mañana en {site.address.district}.
            </p>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-3">
            <h2 className="eyebrow text-cream/60">Navegación</h2>
            <ul className="mt-5 space-y-0.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-sm text-cream/70 transition-colors duration-200 hover:text-gold-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="eyebrow text-cream/60">Horario</h2>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              {schedule.map((block) => (
                <li key={block.days}>
                  <span className="block text-cream/50">{block.days}</span>
                  {block.hours}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-cream/60">Contacto</h2>
            <ul className="mt-5 space-y-1 text-sm">
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2.5 text-cream/70 transition-colors duration-200 hover:text-gold-light"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2.5 text-cream/70 transition-colors duration-200 hover:text-gold-light"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  {site.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.address.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-start gap-2.5 text-cream/70 transition-colors duration-200 hover:text-gold-light"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[0.75rem] text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p className="tracking-[0.16em] uppercase">{site.claim}</p>
        </div>
      </div>
    </footer>
  );
}
