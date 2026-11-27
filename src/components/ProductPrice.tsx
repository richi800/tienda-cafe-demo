/**
 * Precio de un producto con su tratamiento de oferta.
 *
 * @packageDocumentation
 */

import { formatPrice } from "@/domain/money";
import { getDiscountPercentage, type Product } from "@/domain/product";

/** Tamaño del precio: `card` en listados y `detail` en la ficha de producto. */
export type ProductPriceSize = "card" | "detail";

/** Propiedades de {@link ProductPrice}. */
export type ProductPriceProps = {
  /** Producto cuyo precio se muestra. */
  product: Product;
  /** Tamaño y alineación. Por omisión `card` (centrado). */
  size?: ProductPriceSize;
};

const SIZE_CLASSES: Record<
  ProductPriceSize,
  { current: string; previous: string; row: string; wrapper: string }
> = {
  card: {
    current: "text-xl",
    previous: "text-base",
    row: "justify-center",
    wrapper: "text-center",
  },
  detail: {
    current: "text-3xl",
    previous: "text-lg",
    row: "justify-start",
    wrapper: "text-left",
  },
};

/**
 * Muestra el precio: verde si es el precio normal; con descuento real, el precio anterior
 * tachado (`<del>`), el de oferta en azul y la nota de que se refleja al final de la compra.
 *
 * @param props - Propiedades del precio.
 * @returns El bloque del precio.
 */
export function ProductPrice({ product, size = "card" }: ProductPriceProps) {
  const classes = SIZE_CLASSES[size];
  const { compareAtPrice } = product;
  const discounted =
    compareAtPrice !== undefined && getDiscountPercentage(product.price, compareAtPrice) > 0;

  if (!discounted) {
    return (
      <p className={`${classes.current} ${classes.wrapper} font-bold text-buy-700`}>
        {formatPrice(product.price)}
      </p>
    );
  }

  return (
    <div className={classes.wrapper}>
      <p className={`flex flex-wrap items-baseline gap-x-2 ${classes.row}`}>
        <span className="sr-only">Precio anterior:</span>
        <del className={`${classes.previous} text-ink-500`}>{formatPrice(compareAtPrice)}</del>
        <span className="sr-only">Precio de oferta:</span>
        <span className={`${classes.current} font-bold text-sale-700`}>
          {formatPrice(product.price)}
        </span>
      </p>
      <p className="mt-1 text-sm text-ink-700">
        <span aria-hidden="true">*</span>Reflejado al final de tu compra
      </p>
    </div>
  );
}
