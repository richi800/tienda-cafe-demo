import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { Product } from "@/domain/product";

import { ProductCard } from "./ProductCard";

const product: Product = {
  id: "test-1",
  handle: "cafe-de-prueba",
  title: "Café de prueba",
  description: "Descripción de prueba.",
  category: "coffee",
  flavorNotes: ["Chocolate", "Nuez"],
  price: { amount: "220.00", currencyCode: "MXN" },
  availableForSale: true,
};

describe("ProductCard", () => {
  it("muestra el nombre como encabezado y el precio normal en verde", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).toContain("<h3");
    expect(html).toContain("Café de prueba");
    expect(html).toMatch(/<p class="[^"]*text-buy-700[^"]*">\$220.00<\/p>/);
    expect(html).not.toContain("<del");
  });

  it("muestra cada nota de sabor como elemento de lista", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).toContain('aria-label="Notas de sabor"');
    expect(html).toMatch(/<li[^>]*>Chocolate<\/li>/);
    expect(html).toMatch(/<li[^>]*>Nuez<\/li>/);
  });

  it("omite la lista de notas si el producto no tiene", () => {
    const html = renderToStaticMarkup(
      <ProductCard product={{ ...product, category: "accessories", flavorNotes: [] }} />,
    );

    expect(html).not.toContain("Notas de sabor");
  });

  it("muestra precio de oferta, precio anterior tachado y porcentaje de descuento", () => {
    const html = renderToStaticMarkup(
      <ProductCard
        product={{ ...product, compareAtPrice: { amount: "275.00", currencyCode: "MXN" } }}
      />,
    );

    expect(html).toMatch(/<span class="[^"]*text-sale-700[^"]*">\$220.00<\/span>/);
    expect(html).toMatch(/<del[^>]*>\$275.00<\/del>/);
    expect(html).toContain("20% de descuento");
    expect(html).toContain("Precio anterior:");
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
