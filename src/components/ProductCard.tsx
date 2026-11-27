/**
 * Tarjeta de producto para listados y secciones destacadas.
 *
 * @packageDocumentation
 */

import type { ColorOption, Product } from "@/domain/product";

import { Button } from "./Button";
import { productHref } from "./product-links";
import { ProductMedia } from "./ProductMedia";
import { ProductPrice } from "./ProductPrice";

/** Propiedades de {@link ProductCard}. */
export type ProductCardProps = {
  /** Producto a mostrar. */
  product: Product;
};

/**
 * Muestra un producto en una tarjeta blanca: imagen con cinta de descuento, colores, nombre,
 * frase corta, precio y el botón "Ver detalles y comprar", que lleva a la ficha.
 *
 * @param props - Propiedades de la tarjeta.
 * @returns Un `<article>` con la información del producto.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white text-center">
      <ProductMedia product={product} />

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
          <ProductPrice product={product} />
          <Button href={productHref(product.handle)} className="w-full">
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
