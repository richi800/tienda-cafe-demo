import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Header } from "./Header";

describe("Header", () => {
  it("muestra el nombre de la marca en texto cuando no hay logo", () => {
    const html = renderToStaticMarkup(<Header logoSrc={null} />);

    expect(html).toContain("Café Ladera");
    expect(html).not.toContain("<img");
  });

  it("muestra el logo con texto alternativo cuando existe", () => {
    const html = renderToStaticMarkup(<Header logoSrc="/brand/logo.svg" />);

    expect(html).toMatch(/<img[^>]*alt="Café Ladera"/);
    expect(html).toMatch(/<img[^>]*src="\/brand\/logo.svg"/);
  });

  it("marca Inicio como la página actual", () => {
    const html = renderToStaticMarkup(<Header logoSrc={null} />);

    expect(html).toMatch(/<a[^>]*aria-current="page"[^>]*>Inicio<\/a>/);
    expect(html.match(/aria-current=/g)).toHaveLength(1);
  });

  it("nombra el carrito con la cantidad de productos", () => {
    expect(renderToStaticMarkup(<Header logoSrc={null} />)).toContain(
      'aria-label="Carrito, 0 productos"',
    );
    expect(renderToStaticMarkup(<Header logoSrc={null} cartCount={1} />)).toContain(
      'aria-label="Carrito, 1 producto"',
    );
    expect(renderToStaticMarkup(<Header logoSrc={null} cartCount={3} />)).toContain(
      'aria-label="Carrito, 3 productos"',
    );
  });
});
