/**
 * Pregunta frecuente de la tienda.
 *
 * @packageDocumentation
 */

/** Pregunta con su respuesta en texto plano. */
export type FaqItem = {
  /** Identificador estable; la portada lo usa como ancla (`#faq-<id>`). */
  id: string;
  /** Pregunta tal como la haría una persona. */
  question: string;
  /** Respuesta breve en texto plano. */
  answer: string;
};
