/**
 * Repositorio de productos: el único punto por el que las páginas obtienen el catálogo.
 *
 * Hoy lee los datos de ejemplo de `sample-products.ts`. Cuando exista el cliente de la
 * Storefront API, estas funciones lo consultarán y devolverán la misma forma, por lo que
 * las páginas no tendrán que cambiar. Son asíncronas desde ahora por esa razón.
 *
 * @packageDocumentation
 */

import {
  DEFAULT_RELATED_LIMIT,
  findProductByHandle,
  selectRelatedProducts,
  type Product,
} from "@/domain/product";

import { sampleProducts } from "./sample-products";

/**
 * Obtiene todo el catálogo, en el orden en que se muestra.
 *
 * @returns Los productos de la tienda.
 */
export async function getProducts(): Promise<readonly Product[]> {
  return sampleProducts;
}

/**
 * Obtiene un producto por su `handle`.
 *
 * @param handle - Segmento de URL del producto.
 * @returns El producto, o `undefined` si no existe.
 */
export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  return findProductByHandle(await getProducts(), handle);
}

/**
 * Obtiene productos de la misma categoría que el indicado, sin incluirlo.
 *
 * @param product - Producto de referencia.
 * @param limit - Máximo de productos. Por omisión {@link DEFAULT_RELATED_LIMIT}.
 * @returns Hasta `limit` productos relacionados.
 * @throws {RangeError} Si `limit` no es un entero no negativo.
 */
export async function getRelatedProducts(
  product: Product,
  limit: number = DEFAULT_RELATED_LIMIT,
): Promise<Product[]> {
  return selectRelatedProducts(await getProducts(), product, limit);
}
