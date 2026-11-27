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

/**
 * Grano de café, para la categoría Café.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function BeanIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(30 12 12)" />
      <path d="M9 5.5c3 2.5 1 5.5 2.5 7S15 15.5 15 18.5" />
    </IconBase>
  );
}

/**
 * Cafetera de espresso, para la categoría Cafeteras.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function MachineIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 3h12v18H6z" />
      <path d="M6 8h12M10 11h4v2h-4zM9.5 17h5" />
    </IconBase>
  );
}

/**
 * Taza, para la categoría Accesorios.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function CupIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M4 21h14" />
    </IconBase>
  );
}

/**
 * Hoja, para la sección "La diferencia".
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function LeafIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" />
      <path d="M5 19 13 11" />
    </IconBase>
  );
}

/**
 * Flecha hacia abajo, para desplegar listas.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 9 7 7 7-7" />
    </IconBase>
  );
}

/**
 * Flecha hacia arriba, para volver al inicio de la página.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function ArrowUpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </IconBase>
  );
}

/**
 * Cámara, para la red social de fotos.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function CameraIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M9 7l1.5-3h3L15 7" />
    </IconBase>
  );
}

/**
 * Botón de reproducción, para la red social de videos.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function PlayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </IconBase>
  );
}

/**
 * Globo de diálogo, para la red social de mensajes.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function MessageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 5h16v11H9l-5 4V5Z" />
    </IconBase>
  );
}

/**
 * Signo de interrogación en un círculo, para la ayuda.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function HelpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" />
    </IconBase>
  );
}

/**
 * Etiqueta de precio, para las promociones.
 *
 * @param props - Propiedades del icono.
 * @returns El icono.
 */
export function TagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 12V4h8l10 10-8 8L3 12Z" />
      <circle cx="7.5" cy="8.5" r="1.5" />
    </IconBase>
  );
}
