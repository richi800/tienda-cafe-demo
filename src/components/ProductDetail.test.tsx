import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { Product } from "@/domain/product";

import { PURCHASE_NOTE_ID, PURCHASE_UNAVAILABLE_NOTE, ProductDetail } from "./ProductDetail";

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

const render = (value: Product) => renderToStaticMarkup(<ProductDetail product={value} />);

describe("ProductDetail", () => {
  it("muestra el nombre como h1, las notas de sabor y la descripción", () => {
    const html = render(product);

    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toMatch(/<h1[^>]*>Café de prueba<\/h1>/);
    expect(html).toContain('aria-label="Notas de sabor"');
    expect(html).toMatch(/<li[^>]*>Nuez<\/li>/);
    expect(html).toContain("Descripción de prueba.");
  });

  it("muestra el precio normal en verde, sin tachado ni cinta", () => {
    const html = render(product);

    expect(html).toMatch(/<p class="[^"]*text-buy-700[^"]*">\$220.00<\/p>/);
    expect(html).not.toContain("<del");
    expect(html).not.toContain("-rotate-45");
    expect(html).not.toContain("Reflejado al final de tu compra");
  });

  it("con oferta muestra el precio tachado, el de oferta en azul, la nota y la cinta", () => {
    const html = render({ ...product, compareAtPrice: { amount: "275.00", currencyCode: "MXN" } });

    expect(html).toMatch(/<del[^>]*>\$275.00<\/del>/);
    expect(html).toMatch(/<span class="[^"]*text-sale-700[^"]*">\$220.00<\/span>/);
    expect(html).toContain("Reflejado al final de tu compra");
    expect(html).toContain("-rotate-45");
    expect(html).toContain("20% de descuento");
  });

  it("deshabilita Agregar al carrito y explica que la compra no está disponible", () => {
    const html = render(product);

    expect(html).toMatch(
      new RegExp(
        `<button type="button" aria-disabled="true" aria-describedby="${PURCHASE_NOTE_ID}"[^>]*>Agregar al carrito</button>`,
      ),
    );
    expect(html).toContain(`id="${PURCHASE_NOTE_ID}"`);
    expect(html).toContain(PURCHASE_UNAVAILABLE_NOTE);
  });

  it("si está agotado, la nota del botón dice Agotado", () => {
    const html = render({ ...product, availableForSale: false });

    expect(html).toMatch(new RegExp(`<p id="${PURCHASE_NOTE_ID}"[^>]*>Agotado</p>`));
    expect(html).toContain('aria-disabled="true"');
    expect(html).not.toContain(PURCHASE_UNAVAILABLE_NOTE);
  });

  it("muestra el selector de color solo si hay colores", () => {
    expect(render(product)).not.toContain("<fieldset");

    const html = render({ ...product, colorOptions: [{ name: "Grafito", hex: "#3A3A3A" }] });
    expect(html).toContain("<fieldset");
    expect(html).toContain('name="color-cafe-de-prueba"');
  });
});
