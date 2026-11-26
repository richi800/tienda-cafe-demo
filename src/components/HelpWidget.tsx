"use client";

/**
 * Botón flotante de ayuda con un panel de accesos rápidos.
 *
 * @packageDocumentation
 */

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";

import { CloseIcon, HelpIcon } from "./icons";

/** Acceso del panel de ayuda. */
export type HelpLink = {
  /** Texto visible. */
  label: string;
  /** Destino; debe ser una ancla existente. */
  href: string;
};

/** Propiedades de {@link HelpWidget}. */
export type HelpWidgetProps = {
  /** Accesos que ofrece el panel. */
  links: readonly HelpLink[];
};

/**
 * Muestra el botón "¿Te ayudamos?" fijo abajo a la derecha (en celular solo el icono, con
 * el mismo nombre accesible). Al pulsarlo abre un diálogo no modal con accesos a la ayuda;
 * no simula un chat.
 *
 * Al abrir, el foco pasa al botón de cerrar del diálogo. Escape o el botón de cerrar lo
 * cierran y devuelven el foco al botón flotante; elegir un acceso lo cierra y deja que el
 * navegador lleve el foco al destino del ancla.
 *
 * @param props - Propiedades del widget.
 * @returns El botón flotante y, si está abierto, el diálogo.
 */
export function HelpWidget({ links }: HelpWidgetProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const titleId = useId();

  const openDialog = () => {
    // Se monta el diálogo antes de mover el foco a su botón de cerrar.
    flushSync(() => setOpen(true));
    closeRef.current?.focus();
  };

  const closeDialog = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      closeDialog();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="pointer-events-none fixed right-4 bottom-4 left-4 z-40 flex flex-col items-end gap-3 *:pointer-events-auto sm:left-auto"
    >
      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-labelledby={titleId}
          className="w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-overlay sm:w-80"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-ink-900">
              ¿Te ayudamos?
            </h2>
            <button
              ref={closeRef}
              type="button"
              aria-label="Cerrar ayuda"
              onClick={closeDialog}
              className="-mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-pill text-ink-900 hover:bg-neutral-100"
            >
              <CloseIcon />
            </button>
          </div>
          <p className="mt-2 text-sm text-ink-700">
            Encuentra respuestas rápidas o escríbenos. Esta tienda es una demostración.
          </p>
          <ul className="mt-4 flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-neutral-200 last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-sm font-medium text-ink-900 underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={open ? closeDialog : openDialog}
        className="inline-flex size-12 items-center justify-center gap-2 rounded-pill border border-white bg-ink-900 font-semibold text-white shadow-overlay transition-colors hover:bg-ink-700 md:size-auto md:min-h-11 md:px-5"
      >
        <HelpIcon className="size-6 md:size-5" />
        {/* En celular solo se ve el icono para no tapar precios ni botones de las tarjetas. */}
        <span className="sr-only md:not-sr-only">¿Te ayudamos?</span>
      </button>
    </div>
  );
}
