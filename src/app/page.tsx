import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { sampleProducts } from "@/data/sample-products";

/** Cantidad de productos que se muestran en la sección de destacados. */
const FEATURED_COUNT = 3;

/** Punto de la propuesta de valor mostrado en la sección de origen. */
type Highlight = {
  title: string;
  text: string;
};

const HIGHLIGHTS: readonly Highlight[] = [
  {
    title: "Origen",
    text: "Compramos a fincas de Chiapas, Veracruz y Oaxaca, y en cada bolsa indicamos de dónde viene el grano.",
  },
  {
    title: "Tueste",
    text: "Tostamos en pequeños lotes cada semana para que el café llegue con todo su aroma.",
  },
  {
    title: "Envío",
    text: "Enviamos a todo México; tu pedido llega en 2 a 4 días hábiles.",
  },
];

/**
 * Portada de la tienda: presentación, productos destacados y origen del café.
 *
 * @returns El contenido de la página de inicio.
 */
export default function HomePage() {
  const featuredProducts = sampleProducts.slice(0, FEATURED_COUNT);

  return (
    <>
      <Hero />

      <Section
        id="productos"
        title="Productos destacados"
        description="Grano entero en bolsas de 340 g, listo para tu método favorito."
      >
        <ul className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="nosotros"
        title="Del cafetal a tu taza"
        description="Café Ladera es una marca ficticia, pero su propuesta sigue lo que distingue a un buen tostador."
        tone="muted"
      >
        <ul className="grid gap-8 md:grid-cols-3 md:gap-12">
          {HIGHLIGHTS.map((highlight) => (
            <li key={highlight.title} className="border-t-2 border-cherry-700 pt-4">
              <h3 className="font-display text-xl font-semibold text-coffee-900">
                {highlight.title}
              </h3>
              <p className="mt-2 text-coffee-700">{highlight.text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
