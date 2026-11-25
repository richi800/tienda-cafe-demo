/**
 * Tarjeta de producto para listados y secciones destacadas.
 *
 * @packageDocumentation
 */

import { formatPrice } from "@/domain/money";
import type { Product } from "@/domain/product";

/** Propiedades de {@link ProductCard}. */
export type ProductCardProps = {
  /** Producto a mostrar. */
  product: Product;
};

/**
 * Muestra nombre, notas de sabor, descripción, precio y disponibilidad de un producto.
 *
 * Mientras no haya fotografías, el espacio de la imagen se reserva con la proporción
 * `--aspect-product` (4:5) para que la tarjeta no cambie de tamaño cuando lleguen. En
 * celular, donde la rejilla tiene una sola columna, se usa `--aspect-product-compact`
 * (4:3) para que cada tarjeta no ocupe casi toda la pantalla.
 *
 * @param props - Propiedades de la tarjeta.
 * @returns Un `<article>` con la información del producto.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-cream-200 bg-cream-100">
      <div
        aria-hidden="true"
        className="aspect-product-compact w-full bg-cream-200 md:aspect-product"
      />

      <div className="flex flex-1 flex-col gap-3 p-4 lg:p-6">
        <h3 className="font-display text-xl font-semibold text-coffee-900">{product.title}</h3>

        <ul aria-label="Notas de sabor" className="flex flex-wrap gap-2">
          {product.flavorNotes.map((note) => (
            <li
              key={note}
              className="rounded-sm border border-cream-200 bg-cream-50 px-2 py-1 text-sm text-coffee-700"
            >
              {note}
            </li>
          ))}
        </ul>

        <p className="text-sm text-coffee-700">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="text-lg font-semibold text-coffee-900">{formatPrice(product.price)}</p>
          {!product.availableForSale && (
            <p className="rounded-sm bg-coffee-900 px-2 py-1 text-sm font-semibold text-cream-50">
              Agotado
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
