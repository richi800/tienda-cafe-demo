import { describe, expect, it } from "vitest";

import { faqs } from "./faqs";

describe("faqs", () => {
  it("usa identificadores únicos", () => {
    expect(new Set(faqs.map((faq) => faq.id)).size).toBe(faqs.length);
  });

  it("tiene más de cuatro preguntas para que aplique Mostrar más", () => {
    expect(faqs.length).toBeGreaterThan(4);
  });

  it("habla de café y de la tienda, sin modelos ni garantías de equipos", () => {
    for (const { question, answer } of faqs) {
      expect(`${question} ${answer}`).not.toMatch(
        /Ladera Pro|descalcific|garantía|espumador|cafeteras? y (los )?molinos/i,
      );
    }
  });

  it("deja entre las cuatro visibles las preguntas que enlaza el pie de página", () => {
    const visibleIds = faqs.slice(0, 4).map((faq) => faq.id);

    expect(visibleIds).toContain("envios");
    expect(visibleIds).toContain("facturacion");
  });
});
