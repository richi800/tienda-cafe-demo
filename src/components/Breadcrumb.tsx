/**
 * Ruta de navegación (migas de pan) para páginas interiores.
 *
 * @packageDocumentation
 */

import Link from "next/link";

import { ChevronRightIcon } from "./icons";

/** Nivel de la ruta de navegación. */
export type BreadcrumbItem = {
  /** Texto visible del nivel. */
  label: string;
  /** Destino del nivel. Se ignora en el último, que es la página actual. */
  href?: string;
};

/** Propiedades de {@link Breadcrumb}. */
export type BreadcrumbProps = {
  /** Niveles desde la portada hasta la página actual, que va al final. */
  items: readonly BreadcrumbItem[];
};

/**
 * Muestra la ruta desde la portada hasta la página actual.
 *
 * El último nivel se marca con `aria-current="page"` y no es enlace. Los separadores son
 * iconos decorativos, así que los lectores de pantalla solo anuncian la lista ordenada.
 *
 * @param props - Propiedades de la ruta.
 * @returns Un `<nav>` con la lista ordenada de niveles, o `null` si no hay niveles.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-x-1 text-sm">
        {items.map((item, index) => {
          const isCurrent = index === lastIndex;

          return (
            <li key={`${index}-${item.label}`} className="flex items-center gap-x-1">
              {index > 0 && <ChevronRightIcon className="size-4 text-ink-500" />}
              {isCurrent || item.href === undefined ? (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className="inline-flex min-h-11 items-center font-medium text-ink-900"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm text-ink-700 underline-offset-4 hover:text-ink-900 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
