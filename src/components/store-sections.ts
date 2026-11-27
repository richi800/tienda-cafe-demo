/**
 * Secciones de la portada a las que saltan la barra de pestañas del hero y el sub-header.
 *
 * @packageDocumentation
 */

import type { ProductCategory, ProductImage } from "@/domain/product";

import { COFFEE_SECTION_IMAGE, CUPS_IMAGE, ESPRESSO_MACHINE_IMAGE } from "./editorial-images";

/** Icono asociado a una sección; cada componente lo traduce a su SVG. */
export type SectionIconName = "bean" | "machine" | "cup" | "leaf" | "tag";

/** Enlace a una sección de la portada. */
export type SectionLink = {
  /** `id` de la sección en la portada, sin `#`. */
  id: string;
  /** Texto visible. */
  label: string;
  /** Icono decorativo; se usa cuando no hay foto y en el desplegable del sub-header. */
  icon: SectionIconName;
  /** Foto de la miniatura redonda en pestañas y chips; si falta, se muestra el icono. */
  image?: ProductImage;
};

const COFFEE: SectionLink = { id: "cafe", label: "Café", icon: "bean", image: COFFEE_SECTION_IMAGE };
const MACHINES: SectionLink = {
  id: "cafeteras",
  label: "Cafeteras",
  icon: "machine",
  image: ESPRESSO_MACHINE_IMAGE,
};
const ACCESSORIES: SectionLink = {
  id: "accesorios",
  label: "Accesorios",
  icon: "cup",
  image: CUPS_IMAGE,
};

/** Pestañas de la barra flotante del hero, en orden. */
export const HERO_TAB_SECTIONS: readonly SectionLink[] = [
  COFFEE,
  MACHINES,
  ACCESSORIES,
  { id: "diferencia", label: "La diferencia", icon: "leaf" },
];

/** Secciones de producto que ofrece el sub-header, en orden. */
export const CATALOG_SECTIONS: readonly SectionLink[] = [
  { id: "promociones", label: "Promociones", icon: "tag" },
  COFFEE,
  MACHINES,
  ACCESSORIES,
];

/**
 * Sección de la portada que corresponde a cada familia de producto. La ruta de navegación
 * de la ficha la usa para enlazar la categoría con su ancla (por ejemplo `/#cafe`).
 */
export const CATEGORY_SECTIONS: Readonly<Record<ProductCategory, SectionLink>> = {
  coffee: COFFEE,
  machines: MACHINES,
  accessories: ACCESSORIES,
};
