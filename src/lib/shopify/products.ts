/**
 * Consulta de productos de la Storefront API y su adaptación al tipo `Product` del dominio.
 *
 * @packageDocumentation
 */

import type { Money } from "@/domain/money";
import type { Product, ProductCategory, ProductImage } from "@/domain/product";

import type { ShopifyConfig } from "./config";
import { storefrontRequest, type FetchLike } from "./storefront";

/** Máximo de productos que se piden; el catálogo de la demostración es pequeño. */
export const PRODUCTS_PAGE_SIZE = 100;

/**
 * Ancho máximo con el que se piden las fotos. Shopify las entrega a 2048 px y la tienda
 * sirve las imágenes sin optimizador (`images.unoptimized`), así que el recorte se pide
 * al CDN de Shopify.
 */
export const PRODUCT_IMAGE_MAX_WIDTH = 1200;

/** Consulta GraphQL del catálogo. */
export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!, $maxWidth: Int!) {
    products(first: $first, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        description
        productType
        availableForSale
        category {
          name
        }
        featuredImage {
          url(transform: { maxWidth: $maxWidth, preferredContentType: WEBP })
          altText
          width
          height
        }
        flavorNotes: metafield(namespace: "custom", key: "flavor_notes") {
          value
        }
        variants(first: 1) {
          nodes {
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

/** Producto tal como lo devuelve {@link PRODUCTS_QUERY}. */
export type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  availableForSale: boolean;
  category: { name: string } | null;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  } | null;
  flavorNotes: { value: string } | null;
  variants: {
    nodes: readonly {
      price: Money;
      compareAtPrice: Money | null;
    }[];
  };
};

type ProductsQueryData = {
  products: { nodes: readonly ShopifyProductNode[] };
};

/**
 * Reglas para deducir la categoría de la tienda. Se evalúan en orden sobre el nombre de la
 * categoría de la taxonomía estándar de Shopify (`category.name`) y, si falta, sobre
 * `productType`. Las máquinas van antes que el café porque sus nombres también dicen
 * "Coffee" (por ejemplo "Coffee Makers").
 */
const CATEGORY_RULES: readonly {
  pattern: RegExp;
  category: ProductCategory;
}[] = [
  {
    pattern: /maker|machine|espresso machine|cafetera|grinder|molino/i,
    category: "machines",
  },
  { pattern: /coffee|caf[eé]/i, category: "coffee" },
];

/**
 * Deduce la categoría de la tienda a partir de los datos de Shopify, sin depender de que
 * el administrador llene campos propios.
 *
 * @param categoryName - Nombre de la categoría de la taxonomía estándar, si tiene.
 * @param productType - Tipo de producto libre del admin; puede venir vacío.
 * @returns La categoría; `"accessories"` si ninguna regla coincide.
 */
export function mapCategory(
  categoryName: string | null | undefined,
  productType: string,
): ProductCategory {
  const source = [categoryName, productType].find((value) => value && value.trim() !== "") ?? "";

  return CATEGORY_RULES.find((rule) => rule.pattern.test(source))?.category ?? "accessories";
}

/**
 * Lee las notas de sabor del metafield `custom.flavor_notes`, que puede ser una lista
 * (JSON) o un texto separado por comas.
 *
 * @param value - Valor crudo del metafield.
 * @returns Las notas sin espacios sobrantes; vacío si no hay.
 */
export function parseFlavorNotes(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  let items: unknown;
  try {
    items = JSON.parse(value);
  } catch {
    items = value.split(",");
  }

  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

/**
 * Normaliza el precio anterior: Shopify puede mandar `null` o un monto de 0 cuando no hay
 * descuento.
 *
 * @param compareAtPrice - Precio anterior de la variante.
 * @returns El precio anterior, o `undefined` si no hay uno mayor que cero.
 */
export function normalizeCompareAtPrice(compareAtPrice: Money | null): Money | undefined {
  if (compareAtPrice === null || !(Number(compareAtPrice.amount) > 0)) {
    return undefined;
  }

  return compareAtPrice;
}

/**
 * Adapta la foto destacada. Las medidas se escalan al ancho pedido para que el espacio
 * reservado coincida con el archivo que entrega el CDN.
 *
 * @param image - Foto destacada de Shopify.
 * @param title - Nombre del producto, usado como texto alternativo si falta `altText`.
 * @returns La foto, o `undefined` si no hay foto o le faltan medidas.
 */
export function mapImage(
  image: ShopifyProductNode["featuredImage"],
  title: string,
): ProductImage | undefined {
  if (image === null || !image.width || !image.height) {
    return undefined;
  }

  const scale = Math.min(1, PRODUCT_IMAGE_MAX_WIDTH / image.width);

  return {
    src: image.url,
    alt: image.altText?.trim() || `Foto de ${title}`,
    width: Math.round(image.width * scale),
    height: Math.round(image.height * scale),
  };
}

/**
 * Adapta un producto de Shopify al tipo `Product` del dominio.
 *
 * @param node - Producto devuelto por la Storefront API.
 * @returns El producto listo para la interfaz.
 * @throws {Error} Si el producto no tiene variantes, porque sin ellas no hay precio.
 */
export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const variant = node.variants.nodes[0];

  if (variant === undefined) {
    throw new Error(`El producto "${node.handle}" no tiene variantes con precio.`);
  }

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: mapCategory(node.category?.name, node.productType),
    flavorNotes: parseFlavorNotes(node.flavorNotes?.value),
    price: variant.price,
    compareAtPrice: normalizeCompareAtPrice(variant.compareAtPrice),
    image: mapImage(node.featuredImage, node.title),
    availableForSale: node.availableForSale,
  };
}

/**
 * Obtiene el catálogo de la Storefront API.
 *
 * @param config - Configuración de la tienda.
 * @param fetchImpl - Implementación de `fetch`; por omisión la global.
 * @returns Los productos adaptados al dominio. Los que no tienen variantes se omiten.
 * @throws {Error} Si la petición falla (ver {@link storefrontRequest}).
 */
export async function fetchShopifyProducts(
  config: ShopifyConfig,
  fetchImpl?: FetchLike,
): Promise<Product[]> {
  const data = await storefrontRequest<ProductsQueryData>(
    config,
    PRODUCTS_QUERY,
    { first: PRODUCTS_PAGE_SIZE, maxWidth: PRODUCT_IMAGE_MAX_WIDTH },
    fetchImpl,
  );

  return data.products.nodes
    .filter((node) => node.variants.nodes.length > 0)
    .map(mapShopifyProduct);
}
