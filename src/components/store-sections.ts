/**
 * Secciones de la portada a las que saltan la barra de pestañas del hero y el sub-header.
 *
 * @packageDocumentation
 */

import type { ProductCategory } from "@/domain/product";

/** Icono asociado a una sección; cada componente lo traduce a su SVG. */
export type SectionIconName = "bean" | "machine" | "cup" | "leaf" | "tag";

/** Enlace a una sección de la portada. */
export type SectionLink = {
  /** `id` de la sección en la portada, sin `#`. */
  id: string;
  /** Texto visible. */
  label: string;
  /** Icono decorativo. */
  icon: SectionIconName;
};

/** Pestañas de la barra flotante del hero, en orden. */
export const HERO_TAB_SECTIONS: readonly SectionLink[] = [
  { id: "cafe", label: "Café", icon: "bean" },
  { id: "cafeteras", label: "Cafeteras", icon: "machine" },
  { id: "accesorios", label: "Accesorios", icon: "cup" },
  { id: "diferencia", label: "La diferencia", icon: "leaf" },
];

/** Secciones de producto que ofrece el sub-header, en orden. */
export const CATALOG_SECTIONS: readonly SectionLink[] = [
  { id: "promociones", label: "Promociones", icon: "tag" },
  { id: "cafe", label: "Café", icon: "bean" },
  { id: "cafeteras", label: "Cafeteras", icon: "machine" },
  { id: "accesorios", label: "Accesorios", icon: "cup" },
];

/**
 * Sección de la portada que corresponde a cada familia de producto. La ruta de navegación
 * de la ficha la usa para enlazar la categoría con su ancla (por ejemplo `/#cafe`).
 */
export const CATEGORY_SECTIONS: Readonly<Record<ProductCategory, SectionLink>> = {
  coffee: { id: "cafe", label: "Café", icon: "bean" },
  machines: { id: "cafeteras", label: "Cafeteras", icon: "machine" },
  accessories: { id: "accesorios", label: "Accesorios", icon: "cup" },
};
