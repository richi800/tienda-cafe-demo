import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MAIN_NAV_ITEMS } from "./main-navigation";
import { MobileMenu } from "./MobileMenu";

describe("MobileMenu", () => {
  it("empieza cerrado y el botón describe su estado", () => {
    const html = renderToStaticMarkup(<MobileMenu items={MAIN_NAV_ITEMS} panelId="menu" />);

    expect(html).toMatch(/<button[^>]*aria-expanded="false"/);
    expect(html).toContain('aria-controls="menu"');
    expect(html).toContain('aria-label="Abrir menú"');
    expect(html).toMatch(/<nav id="menu" aria-label="Principal" hidden=""/);
  });

  it("incluye todos los enlaces de la navegación principal", () => {
    const html = renderToStaticMarkup(<MobileMenu items={MAIN_NAV_ITEMS} panelId="menu" />);

    for (const item of MAIN_NAV_ITEMS) {
      expect(html).toContain(`href="${item.href}"`);
      expect(html).toContain(`>${item.label}</a>`);
    }
  });

  it("pinta Promociones con el rojo de promociones", () => {
    const html = renderToStaticMarkup(<MobileMenu items={MAIN_NAV_ITEMS} panelId="menu" />);

    expect(html).toMatch(/<a[^>]*class="[^"]*text-promo-600[^"]*"[^>]*>Promociones<\/a>/);
  });
});
