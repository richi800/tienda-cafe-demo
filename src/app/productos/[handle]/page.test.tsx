import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { sampleProducts } from "@/data/sample-products";

import { generateMetadata, generateStaticParams } from "./page";
import { ProductContent } from "./product-content";

// La caché de Next.js solo existe dentro del servidor de Next; en las pruebas no hace nada.
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

/** Simula las propiedades que Next.js entrega a la página. */
function propsFor(handle: string): PageProps<"/productos/[handle]"> {
  return {
    params: Promise.resolve({ handle }),
    searchParams: Promise.resolve({}),
  };
}

/** Renderiza a HTML la página del handle indicado. */
async function renderPage(handle: string) {
  return renderToStaticMarkup(await ProductContent(propsFor(handle)));
}

describe("ficha de producto", () => {
  it("genera una ruta estática por cada producto del catálogo", async () => {
    const params = await generateStaticParams();

    expect(params).toEqual(sampleProducts.map((product) => ({ handle: product.handle })));
  });

  it("usa el nombre y la descripción del producto en los metadatos", async () => {
    const metadata = await generateMetadata(propsFor("espresso-veracruz"));

    expect(metadata.title).toBe("Espresso Veracruz | Café Ladera");
    expect(metadata.description).toContain("tueste oscuro");
  });

  it("muestra la ruta Inicio, la categoría con su ancla y el producto actual", async () => {
    const html = await renderPage("cafetera-espresso-ladera-pro");

    expect(html).toContain('aria-label="Ruta de navegación"');
    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Inicio<\/a>/);
    expect(html).toMatch(/<a[^>]*href="\/#cafeteras"[^>]*>Cafeteras<\/a>/);
    expect(html).toMatch(/<span aria-current="page"[^>]*>Cafetera de espresso Ladera Pro<\/span>/);
  });

  it("sugiere hasta tres productos de la misma categoría sin repetir el actual", async () => {
    const html = await renderPage("cafe-de-altura-chiapas");
    const related = html.slice(html.indexOf('id="relacionados"'));

    expect(related).toContain("También te puede interesar");
    expect(related).toContain('href="/productos/espresso-veracruz"');
    expect(related).toContain('href="/productos/descafeinado-oaxaca"');
    expect(related).not.toContain('href="/productos/cafe-de-altura-chiapas"');
    expect(related).not.toContain("/productos/cafetera-");
    expect(related.match(/<article/g)?.length).toBeLessThanOrEqual(3);
  });

  it("lanza el 404 de la tienda si el handle no existe", async () => {
    await expect(ProductContent(propsFor("producto-inexistente"))).rejects.toMatchObject({
      digest: expect.stringContaining("404"),
    });
  });

  it("titula los metadatos de un handle inexistente como producto no encontrado", async () => {
    const metadata = await generateMetadata(propsFor("producto-inexistente"));

    expect(metadata.title).toBe("Producto no encontrado | Café Ladera");
  });
});
