import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renderiza un enlace cuando recibe href", () => {
    const html = renderToStaticMarkup(<Button href="#cafe">Ver café</Button>);

    expect(html).toMatch(/^<a /);
    expect(html).toContain('href="#cafe"');
    expect(html).toContain("Ver café");
  });

  it("renderiza un botón de tipo button cuando no recibe href", () => {
    const html = renderToStaticMarkup(<Button>Agregar</Button>);

    expect(html).toMatch(/^<button /);
    expect(html).toContain('type="button"');
  });

  it("usa el verde de compra en la variante principal", () => {
    const html = renderToStaticMarkup(<Button>Agregar</Button>);

    expect(html).toContain("bg-buy-700");
    expect(html).toContain("rounded-pill");
  });

  it("usa borde y no el verde de compra en la variante secundaria", () => {
    const html = renderToStaticMarkup(<Button variant="secondary">Conocer más</Button>);

    expect(html).toContain("border-ink-900");
    expect(html).not.toContain("bg-buy-700");
  });
});
