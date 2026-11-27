/**
 * Miniatura redonda de una sección de la portada.
 *
 * @packageDocumentation
 */

import Image from "next/image";

import { SectionIcon } from "./SectionIcon";
import type { SectionLink } from "./store-sections";

/**
 * Muestra la foto de la sección en un círculo de 32 px; si la sección no tiene foto (por
 * ejemplo Promociones o La diferencia), muestra su icono en el mismo círculo para que todas las
 * pestañas y chips queden alineados.
 *
 * Las fotos tienen mucho margen blanco, así que se amplían un 25 % para que el producto se
 * reconozca a 32 px sin recortar sus extremos.
 *
 * Es decorativa: el texto del enlace ya nombra la sección, así que la foto lleva `alt=""` y el
 * contenedor `aria-hidden`.
 *
 * Decisión: siempre se carga en diferido, también en las pestañas del hero, que están en la
 * primera pantalla. Con `loading="eager"` React agrega un `<link rel="preload">` por miniatura
 * en el `<head>`, que compite con la foto del hero; en diferido, el navegador las pide en cuanto
 * calcula que están a la vista, sin adelantarse a lo importante.
 *
 * @param props - La sección.
 * @returns Un `span` redondo con la foto o el icono.
 */
export function SectionThumbnail({ section }: { section: SectionLink }) {
  const { image } = section;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-pill text-ink-900 ${
        image ? "border border-neutral-200 bg-white" : "bg-neutral-100"
      }`}
    >
      {image ? (
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          className="size-full scale-125 object-cover"
        />
      ) : (
        <SectionIcon name={section.icon} className="size-4" />
      )}
    </span>
  );
}
