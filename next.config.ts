import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero: la web es muy fotográfica y el ahorro es sustancial.
    formats: ["image/avif", "image/webp"],
    // Las fotos del catálogo no cambian: se cachean un año.
    minimumCacheTTL: 31_536_000,
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2048],
    // Next 16 solo sirve las calidades declaradas aquí: 50 para texturas
    // decorativas, 75 por defecto, 85 para la fotografía protagonista.
    qualities: [50, 75, 85],
  },
  experimental: {
    // Evita arrastrar los barrels completos de estas librerías al cliente.
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
