import { describe, expect, it, vi } from "vitest";

import type { ShopifyConfig } from "./config";
import { storefrontEndpoint, storefrontRequest, type FetchLike } from "./storefront";

const CONFIG: ShopifyConfig = {
  storeDomain: "tienda-de-prueba.myshopify.com",
  storefrontAccessToken: "token-de-prueba",
  apiVersion: "2026-10",
};

describe("storefrontEndpoint", () => {
  it("arma la URL del endpoint GraphQL con dominio y versión", () => {
    expect(storefrontEndpoint(CONFIG)).toBe(
      "https://tienda-de-prueba.myshopify.com/api/2026-10/graphql.json",
    );
  });
});

describe("storefrontRequest", () => {
  it("envía el token público en su encabezado y devuelve los datos", async () => {
    const fetchImpl = vi.fn<FetchLike>(
      async () => new Response(JSON.stringify({ data: { ok: true } })),
    );

    const data = await storefrontRequest<{ ok: boolean }>(CONFIG, "query { ok }", {}, fetchImpl);

    expect(data).toEqual({ ok: true });
    const headers = fetchImpl.mock.calls[0]?.[1].headers as Record<string, string>;
    expect(headers["X-Shopify-Storefront-Access-Token"]).toBe("token-de-prueba");
    expect(headers).not.toHaveProperty("Shopify-Storefront-Private-Token");
  });

  it("lanza un error con el estado HTTP y sin el token", async () => {
    const error = await storefrontRequest(
      CONFIG,
      "query { ok }",
      {},
      async () => new Response("", { status: 401 }),
    ).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain("estado 401");
    expect((error as Error).message).not.toContain("token-de-prueba");
  });

  it("lanza un error si la respuesta trae errores GraphQL", async () => {
    const fetchImpl = async () =>
      new Response(JSON.stringify({ errors: [{ message: "Campo desconocido" }] }));

    await expect(storefrontRequest(CONFIG, "query { x }", {}, fetchImpl)).rejects.toThrow(
      "Campo desconocido",
    );
  });
});
