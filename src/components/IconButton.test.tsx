import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { IconButton } from "./IconButton";
import { SearchIcon } from "./icons";

describe("IconButton", () => {
  it("renderiza un botón con nombre accesible y área táctil de 44 px", () => {
    const html = renderToStaticMarkup(
      <IconButton label="Buscar">
        <SearchIcon />
      </IconButton>,
    );

    expect(html).toMatch(/^<button /);
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Buscar"');
    expect(html).toContain("size-11");
  });

  it("renderiza un enlace cuando recibe href", () => {
    const html = renderToStaticMarkup(
      <IconButton label="Buscar" href="/#cafe">
        <SearchIcon />
      </IconButton>,
    );

    expect(html).toMatch(/^<a /);
    expect(html).toContain('href="/#cafe"');
  });

  it("muestra el contador oculto a lectores de pantalla", () => {
    const html = renderToStaticMarkup(
      <IconButton label="Carrito, 2 productos" badge={2}>
        <SearchIcon />
      </IconButton>,
    );

    expect(html).toMatch(/<span aria-hidden="true"[^>]*>2<\/span>/);
  });

  it("no muestra contador si no recibe badge", () => {
    const html = renderToStaticMarkup(
      <IconButton label="Buscar">
        <SearchIcon />
      </IconButton>,
    );

    expect(html).not.toContain("<span");
  });
});
