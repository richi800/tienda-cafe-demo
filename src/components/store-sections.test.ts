import { describe, expect, it } from "vitest";

import { CATALOG_SECTIONS, CATEGORY_SECTIONS } from "./store-sections";

describe("CATEGORY_SECTIONS", () => {
  it("apunta cada categoría a una sección de catálogo de la portada con el mismo texto", () => {
    for (const section of Object.values(CATEGORY_SECTIONS)) {
      const catalogSection = CATALOG_SECTIONS.find((item) => item.id === section.id);

      expect(catalogSection?.label).toBe(section.label);
    }
  });
});
