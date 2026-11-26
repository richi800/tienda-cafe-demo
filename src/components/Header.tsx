/**
 * Encabezado de la tienda: marca, navegación principal y acceso al carrito.
 *
 * @packageDocumentation
 */

import Image from "next/image";
import Link from "next/link";

import { Container } from "./Container";

/** Nombre de la marca, mostrado en texto cuando no hay logo. */
const BRAND_NAME = "Café Ladera";

/** Enlace de la navegación principal. */
type NavItem = {
  label: string;
  href: string;
  current?: boolean;
};

// Café y Ayuda apuntan a secciones de la portada hasta que existan sus páginas,
// para no publicar enlaces rotos.
const NAV_ITEMS: readonly NavItem[] = [
  { label: "Inicio", href: "/", current: true },
  { label: "Café", href: "/#cafe" },
  { label: "Ayuda", href: "/#ayuda" },
];

/** Propiedades de {@link Header}. */
export type HeaderProps = {
  /** Ruta pública del logo, o `null` para mostrar el nombre de la marca en texto. */
  logoSrc: string | null;
  /** Número de productos en el carrito. Por defecto 0. */
  cartCount?: number;
};

/**
 * Muestra el encabezado sin JavaScript de cliente.
 *
 * En celular ocupa dos filas (marca y carrito arriba, navegación abajo); desde `md`
 * todo cabe en una sola fila. El orden del DOM (marca, navegación, carrito) es el
 * orden de tabulación en todos los tamaños.
 *
 * @param props - Propiedades del encabezado.
 * @returns El elemento `<header>` de la página.
 */
export function Header({ logoSrc, cartCount = 0 }: HeaderProps) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <Container className="grid grid-cols-[1fr_auto] items-center gap-x-4 py-2 md:grid-cols-[auto_1fr_auto] md:py-3">
        <BrandLink logoSrc={logoSrc} />

        <nav
          aria-label="Principal"
          className="col-span-2 row-start-2 -mx-3 md:col-span-1 md:col-start-2 md:row-start-1 md:mx-0 md:justify-self-center"
        >
          <ul className="flex flex-wrap">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className="inline-flex min-h-11 items-center rounded-sm px-3 text-base font-medium text-ink-700 underline-offset-8 hover:text-ink-900 hover:underline aria-[current=page]:text-ink-900 aria-[current=page]:underline aria-[current=page]:decoration-ink-900 aria-[current=page]:decoration-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <CartButton count={cartCount} />
      </Container>
    </header>
  );
}

/**
 * Enlace a la portada con el logo, o con el nombre de la marca si no hay logo.
 *
 * @param props - Ruta del logo o `null`.
 * @returns El enlace de la marca.
 */
function BrandLink({ logoSrc }: { logoSrc: string | null }) {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center justify-self-start rounded-sm font-display text-2xl font-semibold text-ink-900"
    >
      {logoSrc ? (
        // Se reserva el alto (40 px) para evitar saltos de diseño; el ancho se ajusta a la proporción del archivo.
        <Image
          src={logoSrc}
          alt={BRAND_NAME}
          width={160}
          height={40}
          unoptimized
          loading="eager"
          className="h-10 w-auto"
        />
      ) : (
        BRAND_NAME
      )}
    </Link>
  );
}

/**
 * Botón de acceso al carrito con contador visible.
 *
 * @param props - Número de productos en el carrito.
 * @returns El botón del carrito.
 */
function CartButton({ count }: { count: number }) {
  return (
    <button
      type="button"
      aria-label={`Carrito, ${formatItemCount(count)}`}
      className="col-start-2 row-start-1 inline-flex min-h-11 items-center gap-2 justify-self-end rounded-pill border border-ink-900 px-4 text-base font-semibold text-ink-900 transition-colors hover:bg-neutral-100 active:bg-neutral-200 md:col-start-3"
    >
      Carrito
      <span
        aria-hidden="true"
        className="inline-flex h-6 min-w-6 items-center justify-center rounded-pill bg-ink-900 px-2 text-sm font-semibold text-white"
      >
        {count}
      </span>
    </button>
  );
}

/**
 * Describe una cantidad de productos con el singular o plural correcto.
 *
 * @param count - Cantidad de productos.
 * @returns Por ejemplo `"1 producto"` o `"3 productos"`.
 */
function formatItemCount(count: number): string {
  return count === 1 ? "1 producto" : `${count} productos`;
}
