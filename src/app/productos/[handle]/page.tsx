import type { Metadata } from "next";
import { Suspense } from "react";

import { getProductByHandle, getProducts } from "@/data/products";

import { ProductContent, ProductPageFallback } from "./product-content";

/**
 * Exige que la ficha completa sea estática. Además de impedir que un cambio futuro la vuelva
 * dinámica sin querer, hace que un `handle` no prerenderizado espere el render completo antes
 * de responder: así `notFound()` ocurre antes de enviar nada y la respuesta lleva estado 404.
 * Sin esto, con Partial Prefetching se enviaría primero el App Shell y el 404 llegaría con
 * estado 200.
 */
export const ensureStatic = "navigation";

/**
 * Prerenderiza la ficha de todos los productos del catálogo durante el build: los de Shopify
 * si está configurado, o los de ejemplo si no (el build no necesita secretos).
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
 * `params` se lee dentro de `<Suspense>`: así el App Shell de la ruta (encabezado, pie y el
 * espacio reservado) no depende de la URL y la navegación puede mostrarse al instante. Con
 * `ensureStatic = "navigation"` la ficha completa sigue prerenderizada.
 *
 * @param props - Propiedades de la página.
 * @returns La ficha, con un espacio reservado mientras se resuelve.
 */
export default function ProductPage({ params }: PageProps<"/productos/[handle]">) {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
