import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SHOPIFY_ENV_VARS } from "@/lib/shopify/config";

import { getProductByHandle, getProducts, getRelatedProducts, loadCatalog } from "./products";
import { sampleProducts } from "./sample-products";

// La caché de Next.js solo existe dentro del servidor de Next; en las pruebas no hace nada.
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

const SHOPIFY_ENV = {
  SHOPIFY_STORE_DOMAIN: "tienda-de-prueba.myshopify.com",
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token-de-prueba",
  SHOPIFY_STOREFRONT_API_VERSION: "2026-10",
};

/** Respuesta mínima de la Storefront API con un producto. */
function shopifyResponse(): Response {
  return new Response(
    JSON.stringify({
      data: {
        products: {
          nodes: [
            {
              id: "gid://shopify/Product/1",
              handle: "cafe-shopify",
              title: "Café de Shopify",
              description: "Descripción.",
              productType: "",
              availableForSale: true,
              category: { name: "Coffee Beans & Ground Coffee" },
              featuredImage: null,
              flavorNotes: null,
              variants: {
                nodes: [
                  {
                    price: { amount: "220.0", currencyCode: "USD" },
                    compareAtPrice: null,
                  },
                ],
              },
            },
          ],
        },
      },
    }),
    { status: 200 },
  );
}

describe("loadCatalog", () => {
  it("usa los datos de ejemplo si faltan las variables de Shopify", async () => {
    const fetchImpl = vi.fn();

    expect(await loadCatalog({}, fetchImpl)).toBe(sampleProducts);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("lee el catálogo de Shopify si está configurado", async () => {
    const products = await loadCatalog(SHOPIFY_ENV, async () => shopifyResponse());

    expect(products.map((product) => product.handle)).toEqual(["cafe-shopify"]);
  });

  it("vuelve a los datos de ejemplo si Shopify falla, sin mostrar el token", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const products = await loadCatalog(SHOPIFY_ENV, async () => new Response("", { status: 500 }));

    expect(products).toBe(sampleProducts);
    expect(warn).toHaveBeenCalledOnce();
    expect(String(warn.mock.calls[0]?.[0])).not.toContain(
      SHOPIFY_ENV.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    );
    warn.mockRestore();
  });
});

describe("repositorio de productos sin Shopify", () => {
  // Se vacían las variables para que estas pruebas nunca consulten la red.
  beforeEach(() => {
    for (const name of SHOPIFY_ENV_VARS) vi.stubEnv(name, "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("entrega el catálogo de ejemplo completo", async () => {
    expect(await getProducts()).toEqual(sampleProducts);
  });

  it("encuentra un producto por su handle", async () => {
    const product = await getProductByHandle("espresso-veracruz");

    expect(product?.title).toBe("Espresso Veracruz");
  });

  it("devuelve undefined si el handle no existe", async () => {
    expect(await getProductByHandle("producto-inexistente")).toBeUndefined();
  });

  it("sugiere productos de la misma categoría sin repetir el actual", async () => {
    const product = await getProductByHandle("cafe-de-altura-chiapas");
    if (product === undefined) throw new Error("Falta el producto de ejemplo");

    const related = await getRelatedProducts(product);

    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((item) => item.category === "coffee")).toBe(true);
    expect(related.some((item) => item.id === product.id)).toBe(false);
  });
});
