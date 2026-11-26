/**
 * Sección de catálogo con banner oscuro y productos montados sobre él.
 *
 * @packageDocumentation
 */

import type { ReactNode } from "react";

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
  /** Contenido que se monta sobre el banner, normalmente un `ProductGrid`. */
  children: ReactNode;
};

/**
 * Muestra un banner `espresso` con textura sutil, título en mayúsculas blancas y
 * descripción; el contenido sube sobre la parte inferior del banner para que las tarjetas
 * blancas destaquen sobre la franja oscura.
 *
 * @param props - Propiedades de la sección.
 * @returns Un `<section>` cuyo nombre accesible es el título.
 */
export function CategorySection({ id, title, description, note, children }: CategorySectionProps) {
  const titleId = `${id}-titulo`;

  return (
    <section id={id} aria-labelledby={titleId} className="bg-white pb-section">
      <div className="banner-texture pt-16 pb-32 md:pt-20 md:pb-40">
        <Container>
          <div className="max-w-2xl">
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
        </Container>
      </div>
      <Container className="-mt-24 md:-mt-28">{children}</Container>
    </section>
  );
}
