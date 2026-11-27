/**
 * Contenido principal de la ficha de producto.
 *
 * @packageDocumentation
 */

import type { Product } from "@/domain/product";

import { Button } from "./Button";
import { ColorSelector } from "./ColorSelector";
import { ProductMedia } from "./ProductMedia";
import { ProductPrice } from "./ProductPrice";

/** Propiedades de {@link ProductDetail}. */
export type ProductDetailProps = {
  /** Producto a mostrar. */
  product: Product;
};

/** `id` de la nota que explica por qué el botón de compra no está disponible. */
export const PURCHASE_NOTE_ID = "compra-nota";

/** Nota del botón de compra mientras la tienda no tenga carrito. */
export const PURCHASE_UNAVAILABLE_NOTE = "La compra aún no está disponible en esta demostración.";

/**
 * Muestra la foto grande del producto y, a su lado (debajo en celular), el nombre como `h1`,
 * las notas de sabor, el precio, el selector de color, el botón "Agregar al carrito" y la
 * descripción.
 *
 * Decisión: el botón se muestra no disponible (`aria-disabled`) con una nota visible porque la
 * tienda aún no tiene carrito; si el producto está agotado, la nota dice "Agotado". Así se
 * conserva la jerarquía de la ficha sin simular una compra que no ocurre.
 *
 * @param props - Propiedades de la ficha.
 * @returns Un `<article>` con la información del producto.
 */
export function ProductDetail({ product }: ProductDetailProps) {
  const colors = product.colorOptions ?? [];

  return (
    <article className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <ProductMedia product={product} variant="detail" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
            {product.title}
          </h1>
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
        </div>

        <ProductPrice product={product} size="detail" />

        {colors.length > 0 && <ColorSelector colors={colors} name={`color-${product.handle}`} />}

        <div className="flex flex-col gap-2">
          <Button unavailable describedBy={PURCHASE_NOTE_ID} className="w-full">
            Agregar al carrito
          </Button>
          <p
            id={PURCHASE_NOTE_ID}
            className={
              product.availableForSale
                ? "text-sm text-ink-700"
                : "text-base font-semibold text-ink-900"
            }
          >
            {product.availableForSale ? PURCHASE_UNAVAILABLE_NOTE : "Agotado"}
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h2 className="text-lg font-semibold tracking-tight text-ink-900">Descripción</h2>
          <p className="mt-2 text-ink-700">{product.description}</p>
        </div>
      </div>
    </article>
  );
}
