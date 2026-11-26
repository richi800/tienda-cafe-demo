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

  it("usa fondo negro en la variante dark", () => {
    const html = renderToStaticMarkup(<Button variant="dark">Descubrir</Button>);

    expect(html).toContain("bg-ink-900");
    expect(html).toContain("text-white");
  });

  it("marca como no disponible sin dejar de ser enfocable ni navegar", () => {
    const html = renderToStaticMarkup(
      <Button href="/productos/x" unavailable describedBy="nota">
        Ver detalles
      </Button>,
    );

    expect(html).toMatch(/^<button /);
    expect(html).toContain('aria-disabled="true"');
    expect(html).toContain('aria-describedby="nota"');
    expect(html).not.toContain(' disabled=""');
    expect(html).not.toContain("/productos/x");
  });

  it("se ve atenuado y sin hover ni estado activo cuando no está disponible", () => {
    const html = renderToStaticMarkup(<Button unavailable>Próximamente</Button>);
    const classes = html.match(/class="([^"]+)"/)?.[1] ?? "";

    expect(classes).toContain("bg-neutral-200");
    expect(classes).toContain("text-ink-700");
    expect(classes).toContain("cursor-not-allowed");
    expect(classes).not.toContain("bg-buy-700");
    expect(classes).not.toMatch(/(hover|active):/);
  });
});
