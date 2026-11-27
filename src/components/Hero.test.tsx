import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HERO_IMAGE } from "./editorial-images";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("muestra la foto de ambiente con alt, medidas reales y carga prioritaria", () => {
    const html = renderToStaticMarkup(<Hero />);
    const img = html.match(/<img [^>]*>/)?.[0] ?? "";

    // En las pruebas no se carga next.config (images.unoptimized), así que la ruta puede llegar
    // envuelta por el cargador por omisión; basta con comprobar el archivo.
    expect(img).toContain(HERO_IMAGE.src.split("/").at(-1));
    expect(img).toContain(`alt="${HERO_IMAGE.alt}"`);
    expect(img).toContain(`width="${HERO_IMAGE.width}"`);
    expect(img).toContain(`height="${HERO_IMAGE.height}"`);
    expect(img).toContain('loading="eager"');
    expect(img).toContain('fetchPriority="high"');
    expect(img).toContain("object-cover object-[50%_65%]");
  });

  it("reserva el espacio de la foto con las proporciones del hero", () => {
    const html = renderToStaticMarkup(<Hero />);

    expect(html).toContain("aspect-hero-compact");
    expect(html).toContain("md:aspect-hero");
  });

});
