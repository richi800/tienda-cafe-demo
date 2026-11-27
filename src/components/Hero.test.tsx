import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Hero, HERO_IMAGE } from "./Hero";

describe("Hero", () => {
  it("muestra la foto de ambiente con alt, medidas reales y carga prioritaria", () => {
    const html = renderToStaticMarkup(<Hero />);
    const img = html.match(/<img [^>]*>/)?.[0] ?? "";

    // En las pruebas no se carga next.config (images.unoptimized), así que la ruta puede llegar
    // envuelta por el cargador por omisión; basta con comprobar el archivo.
    expect(img).toContain("set-caja-lata.webp");
    expect(img).toContain(`alt="${HERO_IMAGE.alt}"`);
    expect(img).toContain('width="896"');
    expect(img).toContain('height="896"');
    expect(img).toContain('loading="eager"');
    expect(img).toContain('fetchPriority="high"');
    expect(img).toContain("object-cover object-center");
  });

  it("reserva el espacio de la foto con las proporciones del hero", () => {
    const html = renderToStaticMarkup(<Hero />);

    expect(html).toContain("aspect-hero-compact");
    expect(html).toContain("md:aspect-hero");
  });

  it("no asocia la foto a un origen ni transcribe el texto del empaque", () => {
    expect(HERO_IMAGE.alt).not.toMatch(/colombia|origen|chiapas|veracruz|oaxaca|landera/i);
  });
});
