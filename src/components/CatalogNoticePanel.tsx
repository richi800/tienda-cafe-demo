/**
 * Aviso que ocupa el lugar de las tarjetas cuando una sección del catálogo está vacía.
 *
 * @packageDocumentation
 */

import Image from "next/image";

import { Button } from "./Button";
import type { CatalogNotice } from "./home-catalog";

/** Propiedades de {@link CatalogNoticePanel}. */
export type CatalogNoticePanelProps = {
  /** Contenido del aviso. */
  notice: CatalogNotice;
};

/**
 * Muestra un panel blanco que se monta sobre el banner como lo harían las tarjetas, con las
 * fotos editoriales de la categoría (si las hay), un título, un texto breve y una acción.
 *
 * No se parece a un producto a la venta: no tiene precio, ni botón de compra verde, ni enlaza a
 * una ficha. La acción usa el botón `dark` porque lleva a otra sección, no a comprar.
 *
 * @param props - Propiedades del aviso.
 * @returns Un `div` con el aviso.
 */
export function CatalogNoticePanel({ notice }: CatalogNoticePanelProps) {
  const { title, text, images, action } = notice;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:gap-10 md:p-10">
      {images.length > 0 && (
        <ul className="flex shrink-0 gap-4">
          {images.map((image) => (
            <li
              key={image.src}
              className="size-28 overflow-hidden rounded-lg border border-neutral-200 bg-white p-2 md:size-40 lg:size-48"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="size-full object-contain"
              />
            </li>
          ))}
        </ul>
      )}
      <div className="max-w-xl">
        <h3 className="text-xl font-semibold tracking-tight text-ink-900">{title}</h3>
        <p className="mt-2 text-ink-700">{text}</p>
        {action && (
          <div className="mt-6">
            <Button href={action.href} variant="dark" className="w-full sm:w-auto">
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
