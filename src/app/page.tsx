import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FieldToTable } from "@/components/sections/FieldToTable";
import { GolfWorld, GolfDetails } from "@/components/sections/GolfWorld";
import { Products } from "@/components/sections/Products";
import { PremiumSelection } from "@/components/sections/PremiumSelection";
import { Story } from "@/components/sections/Story";
import { Experience } from "@/components/sections/Experience";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * El orden de las secciones ES la narrativa:
 * apertura → origen del producto → el puente con el golf → la selección →
 * el estándar → la historia → la visita → el cierre.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="contenido">
        <Hero />
        <FieldToTable />
        <GolfWorld />
        <GolfDetails />
        <Products />
        <PremiumSelection />
        <Story />
        <Experience />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
