/**
 * Representación de montos de dinero y su formato para mostrarlos en la interfaz.
 *
 * @packageDocumentation
 */

/**
 * Monto de dinero en una moneda concreta.
 *
 * Sigue la misma forma que el tipo `MoneyV2` de la Storefront API de Shopify,
 * para poder usar las respuestas de la API sin transformaciones adicionales.
 */
export type Money = {
  /** Monto decimal expresado como texto, por ejemplo `"180.00"`. */
  amount: string;
  /** Código de moneda ISO 4217, por ejemplo `"MXN"`. */
  currencyCode: string;
};

/** Configuración regional usada por defecto para mostrar precios. */
export const DEFAULT_LOCALE = "es-MX";

/**
 * Convierte un monto a texto legible según la configuración regional.
 *
 * @param money - Monto y moneda a formatear.
 * @param locale - Configuración regional BCP 47; por defecto {@link DEFAULT_LOCALE}.
 * @returns El precio formateado, por ejemplo `"$180.00"` para MXN en `es-MX`.
 * @throws {RangeError} Si `money.amount` no es un número finito o si
 * `money.currencyCode` no es un código de moneda válido.
 */
export function formatPrice(money: Money, locale: string = DEFAULT_LOCALE): string {
  const numericAmount = parseAmount(money.amount);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
  }).format(numericAmount);
}

/**
 * Convierte el monto textual a número.
 *
 * Se exporta para que otras reglas del dominio (por ejemplo el cálculo del descuento)
 * validen los montos igual que {@link formatPrice}.
 *
 * @param amount - Monto decimal como texto.
 * @returns El monto como número.
 * @throws {RangeError} Si el texto no representa un número finito.
 */
export function parseAmount(amount: string): number {
  // Se rechaza el texto vacío explícitamente porque Number("") devuelve 0
  // y ocultaría un dato faltante mostrando un precio gratuito.
  const parsed = amount.trim() === "" ? Number.NaN : Number(amount);

  if (!Number.isFinite(parsed)) {
    throw new RangeError(`Monto inválido: "${amount}"`);
  }

  return parsed;
}
