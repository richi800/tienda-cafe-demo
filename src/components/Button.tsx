/**
 * Botón del sistema de diseño, usable como acción o como enlace.
 *
 * @packageDocumentation
 */

import Link from "next/link";
import type { ReactNode } from "react";

/** Variantes visuales disponibles. */
export type ButtonVariant = "primary" | "secondary";

/** Propiedades de {@link Button}. */
export type ButtonProps = {
  /** Texto o contenido del botón; debe describir la acción. */
  children: ReactNode;
  /**
   * `primary` para la acción principal de la pantalla (solo una por vista) y
   * `secondary` para acciones alternativas. Por defecto `primary`.
   */
  variant?: ButtonVariant;
  /** Si se indica, el botón se renderiza como enlace de navegación hacia esta ruta. */
  href?: string;
};

const BASE_CLASSES =
  "inline-flex min-h-11 items-center justify-center rounded-pill px-6 py-2 text-base font-semibold transition-colors";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-buy-700 text-white hover:bg-buy-800 active:bg-buy-800",
  secondary:
    "border border-ink-900 text-ink-900 hover:bg-neutral-100 active:bg-neutral-200",
};

/**
 * Muestra un botón con el estilo de la variante indicada.
 *
 * @param props - Propiedades del botón.
 * @returns Un enlace de `next/link` si recibe `href`; si no, un `<button type="button">`.
 */
export function Button({ children, variant = "primary", href }: ButtonProps) {
  const className = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`;

  if (href !== undefined) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}
