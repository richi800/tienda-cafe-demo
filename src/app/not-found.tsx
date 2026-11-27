import type { Metadata } from "next";

import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = {
  title: "Página no encontrada | Café Ladera",
};

/**
 * 404 general de la tienda: se muestra en cualquier dirección que no corresponde a una ruta.
 *
 * @returns El aviso de página no encontrada.
 */
export default function NotFound() {
  return (
    <NotFoundContent
      title="No encontramos esta página"
      description="Puede que el enlace esté incompleto o que la página ya no exista. Vuelve a la portada para seguir comprando."
    />
  );
}
