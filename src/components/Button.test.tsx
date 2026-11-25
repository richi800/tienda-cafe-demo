import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renderiza un enlace cuando recibe href", () => {
    const html = renderToStaticMarkup(<Button href="#productos">Ver productos</Button>);

    expect(html).toMatch(/^<a /);
    expect(html).toContain('href="#productos"');
    expect(html).toContain("Ver productos");
  });

  it("renderiza un botón de tipo button cuando no recibe href", () => {
    const html = renderToStaticMarkup(<Button>Agregar</Button>);

    expect(html).toMatch(/^<button /);
    expect(html).toContain('type="button"');
  });

  it("usa el color de acento en la variante principal", () => {
    const html = renderToStaticMarkup(<Button>Agregar</Button>);

    expect(html).toContain("bg-cherry-700");
  });

  it("usa borde y no el acento en la variante secundaria", () => {
    const html = renderToStaticMarkup(<Button variant="secondary">Conocer más</Button>);

    expect(html).toContain("border-coffee-700");
    expect(html).not.toContain("bg-cherry-700");
  });
});
