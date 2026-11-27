/**
 * Rutas hacia las fichas de producto, definidas en un solo lugar.
 *
 * @packageDocumentation
 */

/**
 * Ruta de la ficha de un producto.
 *
 * @param handle - Segmento de URL del producto.
 * @returns La ruta `/productos/<handle>`.
 */
export function productHref(handle: string): string {
  return `/productos/${encodeURIComponent(handle)}`;
}
