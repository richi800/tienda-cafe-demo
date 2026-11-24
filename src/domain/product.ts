/**
 * Modelo de producto del catálogo, independiente de la fuente de datos.
 *
 * @packageDocumentation
 */

import type { Money } from "./money";

/**
 * Producto que la tienda puede mostrar en el catálogo.
 *
 * Es el contrato que usa la interfaz: tanto los datos de ejemplo como los que
 * lleguen de Shopify deben adaptarse a esta forma antes de llegar a los componentes.
 */
export type Product = {
  /** Identificador único del producto en la fuente de datos. */
  id: string;
  /** Segmento de URL legible y único, usado en las rutas de producto. */
  handle: string;
  /** Nombre comercial del producto. */
  title: string;
  /** Descripción breve en texto plano. */
  description: string;
  /** Precio de venta. */
  price: Money;
  /** Indica si hay existencias disponibles para comprar. */
  availableForSale: boolean;
};
