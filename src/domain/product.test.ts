import { describe, expect, it } from "vitest";

import { getDiscountPercentage } from "./product";

const mxn = (amount: string) => ({ amount, currencyCode: "MXN" });

describe("getDiscountPercentage", () => {
  it("devuelve 0 si no hay precio anterior", () => {
    expect(getDiscountPercentage(mxn("220.00"))).toBe(0);
  });

  it("calcula el porcentaje entero de descuento", () => {
    expect(getDiscountPercentage(mxn("150.00"), mxn("200.00"))).toBe(25);
  });

  it("redondea hacia abajo para no exagerar el descuento", () => {
    // 2000 / 10999 = 18.18 %
    expect(getDiscountPercentage(mxn("8999.00"), mxn("10999.00"))).toBe(18);
  });

  it("devuelve 0 si el precio anterior no es mayor que el actual", () => {
    expect(getDiscountPercentage(mxn("200.00"), mxn("200.00"))).toBe(0);
    expect(getDiscountPercentage(mxn("250.00"), mxn("200.00"))).toBe(0);
  });

  it("lanza RangeError si las monedas no coinciden", () => {
    expect(() =>
      getDiscountPercentage(mxn("100.00"), { amount: "200.00", currencyCode: "USD" }),
    ).toThrow(RangeError);
  });

  it("lanza RangeError si un monto no es numérico", () => {
    expect(() => getDiscountPercentage(mxn("abc"), mxn("200.00"))).toThrow(RangeError);
  });
});
