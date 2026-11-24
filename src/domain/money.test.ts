import { describe, expect, it } from "vitest";

import { formatPrice } from "./money";

/**
 * Sustituye los espacios especiales que inserta `Intl` (no separables y estrechos)
 * por espacios normales, para que las comparaciones no dependan de la versión de ICU.
 */
function normalizeSpaces(text: string): string {
  return text.replace(/[  ]/g, " ");
}

describe("formatPrice", () => {
  it("formatea pesos mexicanos con la configuración regional por defecto", () => {
    expect(formatPrice({ amount: "180.00", currencyCode: "MXN" })).toBe("$180.00");
  });

  it("respeta la configuración regional indicada", () => {
    const formatted = formatPrice({ amount: "1234.5", currencyCode: "EUR" }, "es-ES");

    expect(normalizeSpaces(formatted)).toBe("1234,50 €");
  });

  it("lanza RangeError si el monto no es numérico", () => {
    expect(() => formatPrice({ amount: "abc", currencyCode: "MXN" })).toThrow(RangeError);
  });

  it("lanza RangeError si el monto está vacío", () => {
    expect(() => formatPrice({ amount: "  ", currencyCode: "MXN" })).toThrow(RangeError);
  });
});
