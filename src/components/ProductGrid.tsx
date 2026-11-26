/**
 * Rejilla de tarjetas de producto.
 *
 * @packageDocumentation
 */

import type { Product } from "@/domain/product";

import { ProductCard } from "./ProductCard";

/** Propiedades de {@link ProductGrid}. */
export type ProductGridProps = {
  /** Productos a mostrar, en orden. */
  products: readonly Product[];
  /** Texto que se muestra si la lista está vacía. */
  emptyMessage?: string;
};

/**
 * Muestra los productos en una lista: una columna en celular, dos desde `sm` y tres
 * desde `lg`. Si no hay productos, muestra un mensaje en lugar de una lista vacía.
 *
 * @param props - Propiedades de la rejilla.
 * @returns Una lista de tarjetas o el mensaje de vacío.
 */
export function ProductGrid({
  products,
  emptyMessage = "Por ahora no hay productos en esta sección.",
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-ink-700">{emptyMessage}</p>;
  }

  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
