/**
 * Presentación principal de la portada.
 *
 * @packageDocumentation
 */

import Image from "next/image";

import { Button } from "./Button";
import { Container } from "./Container";
import { HeroTabs } from "./HeroTabs";
import { HERO_TAB_SECTIONS } from "./store-sections";

/** `id` del hero; el sub-header lo observa para saber cuándo aparecer. */
export const HERO_ID = "inicio";

/**
 * Foto de ambiente del hero, con sus medidas reales. Es una imagen editorial de la portada: no
 * representa a ningún producto del catálogo.
 */
export const HERO_IMAGE = {
  src: "/imagenes/portada/set-caja-lata.webp",
  alt: "Caja de café en grano, lata negra de café molido y cuchara medidora verde sobre fondo gris claro",
  width: 896,
  height: 896,
} as const;

/**
 * Muestra el hero partido: a la izquierda un bloque de color con categoría, titular,
 * novedad y la acción del bloque; a la derecha, la foto de ambiente ({@link HERO_IMAGE}). Debajo, montada sobre el borde inferior, la barra de pestañas por categoría.
 *
 * En celular el bloque de texto va arriba y la imagen abajo; desde `md` quedan en dos
 * columnas de igual ancho.
 *
 * @returns La sección de bienvenida con el único `h1` de la portada.
 */
export function Hero() {
  return (
    <section id={HERO_ID} aria-labelledby="hero-titulo" className="bg-white">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-clay-200 px-gutter pt-12 pb-16 md:px-12 md:py-16 xl:px-16">
          <p className="text-sm font-semibold tracking-wide text-ink-700 uppercase">
            Cafeteras de espresso
          </p>
          <h1
            id="hero-titulo"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-balance text-ink-900 lg:text-5xl xl:text-6xl"
          >
            Tu barra de café, en casa
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-700">
            Nueva Ladera Pro: espresso de 15 bares y vaporizador para leche, en tres acabados.
          </p>
          <div className="mt-8">
            <Button href="/#cafeteras" variant="dark" className="w-full sm:w-auto">
              Conoce la Ladera Pro
            </Button>
          </div>
        </div>

        {/*
          La proporción fija reserva el espacio (sin saltos de diseño). En celular (4:3) la foto
          cuadrada se recorta arriba y abajo por igual con object-center, para no cortar el texto
          de la caja; desde md (1:1) se ve completa.
        */}
        <div className="relative aspect-hero-compact w-full bg-neutral-200 md:aspect-hero">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-center"
          />
        </div>
      </div>

      <Container className="relative z-10 -mt-8">
        <HeroTabs sections={HERO_TAB_SECTIONS} />
      </Container>
    </section>
  );
}
