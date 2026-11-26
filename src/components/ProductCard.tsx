/**
 * Tarjeta de producto para listados y secciones destacadas.
 *
 * @packageDocumentation
 */

import { formatPrice } from "@/domain/money";
import { getDiscountPercentage, type Product } from "@/domain/product";

/** Propiedades de {@link ProductCard}. */
export type ProductCardProps = {
  /** Producto a mostrar. */
  product: Product;
};

/**
 * Muestra imagen, nombre, notas de sabor, descripción, precio y disponibilidad de un producto.
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
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);

  return (
    <article className="flex h-full flex-col">
      <div className="relative">
        <div
          aria-hidden="true"
          className="aspect-product-compact w-full rounded-lg bg-neutral-200 md:aspect-product"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {discount > 0 && (
            <p className="rounded-pill bg-promo-600 px-3 py-1 text-sm font-semibold text-white">
              <span aria-hidden="true">-{discount}%</span>
              <span className="sr-only">{discount}% de descuento</span>
            </p>
          )}
          {!product.availableForSale && (
            <p className="rounded-pill bg-ink-900 px-3 py-1 text-sm font-semibold text-white">
              Agotado
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <h3 className="text-lg font-semibold tracking-tight text-ink-900">{product.title}</h3>

        {product.flavorNotes.length > 0 && (
          <ul aria-label="Notas de sabor" className="flex flex-wrap gap-2">
            {product.flavorNotes.map((note) => (
              <li
                key={note}
                className="rounded-pill border border-neutral-200 px-3 py-1 text-sm text-ink-700"
              >
                {note}
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-ink-700">{product.description}</p>

        <ProductPrice product={product} discounted={discount > 0} />
      </div>
    </article>
  );
}

/**
 * Precio del producto: verde si es el precio normal; azul junto al precio anterior
 * tachado si está en oferta.
 *
 * @param props - Producto y si tiene un descuento real.
 * @returns El párrafo con el precio, alineado al pie de la tarjeta.
 */
function ProductPrice({ product, discounted }: { product: Product; discounted: boolean }) {
  if (!discounted || product.compareAtPrice === undefined) {
    return (
      <p className="mt-auto pt-2 text-lg font-semibold text-buy-700">
        {formatPrice(product.price)}
      </p>
    );
  }

  return (
    <p className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-2">
      <span className="sr-only">Precio de oferta:</span>
      <span className="text-lg font-semibold text-sale-700">{formatPrice(product.price)}</span>
      <span className="sr-only">Precio anterior:</span>
      <del className="text-sm text-ink-500">{formatPrice(product.compareAtPrice)}</del>
    </p>
  );
}
