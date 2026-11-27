"use client";

/**
 * Selector del color de un producto.
 *
 * @packageDocumentation
 */

import { useState } from "react";

import type { ColorOption } from "@/domain/product";

/** Propiedades de {@link ColorSelector}. */
export type ColorSelectorProps = {
  /** Colores disponibles; el primero queda elegido al cargar. */
  colors: readonly ColorOption[];
  /** Nombre del grupo de opciones; debe ser único en la página (por ejemplo `color-<handle>`). */
  name: string;
};

/**
 * Grupo de botones de opción con un círculo por color.
 *
 * Usa `<input type="radio">` nativos dentro de un `<fieldset>`, de modo que el navegador
 * aporta el rol, el nombre del grupo y la navegación con flechas. Cada opción mide 44 px
 * (área táctil); la elegida lleva un anillo `ink-900` y su nombre se muestra junto a la
 * leyenda. El foco de teclado se dibuja como contorno exterior, distinto del anillo de
 * selección, para que ambos estados se reconozcan a la vez.
 *
 * @param props - Propiedades del selector.
 * @returns Un `<fieldset>` con los colores, o `null` si no hay colores.
 */
export function ColorSelector({ colors, name }: ColorSelectorProps) {
  const [selected, setSelected] = useState(colors[0]?.name);

  if (colors.length === 0) {
    return null;
  }

  return (
    <fieldset>
      <legend className="text-base font-semibold text-ink-900">
        Color
        {/* La opción marcada ya anuncia su nombre; aquí solo se repite a la vista. */}
        <span aria-hidden="true" className="font-normal text-ink-700">
          : {selected}
        </span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {colors.map((color) => (
          <label
            key={color.name}
            title={color.name}
            className="relative inline-flex size-11 cursor-pointer items-center justify-center rounded-pill border-2 border-transparent hover:border-neutral-500 has-checked:border-ink-900 has-checked:hover:border-ink-900 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink-900"
          >
            <input
              type="radio"
              name={name}
              value={color.name}
              checked={selected === color.name}
              onChange={() => setSelected(color.name)}
              className="sr-only"
            />
            {/* El color viene del producto, no de la paleta; el borde neutral-500 (3:1) delimita los tonos claros. */}
            <span
              aria-hidden="true"
              className="size-8 rounded-pill border border-neutral-500"
              style={{ backgroundColor: color.hex }}
            />
            <span className="sr-only">{color.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
