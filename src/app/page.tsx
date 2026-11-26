import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";
import {
  FREE_SHIPPING_THRESHOLD_MXN,
  SUBSCRIPTION_DISCOUNT_PERCENT,
} from "@/data/announcements";
import { sampleProducts } from "@/data/sample-products";
import { getDiscountPercentage, type ProductCategory } from "@/domain/product";

/** Pregunta frecuente de la sección de ayuda. */
type HelpTopic = {
  question: string;
  answer: string;
};

const HELP_TOPICS: readonly HelpTopic[] = [
  {
    question: "¿Cuánto tarda mi pedido?",
    answer: "Enviamos a todo México; tu pedido llega en 2 a 4 días hábiles.",
  },
  {
    question: "¿Cómo se tuesta el café?",
    answer:
      "Tostamos en pequeños lotes cada semana con grano de fincas de Chiapas, Veracruz y Oaxaca.",
  },
  {
    question: "¿Puedo comprar de verdad?",
    answer:
      "No. Café Ladera es una marca ficticia y esta tienda es una demostración: no se realizan cobros.",
  },
];

const PROMOTION_TERMS: readonly string[] = [
  `Envío gratis en pedidos desde $${FREE_SHIPPING_THRESHOLD_MXN} MXN dentro de México.`,
  "Los descuentos aplican sobre el precio anterior indicado en cada producto y hasta agotar existencias.",
  `La suscripción ofrece ${SUBSCRIPTION_DISCOUNT_PERCENT}% de descuento en cada entrega de café.`,
  "Promociones ficticias con fines de demostración; no constituyen una oferta comercial.",
];

/**
 * Productos de una categoría, en el orden del catálogo.
 *
 * @param category - Categoría a filtrar.
 * @returns Los productos de esa categoría.
 */
function productsIn(category: ProductCategory) {
  return sampleProducts.filter((product) => product.category === category);
}

/**
 * Portada de la tienda: presentación, promociones, una sección por categoría,
 * suscripción, ayuda y condiciones de las promociones. Cada sección es el destino de
 * un enlace del encabezado.
 *
 * @returns El contenido de la página de inicio.
 */
export default function HomePage() {
  const promotions = sampleProducts.filter(
    (product) => getDiscountPercentage(product.price, product.compareAtPrice) > 0,
  );

  return (
    <>
      <Hero />

      <Section
        id="promociones"
        title="Promociones"
        description="Precios especiales por tiempo limitado en café, cafeteras y accesorios."
      >
        <ProductGrid products={promotions} emptyMessage="Por ahora no hay promociones activas." />
      </Section>

      <Section
        id="cafe"
        title="Café"
        description="Grano entero en bolsas de 340 g, listo para tu método favorito."
        tone="muted"
      >
        <ProductGrid products={productsIn("coffee")} />
      </Section>

      <Section
        id="cafeteras"
        title="Cafeteras"
        description="Equipos para preparar espresso y café filtrado en casa."
      >
        <ProductGrid products={productsIn("machines")} />
      </Section>

      <Section
        id="accesorios"
        title="Accesorios"
        description="Molinos, espumadores y tazas para completar tu barra de café."
        tone="muted"
      >
        <ProductGrid products={productsIn("accessories")} />
      </Section>

      <Section
        id="suscripcion"
        title="Suscripción"
        description={`Recibe tu café recién tostado cada mes con ${SUBSCRIPTION_DISCOUNT_PERCENT}% de descuento en cada entrega.`}
      >
        <p className="max-w-2xl text-ink-700">
          Elige tu café, la frecuencia y pausa cuando quieras. La suscripción estará disponible
          próximamente.
        </p>
      </Section>

      <Section id="ayuda" title="¿Necesitas ayuda?" tone="muted">
        <dl className="grid gap-8 md:grid-cols-3 md:gap-12">
          {HELP_TOPICS.map((topic) => (
            <div key={topic.question} className="border-t-2 border-ink-900 pt-4">
              <dt className="text-xl font-semibold tracking-tight text-ink-900">
                {topic.question}
              </dt>
              <dd className="mt-2 text-ink-700">{topic.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="terminos" title="Términos y condiciones">
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-sm text-ink-700">
          {PROMOTION_TERMS.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
