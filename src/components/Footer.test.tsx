import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Footer } from "./Footer";

const html = renderToStaticMarkup(<Footer />);

describe("Footer", () => {
  it("muestra métodos de pago de demostración solo como texto", () => {
    expect(html).toContain("Métodos de pago (demostración)");
    for (const method of ["Tarjeta de crédito", "Tarjeta de débito", "Transferencia"]) {
      expect(html).toContain(`>${method}</li>`);
    }
    expect(html).not.toContain("<img");
    expect(html).not.toMatch(/100\s*%\s*segur/i);
  });

  it("enlaza la información solo a secciones de la portada", () => {
    const nav = html.match(/<nav aria-label="Información".*?<\/nav>/)?.[0] ?? "";
    const hrefs = [...nav.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    expect(hrefs).toEqual([
      "/#faq-envios",
      "/#terminos",
      "/#faq-facturacion",
      "/#ayuda",
      "/#contacto",
    ]);
    expect(nav).toContain('<span aria-hidden="true" class="text-neutral-500">/</span>');
  });

  it("no publica enlaces a redes sociales inexistentes", () => {
    const social = html.match(/<ul aria-label="Redes sociales \(próximamente\)".*?<\/ul>/)?.[0];

    expect(social).toBeDefined();
    expect(social).not.toContain("<a ");
    expect(social).toContain('<span class="sr-only">Fotos</span>');
  });

  it("ofrece el selector de país e idioma con una sola opción y etiqueta", () => {
    expect(html).toContain('<label for="pais-idioma"');
    expect(html).toContain('<select id="pais-idioma"');
    expect(html.match(/<option/g)).toHaveLength(1);
    expect(html).toContain("México (Español)");
  });

  it("conserva los enlaces del proyecto, vuelve arriba y muestra el aviso de demo", () => {
    expect(html).toContain('href="https://github.com/richi800/tienda-cafe-demo"');
    expect(html).toContain('href="https://github.com/richi800/tienda-cafe-demo/tree/main/docs"');
    expect(html).toMatch(/<a href="#top"[^>]*>.*Desplazarse hasta arriba<\/a>/);
    expect(html).toContain("© 2026 Café Ladera");
    expect(html).toContain("no se realizan ventas");
  });
});
