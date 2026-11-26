import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CategorySection } from "./CategorySection";

describe("CategorySection", () => {
  it("es una región nombrada por su título", () => {
    const html = renderToStaticMarkup(
      <CategorySection id="cafe" title="Café" description="Grano entero.">
        <p>Contenido</p>
      </CategorySection>,
    );

    expect(html).toMatch(/^<section id="cafe" aria-labelledby="cafe-titulo"/);
    expect(html).toMatch(/<h2 id="cafe-titulo"[^>]*>Café<\/h2>/);
    expect(html).toContain("Grano entero.");
    expect(html).toContain("<p>Contenido</p>");
  });

  it("usa el banner oscuro con título en mayúsculas blancas", () => {
    const html = renderToStaticMarkup(
      <CategorySection id="cafe" title="Café" description="Grano entero.">
        <p>Contenido</p>
      </CategorySection>,
    );

    expect(html).toContain("banner-texture");
    expect(html).toMatch(/<h2[^>]*class="[^"]*text-white[^"]*uppercase/);
  });

  it("da a la nota un id derivado de la sección", () => {
    const html = renderToStaticMarkup(
      <CategorySection id="cafe" title="Café" description="Grano entero." note="Vista previa.">
        <p>Contenido</p>
      </CategorySection>,
    );

    expect(html).toMatch(/<p id="cafe-nota"[^>]*>Vista previa.<\/p>/);
  });
});
