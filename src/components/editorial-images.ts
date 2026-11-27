/**
 * Fotos editoriales de la portada. Son recursos gráficos fijos, como los textos del hero, y no
 * datos de productos: la información y las fotos de cada producto vendrán de Shopify. Las
 * medidas son las reales de cada archivo.
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

/** Bolsa de café en grano; miniatura de la categoría Café. */
export const COFFEE_SECTION_IMAGE: ProductImage = {
  src: "/imagenes/productos/cafe-bolsa-ladera.webp",
  alt: "Bolsa blanca resellable de café con grano tostado visible",
  width: 1200,
  height: 1200,
};

/** Cafetera de espresso, para el banner y la miniatura de Cafeteras. */
export const ESPRESSO_MACHINE_IMAGE: ProductImage = {
  src: "/imagenes/secciones/cafeteras-espresso.webp",
  alt: "Cafetera de espresso gris grafito con frente de acero, manómetro, portafiltro de mango negro y una taza blanca con espresso",
  width: 1200,
  height: 1200,
};

/** Cafetera de goteo, para el banner de Cafeteras. */
export const DRIP_MACHINE_IMAGE: ProductImage = {
  src: "/imagenes/secciones/cafeteras-goteo.webp",
  alt: "Cafetera de goteo negra con depósito de agua translúcido y jarra térmica de acero inoxidable",
  width: 1200,
  height: 1200,
};

/** Tazas de espresso, para el banner y la miniatura de Accesorios. */
export const CUPS_IMAGE: ProductImage = {
  src: "/imagenes/secciones/accesorios-tazas.webp",
  alt: "Dos tazas blancas de espresso con plato, una de ellas con café y crema",
  width: 1200,
  height: 1200,
};

/** Todas las fotos editoriales, para revisarlas juntas en las pruebas. */
export const EDITORIAL_IMAGES: readonly ProductImage[] = [
  HERO_IMAGE,
  ORIGIN_IMAGE,
  COFFEE_SECTION_IMAGE,
  ESPRESSO_MACHINE_IMAGE,
  DRIP_MACHINE_IMAGE,
  CUPS_IMAGE,
];
