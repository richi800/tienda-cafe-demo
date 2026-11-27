/**
 * Imagen de un producto, con la cinta de descuento y la insignia de agotado.
 *
 * @packageDocumentation
 */

import Image from "next/image";

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
  { frame: string; framedPhoto: string; image: string; ribbon: string; badge: string }
> = {
  card: {
    frame: "",
    // La tarjeta ya tiene borde propio.
    framedPhoto: "",
    image: "aspect-product-compact md:aspect-product",
    ribbon: "top-5 -left-10 w-40 py-1 text-sm",
    badge: "top-3 right-3 px-3 py-1 text-sm",
  },
  detail: {
    frame: "rounded-lg",
    // Con foto el fondo es blanco, como la página: el borde delimita la imagen.
    framedPhoto: "border border-neutral-200",
    // En la ficha la imagen ocupa todo el ancho hasta lg; con 4:5 empujaría el precio y el
    // botón muy abajo en tableta, así que la proporción vertical se reserva para dos columnas.
    image: "aspect-product-compact lg:aspect-product",
    ribbon: "top-7 -left-12 w-48 py-2 text-base",
    badge: "top-4 right-4 px-4 py-2 text-base",
  },
};

/**
 * Muestra la foto del producto dentro de un espacio con proporción fija
 * (`--aspect-product-compact` y `--aspect-product`), de modo que no hay saltos de diseño. La
 * foto se ajusta con `object-contain` sobre fondo blanco para que el producto nunca se corte,
 * sea cual sea la proporción. Si el producto no tiene foto, el espacio queda reservado con un
 * fondo neutro. Encima van la cinta diagonal de descuento y la insignia "Agotado".
 *
 * En la ficha la foto es el elemento principal de la primera pantalla, así que se carga de
 * inmediato y con prioridad alta; en tarjetas se carga en diferido.
 *
 * @param props - Propiedades de la imagen.
 * @returns Un `div` con la imagen y las marcas del producto.
 */
export function ProductMedia({ product, variant = "card" }: ProductMediaProps) {
  const classes = VARIANT_CLASSES[variant];
  const discount = getDiscountPercentage(product.price, product.compareAtPrice);
  const { image } = product;
  const isDetail = variant === "detail";

  return (
    <div
      className={`relative overflow-hidden ${classes.frame} ${image ? classes.framedPhoto : ""}`.trim()}
    >
      {image ? (
        <div className={`relative w-full bg-white ${classes.image}`}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={isDetail ? "eager" : "lazy"}
            fetchPriority={isDetail ? "high" : undefined}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
      ) : (
        // Decorativo mientras no haya fotografía.
        <div aria-hidden="true" className={`w-full bg-neutral-100 ${classes.image}`} />
      )}
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
