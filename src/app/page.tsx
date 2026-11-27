import Image from "next/image";

import { CatalogNoticePanel } from "@/components/CatalogNoticePanel";
import { CategorySection } from "@/components/CategorySection";
import { ORIGIN_IMAGE } from "@/components/editorial-images";
import { Faq } from "@/components/Faq";
import { Hero, HERO_ID } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Section } from "@/components/Section";
import { buildHomeCatalog } from "@/components/home-catalog";
import { SectionNav } from "@/components/SectionNav";
import { CATALOG_SECTIONS } from "@/components/store-sections";
import {
  FREE_SHIPPING_THRESHOLD_MXN,
  SUBSCRIPTION_DISCOUNT_PERCENT,
} from "@/data/announcements";
import { faqs } from "@/data/faqs";
import { getProducts } from "@/data/products";

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
 * Portada de la tienda: hero, sub-header fijo, promociones y una sección por categoría,
 * la diferencia, suscripción, preguntas frecuentes con contacto y condiciones de las
 * promociones. Cada sección es el destino de un enlace del encabezado, del hero, del
 * sub-header o del pie. Qué muestra cada sección de catálogo (tarjetas o un aviso si está
 * vacía) lo decide `buildHomeCatalog`.
 *
 * @returns El contenido de la página de inicio.
 */
export default async function HomePage() {
  const products = await getProducts();
  const catalog = buildHomeCatalog(products);

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
          images={section.bannerImages}
        >
          {section.content.kind === "products" ? (
            <ProductGrid products={section.content.products} />
          ) : (
            <CatalogNoticePanel notice={section.content.notice} />
          )}
        </CategorySection>
      ))}

      <Section
        id="diferencia"
        title="La diferencia"
        description="Café Ladera es una marca ficticia, pero su propuesta sigue lo que distingue a un buen tostador."
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* width y height reservan el espacio con la proporción real (4:3) antes de cargar. */}
          <Image
            src={ORIGIN_IMAGE.src}
            alt={ORIGIN_IMAGE.alt}
            width={ORIGIN_IMAGE.width}
            height={ORIGIN_IMAGE.height}
            loading="lazy"
            className="h-auto w-full rounded-lg bg-neutral-100"
          />
          <ul className="grid gap-8">
            {DIFFERENTIATORS.map((item) => (
              <li key={item.title} className="border-t-2 border-ink-900 pt-4">
                <h3 className="text-xl font-semibold tracking-tight text-ink-900">{item.title}</h3>
                <p className="mt-2 text-ink-700">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
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
