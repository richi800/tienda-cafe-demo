/**
 * Resolución del logo de la marca.
 *
 * El logo lo proporciona el dueño del proyecto en `public/brand/logo.svg`. Mientras el
 * archivo no exista, la interfaz muestra el nombre de la marca en texto. La comprobación
 * se hace en el servidor; en producción ocurre al prerenderizar durante el build.
 *
 * @packageDocumentation
 */

import { existsSync } from "node:fs";
import { join } from "node:path";

/** Ruta pública del logo, relativa a la raíz del sitio. */
export const BRAND_LOGO_PATH = "/brand/logo.svg";

/** Función que indica si existe un archivo dentro de `public`, dada su ruta pública. */
export type PublicFileExists = (publicPath: string) => boolean;

/**
 * Devuelve la ruta del logo si el archivo existe.
 *
 * @param exists - Comprobación de existencia; se inyecta para poder probar la función
 * sin depender del sistema de archivos.
 * @returns `"/brand/logo.svg"` si el archivo existe, o `null` si no.
 */
export function resolveBrandLogo(exists: PublicFileExists = publicFileExists): string | null {
  return exists(BRAND_LOGO_PATH) ? BRAND_LOGO_PATH : null;
}

/**
 * Comprueba en disco si existe un archivo de la carpeta `public`.
 *
 * @param publicPath - Ruta pública del archivo, por ejemplo `"/brand/logo.svg"`.
 * @returns `true` si el archivo existe.
 */
export function publicFileExists(publicPath: string): boolean {
  return existsSync(join(process.cwd(), "public", publicPath));
}
