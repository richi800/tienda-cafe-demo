import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { Product } from "@/domain/product";

import { ProductMedia } from "./ProductMedia";

const product: Product = {
  id: "test-1",
  handle: "cafe-de-prueba",
  title: "Café de prueba",
  description: "Descripción de prueba.",
  category: "coffee",
  flavorNotes: [],
  price: { amount: "220.00", currencyCode: "MXN" },
  availableForSale: true,
};

const withImage: Product = {
  ...product,
  image: { src: "/imagenes/prueba.webp", alt: "Bolsa de prueba", width: 1200, height: 1200 },
};

describe("ProductMedia", () => {
  it("sin foto reserva el espacio con un fondo neutro decorativo", () => {
    const html = renderToStaticMarkup(<ProductMedia product={product} />);

    expect(html).not.toContain("<img");
    expect(html).toMatch(/<div aria-hidden="true" class="[^"]*bg-neutral-100[^"]*aspect-product-compact/);
  });

  it("con foto muestra la imagen completa sobre blanco, con alt y medidas reales", () => {
    const html = renderToStaticMarkup(<ProductMedia product={withImage} />);
    const img = html.match(/<img [^>]*>/)?.[0] ?? "";

    expect(img).toContain('alt="Bolsa de prueba"');
    expect(img).toContain('width="1200"');
    expect(img).toContain('height="1200"');
    expect(img).toContain("object-contain");
    expect(html).toMatch(/class="relative w-full bg-white aspect-product-compact md:aspect-product"/);
  });

  it("carga en diferido en tarjetas y de inmediato con prioridad alta en la ficha", () => {
    const card = renderToStaticMarkup(<ProductMedia product={withImage} />);
    const detail = renderToStaticMarkup(<ProductMedia product={withImage} variant="detail" />);

    expect(card).toContain('loading="lazy"');
    expect(card).not.toContain('fetchPriority="high"');
    expect(detail).toContain('loading="eager"');
    expect(detail).toContain('fetchPriority="high"');
    expect(detail).toContain("lg:aspect-product");
  });

  it("mantiene la cinta de descuento y la insignia de agotado sobre la foto", () => {
    const html = renderToStaticMarkup(
      <ProductMedia
        product={{
          ...withImage,
          availableForSale: false,
          compareAtPrice: { amount: "275.00", currencyCode: "MXN" },
        }}
      />,
    );

    expect(html).toContain("20% de descuento");
    expect(html).toContain("Agotado");
  });
});
