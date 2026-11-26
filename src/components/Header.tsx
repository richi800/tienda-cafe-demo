/**
 * Encabezado de la tienda: marca, navegación principal y accesos rápidos.
 *
 * @packageDocumentation
 */

import Image from "next/image";
import Link from "next/link";

import { Container } from "./Container";
import { IconButton } from "./IconButton";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "./icons";
import { MAIN_NAV_ITEMS, navToneClassName } from "./main-navigation";
import { MobileMenu } from "./MobileMenu";

/** Nombre de la marca, mostrado en texto cuando no hay logo. */
const BRAND_NAME = "Café Ladera";

/** Identificador del panel del menú en celular. */
const MOBILE_MENU_ID = "menu-principal";

/** Propiedades de {@link Header}. */
export type HeaderProps = {
  /** Ruta pública del logo, o `null` para mostrar el nombre de la marca en texto. */
  logoSrc: string | null;
  /** Número de productos en el carrito. Por defecto 0. */
  cartCount?: number;
};

/**
 * Muestra el encabezado blanco de la tienda.
 *
 * Por debajo de `xl` (1280 px) la fila es: botón de menú, marca e iconos; la navegación
 * vive en el panel del menú. Desde `xl`: marca a la izquierda, navegación en línea y los
 * iconos a la derecha. El orden del DOM coincide con el orden visual en ambos casos.
 *
 * @param props - Propiedades del encabezado.
 * @returns El elemento `<header>` de la página.
 */
export function Header({ logoSrc, cartCount = 0 }: HeaderProps) {
  return (
    <header className="relative border-b border-neutral-200 bg-white">
      <Container className="flex min-h-16 items-center gap-1 xl:min-h-20 xl:gap-8">
        <MobileMenu items={MAIN_NAV_ITEMS} panelId={MOBILE_MENU_ID} />

        <BrandLink logoSrc={logoSrc} />

        <nav aria-label="Principal" className="hidden flex-1 xl:block">
          <ul className="flex flex-wrap items-center justify-center gap-x-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`inline-flex min-h-11 items-center rounded-sm px-3 text-base font-medium underline-offset-8 hover:underline ${navToneClassName(item)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center xl:ml-0">
          <IconButton label="Favoritos">
            <HeartIcon />
          </IconButton>
          <IconButton label="Buscar">
            <SearchIcon />
          </IconButton>
          <IconButton label="Mi cuenta">
            <UserIcon />
          </IconButton>
          <IconButton label={`Carrito, ${formatItemCount(cartCount)}`} badge={cartCount}>
            <BagIcon />
          </IconButton>
        </div>
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
      className="inline-flex min-h-11 shrink-0 items-center rounded-sm font-display text-xl font-semibold tracking-tight text-ink-900 xl:text-2xl"
    >
      {logoSrc ? (
        // Se reserva el alto para evitar saltos de diseño; el ancho se limita para que en
        // 375 px quepan el botón de menú y los cuatro iconos en la misma fila.
        <Image
          src={logoSrc}
          alt={BRAND_NAME}
          width={160}
          height={40}
          unoptimized
          loading="eager"
          className="h-8 w-auto max-w-28 object-contain object-left sm:max-w-40 xl:h-10"
        />
      ) : (
        BRAND_NAME
      )}
    </Link>
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
