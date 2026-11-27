import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Header } from "./Header";
import { MAIN_NAV_ITEMS } from "./main-navigation";

describe("Header", () => {
  it("muestra el nombre de la marca en texto cuando no hay logo", () => {
    const html = renderToStaticMarkup(<Header logoSrc={null} />);

    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Café Ladera<\/a>/);
    expect(html).not.toContain("<img");
  });

  it("muestra el logo con texto alternativo cuando existe", () => {
    const html = renderToStaticMarkup(<Header logoSrc="/brand/logo.svg" />);

    expect(html).toMatch(/<img[^>]*alt="Café Ladera"/);
    expect(html).toMatch(/<img[^>]*src="\/brand\/logo.svg"/);
  });

  it("incluye el menú principal en el orden previsto", () => {
    expect(MAIN_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Promociones",
      "Café",
      "Cafeteras",
      "Accesorios",
      "Suscripción",
      "¿Necesitas ayuda?",
    ]);

    const html = renderToStaticMarkup(<Header logoSrc={null} />);
    for (const item of MAIN_NAV_ITEMS) {
      expect(html).toContain(`href="${item.href}"`);
    }
  });

  it("solo enlaza a secciones de la portada", () => {
    for (const item of MAIN_NAV_ITEMS) {
      expect(item.href).toMatch(/^\/#[a-z]+$/);
    }
  });

  it("tiene un menú colapsable para celular, cerrado al inicio", () => {
    const html = renderToStaticMarkup(<Header logoSrc={null} />);

    expect(html).toMatch(/<button[^>]*aria-expanded="false"[^>]*aria-controls="menu-principal"/);
  });

  it("nombra cada botón de icono", () => {
    const html = renderToStaticMarkup(<Header logoSrc={null} />);

    expect(html).toContain('aria-label="Favoritos"');
    expect(html).toContain('aria-label="Buscar"');
    expect(html).toContain('aria-label="Mi cuenta"');
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
