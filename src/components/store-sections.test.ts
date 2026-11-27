import { describe, expect, it } from "vitest";

import { CATALOG_SECTIONS, CATEGORY_SECTIONS, HERO_TAB_SECTIONS } from "./store-sections";

describe("miniaturas de las secciones", () => {
  it("las tres categorías tienen foto; Promociones y La diferencia conservan su icono", () => {
    for (const section of Object.values(CATEGORY_SECTIONS)) {
      expect(section.image).toBeDefined();
    }
    expect(CATALOG_SECTIONS.find((item) => item.id === "promociones")?.image).toBeUndefined();
    expect(HERO_TAB_SECTIONS.find((item) => item.id === "diferencia")?.image).toBeUndefined();
  });
});

describe("CATEGORY_SECTIONS", () => {
  it("apunta cada categoría a una sección de catálogo de la portada con el mismo texto", () => {
    for (const section of Object.values(CATEGORY_SECTIONS)) {
      const catalogSection = CATALOG_SECTIONS.find((item) => item.id === section.id);

      expect(catalogSection?.label).toBe(section.label);
    }
  });
});
