/**
 * Presentación principal de la portada.
 *
 * @packageDocumentation
 */

import Image from "next/image";

import { Button } from "./Button";
import { HERO_IMAGE } from "./editorial-images";
import { Container } from "./Container";
import { HeroTabs } from "./HeroTabs";
import { HERO_TAB_SECTIONS } from "./store-sections";

/** `id` del hero; el sub-header lo observa para saber cuándo aparecer. */
export const HERO_ID = "inicio";

/**
 * Muestra el hero partido: a la izquierda un bloque de color con etiqueta, titular sobre el
 * origen del café, subtítulo y la acción del bloque (ir a la sección Café); a la derecha, la foto de ambiente (`HERO_IMAGE` de
 * `editorial-images.ts`). Debajo, montada sobre el borde inferior, la barra de pestañas por
 * categoría.
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
            Café de especialidad
          </p>
          <h1
            id="hero-titulo"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-balance text-ink-900 lg:text-5xl xl:text-6xl"
          >
            De Chiapas, Veracruz y Oaxaca a tu taza
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-700">
            Tostamos en pequeños lotes cada semana para que cada bolsa llegue fresca y con todo su
            aroma.
          </p>
          <div className="mt-8">
            <Button href="/#cafe" variant="dark" className="w-full sm:w-auto">
              Conoce nuestros cafés
            </Button>
          </div>
        </div>

        {/*
          La proporción fija reserva el espacio (sin saltos de diseño). En 4:3 (celular) la foto
          cuadrada pierde una cuarta parte de su alto. La barra de pestañas tapa además los 32 px
          inferiores, así que el recorte se desplaza al 65 % vertical: con object-center la lata y
          el frasco quedaban bajo la barra. Así el grupo de productos queda centrado en la parte
          visible. Desde md (1:1) la foto se ve completa y la posición no tiene efecto.
        */}
        <div className="relative aspect-hero-compact w-full bg-neutral-200 md:aspect-hero">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-[50%_65%]"
          />
        </div>
      </div>

      <Container className="relative z-10 -mt-8">
        <HeroTabs sections={HERO_TAB_SECTIONS} />
      </Container>
    </section>
  );
}
