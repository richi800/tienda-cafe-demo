/**
 * Contenido de las páginas 404 de la tienda.
 *
 * @packageDocumentation
 */

import { Button } from "./Button";
import { Container } from "./Container";

/** Propiedades de {@link NotFoundContent}. */
export type NotFoundContentProps = {
  /** Título de la página, renderizado como `h1`. */
  title: string;
  /** Explicación breve de qué pasó y qué puede hacer la persona. */
  description: string;
};

/**
 * Muestra el aviso de página no encontrada con una acción principal para volver a la
 * portada y una secundaria hacia las promociones, para que nadie quede en un callejón sin
 * salida. El encabezado y el pie del layout siguen visibles.
 *
 * @param props - Propiedades del aviso.
 * @returns Una sección centrada en el contenedor común.
 */
export function NotFoundContent({ title, description }: NotFoundContentProps) {
  return (
    <Container className="py-section">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-wide text-ink-700 uppercase">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-ink-700">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="dark">
            Ir a la portada
          </Button>
          <Button href="/#promociones" variant="secondary">
            Ver promociones
          </Button>
        </div>
      </div>
    </Container>
  );
}
