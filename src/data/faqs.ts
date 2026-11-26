/**
 * Preguntas frecuentes de ejemplo sobre café, cafeteras y la tienda de demostración.
 *
 * @packageDocumentation
 */

import type { FaqItem } from "@/domain/faq";

import { FREE_SHIPPING_THRESHOLD_MXN } from "./announcements";

/**
 * Preguntas en el orden en que se muestran. Las cuatro primeras quedan siempre visibles;
 * el pie de página enlaza a `envios` y `facturacion`, por eso van entre ellas.
 */
export const faqs: readonly FaqItem[] = [
  {
    id: "envios",
    question: "¿Cuánto tarda y cuánto cuesta el envío?",
    answer: `Enviamos a todo México en 2 a 4 días hábiles. El envío es gratis en compras desde $${FREE_SHIPPING_THRESHOLD_MXN}.`,
  },
  {
    id: "devoluciones",
    question: "¿Puedo devolver una cafetera o un accesorio?",
    answer:
      "Sí, dentro de los 30 días posteriores a la entrega, sin uso y en su empaque original. El café no admite devoluciones una vez abierto.",
  },
  {
    id: "facturacion",
    question: "¿Cómo solicito mi factura?",
    answer:
      "En una tienda real pedirías la factura con tu número de pedido y tus datos fiscales. En esta demostración no se emiten facturas.",
  },
  {
    id: "compra-real",
    question: "¿Puedo comprar de verdad?",
    answer:
      "No. Café Ladera es una marca ficticia y esta tienda es una demostración: no se realizan cobros ni envíos.",
  },
  {
    id: "molienda",
    question: "¿Qué molienda necesito para mi cafetera?",
    answer:
      "Fina para espresso, media para cafetera de goteo y gruesa para prensa francesa. Si compras grano entero, muélelo justo antes de preparar.",
  },
  {
    id: "conservar",
    question: "¿Cómo conservo el café recién tostado?",
    answer:
      "En su bolsa con válvula, bien cerrada, lejos de la luz y del calor. No lo guardes en el refrigerador: absorbe humedad y olores.",
  },
  {
    id: "descalcificar",
    question: "¿Cada cuánto debo descalcificar la Ladera Pro?",
    answer:
      "Cada uno a tres meses, según la dureza del agua. Usar agua filtrada alarga el tiempo entre descalcificaciones.",
  },
  {
    id: "garantia",
    question: "¿Las cafeteras tienen garantía?",
    answer:
      "Las cafeteras y los molinos incluyen un año de garantía contra defectos de fabricación.",
  },
  {
    id: "suscripcion",
    question: "¿Puedo pausar la suscripción?",
    answer: "Sí. Puedes pausarla, cambiar de café o de frecuencia cuando quieras, sin costo.",
  },
];
