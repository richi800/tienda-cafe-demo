/**
 * Iconos de la interfaz dibujados como SVG en línea, propios de la tienda.
 *
 * Todos son decorativos: se ocultan a lectores de pantalla y el control que los contiene
 * aporta el nombre accesible (por ejemplo con `aria-label`). Usan `currentColor`, así que
 * heredan el color del texto y respetan los tokens de la paleta.
 *
 * @packageDocumentation
 */

import type { ReactNode } from "react";

/** Propiedades comunes de los iconos. */
export type IconProps = {
  /** Clases adicionales, por ejemplo para cambiar el tamaño. Por defecto `size-6`. */
  className?: string;
};

/**
 * Lienzo común de 24 x 24 con trazo de 1.5 px.
 *
 * @param props - Clases y trazos del icono.
 * @returns El elemento `<svg>` oculto a tecnologías de asistencia.
 */
function IconBase({ className = "size-6", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/**
 * Corazón, para favoritos.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function HeartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </IconBase>
  );
}

/**
 * Lupa, para la búsqueda.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </IconBase>
  );
}

/**
 * Silueta de persona, para la cuenta.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </IconBase>
  );
}

/**
 * Bolsa de compra, para el carrito.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function BagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </IconBase>
  );
}

/**
 * Tres líneas horizontales, para abrir el menú.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </IconBase>
  );
}

/**
 * Aspa, para cerrar el menú.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </IconBase>
  );
}

/**
 * Flecha hacia la izquierda, para retroceder.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function ChevronLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m15 5-7 7 7 7" />
    </IconBase>
  );
}

/**
 * Flecha hacia la derecha, para avanzar o separar niveles de la ruta.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 5 7 7-7 7" />
    </IconBase>
  );
}
