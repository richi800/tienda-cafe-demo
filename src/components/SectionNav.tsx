"use client";

/**
 * Sub-header fijo que aparece al pasar el hero y permite saltar entre secciones del catálogo.
 *
 * @packageDocumentation
 */

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Container } from "./Container";
import { ChevronDownIcon } from "./icons";
import { SectionIcon } from "./SectionIcon";
import type { SectionLink } from "./store-sections";
import { useActiveSection } from "./use-active-section";

/** Propiedades de {@link SectionNav}. */
export type SectionNavProps = {
  /** Secciones del catálogo, en orden. */
  sections: readonly SectionLink[];
  /** `id` del elemento tras el cual aparece el sub-header (el hero). */
  triggerId: string;
};

/**
 * Muestra una barra blanca fija arriba con un desplegable de categoría y chips con un
 * pequeño espacio de imagen que saltan a cada sección.
 *
 * Mientras el hero está a la vista, la barra queda fuera de la pantalla y con `inert`, así
 * que no recibe foco ni aparece para lectores de pantalla. La transición de entrada solo se
 * anima si la persona no pidió reducir el movimiento (`motion-safe`).
 *
 * @param props - Propiedades del sub-header.
 * @returns Un `<nav>` fijo con los accesos a las secciones.
 */
export function SectionNav({ sections, triggerId }: SectionNavProps) {
  const visible = usePastElement(triggerId);
  const active = useActiveSection(sections.map((section) => section.id));
  const activeLabel = sections.find((section) => section.id === active)?.label;

  return (
    <nav
      aria-label="Secciones del catálogo"
      inert={!visible}
      data-visible={visible ? "" : undefined}
      className="fixed inset-x-0 top-0 z-30 -translate-y-full border-b border-neutral-200 bg-white data-visible:translate-y-0 data-visible:shadow-overlay motion-safe:transition-transform"
    >
      <Container className="flex min-h-16 items-center gap-3">
        <CategoryDropdown sections={sections} currentLabel={activeLabel} />
        <ul className="-my-2 flex flex-1 gap-2 overflow-x-auto py-2">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-neutral-200 py-1 pr-4 pl-1 text-sm font-medium whitespace-nowrap text-ink-900 transition-colors hover:border-ink-900 aria-[current=true]:border-ink-900 aria-[current=true]:bg-ink-900 aria-[current=true]:text-white"
              >
                {/* Espacio reservado para la miniatura de la categoría. */}
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 items-center justify-center rounded-pill bg-neutral-100 text-ink-900"
                >
                  <SectionIcon name={section.icon} className="size-4" />
                </span>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

/**
 * Desplegable de categoría hecho con `<details>`: abre con Enter o Espacio, se cierra al
 * elegir una sección o con Escape (devolviendo el foco al resumen).
 *
 * @param props - Secciones y nombre de la sección actual, si hay una.
 * @returns El desplegable.
 */
function CategoryDropdown({
  sections,
  currentLabel,
}: {
  sections: readonly SectionLink[];
  currentLabel: string | undefined;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const close = (returnFocus: boolean) => {
    const details = detailsRef.current;
    if (details?.open) {
      details.open = false;
      if (returnFocus) {
        details.querySelector("summary")?.focus();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      close(true);
    }
  };

  return (
    <details ref={detailsRef} onKeyDown={handleKeyDown} className="group relative shrink-0">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-pill border border-ink-900 px-4 text-sm font-semibold text-ink-900">
        <span className="sr-only">Categoría: </span>
        {currentLabel ?? "Categoría"}
        <ChevronDownIcon className="size-4 group-open:rotate-180 motion-safe:transition-transform" />
      </summary>
      <ul className="absolute top-full left-0 mt-2 w-56 rounded-md border border-neutral-200 bg-white py-2 shadow-overlay">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => close(false)}
              className="flex min-h-11 items-center gap-3 px-4 text-ink-900 -outline-offset-2 hover:bg-neutral-100"
            >
              <SectionIcon name={section.icon} className="size-5" />
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * Indica si la página ya se desplazó más allá del elemento indicado.
 *
 * @param id - `id` del elemento a observar.
 * @returns `true` cuando el elemento quedó por encima del borde superior de la pantalla.
 */
function usePastElement(id: string): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const element = document.getElementById(id);
    if (element === null || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [id]);

  return past;
}
