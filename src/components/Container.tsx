/**
 * Contenedor horizontal común a todas las secciones.
 *
 * @packageDocumentation
 */

import type { ReactNode } from "react";

/** Propiedades de {@link Container}. */
export type ContainerProps = {
  /** Contenido a centrar. */
  children: ReactNode;
  /** Clases adicionales para el contenedor. */
  className?: string;
};

/**
 * Centra el contenido, limita su ancho a `--container-content` y aplica los márgenes
 * laterales `--spacing-gutter`, para que todas las secciones queden alineadas.
 *
 * @param props - Propiedades del contenedor.
 * @returns Un `div` con el ancho y los márgenes del sistema de diseño.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-content px-gutter ${className}`.trim()}>{children}</div>
  );
}
