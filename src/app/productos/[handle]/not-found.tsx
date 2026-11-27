import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * 404 de la ficha de producto: se muestra cuando el `handle` no corresponde a ningún
 * producto del catálogo.
 *
 * @returns El aviso de producto no encontrado.
 */
export default function ProductNotFound() {
  return (
    <NotFoundContent
      title="No encontramos este producto"
      description="Puede que el enlace esté incompleto o que el producto ya no esté en el catálogo. Vuelve a la portada para ver el café, las cafeteras y los accesorios disponibles."
    />
  );
}
