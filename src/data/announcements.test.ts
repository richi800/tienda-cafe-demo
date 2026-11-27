import { describe, expect, it } from "vitest";

import { announcements } from "./announcements";

describe("announcements", () => {
  it("apunta cada aviso a una sección de la portada", () => {
    for (const announcement of announcements) {
      expect(announcement.href).toMatch(/^\/#[a-z-]+$/);
    }
  });

  it("no anuncia descuentos de producto ni modelos que el catálogo puede no tener", () => {
    for (const { id, message } of announcements) {
      expect(message).not.toMatch(/cafetera|accesorio|Ladera Pro|seleccionad/i);
      // El único porcentaje permitido es el de la suscripción, que es una condición fija.
      if (id !== "subscription") {
        expect(message).not.toContain("%");
      }
    }
  });
});
