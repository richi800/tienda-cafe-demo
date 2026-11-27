import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CatalogNoticePanel } from "./CatalogNoticePanel";

const image = { src: "/imagenes/a.webp", alt: "Cafetera de goteo negra", width: 1200, height: 1200 };

describe("CatalogNoticePanel", () => {
  it("muestra el título como h3, el texto, las fotos con su alt y la acción", () => {
    const html = renderToStaticMarkup(
      <CatalogNoticePanel
        notice={{
          title: "Próximamente",
          text: "Estamos probando cafeteras.",
          images: [image],
          action: { label: "Ver café", href: "#cafe" },
        }}
      />,
    );

    expect(html).toMatch(/<h3[^>]*>Próximamente<\/h3>/);
    expect(html).toContain("Estamos probando cafeteras.");
    expect(html).toContain('alt="Cafetera de goteo negra"');
    expect(html).toContain('loading="lazy"');
    expect(html).toMatch(/<a [^>]*href="#cafe"[^>]*>Ver café<\/a>/);
  });

  it("no parece un producto a la venta: sin precio, sin botón verde y sin enlace a ficha", () => {
    const html = renderToStaticMarkup(
      <CatalogNoticePanel
        notice={{
          title: "Próximamente",
          text: "Texto.",
          images: [image],
          action: { label: "Ver café", href: "#cafe" },
        }}
      />,
    );

    expect(html).not.toContain("$");
    expect(html).not.toContain("bg-buy-700");
    expect(html).not.toContain("/productos/");
    expect(html).not.toContain("<article");
  });

  it("omite fotos y acción si el aviso no las tiene", () => {
    const html = renderToStaticMarkup(
      <CatalogNoticePanel notice={{ title: "Próximamente", text: "Texto.", images: [] }} />,
    );

    expect(html).not.toContain("<img");
    expect(html).not.toContain("<ul");
    expect(html).not.toContain("<a ");
  });
});
