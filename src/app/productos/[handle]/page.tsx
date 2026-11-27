import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";
import { CATEGORY_SECTIONS } from "@/components/store-sections";
import { getProductByHandle, getProducts, getRelatedProducts } from "@/data/products";

/**
 * Exige que la ficha completa sea estática. Además de impedir que un cambio futuro la vuelva
 * dinámica sin querer, hace que un `handle` no prerenderizado espere el render completo antes
 * de responder: así `notFound()` ocurre antes de enviar nada y la respuesta lleva estado 404.
 * Sin esto, con Partial Prefetching se enviaría primero el App Shell y el 404 llegaría con
 * estado 200.
 */
export const ensureStatic = "navigation";

/**
 * Prerenderiza la ficha de todos los productos del catálogo durante el build. Los datos son
 * locales, así que el build no necesita secretos.
 *
 * @returns Un objeto `{ handle }` por producto.
 */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ handle: product.handle }));
}

/**
 * Título y descripción de la ficha a partir del producto.
 *
 * @param props - Propiedades de la página; solo se usa `params`.
 * @returns Los metadatos del producto, o los de "Producto no encontrado" si el handle no existe.
 */
export async function generateMetadata({
  params,
}: PageProps<"/productos/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (product === undefined) {
    return { title: "Producto no encontrado | Café Ladera" };
  }

  return {
    title: `${product.title} | Café Ladera`,
    description: product.description,
  };
}

/**
 * Ficha de producto: ruta de navegación, foto, nombre, precio, color, compra, descripción y
 * productos relacionados de la misma categoría. Un `handle` inexistente muestra el 404 de la
 * tienda (`not-found.tsx`).
 *
 * @param props - Propiedades de la página.
 * @returns El contenido de la ficha.
 */
export default async function ProductPage({ params }: PageProps<"/productos/[handle]">) {
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
