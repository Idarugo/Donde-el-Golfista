import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Verdulería premium en Olivar, Rancagua`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "verdulería Rancagua",
    "frutas y verduras Olivar",
    "productos frescos Rancagua",
    "Donde el Golfista",
    "verdulería Olivar Alto",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/hero-fairway.jpg", width: 2000, height: 1250, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08170f",
};

/** Datos estructurados para búsqueda local. */
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: site.legalName,
  description: site.description,
  telephone: `+${site.phoneRaw}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Olivar",
    addressRegion: "Región de O'Higgins",
    addressCountry: "CL",
  },
  sameAs: [site.instagram],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday"],
      opens: "09:30",
      closes: "21:00",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </body>
    </html>
  );
}
