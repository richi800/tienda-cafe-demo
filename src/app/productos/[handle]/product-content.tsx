/**
 * Contenido de la ficha de producto y su espacio reservado. Vive junto a la ruta, fuera de
 * `page.tsx`, porque una página solo puede exportar los campos que define Next.js y este
 * contenido se prueba por separado.
 *
 * @packageDocumentation
 */

import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";
import { CATEGORY_SECTIONS } from "@/components/store-sections";
import { getProductByHandle, getRelatedProducts } from "@/data/products";

/**
 * Espacio reservado de la ficha mientras llega su contenido: conserva el alto de la foto para
 * evitar saltos de diseño.
 *
 * @returns Un bloque neutro con texto solo para lectores de pantalla.
 */
export function ProductPageFallback() {
  return (
    <Container className="pt-4 pb-section">
      <div aria-busy="true" className="mt-12 lg:grid lg:grid-cols-2 lg:gap-12">
        <div className="aspect-product-compact w-full rounded-lg bg-neutral-100 lg:aspect-product" />
        <p className="sr-only">Cargando producto</p>
      </div>
    </Container>
  );
}

/**
 * Contenido de la ficha para el `handle` de la URL.
 *
 * @throws El error de `notFound()` si el `handle` no existe, que muestra el 404 de la tienda.
 *
 * @param props - Parámetros de la ruta, aún sin resolver.
 * @returns La ficha del producto.
 */
export async function ProductContent({ params }: Pick<PageProps<"/productos/[handle]">, "params">) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (product === undefined) {
    notFound();
  }

  const category = CATEGORY_SECTIONS[product.category];
  const related = await getRelatedProducts(product);

  return (
    <>
      <Container className="pt-4 pb-section">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: category.label, href: `/#${category.id}` },
            { label: product.title },
          ]}
        />
        <div className="mt-4">
          <ProductDetail product={product} />
        </div>
      </Container>

      {related.length > 0 && (
        <Section id="relacionados" title="También te puede interesar" tone="muted">
          <ProductGrid products={related} />
        </Section>
      )}
    </>
  );
}
