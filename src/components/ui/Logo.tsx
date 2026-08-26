import { cx } from "@/lib/utils";

/**
 * Emblema de la marca: el green, la bandera y la hoja en un solo trazo.
 * Hereda `currentColor` para funcionar sobre fondo claro y oscuro.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cx("h-full w-full", className)}
    >
      <circle cx="20" cy="20" r="18.6" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <circle cx="20" cy="20" r="15.4" stroke="currentColor" strokeWidth="0.7" opacity="0.28" />
      {/* El green */}
      <path
        d="M7.5 27.2C12 23.4 16 21.7 20 21.7s8 1.7 12.5 5.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Asta y banderín */}
      <path d="M23.2 26.4V10.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M23.2 10.6l7.4 2.6-7.4 2.6z" fill="currentColor" />
      {/* La hoja */}
      <path
        d="M11.4 26.1c-.6-5.2 2.9-8.2 7.2-8.6.5 5.2-2.6 8.5-7.2 8.6z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path d="M12.6 25.4l5.4-6.6" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  );
}

/** Logotipo completo: emblema + nombre en dos líneas. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cx("flex items-center gap-3", className)}>
      <span className="h-9 w-9 shrink-0 md:h-10 md:w-10">
        <LogoMark />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.9rem] tracking-[0.14em] uppercase md:text-[0.95rem]">
            Donde el Golfista
          </span>
          <span className="eyebrow mt-1 text-[0.5rem] opacity-60 md:text-[0.55rem]">
            Verdulería premium
          </span>
        </span>
      )}
    </span>
  );
}
