import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { Product } from "@/domain/product";

import { ProductCard } from "./ProductCard";

const product: Product = {
  id: "test-1",
  handle: "cafe-de-prueba",
  title: "Café de prueba",
  description: "Descripción de prueba.",
  flavorNotes: ["Chocolate", "Nuez"],
  price: { amount: "220.00", currencyCode: "MXN" },
  availableForSale: true,
};

describe("ProductCard", () => {
  it("muestra el nombre como encabezado y el precio formateado", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).toContain("<h3");
    expect(html).toContain("Café de prueba");
    expect(html).toContain("$220.00");
  });

  it("muestra cada nota de sabor como elemento de lista", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).toContain('aria-label="Notas de sabor"');
    expect(html).toMatch(/<li[^>]*>Chocolate<\/li>/);
    expect(html).toMatch(/<li[^>]*>Nuez<\/li>/);
  });

  it("no muestra la insignia de agotado si hay existencias", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).not.toContain("Agotado");
  });

  it("muestra la insignia de agotado si no hay existencias", () => {
    const html = renderToStaticMarkup(
      <ProductCard product={{ ...product, availableForSale: false }} />,
    );

    expect(html).toContain("Agotado");
  });
});
