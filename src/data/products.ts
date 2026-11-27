/**
 * Repositorio de productos: el único punto por el que las páginas obtienen el catálogo.
 *
 * Si están las variables de entorno de Shopify, lee el catálogo de la Storefront API. Si faltan
 * (pruebas, CI, desarrollo sin `.env.local`) o la API falla, usa los datos de ejemplo de
 * `sample-products.ts`, para que la tienda siempre tenga qué mostrar y el build no requiera
 * secretos. Las páginas reciben la misma forma (`Product`) en ambos casos.
 *
 * @packageDocumentation
 */

import { cacheLife, cacheTag } from "next/cache";

import {
  DEFAULT_RELATED_LIMIT,
  findProductByHandle,
  selectRelatedProducts,
  type Product,
} from "@/domain/product";

import { readShopifyConfig, SHOPIFY_ENV_VARS, type EnvSource } from "@/lib/shopify/config";
import { fetchShopifyProducts } from "@/lib/shopify/products";
import type { FetchLike } from "@/lib/shopify/storefront";

import { sampleProducts } from "./sample-products";

/** Etiqueta de caché del catálogo, para invalidarlo con `revalidateTag` si hace falta. */
export const PRODUCTS_CACHE_TAG = "products";

/**
 * Obtiene todo el catálogo, en el orden en que se muestra.
 *
 * Se guarda en caché con el perfil `catalog` (`next.config.ts`: se revalida cada minuto y el
 * navegador reutiliza lo que ya tiene hasta 30 s). Así las páginas se prerenderizan y Shopify
 * no se consulta en cada visita, pero un cambio hecho en el admin aparece en cerca de un minuto,
 * que es lo que necesita una demostración en vivo. Si la API falla, el respaldo de ejemplo
 * también queda en caché ese minuto.
 *
 * @returns Los productos de la tienda.
 */
export async function getProducts(): Promise<readonly Product[]> {
  "use cache";
  cacheLife("catalog");
  cacheTag(PRODUCTS_CACHE_TAG);

  return loadCatalog();
}

/**
 * Elige la fuente del catálogo: Shopify si está configurado y responde, o los datos de
 * ejemplo en cualquier otro caso. Separada de {@link getProducts} para probarla sin la
 * caché de Next.js.
 *
 * @param env - Origen de las variables de entorno; por omisión `process.env`.
 * @param fetchImpl - Implementación de `fetch`; por omisión la global.
 * @returns Los productos de la tienda.
 */
export async function loadCatalog(
  env: EnvSource = process.env,
  fetchImpl?: FetchLike,
): Promise<readonly Product[]> {
  const configured = SHOPIFY_ENV_VARS.every((name) => env[name]?.trim());

  if (!configured) {
    return sampleProducts;
  }

  try {
    return await fetchShopifyProducts(readShopifyConfig(env), fetchImpl);
  } catch (error) {
    // Solo el mensaje: nunca la configuración, que incluye el token.
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      `No se pudo leer el catálogo de Shopify; se usan los datos de ejemplo. ${message}`,
    );
    return sampleProducts;
  }
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
