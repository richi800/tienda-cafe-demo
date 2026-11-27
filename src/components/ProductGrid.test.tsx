import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { Product } from "@/domain/product";

import { ProductGrid } from "./ProductGrid";

/** Crea un producto de prueba con los datos mínimos. */
function makeProduct(id: string): Product {
  return {
    id,
    handle: `producto-${id}`,
    title: `Producto ${id}`,
    description: "Descripción de prueba.",
    category: "accessories",
    flavorNotes: [],
    price: { amount: "100.00", currencyCode: "MXN" },
    availableForSale: true,
  };
}

describe("ProductGrid", () => {
  it("muestra una tarjeta por producto dentro de una lista", () => {
    const html = renderToStaticMarkup(
      <ProductGrid products={[makeProduct("a"), makeProduct("b")]} />,
    );

    expect(html).toMatch(/^<ul /);
    expect(html.match(/<article/g)).toHaveLength(2);
  });

  it("enlaza cada tarjeta a su ficha", () => {
    const html = renderToStaticMarkup(
      <ProductGrid products={[makeProduct("a"), makeProduct("b")]} />,
    );

    expect(html).toContain('href="/productos/producto-a"');
    expect(html).toContain('href="/productos/producto-b"');
  });

  it("muestra el mensaje de vacío si no hay productos", () => {
    const html = renderToStaticMarkup(
      <ProductGrid products={[]} emptyMessage="Sin promociones por ahora." />,
    );

    expect(html).not.toContain("<ul");
    expect(html).toContain("Sin promociones por ahora.");
  });
});
