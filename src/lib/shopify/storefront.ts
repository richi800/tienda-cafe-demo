/**
 * Cliente mínimo de la Storefront API de Shopify: envía una consulta GraphQL y devuelve
 * sus datos tipados.
 *
 * Solo se usa en el servidor, porque recibe el token de acceso. Los mensajes de error
 * nunca incluyen el token.
 *
 * @packageDocumentation
 */

import type { ShopifyConfig } from "./config";

/** Firma de `fetch` que acepta el cliente; se inyecta para poder probarlo sin red. */
export type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

/** Respuesta GraphQL de la Storefront API. */
type GraphQLResponse<TData> = {
  data?: TData;
  errors?: readonly { message: string }[];
};

/**
 * Construye la URL del endpoint GraphQL de la Storefront API.
 *
 * @param config - Configuración de la tienda.
 * @returns Por ejemplo `https://mi-tienda.myshopify.com/api/2026-10/graphql.json`.
 */
export function storefrontEndpoint(config: ShopifyConfig): string {
  return `https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`;
}

/**
 * Ejecuta una consulta contra la Storefront API.
 *
 * @param config - Configuración de la tienda, con el token público del canal Headless.
 * @param query - Documento GraphQL.
 * @param variables - Variables de la consulta.
 * @param fetchImpl - Implementación de `fetch`; por omisión la global.
 * @returns El campo `data` de la respuesta.
 * @throws {Error} Si la respuesta HTTP no es correcta, si trae errores GraphQL o si no
 * trae datos.
 */
export async function storefrontRequest<TData>(
  config: ShopifyConfig,
  query: string,
  variables: Record<string, unknown> = {},
  fetchImpl: FetchLike = fetch,
): Promise<TData> {
  const response = await fetchImpl(storefrontEndpoint(config), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Token público del canal Headless; el privado usa otro encabezado.
      "X-Shopify-Storefront-Access-Token": config.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`La Storefront API respondió con estado ${response.status}.`);
  }

  const body = (await response.json()) as GraphQLResponse<TData>;

  if (body.errors && body.errors.length > 0) {
    const messages = body.errors.map((error) => error.message).join("; ");
    throw new Error(`La Storefront API devolvió errores: ${messages}`);
  }

  if (body.data === undefined) {
    throw new Error("La Storefront API no devolvió datos.");
  }

  return body.data;
}
