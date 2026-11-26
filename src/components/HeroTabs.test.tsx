import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeroTabs } from "./HeroTabs";
import { HERO_TAB_SECTIONS } from "./store-sections";

describe("HeroTabs", () => {
  it("es una navegación de enlaces a anclas, no un tablist", () => {
    const html = renderToStaticMarkup(<HeroTabs sections={HERO_TAB_SECTIONS} />);

    expect(html).toMatch(/^<nav aria-label="Filtrar por categoría"/);
    expect(html).not.toContain('role="tab');
    for (const section of HERO_TAB_SECTIONS) {
      expect(html).toMatch(new RegExp(`<a href="#${section.id}"[^>]*>.*?${section.label}</a>`));
    }
  });

  it("muestra la etiqueta Filtro antes de las pestañas", () => {
    const html = renderToStaticMarkup(<HeroTabs sections={HERO_TAB_SECTIONS} />);

    expect(html.indexOf("Filtro")).toBeLessThan(html.indexOf("<ul"));
  });

  it("subraya la primera pestaña sin anunciarla como ubicación actual", () => {
    const html = renderToStaticMarkup(<HeroTabs sections={HERO_TAB_SECTIONS} />);

    expect(html).toMatch(/<a href="#cafe" data-highlighted=""/);
    expect(html.match(/data-highlighted=""/g)).toHaveLength(1);
    expect(html).not.toContain("aria-current");
  });

  it("incluye las cuatro pestañas previstas", () => {
    expect(HERO_TAB_SECTIONS.map((section) => section.label)).toEqual([
      "Café",
      "Cafeteras",
      "Accesorios",
      "La diferencia",
    ]);
  });
});
