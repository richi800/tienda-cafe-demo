/**
 * Sección de catálogo con banner oscuro y productos montados sobre él.
 *
 * @packageDocumentation
 */

import Image from "next/image";
import type { ReactNode } from "react";

import type { ProductImage } from "@/domain/product";

import { Container } from "./Container";

/** Propiedades de {@link CategorySection}. */
export type CategorySectionProps = {
  /** Identificador de la sección; sirve como ancla de navegación (por ejemplo `cafe`). */
  id: string;
  /** Título visible, renderizado como `h2` y mostrado en mayúsculas. */
  title: string;
  /** Texto breve bajo el título. */
  description: string;
  /** Nota adicional en el banner; recibe el `id` `${id}-nota` para que otros elementos la referencien. */
  note?: string;
  /**
   * Fotos editoriales de la categoría (por ejemplo las cafeteras), mostradas en recuadros
   * blancos dentro del banner. Son recursos gráficos de la página, no productos.
   */
  images?: readonly ProductImage[];
  /** Contenido que se monta sobre el banner, normalmente un `ProductGrid`. */
  children: ReactNode;
};

/**
 * Muestra un banner `espresso` con textura sutil, título en mayúsculas blancas,
 * descripción y, si se indican, fotos editoriales en recuadros blancos; el contenido sube
 * sobre la parte inferior del banner para que las tarjetas blancas destaquen sobre la franja
 * oscura.
 *
 * Las fotos tienen fondo blanco, así que se presentan en recuadros blancos redondeados (como
 * una vitrina) en lugar de recortarlas: en celular miden 64 px y van bajo el texto, para que
 * el banner crezca poco; desde `md` van a la derecha del texto.
 *
 * @param props - Propiedades de la sección.
 * @returns Un `<section>` cuyo nombre accesible es el título.
 */
export function CategorySection({
  id,
  title,
  description,
  note,
  images = [],
  children,
}: CategorySectionProps) {
  const titleId = `${id}-titulo`;

  return (
    <section id={id} aria-labelledby={titleId} className="bg-white pb-section">
      <div className="banner-texture pt-16 pb-32 md:pt-20 md:pb-40">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl min-w-0">
            <h2
              id={titleId}
              className="font-display text-3xl font-bold tracking-tight text-white uppercase md:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-3 text-lg text-neutral-100">{description}</p>
            {note && (
              <p id={`${id}-nota`} className="mt-2 text-sm text-neutral-100">
                {note}
              </p>
            )}
          </div>
          {images.length > 0 && (
            <ul className="flex shrink-0 gap-4">
              {images.map((image) => (
                <li
                  key={image.src}
                  className="size-16 overflow-hidden rounded-lg bg-white p-1 md:size-32 md:p-2 lg:size-44"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="size-full object-contain"
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
      <Container className="-mt-24 md:-mt-28">{children}</Container>
    </section>
  );
}
