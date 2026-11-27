"use client";

/**
 * Barra de pestañas por categoría que flota sobre el borde inferior del hero.
 *
 * @packageDocumentation
 */

import { SectionThumbnail } from "./SectionThumbnail";
import type { SectionLink } from "./store-sections";
import { useActiveSection } from "./use-active-section";

/** Propiedades de {@link HeroTabs}. */
export type HeroTabsProps = {
  /** Secciones de la portada, en orden. */
  sections: readonly SectionLink[];
};

/**
 * Muestra la etiqueta "Filtro" con un separador vertical y una pestaña por sección, con su
 * miniatura redonda (foto de la categoría o, si no tiene, su icono).
 *
 * Son enlaces a anclas, no un `tablist`: no cambian paneles, desplazan la página. La pestaña
 * de la sección visible lleva subrayado negro y `aria-current="true"`; antes de que haya una
 * sección a la vista se subraya la primera solo de forma visual, sin `aria-current`, para no
 * anunciar una ubicación falsa. En celular la lista se desplaza en horizontal.
 *
 * @param props - Propiedades de la barra.
 * @returns Un `<nav>` con los enlaces a las secciones.
 */
export function HeroTabs({ sections }: HeroTabsProps) {
  const active = useActiveSection(sections.map((section) => section.id));
  const highlighted = active ?? sections[0]?.id;

  return (
    <nav
      aria-label="Filtrar por categoría"
      className="flex items-stretch rounded-lg border border-neutral-200 bg-white shadow-overlay"
    >
      <p className="flex shrink-0 items-center border-r border-neutral-200 px-4 font-semibold text-ink-900 md:px-6">
        Filtro
      </p>
      <ul className="flex flex-1 overflow-x-auto">
        {sections.map((section) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              data-highlighted={highlighted === section.id ? "" : undefined}
              className="-outline-offset-2 flex min-h-14 items-center gap-2 border-b-2 border-transparent px-4 font-medium whitespace-nowrap text-ink-700 transition-colors hover:text-ink-900 data-highlighted:border-ink-900 data-highlighted:text-ink-900 md:px-6"
            >
              <SectionThumbnail section={section} />
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
