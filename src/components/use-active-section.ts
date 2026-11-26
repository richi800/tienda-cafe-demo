"use client";

/**
 * Detección de la sección de la portada que está a la vista.
 *
 * @packageDocumentation
 */

import { useEffect, useState } from "react";

/**
 * Elige la sección activa entre las que están dentro de la banda de lectura.
 *
 * @param ids - Identificadores de las secciones, en el orden de la página.
 * @param intersecting - Identificadores que hoy cruzan la banda.
 * @returns El primero de `ids` que esté en la banda, o `null` si ninguno lo está (por
 * ejemplo, cuando la banda está sobre una sección que no es de catálogo o sobre el pie).
 */
export function pickActiveSection(
  ids: readonly string[],
  intersecting: ReadonlySet<string>,
): string | null {
  return ids.find((id) => intersecting.has(id)) ?? null;
}

/**
 * Devuelve el `id` de la sección que ocupa la banda de lectura de la pantalla.
 *
 * Usa `IntersectionObserver` con un margen que deja solo una franja horizontal cerca del
 * tercio superior. Lleva la cuenta de qué secciones están en la franja, de modo que cuando
 * todas la abandonan (porque la persona llegó a otra parte de la página) el resultado vuelve
 * a `null` en lugar de quedarse con la última. Si el navegador no ofrece
 * `IntersectionObserver`, se mantiene `null`.
 *
 * @param ids - Identificadores de las secciones, sin `#`, en el orden de la página.
 * @returns El `id` activo, o `null`.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const orderedIds = key.split(",");
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        setActive(pickActiveSection(orderedIds, intersecting));
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );

    for (const id of orderedIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [key]);

  return active;
}
