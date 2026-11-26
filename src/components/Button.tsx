/**
 * Botón del sistema de diseño, usable como acción o como enlace.
 *
 * @packageDocumentation
 */

import Link from "next/link";
import type { ReactNode } from "react";

/** Variantes visuales disponibles. */
export type ButtonVariant = "primary" | "secondary" | "dark";

/** Propiedades de {@link Button}. */
export type ButtonProps = {
  /** Texto o contenido del botón; debe describir la acción. */
  children: ReactNode;
  /**
   * `primary` (verde de compra) para la acción principal de la pantalla, `dark` (negro) para
   * la acción principal de un bloque editorial como el hero y `secondary` (con borde) para
   * acciones alternativas. Por defecto `primary`.
   */
  variant?: ButtonVariant;
  /** Si se indica, el botón se renderiza como enlace de navegación hacia esta ruta. */
  href?: string;
  /**
   * Marca la acción como no disponible todavía. Se renderiza un `<button>` con
   * `aria-disabled="true"` que sigue siendo enfocable, para que lectores de pantalla
   * anuncien el motivo indicado en `describedBy`. Se ignora `href`.
   */
  unavailable?: boolean;
  /** `id` del texto que explica la acción o el motivo de que no esté disponible. */
  describedBy?: string;
  /** Clases adicionales de disposición, por ejemplo `w-full`. */
  className?: string;
};

const BASE_CLASSES =
  "inline-flex min-h-11 items-center justify-center rounded-pill px-6 py-2 text-base font-semibold transition-colors";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-buy-700 text-white hover:bg-buy-800 active:bg-buy-800",
  secondary:
    "border border-ink-900 text-ink-900 hover:bg-neutral-100 active:bg-neutral-200",
  dark: "bg-ink-900 text-white hover:bg-ink-700 active:bg-ink-700",
};

/**
 * Muestra un botón con el estilo de la variante indicada.
 *
 * @param props - Propiedades del botón.
 * @returns Un enlace de `next/link` si recibe `href` y está disponible; si no, un
 * `<button type="button">`.
 */
export function Button({
  children,
  variant = "primary",
  href,
  unavailable = false,
  describedBy,
  className = "",
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${
    unavailable ? "cursor-not-allowed" : ""
  } ${className}`.trim();

  if (href !== undefined && !unavailable) {
    return (
      <Link href={href} aria-describedby={describedBy} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-disabled={unavailable ? "true" : undefined}
      aria-describedby={describedBy}
      className={classes}
    >
      {children}
    </button>
  );
}
