import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { sampleProducts } from "@/data/sample-products";

import { ProductGrid } from "./ProductGrid";

describe("ProductGrid", () => {
  it("muestra una tarjeta por producto dentro de una lista", () => {
    const products = sampleProducts.slice(0, 2);
    const html = renderToStaticMarkup(<ProductGrid products={products} />);

    expect(html).toMatch(/^<ul /);
    expect(html.match(/<article/g)).toHaveLength(2);
  });

  it("muestra el mensaje de vacío si no hay productos", () => {
    const html = renderToStaticMarkup(
      <ProductGrid products={[]} emptyMessage="Sin promociones por ahora." />,
    );

    expect(html).not.toContain("<ul");
    expect(html).toContain("Sin promociones por ahora.");
  });
});
