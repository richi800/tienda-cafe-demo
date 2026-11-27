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

  it("muestra las fotos editoriales en recuadros blancos con su alt y carga diferida", () => {
    const html = renderToStaticMarkup(
      <CategorySection
        id="cafeteras"
        title="Cafeteras"
        description="Equipos."
        images={[
          { src: "/imagenes/a.webp", alt: "Cafetera de espresso", width: 1200, height: 1200 },
          { src: "/imagenes/b.webp", alt: "Cafetera de goteo", width: 1200, height: 1200 },
        ]}
      >
        <p>Contenido</p>
      </CategorySection>,
    );

    expect(html.match(/<li class="[^"]*rounded-lg bg-white/g)).toHaveLength(2);
    expect(html).toContain('alt="Cafetera de espresso"');
    expect(html).toContain('alt="Cafetera de goteo"');
    expect(html.match(/loading="lazy"/g)).toHaveLength(2);
    expect(html).toContain("object-contain");
  });

  it("no agrega lista de fotos si la categoría no tiene", () => {
    const html = renderToStaticMarkup(
      <CategorySection id="cafe" title="Café" description="Grano entero.">
        <p>Contenido</p>
      </CategorySection>,
    );

    expect(html).not.toContain("<img");
    expect(html).not.toContain("<ul");
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
