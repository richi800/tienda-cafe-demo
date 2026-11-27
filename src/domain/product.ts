/**
 * Modelo de producto del catálogo, independiente de la fuente de datos, y reglas
 * puras asociadas: cálculo del descuento, búsqueda por `handle` y selección de
 * productos relacionados.
 *
 * @packageDocumentation
 */

import { parseAmount, type Money } from "./money";

/** Familias de producto del catálogo. */
export type ProductCategory = "coffee" | "machines" | "accessories";

/** Color disponible de un producto, por ejemplo el acabado de una cafetera. */
export type ColorOption = {
  /** Nombre visible del color, por ejemplo `"Grafito"`. */
  name: string;
  /** Color en hexadecimal (`#RRGGBB`) para pintar la muestra. */
  hex: string;
};

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
  /** Familia del producto; en Shopify provendrá del tipo de producto o de una colección. */
  category: ProductCategory;
  /**
   * Notas de sabor del café, en el orden en que se muestran (por ejemplo `["Chocolate", "Nuez"]`).
   * Vacío en cafeteras y accesorios. En Shopify provendrán de un metafield del producto.
   */
  flavorNotes: readonly string[];
  /** Precio de venta. */
  price: Money;
  /**
   * Precio antes del descuento. Solo existe si el producto está en promoción; equivale a
   * `compareAtPrice` de la Storefront API.
   */
  compareAtPrice?: Money;
  /** Colores disponibles, si el producto se vende en varios acabados. */
  colorOptions?: readonly ColorOption[];
  /** Indica si hay existencias disponibles para comprar. */
  availableForSale: boolean;
};

/**
 * Calcula el porcentaje de descuento entre el precio anterior y el actual.
 *
 * Se redondea hacia abajo para no anunciar un descuento mayor que el real.
 *
 * @param price - Precio de venta actual.
 * @param compareAtPrice - Precio antes del descuento; si falta, no hay descuento.
 * @returns El porcentaje entero de descuento (por ejemplo `18`), o `0` si no hay
 * precio anterior o si este no es mayor que el actual.
 * @throws {RangeError} Si algún monto no es numérico o si las monedas no coinciden.
 */
export function getDiscountPercentage(price: Money, compareAtPrice?: Money): number {
  if (compareAtPrice === undefined) {
    return 0;
  }

  if (price.currencyCode !== compareAtPrice.currencyCode) {
    throw new RangeError(
      `No se puede comparar ${price.currencyCode} con ${compareAtPrice.currencyCode}`,
    );
  }

  const current = parseAmount(price.amount);
  const previous = parseAmount(compareAtPrice.amount);

  if (previous <= current || previous <= 0) {
    return 0;
  }

  return Math.floor(((previous - current) / previous) * 100);
}

/**
 * Busca un producto por su `handle`.
 *
 * @param products - Catálogo en el que buscar.
 * @param handle - Segmento de URL del producto, tal como llega en la ruta.
 * @returns El producto con ese `handle`, o `undefined` si no existe.
 */
export function findProductByHandle(
  products: readonly Product[],
  handle: string,
): Product | undefined {
  return products.find((product) => product.handle === handle);
}

/** Máximo de productos relacionados que se sugieren por omisión. */
export const DEFAULT_RELATED_LIMIT = 3;

/**
 * Elige productos de la misma categoría que el indicado, sin incluirlo, en el orden del
 * catálogo.
 *
 * @param products - Catálogo del que elegir.
 * @param product - Producto de referencia; nunca aparece en el resultado.
 * @param limit - Máximo de productos a devolver. Por omisión {@link DEFAULT_RELATED_LIMIT}.
 * @returns Hasta `limit` productos de la misma categoría; vacío si no hay otros.
 * @throws {RangeError} Si `limit` no es un entero mayor o igual a cero.
 */
export function selectRelatedProducts(
  products: readonly Product[],
  product: Product,
  limit: number = DEFAULT_RELATED_LIMIT,
): Product[] {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new RangeError(`El límite de relacionados debe ser un entero no negativo: ${limit}`);
  }

  return products
    .filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
    .slice(0, limit);
}
