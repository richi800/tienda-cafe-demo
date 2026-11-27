/**
 * Preguntas frecuentes de ejemplo sobre café, envíos y la tienda de demostración. No mencionan
 * modelos de cafeteras ni accesorios: el catálogo viene de Shopify y puede no tenerlos.
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
    question: "¿Puedo devolver mi café?",
    answer:
      "Sí, si la bolsa llega dañada o la devuelves cerrada dentro de los 7 días posteriores a la entrega. Por higiene, el café abierto no admite devoluciones.",
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
    question: "¿Qué molienda necesito?",
    answer:
      "Fina para espresso, media para goteo o filtro y gruesa para prensa francesa. Si compras grano entero, muélelo justo antes de preparar.",
  },
  {
    id: "conservar",
    question: "¿Cómo conservo el café recién tostado?",
    answer:
      "En su bolsa con válvula, bien cerrada, lejos de la luz y del calor. No lo guardes en el refrigerador: absorbe humedad y olores.",
  },
  {
    id: "frescura",
    question: "¿Cuándo se tostó mi café?",
    answer:
      "Tostamos en pequeños lotes cada semana y cada bolsa indica su fecha de tueste. Para disfrutarlo en su mejor momento, prepáralo dentro de las cuatro semanas siguientes.",
  },
  {
    id: "grano-o-molido",
    question: "¿Me conviene el café en grano o molido?",
    answer:
      "El grano entero conserva mejor el aroma; el molido es más práctico si no tienes molino. La descripción de cada café indica su presentación.",
  },
  {
    id: "suscripcion",
    question: "¿Puedo pausar la suscripción?",
    answer: "Sí. Puedes pausarla, cambiar de café o de frecuencia cuando quieras, sin costo.",
  },
];
