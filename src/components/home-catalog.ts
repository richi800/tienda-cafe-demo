/**
 * Arma las secciones de catálogo de la portada y decide qué muestra cada una según los
 * productos que entregue la fuente de datos (Shopify o los datos de ejemplo).
 *
 * Es una función pura: recibe el catálogo y devuelve la configuración que pinta la portada, así
 * que los estados con y sin productos se prueban sin red ni React.
 *
 * @packageDocumentation
 */

import { getDiscountPercentage, type Product, type ProductImage } from "@/domain/product";

import { CUPS_IMAGE, DRIP_MACHINE_IMAGE, ESPRESSO_MACHINE_IMAGE } from "./editorial-images";
import { CATEGORY_SECTIONS } from "./store-sections";

/** Acción de un aviso de sección vacía. */
export type CatalogNoticeAction = {
  /** Texto del botón. */
  label: string;
  /** Destino, normalmente un ancla de la portada. */
  href: string;
};

/**
 * Aviso que ocupa el lugar de las tarjetas cuando una sección no tiene productos. No es un
 * producto: no lleva precio ni botón de compra.
 */
export type CatalogNotice = {
  /** Título del aviso (`h3`). */
  title: string;
  /** Texto breve. */
  text: string;
  /** Fotos editoriales de la categoría, si las tiene. */
  images: readonly ProductImage[];
  /** Acción útil, por ejemplo ir al café. */
  action?: CatalogNoticeAction;
};

/** Contenido de una sección: tarjetas de producto o un aviso. */
export type CatalogSectionContent =
  | { kind: "products"; products: readonly Product[] }
  | { kind: "notice"; notice: CatalogNotice };

/** Sección de catálogo lista para pintarse. */
export type HomeCatalogSection = {
  /** Ancla de la sección (`promociones`, `cafe`, ...). */
  id: string;
  /** Título del banner. */
  title: string;
  /** Texto del banner. */
  description: string;
  /**
   * Fotos editoriales del banner. Solo se muestran cuando hay productos: si la sección está
   * vacía, las fotos pasan al aviso para no repetirse.
   */
  bannerImages: readonly ProductImage[];
  /** Tarjetas o aviso. */
  content: CatalogSectionContent;
};

/** Acción de los avisos: el café es la categoría que siempre tiene sentido recorrer. */
const SEE_COFFEE: CatalogNoticeAction = { label: "Ver café", href: "#cafe" };

/**
 * Devuelve las tarjetas si hay productos o, si no, el aviso indicado.
 *
 * @param products - Productos de la sección.
 * @param notice - Aviso para el caso vacío.
 * @returns El contenido de la sección.
 */
function contentFor(products: readonly Product[], notice: CatalogNotice): CatalogSectionContent {
  return products.length > 0 ? { kind: "products", products } : { kind: "notice", notice };
}

/**
 * Arma las cuatro secciones de catálogo de la portada (Promociones, Café, Cafeteras y
 * Accesorios) a partir del catálogo.
 *
 * Decisión: ninguna sección se oculta aunque esté vacía. El menú principal (en el layout, que no
 * conoce el catálogo), el sub-header, las pestañas del hero y el 404 enlazan a sus anclas; si una
 * desapareciera habría que ocultar esos enlaces según los datos y cualquier olvido dejaría un
 * ancla rota. En su lugar, cada sección vacía muestra un aviso cuidado con una acción útil.
 *
 * @param products - Catálogo completo, en orden.
 * @returns Las secciones en el orden de la portada.
 */
export function buildHomeCatalog(products: readonly Product[]): HomeCatalogSection[] {
  const promotions = products.filter(
    (product) => getDiscountPercentage(product.price, product.compareAtPrice) > 0,
  );
  const byCategory = (category: Product["category"]) =>
    products.filter((product) => product.category === category);
  const machines = byCategory("machines");
  const accessories = byCategory("accessories");
  const machineImages = [ESPRESSO_MACHINE_IMAGE, DRIP_MACHINE_IMAGE];

  return [
    {
      id: "promociones",
      title: "Promociones",
      description: "Precios especiales por tiempo limitado en café, cafeteras y accesorios.",
      bannerImages: [],
      content: contentFor(promotions, {
        title: "Sin promociones por ahora",
        text: "Cuando haya precios especiales los verás aquí primero. Mientras tanto, conoce el café de esta temporada.",
        images: [],
        action: SEE_COFFEE,
      }),
    },
    {
      id: CATEGORY_SECTIONS.coffee.id,
      title: "Café",
      description:
        "Café en grano y molido de Chiapas, Veracruz y Oaxaca, listo para tu método favorito.",
      bannerImages: [],
      content: contentFor(byCategory("coffee"), {
        title: "Próximamente",
        text: "Estamos preparando el próximo lote. Vuelve pronto para ver los cafés disponibles.",
        images: [],
      }),
    },
    {
      id: CATEGORY_SECTIONS.machines.id,
      title: "Cafeteras",
      description: "Equipos para preparar espresso y café filtrado en casa.",
      bannerImages: machines.length > 0 ? machineImages : [],
      content: contentFor(machines, {
        title: "Próximamente",
        text: "Estamos probando cafeteras de espresso y de goteo con nuestro propio café antes de ofrecerlas.",
        images: machineImages,
        action: SEE_COFFEE,
      }),
    },
    {
      id: CATEGORY_SECTIONS.accessories.id,
      title: "Accesorios",
      description: "Molinos, espumadores y tazas para completar tu barra de café.",
      bannerImages: accessories.length > 0 ? [CUPS_IMAGE] : [],
      content: contentFor(accessories, {
        title: "Próximamente",
        text: "Pronto tendremos tazas, molinos y espumadores elegidos para acompañar nuestro café.",
        images: [CUPS_IMAGE],
        action: SEE_COFFEE,
      }),
    },
  ];
}
