import { describe, expect, it } from "vitest";

import { getProductByHandle, getProducts, getRelatedProducts } from "./products";
import { sampleProducts } from "./sample-products";

describe("repositorio de productos", () => {
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
