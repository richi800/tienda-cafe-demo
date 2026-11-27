"use client";

/**
 * Preguntas frecuentes en acordeón.
 *
 * @packageDocumentation
 */

import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

import type { FaqItem } from "@/domain/faq";

import { ChevronDownIcon } from "./icons";

/** Propiedades de {@link Faq}. */
export type FaqProps = {
  /** Preguntas en orden. */
  items: readonly FaqItem[];
  /** Cuántas preguntas se muestran antes de "Mostrar más". Por defecto 4. */
  initialCount?: number;
};

/**
 * Muestra cada pregunta como `<details>`/`<summary>`, que abre y cierra sin JavaScript y
 * con teclado. Solo las primeras `initialCount` quedan visibles; el botón "Mostrar más"
 * revela el resto y lleva el foco a la primera pregunta nueva para que no haya que buscarla.
 *
 * Cada pregunta tiene el `id` `faq-<id>` para poder enlazarla.
 *
 * @param props - Propiedades del acordeón.
 * @returns La lista de preguntas y, si hace falta, el botón para mostrar las demás.
 */
export function Faq({ items, initialCount = 4 }: FaqProps) {
  const [expanded, setExpanded] = useState(false);
  const firstNewRef = useRef<HTMLElement>(null);
  const listId = useId();
  const hiddenCount = Math.max(items.length - initialCount, 0);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    // Se aplica el cambio antes de mover el foco: la pregunta aún está oculta hasta entonces.
    flushSync(() => setExpanded(true));
    firstNewRef.current?.focus();
  };

  return (
    <div>
      <ul id={listId} className="border-t border-neutral-200">
        {items.map((item, index) => (
          <li
            key={item.id}
            id={`faq-${item.id}`}
            hidden={!expanded && index >= initialCount}
            className="border-b border-neutral-200"
          >
            <details className="group">
              <summary
                ref={index === initialCount ? firstNewRef : undefined}
                className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 text-lg font-semibold text-ink-900"
              >
                {item.question}
                <ChevronDownIcon className="size-5 shrink-0 group-open:rotate-180 motion-safe:transition-transform" />
              </summary>
              <p className="max-w-3xl pb-6 text-ink-700">{item.answer}</p>
            </details>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={toggle}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-pill border border-ink-900 px-6 font-semibold text-ink-900 transition-colors hover:bg-neutral-100"
        >
          {expanded ? "Mostrar menos" : `Mostrar más (${hiddenCount})`}
        </button>
      )}
    </div>
  );
}
