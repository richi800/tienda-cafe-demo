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

const discounted: Product = {
  ...product,
  compareAtPrice: { amount: "275.00", currencyCode: "MXN" },
};

describe("ProductCard", () => {
  it("muestra el nombre como encabezado y el precio normal en verde", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).toMatch(/<h3[^>]*>Café de prueba<\/h3>/);
    expect(html).toMatch(/<p class="[^"]*text-buy-700[^"]*">\$220.00<\/p>/);
    expect(html).not.toContain("<del");
    expect(html).not.toContain("Reflejado al final de tu compra");
  });

  it("muestra cada nota de sabor como elemento de lista", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    expect(html).toContain('aria-label="Notas de sabor"');
    expect(html).toMatch(/<li[^>]*>Chocolate<\/li>/);
  });

  it("omite la lista de notas si el producto no tiene", () => {
    const html = renderToStaticMarkup(
      <ProductCard product={{ ...product, category: "accessories", flavorNotes: [] }} />,
    );

    expect(html).not.toContain("Notas de sabor");
  });

  it("muestra cinta de descuento, precio anterior tachado, oferta en azul y la nota", () => {
    const html = renderToStaticMarkup(<ProductCard product={discounted} />);

    expect(html).toContain("-rotate-45");
    expect(html).toMatch(/<span aria-hidden="true">-20%<\/span>/);
    expect(html).toContain("20% de descuento");
    expect(html).toMatch(/<del[^>]*>\$275.00<\/del>/);
    expect(html).toMatch(/<span class="[^"]*text-sale-700[^"]*">\$220.00<\/span>/);
    expect(html).toContain("Reflejado al final de tu compra");
  });

  it("nombra cada color disponible en texto", () => {
    const html = renderToStaticMarkup(
      <ProductCard
        product={{
          ...product,
          colorOptions: [
            { name: "Grafito", hex: "#3A3A3A" },
            { name: "Crema", hex: "#EFE6D2" },
          ],
        }}
      />,
    );

    expect(html).toContain('aria-label="Colores disponibles"');
    expect(html).toContain('<span class="sr-only">Grafito</span>');
    expect(html).toContain("background-color:#3A3A3A");
  });

  it("enlaza a la ficha con el botón verde Ver detalles y comprar", () => {
    const html = renderToStaticMarkup(<ProductCard product={product} />);

    const link = html.match(/<a [^>]*>Ver detalles y comprar<\/a>/)?.[0] ?? "";

    expect(link).toContain('href="/productos/cafe-de-prueba"');
    expect(link).toContain("bg-buy-700");
    expect(html).not.toContain("Próximamente");
    expect(html).not.toContain("aria-disabled");
  });

  it("también enlaza a la ficha si el producto está agotado", () => {
    const html = renderToStaticMarkup(
      <ProductCard product={{ ...product, availableForSale: false }} />,
    );

    expect(html).toContain('href="/productos/cafe-de-prueba"');
  });

  it("muestra la insignia de agotado solo si no hay existencias", () => {
    expect(renderToStaticMarkup(<ProductCard product={product} />)).not.toContain("Agotado");
    expect(
      renderToStaticMarkup(<ProductCard product={{ ...product, availableForSale: false }} />),
    ).toContain("Agotado");
  });
});
