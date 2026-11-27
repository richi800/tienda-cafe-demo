/**
 * Botón circular que solo muestra un icono.
 *
 * @packageDocumentation
 */

import Link from "next/link";
import type { ReactNode } from "react";

/** Propiedades de {@link IconButton}. */
export type IconButtonProps = {
  /** Nombre accesible; describe la acción porque el botón no tiene texto visible. */
  label: string;
  /** Icono decorativo (ver `icons.tsx`). */
  children: ReactNode;
  /** Si se indica, el botón se renderiza como enlace hacia esta ruta. */
  href?: string;
  /**
   * Número que se muestra sobre el icono, por ejemplo la cantidad del carrito. Es visual;
   * la cantidad debe incluirse también en `label`.
   */
  badge?: number;
};

const CLASS_NAME =
  "relative inline-flex size-11 shrink-0 items-center justify-center rounded-pill text-ink-900 transition-colors hover:bg-neutral-100 active:bg-neutral-200";

/**
 * Muestra un icono dentro de un área táctil de 44 x 44 px con forma de píldora.
 *
 * @param props - Propiedades del botón.
 * @returns Un enlace de `next/link` si recibe `href`; si no, un `<button type="button">`.
 */
export function IconButton({ label, children, href, badge }: IconButtonProps) {
  const content = (
    <>
      {children}
      {badge !== undefined && (
        <span
          aria-hidden="true"
          className="absolute top-1 right-0 inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-ink-900 px-1 text-xs font-semibold text-white"
        >
          {badge}
        </span>
      )}
    </>
  );

  if (href !== undefined) {
    return (
      <Link href={href} aria-label={label} className={CLASS_NAME}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={CLASS_NAME}>
      {content}
    </button>
  );
}
