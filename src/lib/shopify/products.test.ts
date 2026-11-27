import { describe, expect, it } from "vitest";

import {
  mapCategory,
  mapImage,
  mapShopifyProduct,
  normalizeCompareAtPrice,
  parseFlavorNotes,
  type ShopifyProductNode,
} from "./products";

/** Producto de Shopify con valores por omisión que cada prueba puede cambiar. */
function node(overrides: Partial<ShopifyProductNode> = {}): ShopifyProductNode {
  return {
    id: "gid://shopify/Product/1",
    handle: "cafe-de-altura-chiapas",
    title: "Café de altura Chiapas",
    description: "Café en grano.",
    productType: "",
    availableForSale: true,
    category: { name: "Coffee Beans & Ground Coffee" },
    featuredImage: {
      url: "https://cdn.shopify.com/s/files/1/foto.webp",
      altText: null,
      width: 2048,
      height: 2048,
    },
    flavorNotes: null,
    variants: {
      nodes: [
        {
          price: { amount: "220.0", currencyCode: "USD" },
          compareAtPrice: { amount: "0.0", currencyCode: "USD" },
        },
      ],
    },
    ...overrides,
  };
}

describe("mapCategory", () => {
  it("reconoce el café por la categoría de la taxonomía de Shopify", () => {
    expect(mapCategory("Coffee Beans & Ground Coffee", "")).toBe("coffee");
  });

  it("reconoce cafeteras aunque su nombre diga Coffee", () => {
    expect(mapCategory("Coffee Makers", "")).toBe("machines");
    expect(mapCategory("Espresso Machines", "")).toBe("machines");
  });

  it("usa productType si no hay categoría", () => {
    expect(mapCategory(null, "Café")).toBe("coffee");
  });

  it("clasifica como accesorio lo que no coincide", () => {
    expect(mapCategory("Mugs", "")).toBe("accessories");
    expect(mapCategory(null, "")).toBe("accessories");
  });
});

describe("parseFlavorNotes", () => {
  it("lee una lista JSON del metafield", () => {
    expect(parseFlavorNotes('["Chocolate", " Caramelo "]')).toEqual(["Chocolate", "Caramelo"]);
  });

  it("lee un texto separado por comas", () => {
    expect(parseFlavorNotes("Cacao, Panela")).toEqual(["Cacao", "Panela"]);
  });

  it("devuelve vacío si no hay metafield", () => {
    expect(parseFlavorNotes(null)).toEqual([]);
  });
});

describe("normalizeCompareAtPrice", () => {
  it("trata 0 y null como sin precio anterior", () => {
    expect(normalizeCompareAtPrice(null)).toBeUndefined();
    expect(normalizeCompareAtPrice({ amount: "0.0", currencyCode: "USD" })).toBeUndefined();
  });

  it("conserva un precio anterior mayor que cero", () => {
    const money = { amount: "260.0", currencyCode: "MXN" };
    expect(normalizeCompareAtPrice(money)).toBe(money);
  });
});

describe("mapImage", () => {
  it("escala las medidas al ancho pedido al CDN y usa el nombre si falta el alt", () => {
    expect(mapImage(node().featuredImage, "Café de altura Chiapas")).toEqual({
      src: "https://cdn.shopify.com/s/files/1/foto.webp",
      alt: "Foto de Café de altura Chiapas",
      width: 1200,
      height: 1200,
    });
  });

  it("devuelve undefined sin foto o sin medidas", () => {
    expect(mapImage(null, "x")).toBeUndefined();
    expect(mapImage({ url: "u", altText: "a", width: null, height: null }, "x")).toBeUndefined();
  });
});

describe("mapShopifyProduct", () => {
  it("adapta el producto al dominio respetando la moneda de la API", () => {
    const product = mapShopifyProduct(node());

    expect(product).toMatchObject({
      handle: "cafe-de-altura-chiapas",
      category: "coffee",
      flavorNotes: [],
      price: { amount: "220.0", currencyCode: "USD" },
      availableForSale: true,
    });
    expect(product.compareAtPrice).toBeUndefined();
  });

  it("lanza un error si no hay variantes", () => {
    expect(() => mapShopifyProduct(node({ variants: { nodes: [] } }))).toThrow(
      "no tiene variantes",
    );
  });
});
