import { CategorySection } from "@/components/CategorySection";
import { Faq } from "@/components/Faq";
import { Hero, HERO_ID } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { CATALOG_SECTIONS } from "@/components/store-sections";
import {
  FREE_SHIPPING_THRESHOLD_MXN,
  SUBSCRIPTION_DISCOUNT_PERCENT,
} from "@/data/announcements";
import { faqs } from "@/data/faqs";
import { sampleProducts } from "@/data/sample-products";
import { getDiscountPercentage, type Product, type ProductCategory } from "@/domain/product";

/** Sección de catálogo de la portada. */
type CatalogSection = {
  id: string;
  title: string;
  description: string;
  products: readonly Product[];
  emptyMessage?: string;
};

/**
 * Explica por qué el botón de compra de las tarjetas aún no está disponible. Cada banner la
 * muestra con el id `<seccion>-nota` y los botones la referencian con aria-describedby.
 */
const PURCHASE_NOTE =
  "Vista previa: la ficha de cada producto y la compra se habilitarán próximamente.";

/** Punto de la propuesta de valor de la sección "La diferencia". */
type Differentiator = {
  title: string;
  text: string;
};

const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    title: "Origen",
    text: "Compramos a fincas de Chiapas, Veracruz y Oaxaca, y en cada bolsa indicamos de dónde viene el grano.",
  },
  {
    title: "Tueste",
    text: "Tostamos en pequeños lotes cada semana para que el café llegue con todo su aroma.",
  },
  {
    title: "Equipo",
    text: "Elegimos cafeteras y molinos que probamos con nuestro propio café antes de ofrecerlos.",
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
 * Portada de la tienda: hero, sub-header fijo, promociones y una sección por categoría,
 * la diferencia, suscripción, preguntas frecuentes con contacto y condiciones de las
 * promociones. Cada sección es el destino de un enlace del encabezado, del hero, del
 * sub-header o del pie.
 *
 * @returns El contenido de la página de inicio.
 */
export default function HomePage() {
  const promotions = sampleProducts.filter(
    (product) => getDiscountPercentage(product.price, product.compareAtPrice) > 0,
  );

  const catalog: readonly CatalogSection[] = [
    {
      id: "promociones",
      title: "Promociones",
      description: "Precios especiales por tiempo limitado en café, cafeteras y accesorios.",
      products: promotions,
      emptyMessage: "Por ahora no hay promociones activas.",
    },
    {
      id: "cafe",
      title: "Café",
      description: "Grano entero en bolsas de 340 g, listo para tu método favorito.",
      products: productsIn("coffee"),
    },
    {
      id: "cafeteras",
      title: "Cafeteras",
      description: "Equipos para preparar espresso y café filtrado en casa.",
      products: productsIn("machines"),
    },
    {
      id: "accesorios",
      title: "Accesorios",
      description: "Molinos, espumadores y tazas para completar tu barra de café.",
      products: productsIn("accessories"),
    },
  ];

  return (
    <>
      <Hero />
      <SectionNav sections={CATALOG_SECTIONS} triggerId={HERO_ID} />

      {catalog.map((section) => (
        <CategorySection
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          note={PURCHASE_NOTE}
        >
          <ProductGrid
            products={section.products}
            emptyMessage={section.emptyMessage}
            purchaseNoteId={`${section.id}-nota`}
          />
        </CategorySection>
      ))}

      <Section
        id="diferencia"
        title="La diferencia"
        description="Café Ladera es una marca ficticia, pero su propuesta sigue lo que distingue a un buen tostador."
      >
        <ul className="grid gap-8 md:grid-cols-3 md:gap-12">
          {DIFFERENTIATORS.map((item) => (
            <li key={item.title} className="border-t-2 border-ink-900 pt-4">
              <h3 className="text-xl font-semibold tracking-tight text-ink-900">{item.title}</h3>
              <p className="mt-2 text-ink-700">{item.text}</p>
            </li>
          ))}
        </ul>
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

      <Section
        id="ayuda"
        title="¿Necesitas ayuda?"
        description="Respuestas rápidas sobre café, cafeteras, envíos y esta tienda de demostración."
        tone="muted"
      >
        <Faq items={faqs} />

        <div id="contacto" className="mt-12 max-w-2xl border-t-2 border-ink-900 pt-4">
          <h3 className="text-xl font-semibold tracking-tight text-ink-900">Contacto</h3>
          <p className="mt-2 text-ink-700">
            En una tienda real aquí encontrarías el correo y el teléfono de atención. Como esta es
            una demostración, no hay un canal de contacto activo.
          </p>
        </div>
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
