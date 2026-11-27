/**
 * Fotos editoriales de la portada. Son contenido fijo, como los textos del hero, y no
 * representan a ningún producto del catálogo. Las medidas son las reales de cada archivo.
 *
 * @packageDocumentation
 */

import type { ProductImage } from "@/domain/product";

/** Foto de ambiente del hero (1:1). */
export const HERO_IMAGE: ProductImage = {
  src: "/imagenes/portada/set-cafeteria-ladera.webp",
  alt: "Caja de café, lata azul, frasco de café frío y cuchara medidora sobre la barra de mármol de una cafetería; al fondo, una persona toma café",
  width: 1200,
  height: 1200,
};

/** Foto del cafetal para la sección "La diferencia" (4:3). */
export const ORIGIN_IMAGE: ProductImage = {
  src: "/imagenes/estilo/cafetal-4x3.webp",
  alt: "Cafetal en la pendiente de una montaña: varias personas seleccionan cereza de café sobre una mesa de madera, junto a costales de café y un letrero de madera",
  width: 1200,
  height: 900,
};

/** Todas las fotos editoriales, para revisarlas juntas en las pruebas. */
export const EDITORIAL_IMAGES: readonly ProductImage[] = [HERO_IMAGE, ORIGIN_IMAGE];
