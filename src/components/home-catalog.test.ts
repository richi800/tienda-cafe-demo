import { describe, expect, it } from "vitest";

import { sampleProducts } from "@/data/sample-products";
import type { Product } from "@/domain/product";

import { CUPS_IMAGE, DRIP_MACHINE_IMAGE, ESPRESSO_MACHINE_IMAGE } from "./editorial-images";
import { buildHomeCatalog, type HomeCatalogSection } from "./home-catalog";
import { CATALOG_SECTIONS } from "./store-sections";

/** Café sin precio anterior, como los que hoy entrega Shopify (`compareAtPrice` en 0). */
function coffee(id: string): Product {
  return {
    id,
    handle: `cafe-${id}`,
    title: `Café ${id}`,
    description: "Café de prueba.",
    category: "coffee",
    flavorNotes: [],
    price: { amount: "18.00", currencyCode: "USD" },
    availableForSale: true,
  };
}

/** Busca una sección por su ancla. */
function section(sections: HomeCatalogSection[], id: string): HomeCatalogSection {
  const found = sections.find((item) => item.id === id);
  if (found === undefined) throw new Error(`Falta la sección ${id}`);
  return found;
}

describe("buildHomeCatalog", () => {
  it("siempre arma las cuatro secciones del sub-header, en orden, para no romper anclas", () => {
    expect(buildHomeCatalog([]).map((item) => item.id)).toEqual(
      CATALOG_SECTIONS.map((item) => item.id),
    );
  });

  describe("con productos en todas las categorías (datos de ejemplo)", () => {
    const sections = buildHomeCatalog(sampleProducts);

    it("muestra tarjetas en cada sección", () => {
      for (const item of sections) {
        expect(item.content.kind).toBe("products");
      }
    });

    it("solo pone en Promociones los productos con descuento real", () => {
      const content = section(sections, "promociones").content;
      if (content.kind !== "products") throw new Error("Se esperaban productos");

      expect(content.products.length).toBeGreaterThan(0);
      expect(content.products.every((product) => product.compareAtPrice !== undefined)).toBe(true);
    });

    it("muestra las fotos editoriales en el banner de Cafeteras y Accesorios", () => {
      expect(section(sections, "cafeteras").bannerImages).toEqual([
        ESPRESSO_MACHINE_IMAGE,
        DRIP_MACHINE_IMAGE,
      ]);
      expect(section(sections, "accesorios").bannerImages).toEqual([CUPS_IMAGE]);
    });
  });

  describe("solo con cafés sin ofertas (catálogo actual de Shopify)", () => {
    const sections = buildHomeCatalog([coffee("a"), coffee("b"), coffee("c")]);

    it("muestra los cafés como tarjetas", () => {
      const content = section(sections, "cafe").content;

      expect(content.kind).toBe("products");
      expect(content.kind === "products" && content.products).toHaveLength(3);
    });

    it("muestra en Promociones un aviso que lleva al café, sin fotos", () => {
      const content = section(sections, "promociones").content;
      if (content.kind !== "notice") throw new Error("Se esperaba un aviso");

      expect(content.notice.title).toBe("Sin promociones por ahora");
      expect(content.notice.images).toEqual([]);
      expect(content.notice.action).toEqual({ label: "Ver café", href: "#cafe" });
    });

    it("muestra Próximamente en Cafeteras y Accesorios, con las fotos en el aviso y no en el banner", () => {
      const machines = section(sections, "cafeteras");
      const accessories = section(sections, "accesorios");

      for (const [item, images] of [
        [machines, [ESPRESSO_MACHINE_IMAGE, DRIP_MACHINE_IMAGE]],
        [accessories, [CUPS_IMAGE]],
      ] as const) {
        if (item.content.kind !== "notice") throw new Error("Se esperaba un aviso");
        expect(item.content.notice.title).toBe("Próximamente");
        expect(item.content.notice.images).toEqual(images);
        expect(item.content.notice.action?.href).toBe("#cafe");
        expect(item.bannerImages).toEqual([]);
      }
    });
  });

  it("si tampoco hay café, avisa sin enlazar a la propia sección", () => {
    const content = section(buildHomeCatalog([]), "cafe").content;
    if (content.kind !== "notice") throw new Error("Se esperaba un aviso");

    expect(content.notice.action).toBeUndefined();
  });
});
