/**
 * Avisos promocionales de ejemplo para la franja superior y sus condiciones.
 *
 * @packageDocumentation
 */

import type { Announcement } from "@/domain/announcement";

/** Monto mínimo de compra, en pesos mexicanos, para el envío gratis. */
export const FREE_SHIPPING_THRESHOLD_MXN = 899;

/** Descuento, en porcentaje, de cada entrega de la suscripción. */
export const SUBSCRIPTION_DISCOUNT_PERCENT = 10;

/** Avisos en el orden en que se muestran. Los destinos son secciones de la portada. */
export const announcements: readonly Announcement[] = [
  {
    id: "free-shipping",
    message: `Envío gratis en compras desde $${FREE_SHIPPING_THRESHOLD_MXN}`,
    href: "/#cafe",
  },
  {
    id: "machines-sale",
    message: "Hasta 18% de descuento en cafeteras seleccionadas",
    href: "/#promociones",
  },
  {
    id: "subscription",
    message: `Suscríbete y recibe ${SUBSCRIPTION_DISCOUNT_PERCENT}% de descuento en cada entrega`,
    href: "/#suscripcion",
  },
];
