/**
 * Fuente única de verdad del contenido del sitio.
 * Los datos provienen de la señalética, el perfil de Instagram y los
 * horarios publicados por el propio local.
 */

export const site = {
  name: "Donde El Golfista",
  legalName: "Donde El Golfista · Verdulería",
  tagline: "Golf & verduras frescas",
  claim: "Frescura · Calidad · Buen precio",
  description:
    "Verdulería premium en Olivar Alto, Rancagua. Frutas, verduras, frutos secos y huevos seleccionados uno a uno, con la precisión de un golpe perfecto.",
  url: "https://dondeelgolfista.cl",
  phoneDisplay: "+56 9 4148 7112",
  phoneRaw: "56941487112",
  whatsapp: "https://wa.me/56941487112",
  instagram: "https://instagram.com/donde_el_golfista_",
  instagramHandle: "@donde_el_golfista_",
  address: {
    street: "Av. Santa María 185",
    district: "Población Nueva, Olivar Alto",
    city: "Comuna de Olivar, Rancagua",
    maps: "https://maps.google.com/?q=Av.+Santa+Mar%C3%ADa+185,+Olivar,+Rancagua",
  },
} as const;

export type NavItem = { id: string; label: string };

/** El orden define también el orden narrativo del scroll. */
export const navItems: readonly NavItem[] = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "historia", label: "Nuestra historia" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
] as const;

export type Schedule = { days: string; hours: string; note?: string };

export const schedule: readonly Schedule[] = [
  { days: "Martes a viernes", hours: "14:00 — 21:00" },
  { days: "Sábado, domingo y lunes", hours: "09:30 — 21:00", note: "Jornada corrida, sin cierre" },
] as const;

export type ProductCategory = "Verduras" | "Frutas" | "Frutos secos" | "Despensa";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Descripción corta, tono editorial. */
  note: string;
  /** Precio de referencia en CLP. */
  price?: number;
  unit?: string;
  image: string;
  /** Cuando el producto está en oferta, precio anterior tachado. */
  wasPrice?: number;
};

export const products: readonly Product[] = [
  {
    slug: "zapallo",
    name: "Zapallo camote",
    category: "Verduras",
    note: "Curado al sol, pulpa densa y dulce. Se corta a pedido, nunca antes.",
    price: 1800,
    unit: "kilo",
    image: "/images/p-zapallo.jpg",
  },
  {
    slug: "brocoli",
    name: "Brócoli",
    category: "Verduras",
    note: "Cortado en la mañana. Floretes cerrados, tallo firme, verde profundo.",
    price: 1200,
    wasPrice: 1600,
    unit: "unidad",
    image: "/images/p-brocoli.jpg",
  },
  {
    slug: "tomate",
    name: "Tomate en rama",
    category: "Verduras",
    note: "Madurado en la planta. Llega con la rama puesta, como debe ser.",
    price: 1500,
    unit: "kilo",
    image: "/images/p-tomate.jpg",
  },
  {
    slug: "lechuga",
    name: "Lechuga mantecosa",
    category: "Verduras",
    note: "Hoja tierna, corazón compacto. Del huerto al mesón el mismo día.",
    price: 900,
    unit: "unidad",
    image: "/images/p-lechuga.jpg",
  },
  {
    slug: "zanahoria",
    name: "Zanahoria con hoja",
    category: "Verduras",
    note: "Con su follaje intacto: la prueba más honesta de que se sacó hoy.",
    price: 1000,
    unit: "kilo",
    image: "/images/p-zanahoria.jpg",
  },
  {
    slug: "palta",
    name: "Palta Hass",
    category: "Frutas",
    note: "Seleccionada por punto de maduración. Le decimos cuál abrir hoy.",
    price: 4900,
    unit: "kilo",
    image: "/images/p-palta.jpg",
  },
  {
    slug: "naranja",
    name: "Naranja de jugo",
    category: "Frutas",
    note: "Piel fina, peso alto. Elegidas una a una para exprimir.",
    price: 1400,
    unit: "kilo",
    image: "/images/p-naranja.jpg",
  },
  {
    slug: "frutilla",
    name: "Frutilla",
    category: "Frutas",
    note: "Temporada corta, calibre parejo. Cuando están, están perfectas.",
    price: 3200,
    unit: "kilo",
    image: "/images/p-frutilla.jpg",
  },
  {
    slug: "platano",
    name: "Plátano",
    category: "Frutas",
    note: "Se recibe verde y madura en el local. Nunca cámara, nunca apuro.",
    price: 1500,
    unit: "kilo",
    image: "/images/p-platano.jpg",
  },
  {
    slug: "kiwi",
    name: "Kiwi",
    category: "Frutas",
    note: "Firme al tacto, dulce al centro. Se prueba antes de ponerlo en el cajón.",
    price: 1600,
    unit: "kilo",
    image: "/images/p-kiwi.jpg",
  },
  {
    slug: "nueces",
    name: "Nueces y almendras",
    category: "Frutos secos",
    note: "Grano entero, sin partir. Envasado semanal para no perder crocancia.",
    price: 6900,
    unit: "kilo",
    image: "/images/p-nueces.jpg",
  },
  {
    slug: "huevos",
    name: "Huevos de campo",
    category: "Despensa",
    note: "Yema alta y anaranjada. Proveedor local, misma familia hace años.",
    price: 3500,
    unit: "docena",
    image: "/images/p-huevos.jpg",
  },
] as const;

