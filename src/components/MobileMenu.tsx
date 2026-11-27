"use client";

/**
 * Menú principal colapsable para pantallas pequeñas.
 *
 * @packageDocumentation
 */

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

import { CloseIcon, MenuIcon } from "./icons";
import { navToneClassName, type NavItem } from "./main-navigation";

/** Propiedades de {@link MobileMenu}. */
export type MobileMenuProps = {
  /** Enlaces del menú. */
  items: readonly NavItem[];
  /** Identificador del panel, referenciado por `aria-controls` del botón. */
  panelId: string;
};

/**
 * Botón que abre y cierra un panel con la navegación principal, visible solo por debajo de
 * `xl` (1280 px), donde el menú en línea no cabe junto a la marca y los iconos.
 *
 * El panel va justo después del botón en el DOM, así que al abrirlo el siguiente Tab entra
 * en los enlaces. Se cierra con el mismo botón, con Escape (devolviendo el foco al botón) o
 * al elegir un enlace. No atrapa el foco: es una divulgación, no un diálogo modal.
 *
 * El panel se posiciona respecto al `<header>`, que debe tener `position: relative`.
 *
 * @param props - Propiedades del menú.
 * @returns El botón del menú y su panel.
 */
export function MobileMenu({ items, panelId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="xl:hidden" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="-ml-3 inline-flex size-11 items-center justify-center rounded-pill text-ink-900 transition-colors hover:bg-neutral-100 active:bg-neutral-200"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav
        id={panelId}
        aria-label="Principal"
        hidden={!open}
        className="absolute inset-x-0 top-full z-10 border-t border-neutral-200 bg-white px-gutter pt-2 pb-6 shadow-overlay"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.label} className="border-b border-neutral-200 last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 items-center rounded-sm text-lg font-medium ${navToneClassName(item)}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
