/**
 * Espacio de la imagen de un producto, con la cinta de descuento y la insignia de agotado.
 *
 * @packageDocumentation
 */

import { getDiscountPercentage, type Product } from "@/domain/product";

/** Uso de la imagen: `card` dentro de una tarjeta y `detail` como foto grande de la ficha. */
export type ProductMediaVariant = "card" | "detail";

/** Propiedades de {@link ProductMedia}. */
export type ProductMediaProps = {
  /** Producto representado. */
  product: Product;
  /** Contexto de uso. Por omisión `card`. */
  variant?: ProductMediaVariant;
};

const VARIANT_CLASSES: Record<
  ProductMediaVariant,
  { frame: string; image: string; ribbon: string; badge: string }
> = {
  card: {
    frame: "",
    image: "aspect-product-compact md:aspect-product",
    ribbon: "top-5 -left-10 w-40 py-1 text-sm",
    badge: "top-3 right-3 px-3 py-1 text-sm",
  },
  detail: {
    frame: "rounded-lg",
    // En la ficha la imagen ocupa todo el ancho hasta lg; con 4:5 empujaría el precio y el
    // botón muy abajo en tableta, así que la proporción vertical se reserva para dos columnas.
    image: "aspect-product-compact lg:aspect-product",
    ribbon: "top-7 -left-12 w-48 py-2 text-base",
    badge: "top-4 right-4 px-4 py-2 text-base",
  },
};

/**
 * Reserva el espacio de la imagen con las proporciones `--aspect-product-compact` y
 * `--aspect-product`, para que no haya saltos de diseño cuando lleguen las fotografías.
 * Encima muestra la cinta diagonal de descuento y la insignia "Agotado" cuando aplican.
 *
 * @param props - Propiedades de la imagen.
 * @returns Un `div` con el espacio reservado y las marcas del producto.
 */
export function ProductMedia({ product, variant = "card" }: ProductMediaProps) {
  const classes = VARIANT_CLASSES[variant];
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);

  return (
    <div className={`relative overflow-hidden ${classes.frame}`.trim()}>
      {/* Decorativo mientras no haya fotografía; con foto llevará el nombre como texto alternativo. */}
      <div aria-hidden="true" className={`w-full bg-neutral-100 ${classes.image}`} />
      {discount > 0 && (
        // La cinta cruza la esquina superior izquierda; el contenedor recorta sus extremos.
        <p
          className={`absolute -rotate-45 bg-promo-600 text-center font-bold text-white ${classes.ribbon}`}
        >
          <span aria-hidden="true">-{discount}%</span>
          <span className="sr-only">{discount}% de descuento</span>
        </p>
      )}
      {!product.availableForSale && (
        <p className={`absolute rounded-pill bg-ink-900 font-semibold text-white ${classes.badge}`}>
          Agotado
        </p>
      )}
    </div>
  );
}
