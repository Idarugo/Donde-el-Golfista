import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Tone = "dark" | "light";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  icon?: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "group/cta inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 rounded-full " +
  "px-6 py-3 text-[0.8rem] font-medium tracking-[0.14em] uppercase " +
  "transition-colors duration-200 ease-out";

const styles: Record<Tone, Record<Variant, string>> = {
  dark: {
    solid: "bg-forest text-cream hover:bg-fairway",
    outline: "border border-ink/25 text-ink hover:border-ink/70 hover:bg-ink/[0.04]",
    ghost: "text-ink hover:text-fairway",
  },
  light: {
    solid: "bg-cream text-forest hover:bg-gold",
    outline: "border border-cream/35 text-cream hover:border-cream/80 hover:bg-cream/10",
    ghost: "text-cream hover:text-gold-light",
  },
};

/**
 * CTA de marca. El hover cambia color (no escala), para que nunca
 * desplace el layout de la sección que lo contiene.
 */
export function CtaLink({
  href,
  children,
  variant = "solid",
  tone = "dark",
  className,
  icon,
  ...rest
}: CtaLinkProps) {
  const external = href.startsWith("http") || href.startsWith("tel:");

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  const classes = cx(base, styles[tone][variant], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