export const productCategories = ["Todo", "Verduras", "Frutas", "Frutos secos", "Despensa"] as const;
export type ProductFilter = (typeof productCategories)[number];

export type Stat = { value: number; suffix?: string; prefix?: string; label: string; detail: string };

export const stats: readonly Stat[] = [
  { value: 6, suffix: " días", label: "Abiertos por semana", detail: "Sábado, domingo y lunes en jornada corrida." },
  { value: 40, prefix: "+", label: "Variedades en mesón", detail: "Frutas, verduras, frutos secos y despensa." },
  { value: 100, suffix: "%", label: "Selección manual", detail: "Nada se pone en el mesón sin pasar por la mano." },
  { value: 1, suffix: " día", label: "De la caja al mesón", detail: "Reposición diaria: lo que no está fresco, no se vende." },
] as const;

export type Milestone = { year: string; title: string; body: string; image?: string };

export const milestones: readonly Milestone[] = [
  {
    year: "El origen",
    title: "Una mesa en la vereda",
    body:
      "Empezó como empieza todo lo bueno: una mesa plegable frente a la casa, un mantel verde y cajones de fruta traídos esa misma mañana. Sin letrero, sin vitrina. Solo producto y palabra.",
    image: "/images/crates.jpg",
  },
  {
    year: "El apodo",
    title: "«Donde el golfista»",
    body:
      "El barrio bautizó el lugar antes que nosotros. Los clientes preguntaban por el golfista de la esquina, y el nombre se quedó. La precisión del deporte se volvió, sin querer, la forma de elegir la fruta.",
    image: "/images/hands-tomatoes.jpg",
  },
  {
    year: "El local",
    title: "Santa María 185",
    body:
      "La mesa se transformó en local. Repisas de madera, precio escrito a mano, pasillo ancho. La misma lógica de siempre, ahora bajo techo y con horario corrido el fin de semana.",
    image: "/images/market.jpg",
  },
  {
    year: "Hoy",
    title: "Una selección, no un surtido",
    body:
      "Frutas, verduras, frutos secos, huevos, carbón y artículos de aseo. Lo justo, lo bueno, y nada que no compraríamos para nuestra propia mesa.",
    image: "/images/harvest-dark.jpg",
  },
] as const;

export type Assortment = { title: string; items: string };

export const assortment: readonly Assortment[] = [
  { title: "Verduras", items: "Lechuga, repollo, brócoli, coliflor, apio, betarraga, cilantro, acelga, champiñón, cebolla, papa, zanahoria, zapallo, pimentón, ajo, tomate" },
  { title: "Frutas", items: "Plátano, naranja, mandarina, pepino de fruta, piña, frambuesa, frutilla, alcayota, palta, kiwi, limón, pomelo" },
  { title: "Frutos secos", items: "Nueces, almendras, maní confitado, legumbres seleccionadas" },
  { title: "Despensa", items: "Huevos de campo, bebidas, carbón, detergente, cloro, confort y artículos de aseo" },
] as const;
