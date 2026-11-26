/**
 * Sección de página con título y contenido, alineada al contenedor común.
 *
 * @packageDocumentation
 */

import type { ReactNode } from "react";

import { Container } from "./Container";

/** Fondo de la sección: `default` usa el fondo de la página y `muted` el alterno. */
export type SectionTone = "default" | "muted";

/** Propiedades de {@link Section}. */
export type SectionProps = {
  /** Identificador de la sección; sirve como ancla de navegación (por ejemplo `productos`). */
  id: string;
  /** Título visible de la sección, renderizado como `h2`. */
  title: string;
  /** Texto breve opcional bajo el título. */
  description?: string;
  /** Fondo de la sección. Por defecto `default`. */
  tone?: SectionTone;
  /** Contenido de la sección. */
  children: ReactNode;
};

const TONE_CLASSES: Record<SectionTone, string> = {
  default: "bg-white",
  muted: "bg-neutral-100",
};

/**
 * Muestra una región etiquetada por su título, con la separación vertical
 * `--spacing-section`.
 *
 * @param props - Propiedades de la sección.
 * @returns Un `<section>` cuyo nombre accesible es el título.
 */
export function Section({ id, title, description, tone = "default", children }: SectionProps) {
  const titleId = `${id}-titulo`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`scroll-mt-4 py-section ${TONE_CLASSES[tone]}`}
    >
      <Container>
        <div className="mb-8 max-w-2xl md:mb-12">
          <h2
            id={titleId}
            className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl"
          >
            {title}
          </h2>
          {description && <p className="mt-3 text-lg text-ink-700">{description}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
