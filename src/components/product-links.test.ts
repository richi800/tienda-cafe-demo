import { describe, expect, it } from "vitest";

import { productHref } from "./product-links";

describe("productHref", () => {
  it("arma la ruta de la ficha a partir del handle", () => {
    expect(productHref("espresso-veracruz")).toBe("/productos/espresso-veracruz");
  });

  it("codifica caracteres que no pueden ir tal cual en la URL", () => {
    expect(productHref("café con leche")).toBe("/productos/caf%C3%A9%20con%20leche");
  });
});
