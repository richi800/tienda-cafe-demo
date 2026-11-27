import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SectionThumbnail } from "./SectionThumbnail";

describe("SectionThumbnail", () => {
  it("muestra la foto decorativa en un círculo de 32 px, con alt vacío y carga diferida", () => {
    const html = renderToStaticMarkup(
      <SectionThumbnail
        section={{
          id: "cafe",
          label: "Café",
          icon: "bean",
          image: { src: "/imagenes/prueba.webp", alt: "Bolsa", width: 1200, height: 1200 },
        }}
      />,
    );

    expect(html).toMatch(/^<span aria-hidden="true" class="[^"]*size-8[^"]*rounded-pill/);
    const img = html.match(/<img [^>]*>/)?.[0] ?? "";
    expect(img).toContain('alt=""');
    expect(img).toContain('loading="lazy"');
    expect(img).toContain('width="1200"');
    expect(html).not.toContain("<svg");
  });

  it("muestra el icono en el mismo círculo si la sección no tiene foto", () => {
    const html = renderToStaticMarkup(
      <SectionThumbnail section={{ id: "diferencia", label: "La diferencia", icon: "leaf" }} />,
    );

    expect(html).toContain("size-8");
    expect(html).toContain("<svg");
    expect(html).not.toContain("<img");
  });
});
