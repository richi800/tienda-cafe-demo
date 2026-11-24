/**
 * Lectura y validación de la configuración necesaria para la Storefront API de Shopify.
 *
 * Este módulo solo debe usarse en el servidor: el token de acceso no debe
 * llegar al navegador.
 *
 * @packageDocumentation
 */

/** Datos necesarios para hacer peticiones a la Storefront API. */
export type ShopifyConfig = {
  /** Dominio de la tienda, por ejemplo `mi-tienda.myshopify.com`. */
  storeDomain: string;
  /** Token de acceso de la Storefront API. */
  storefrontAccessToken: string;
  /** Versión de la API con formato `AAAA-MM`, por ejemplo `2025-10`. */
  apiVersion: string;
};

/** Variables de entorno que este módulo lee, en el orden en que se reportan. */
export const SHOPIFY_ENV_VARS = [
  "SHOPIFY_STORE_DOMAIN",
  "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  "SHOPIFY_STOREFRONT_API_VERSION",
] as const;

type ShopifyEnvVar = (typeof SHOPIFY_ENV_VARS)[number];

/** Subconjunto de variables de entorno del que se lee la configuración. */
export type EnvSource = Partial<Record<string, string | undefined>>;

/**
 * Construye la configuración de Shopify a partir de las variables de entorno.
 *
 * @param env - Origen de las variables; por defecto `process.env`. Se recibe
 * como parámetro para poder probar la función sin modificar el entorno global.
 * @returns La configuración con todos los valores presentes y sin espacios sobrantes.
 * @throws {Error} Si falta alguna variable o está vacía; el mensaje lista todas
 * las que faltan para corregirlas de una sola vez.
 */
export function readShopifyConfig(env: EnvSource = process.env): ShopifyConfig {
  const missing = SHOPIFY_ENV_VARS.filter((name) => !readValue(env, name));

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno de Shopify: ${missing.join(", ")}. ` +
        "Revisa .env.example para ver cómo configurarlas.",
    );
  }

  return {
    storeDomain: readValue(env, "SHOPIFY_STORE_DOMAIN"),
    storefrontAccessToken: readValue(env, "SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
    apiVersion: readValue(env, "SHOPIFY_STOREFRONT_API_VERSION"),
  };
}

/**
 * Obtiene el valor de una variable sin espacios al inicio ni al final.
 *
 * @param env - Origen de las variables.
 * @param name - Nombre de la variable.
 * @returns El valor recortado, o una cadena vacía si no existe.
 */
function readValue(env: EnvSource, name: ShopifyEnvVar): string {
  return env[name]?.trim() ?? "";
}
