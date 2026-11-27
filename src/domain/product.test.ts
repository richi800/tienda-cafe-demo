import { describe, expect, it } from "vitest";

import {
  findProductByHandle,
  getDiscountPercentage,
  selectRelatedProducts,
  type Product,
  type ProductCategory,
} from "./product";

const mxn = (amount: string) => ({ amount, currencyCode: "MXN" });

/** Crea un producto de prueba con los datos mínimos. */
function makeProduct(id: string, category: ProductCategory): Product {
  return {
    id,
    handle: `producto-${id}`,
    title: `Producto ${id}`,
    description: "Descripción de prueba.",
    category,
    flavorNotes: [],
    price: mxn("100.00"),
    availableForSale: true,
  };
}

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

describe("findProductByHandle", () => {
  const products = [makeProduct("a", "coffee"), makeProduct("b", "machines")];

  it("devuelve el producto con ese handle", () => {
    expect(findProductByHandle(products, "producto-b")?.id).toBe("b");
  });

  it("devuelve undefined si el handle no existe", () => {
    expect(findProductByHandle(products, "no-existe")).toBeUndefined();
    expect(findProductByHandle([], "producto-a")).toBeUndefined();
  });
});

describe("selectRelatedProducts", () => {
  const products = [
    makeProduct("a", "coffee"),
    makeProduct("b", "machines"),
    makeProduct("c", "coffee"),
    makeProduct("d", "coffee"),
    makeProduct("e", "coffee"),
    makeProduct("f", "coffee"),
  ];
  const current = products[0]!;

  it("excluye el producto actual y otras categorías, en el orden del catálogo", () => {
    expect(selectRelatedProducts(products, current, 10).map((p) => p.id)).toEqual([
      "c",
      "d",
      "e",
      "f",
    ]);
  });

  it("devuelve como máximo tres por omisión", () => {
    expect(selectRelatedProducts(products, current).map((p) => p.id)).toEqual(["c", "d", "e"]);
  });

  it("devuelve una lista vacía si no hay otros productos de la categoría", () => {
    expect(selectRelatedProducts(products, products[1]!)).toEqual([]);
    expect(selectRelatedProducts(products, current, 0)).toEqual([]);
  });

  it("lanza RangeError si el límite no es un entero no negativo", () => {
    expect(() => selectRelatedProducts(products, current, -1)).toThrow(RangeError);
    expect(() => selectRelatedProducts(products, current, 1.5)).toThrow(RangeError);
  });
});
