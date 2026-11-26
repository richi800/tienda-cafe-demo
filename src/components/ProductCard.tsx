/**
 * Tarjeta de producto para listados y secciones destacadas.
 *
 * @packageDocumentation
 */

import { formatPrice } from "@/domain/money";
import { getDiscountPercentage, type ColorOption, type Product } from "@/domain/product";

import { Button } from "./Button";

/** Propiedades de {@link ProductCard}. */
export type ProductCardProps = {
  /** Producto a mostrar. */
  product: Product;
  /**
   * `id` del texto que explica por qué aún no se puede abrir la ficha. Mientras no existan
   * las fichas de producto, el botón de compra se muestra como no disponible y se describe
   * con ese texto.
   */
  purchaseNoteId?: string;
};

/**
 * Muestra un producto en una tarjeta blanca: imagen con cinta de descuento, colores, nombre,
 * frase corta, precio y el botón "Ver detalles y comprar".
 *
 * Mientras no haya fotografías, el espacio de la imagen se reserva con la proporción
 * `--aspect-product` (4:5), o `--aspect-product-compact` (4:3) en celular, para que la tarjeta
 * no cambie de tamaño cuando lleguen.
 *
 * @param props - Propiedades de la tarjeta.
 * @returns Un `<article>` con la información del producto.
 */
export function ProductCard({ product, purchaseNoteId }: ProductCardProps) {
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white text-center">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="aspect-product-compact w-full bg-neutral-100 md:aspect-product"
        />
        {discount > 0 && (
          // La cinta cruza la esquina superior izquierda; el contenedor recorta sus extremos.
          <p className="absolute top-5 -left-10 w-40 -rotate-45 bg-promo-600 py-1 text-sm font-bold text-white">
            <span aria-hidden="true">-{discount}%</span>
            <span className="sr-only">{discount}% de descuento</span>
          </p>
        )}
        {!product.availableForSale && (
          <p className="absolute top-3 right-3 rounded-pill bg-ink-900 px-3 py-1 text-sm font-semibold text-white">
            Agotado
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 p-6">
        {product.colorOptions && product.colorOptions.length > 0 && (
          <ColorSwatches colors={product.colorOptions} />
        )}

        <h3 className="text-lg font-bold tracking-tight text-ink-900">{product.title}</h3>

        {product.flavorNotes.length > 0 && (
          <ul aria-label="Notas de sabor" className="flex flex-wrap justify-center gap-2">
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

        <div className="mt-auto flex w-full flex-col items-center gap-4 pt-2">
          <ProductPrice product={product} discounted={discount > 0} />
          <Button
            href={`/productos/${product.handle}`}
            unavailable={purchaseNoteId !== undefined}
            describedBy={purchaseNoteId}
            className="w-full"
          >
            Ver detalles y comprar
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * Círculos con los colores disponibles.
 *
 * @param props - Colores del producto.
 * @returns Una lista nombrada en la que cada color lleva su nombre en texto oculto.
 */
function ColorSwatches({ colors }: { colors: readonly ColorOption[] }) {
  return (
    <ul aria-label="Colores disponibles" className="flex gap-2">
      {colors.map((color) => (
        <li key={color.name}>
          {/* El color viene del producto, no de la paleta; el borde neutral-500 (3:1) delimita los tonos claros. */}
          <span
            title={color.name}
            className="block size-5 rounded-pill border border-neutral-500"
            style={{ backgroundColor: color.hex }}
          />
          <span className="sr-only">{color.name}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Precio del producto: verde si es el precio normal; con descuento, el precio anterior
 * tachado, el de oferta en azul y la nota de que se refleja al pagar.
 *
 * @param props - Producto y si tiene un descuento real.
 * @returns El bloque del precio.
 */
function ProductPrice({ product, discounted }: { product: Product; discounted: boolean }) {
  if (!discounted || product.compareAtPrice === undefined) {
    return <p className="text-xl font-bold text-buy-700">{formatPrice(product.price)}</p>;
  }

  return (
    <div>
      <p className="flex flex-wrap items-baseline justify-center gap-x-2">
        <span className="sr-only">Precio anterior:</span>
        <del className="text-base text-ink-500">{formatPrice(product.compareAtPrice)}</del>
        <span className="sr-only">Precio de oferta:</span>
        <span className="text-xl font-bold text-sale-700">{formatPrice(product.price)}</span>
      </p>
      <p className="mt-1 text-sm text-ink-700">
        <span aria-hidden="true">*</span>Reflejado al final de tu compra
      </p>
    </div>
  );
}
