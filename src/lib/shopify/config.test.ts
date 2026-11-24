import { describe, expect, it } from "vitest";

import { readShopifyConfig } from "./config";

const completeEnv = {
  SHOPIFY_STORE_DOMAIN: " tienda-ejemplo.myshopify.com ",
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: "token-de-prueba",
  SHOPIFY_STOREFRONT_API_VERSION: "2025-10",
};

describe("readShopifyConfig", () => {
  it("devuelve la configuración con los valores recortados", () => {
    expect(readShopifyConfig(completeEnv)).toEqual({
      storeDomain: "tienda-ejemplo.myshopify.com",
      storefrontAccessToken: "token-de-prueba",
      apiVersion: "2025-10",
    });
  });

  it("lista todas las variables que faltan o están vacías", () => {
    const env = { ...completeEnv, SHOPIFY_STORE_DOMAIN: "", SHOPIFY_STOREFRONT_API_VERSION: undefined };

    expect(() => readShopifyConfig(env)).toThrow(
      /SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_API_VERSION/,
    );
  });
});
