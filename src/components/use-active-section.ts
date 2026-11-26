"use client";

/**
 * Detección de la sección de la portada que está a la vista.
 *
 * @packageDocumentation
 */

import { useEffect, useState } from "react";

/**
 * Devuelve el `id` de la sección que ocupa la franja central de la pantalla.
 *
 * Usa `IntersectionObserver` con un margen que deja solo una banda horizontal cerca del
 * tercio superior, de modo que como máximo una sección cuenta como activa. Si el navegador
 * no ofrece `IntersectionObserver`, se mantiene el valor inicial.
 *
 * @param ids - Identificadores de las secciones, sin `#`.
 * @param initial - Sección activa antes de que el observador informe; por defecto ninguna.
 * @returns El `id` activo, o `null`.
 */
export function useActiveSection(ids: readonly string[], initial: string | null = null) {
  const [active, setActive] = useState<string | null>(initial);
  const key = ids.join(",");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );

    for (const id of key.split(",")) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [key]);

  return active;
}
