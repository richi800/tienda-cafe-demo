/**
 * Enlaces de la navegación principal, compartidos por el menú de escritorio y el de celular.
 *
 * @packageDocumentation
 */

/** Enlace de la navegación principal. */
export type NavItem = {
  /** Texto visible del enlace. */
  label: string;
  /** Destino del enlace. */
  href: string;
  /** `promo` pinta el enlace con el rojo de promociones. Por defecto `default`. */
  tone?: "default" | "promo";
};

/**
 * Enlaces del menú principal.
 *
 * Apuntan a secciones de la portada hasta que existan las páginas de catálogo, para no
 * publicar enlaces rotos.
 */
export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { label: "Promociones", href: "/#promociones", tone: "promo" },
  { label: "Café", href: "/#cafe" },
  { label: "Cafeteras", href: "/#cafeteras" },
  { label: "Accesorios", href: "/#accesorios" },
  { label: "Suscripción", href: "/#suscripcion" },
  { label: "¿Necesitas ayuda?", href: "/#ayuda" },
];

const TONE_CLASSES: Record<NonNullable<NavItem["tone"]>, string> = {
  default: "text-ink-700 hover:text-ink-900",
  promo: "text-promo-600 hover:text-promo-700",
};

/**
 * Clases del color de un enlace según su tono.
 *
 * @param item - Enlace de navegación.
 * @returns Las clases de color en reposo y en hover.
 */
export function navToneClassName(item: NavItem): string {
  return TONE_CLASSES[item.tone ?? "default"];
}
