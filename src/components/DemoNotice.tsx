/**
 * Aviso de tienda de demostración.
 *
 * @packageDocumentation
 */

/**
 * Aviso visible que indica que el sitio es una tienda de demostración.
 *
 * Se muestra en todas las páginas para que ningún visitante crea que puede
 * realizar una compra real.
 *
 * @returns Una franja con el aviso, anunciada como región de estado a lectores de pantalla.
 */
export function DemoNotice() {
  return (
    <p
      role="status"
      className="bg-ink-900 px-4 py-2 text-center text-sm font-medium text-white"
    >
      Tienda de demostración, no se realizan ventas reales.
    </p>
  );
}
