"use client";

/**
 * Franja de avisos promocionales sobre el encabezado.
 *
 * @packageDocumentation
 */

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";

import type { Announcement } from "@/domain/announcement";

import { Container } from "./Container";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

/** Propiedades de {@link AnnouncementBar}. */
export type AnnouncementBarProps = {
  /** Avisos en el orden en que se recorren. Si está vacío, la franja no se muestra. */
  announcements: readonly Announcement[];
  /** Destino del enlace de términos y condiciones. */
  termsHref: string;
};

/**
 * Calcula el índice del aviso vecino, dando la vuelta al llegar a un extremo.
 *
 * @param index - Índice actual.
 * @param step - `1` para avanzar o `-1` para retroceder.
 * @param length - Cantidad de avisos; debe ser mayor que 0.
 * @returns El nuevo índice, siempre entre `0` y `length - 1`.
 */
export function getWrappedIndex(index: number, step: 1 | -1, length: number): number {
  return (index + step + length) % length;
}

/**
 * Muestra un aviso a la vez con flechas para recorrerlos, el botón "Compra ahora" del aviso
 * actual y el enlace a los términos.
 *
 * No rota sola: solo cambia cuando la persona usa las flechas. Así no hace falta un botón de
 * pausa (WCAG 2.2.2), no hay movimiento que respetar con `prefers-reduced-motion` y el texto
 * no cambia mientras alguien lo está leyendo. El cambio se anuncia con una región `polite`.
 *
 * En celular ocupa dos filas (aviso con flechas; acciones debajo); desde `md`, una sola.
 *
 * @param props - Propiedades de la franja.
 * @returns Una región "carrusel" con los avisos, o `null` si no hay avisos.
 */
export function AnnouncementBar({ announcements, termsHref }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const messageId = useId();
  const current = announcements[index];

  if (current === undefined) {
    return null;
  }

  const total = announcements.length;
  const canNavigate = total > 1;
  const move = (step: 1 | -1) => setIndex((value) => getWrappedIndex(value, step, total));

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Avisos de la tienda"
      className="bg-sand-100 text-ink-900"
    >
      <Container className="flex flex-col items-center md:flex-row md:justify-center md:gap-6">
        <div className="flex w-full items-center justify-between gap-2 md:w-auto">
          {canNavigate && (
            <ArrowButton label="Aviso anterior" controls={messageId} onClick={() => move(-1)}>
              <ChevronLeftIcon className="size-5" />
            </ArrowButton>
          )}
          <p
            id={messageId}
            aria-live="polite"
            aria-atomic="true"
            className="flex-1 text-center text-sm font-medium md:flex-none"
          >
            {canNavigate && (
              <span className="sr-only">
                Aviso {index + 1} de {total}:{" "}
              </span>
            )}
            {current.message}
          </p>
          {canNavigate && (
            <ArrowButton label="Aviso siguiente" controls={messageId} onClick={() => move(1)}>
              <ChevronRightIcon className="size-5" />
            </ArrowButton>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* El área táctil mide 44 px aunque la píldora visible sea más baja, para que la franja siga siendo delgada. */}
          <Link href={current.href} className="group inline-flex min-h-11 items-center rounded-pill">
            <span className="rounded-pill border border-ink-900 px-4 py-1 text-sm font-semibold transition-colors group-hover:bg-ink-900 group-hover:text-white">
              Compra ahora
            </span>
          </Link>
          <Link
            href={termsHref}
            className="inline-flex min-h-11 items-center rounded-sm text-sm underline underline-offset-4 hover:decoration-2"
          >
            <span aria-hidden="true">*</span>Términos y condiciones
          </Link>
        </div>
      </Container>
    </section>
  );
}

/**
 * Flecha para recorrer los avisos.
 *
 * @param props - Nombre accesible, región que controla, acción e icono.
 * @returns Un botón de 44 x 44 px.
 */
function ArrowButton({
  label,
  controls,
  onClick,
  children,
}: {
  label: string;
  controls: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      onClick={onClick}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-pill transition-colors hover:bg-white"
    >
      {children}
    </button>
  );
}
