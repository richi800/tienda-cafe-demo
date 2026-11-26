import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { Announcement } from "@/domain/announcement";

import { AnnouncementBar, getWrappedIndex } from "./AnnouncementBar";

const announcements: readonly Announcement[] = [
  { id: "a", message: "Envío gratis en compras desde $899", href: "/#cafe" },
  { id: "b", message: "Descuento en cafeteras", href: "/#promociones" },
  { id: "c", message: "Suscríbete", href: "/#suscripcion" },
];

describe("getWrappedIndex", () => {
  it("avanza y retrocede dentro de los límites", () => {
    expect(getWrappedIndex(0, 1, 3)).toBe(1);
    expect(getWrappedIndex(2, -1, 3)).toBe(1);
  });

  it("da la vuelta en ambos extremos", () => {
    expect(getWrappedIndex(2, 1, 3)).toBe(0);
    expect(getWrappedIndex(0, -1, 3)).toBe(2);
  });
});

describe("AnnouncementBar", () => {
  it("muestra el primer aviso y lo anuncia como región viva", () => {
    const html = renderToStaticMarkup(
      <AnnouncementBar announcements={announcements} termsHref="/#terminos" />,
    );

    expect(html).toContain('aria-roledescription="carrusel"');
    expect(html).toContain('aria-label="Avisos de la tienda"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Aviso 1 de 3");
    expect(html).toContain("Envío gratis en compras desde $899");
    expect(html).not.toContain("Descuento en cafeteras");
  });

  it("ofrece flechas con nombre accesible que controlan el aviso", () => {
    const html = renderToStaticMarkup(
      <AnnouncementBar announcements={announcements} termsHref="/#terminos" />,
    );
    const messageId = html.match(/<p id="([^"]+)" aria-live/)?.[1];

    expect(messageId).toBeDefined();
    expect(html).toContain('aria-label="Aviso anterior"');
    expect(html).toContain('aria-label="Aviso siguiente"');
    expect(html.match(new RegExp(`aria-controls="${messageId}"`, "g"))).toHaveLength(2);
  });

  it("enlaza Compra ahora al destino del aviso y muestra los términos", () => {
    const html = renderToStaticMarkup(
      <AnnouncementBar announcements={announcements} termsHref="/#terminos" />,
    );

    expect(html).toMatch(/<a[^>]*href="\/#cafe"[^>]*>.*Compra ahora/);
    expect(html).toMatch(/<a[^>]*href="\/#terminos"[^>]*>.*Términos y condiciones<\/a>/);
  });

  it("oculta las flechas si solo hay un aviso", () => {
    const html = renderToStaticMarkup(
      <AnnouncementBar announcements={announcements.slice(0, 1)} termsHref="/#terminos" />,
    );

    expect(html).not.toContain("Aviso anterior");
    expect(html).not.toContain("Aviso 1 de 1");
  });

  it("no muestra nada si no hay avisos", () => {
    expect(
      renderToStaticMarkup(<AnnouncementBar announcements={[]} termsHref="/#terminos" />),
    ).toBe("");
  });
});
