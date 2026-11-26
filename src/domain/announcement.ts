/**
 * Aviso promocional que se muestra en la franja superior de la tienda.
 *
 * @packageDocumentation
 */

/** Aviso breve con un enlace para actuar sobre él. */
export type Announcement = {
  /** Identificador estable del aviso. */
  id: string;
  /** Texto del aviso; una sola frase corta. */
  message: string;
  /** Destino del botón "Compra ahora" para este aviso. */
  href: string;
};
