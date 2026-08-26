# Donde El Golfista — Verdulería premium

Sitio web de una sola página con experiencia de scroll cinematográfica para
**Donde El Golfista**, verdulería de Av. Santa María 185, Olivar Alto (Rancagua).

El concepto visual cruza dos mundos: *fresh produce* y *luxury golf club*.
Verde profundo de club house, verde fairway, crema editorial y detalles dorados.

## Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript (modo estricto) |
| Estilos | Tailwind CSS v4 con tokens en `@theme` |
| Animación | Framer Motion 13 |
| Iconos | lucide-react + SVG de marca propios |
| Tipografía | Playfair Display (display) + Inter (texto), vía `next/font` |

## Puesta en marcha

```bash
npm install
npm run dev
```

Otros comandos: `npm run build`, `npm start`, `npm run lint`.

## Arquitectura

```
src/
├── app/
│   ├── layout.tsx        Fuentes, metadatos, JSON-LD de negocio local
│   ├── page.tsx          Composición: el orden de secciones ES la narrativa
│   └── globals.css       Tokens de marca, base, utilidades editoriales
├── components/
│   ├── layout/           Navbar, MobileMenu, ScrollProgress, Footer, MotionProvider
│   ├── sections/         Una sección = un capítulo del scroll
│   └── ui/               Primitivas reutilizables (Reveal, MaskedHeading, Parallax…)
└── lib/
    ├── site.ts           Contenido y datos del negocio (fuente única de verdad)
    ├── motion.ts         Vocabulario de movimiento: curvas, duraciones, variantes
    ├── utils.ts          cx() y formato de precios en CLP
    └── hooks/            useMotionProfile, useActiveSection, useScrolledPast
```

### La narrativa del scroll

| # | Sección | Gesto |
|---|---|---|
| 01 | Hero | La imagen hace zoom y se desenfoca mientras el texto se eleva |
| 02 | Del campo a tu mesa | Los productos orbitan alrededor del green |
| 03 | El mundo del golf | Una hoja se abre en círculo hasta volverse green |
| — | Pilares | Precisión, constancia, cercanía |
| 04 | La selección | Catálogo con ficha desplegable y filtro por categoría |
| 05 | Selección premium | Aire, tipografía grande y cifras animadas |
| 06 | Nuestra historia | Línea de tiempo que se dibuja al ritmo del scroll |
| 07 | La experiencia | Horarios, dirección y surtido |
| 08 | El cierre | Atardecer en el campo, retomando la luz del hero |

## Decisiones que conviene conocer

- **Movimiento adaptativo.** `useMotionProfile()` decide cuánta animación se
  permite según viewport y `prefers-reduced-motion`. En móvil se apagan parallax
  y desenfoques; el relato se mantiene, el coste no. `MotionProvider` añade una
  red de seguridad global con `reducedMotion="user"`.
- **Sección activa por "última cruzada".** Entre secciones con ancla hay tramos
  narrativos sin `id`; con `IntersectionObserver` puro el indicador se congelaba.
- **Navbar con `useSyncExternalStore`.** El navegador restaura el scroll al
  recargar sin emitir evento: con estado en `false` la barra quedaba crema sobre
  crema, es decir, invisible.
- **Ficha de producto en CSS plano.** `grid-rows-[0fr]` no genera regla en
  Tailwind v4, y en táctil no hay hover que abra la ficha: por eso
  `.product-panel` vive en `globals.css` y solo se colapsa bajo
  `@media (hover: hover)`.
- **Un solo juego de imágenes.** Móvil y escritorio comparten marcado y solo
  cambia el posicionamiento; duplicarlo obligaba a descargar cada foto dos veces.

## Accesibilidad y rendimiento

Verificado en 375 / 768 / 1024 / 1440 px:

- Sin scroll horizontal en ningún breakpoint.
- Contraste AA: `ink-faint` 5.19:1 sobre crema; sin tonos por debajo de 4.5:1.
- Áreas táctiles de 44 px como mínimo; foco visible en toda la navegación.
- Todas las imágenes con texto alternativo descriptivo; enlace de salto al contenido.
- Carga inicial ≈ 606 KB (203 KB JS, 303 KB imágenes AVIF, 85 KB fuentes).

## Créditos de imágenes

Fotografías de [Unsplash](https://unsplash.com) bajo su licencia libre, servidas
localmente desde `public/images` y optimizadas por `next/image` (AVIF/WebP).
# Donde-el-Golfista
