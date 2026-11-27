/**
 * Pie de página de la tienda.
 *
 * @packageDocumentation
 */

import type { ReactNode } from "react";

import { Container } from "./Container";
import { ArrowUpIcon, CameraIcon, MessageIcon, PlayIcon } from "./icons";

const REPOSITORY_URL = "https://github.com/richi800/tienda-cafe-demo";
const DOCS_URL = `${REPOSITORY_URL}/tree/main/docs`;

/** Año del aviso de derechos; fijo para que la página siga siendo estática. */
const COPYRIGHT_YEAR = 2026;

/** Métodos de pago mostrados como etiquetas de texto, sin logos de marcas. */
const PAYMENT_METHODS: readonly string[] = [
  "Tarjeta de crédito",
  "Tarjeta de débito",
  "Transferencia",
];

/** Enlaces de información; todos apuntan a secciones existentes de la portada. */
const INFO_LINKS: readonly { label: string; href: string }[] = [
  { label: "Envíos y devoluciones", href: "/#faq-envios" },
  { label: "Términos", href: "/#terminos" },
  { label: "Facturación", href: "/#faq-facturacion" },
  { label: "Preguntas frecuentes", href: "/#ayuda" },
  { label: "Contacto", href: "/#contacto" },
];

/** Redes sociales genéricas; aún no existen perfiles, así que no son enlaces. */
const SOCIAL_CHANNELS: readonly { label: string; icon: ReactNode }[] = [
  { label: "Fotos", icon: <CameraIcon className="size-5" /> },
  { label: "Videos", icon: <PlayIcon className="size-5" /> },
  { label: "Mensajes", icon: <MessageIcon className="size-5" /> },
];

/**
 * Muestra el pie de la tienda: marca y aviso de demostración, métodos de pago de
 * demostración, redes sociales, selector de país e idioma, enlaces de información,
 * enlaces del proyecto, botón para volver arriba y aviso de derechos.
 *
 * El fondo es oscuro, por lo que el foco usa `white` en lugar del `ink-900` global, que
 * sería invisible sobre `ink-900`. El relleno inferior extra en celular deja libre el
 * espacio del botón flotante de ayuda.
 *
 * @returns El elemento `<footer>` de la página.
 */
export function Footer() {
  return (
    <footer className="bg-ink-900 pt-16 pb-24 text-neutral-100 md:pb-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="max-w-md">
            <p className="font-display text-2xl font-bold tracking-tight text-white">Café Ladera</p>
            <p className="mt-3 text-sm">
              Marca ficticia creada como proyecto de portafolio. Esta tienda es una demostración:
              no se realizan ventas ni cobros reales.
            </p>
            <nav aria-label="Proyecto" className="mt-4">
              <ul className="flex flex-col">
                <li>
                  <FooterLink href={REPOSITORY_URL}>Código en GitHub</FooterLink>
                </li>
                <li>
                  <FooterLink href={DOCS_URL}>Documentación técnica</FooterLink>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <FooterHeading>Métodos de pago (demostración)</FooterHeading>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => (
                <li
                  key={method}
                  className="rounded-pill border border-neutral-500 px-4 py-2 text-sm text-white"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <FooterHeading>Síguenos</FooterHeading>
              <ul aria-label="Redes sociales (próximamente)" className="mt-4 flex gap-3">
                {SOCIAL_CHANNELS.map((channel) => (
                  <li
                    key={channel.label}
                    title={channel.label}
                    className="inline-flex size-11 items-center justify-center rounded-pill border border-neutral-500 text-white"
                  >
                    {channel.icon}
                    <span className="sr-only">{channel.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm">Nuestros perfiles llegarán pronto.</p>
            </div>

            <div>
              <label htmlFor="pais-idioma" className="block text-sm font-semibold text-white">
                País e idioma
              </label>
              <select
                id="pais-idioma"
                defaultValue="mx-es"
                className="mt-2 min-h-11 w-full max-w-xs rounded-md border border-neutral-500 bg-ink-900 px-3 text-white focus-visible:outline-white"
              >
                <option value="mx-es">México (Español)</option>
              </select>
            </div>
          </div>
        </div>

        <nav aria-label="Información" className="mt-12 border-t border-neutral-500 pt-6">
          <ul className="flex flex-wrap items-center gap-x-3">
            {INFO_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center gap-x-3">
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold tracking-wide text-white uppercase underline-offset-4 hover:underline focus-visible:outline-white"
                >
                  {link.label}
                </a>
                {/* El separador va detrás del enlace para que, al partirse la línea, no la encabece. */}
                {index < INFO_LINKS.length - 1 && (
                  <span aria-hidden="true" className="text-neutral-500">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            &copy; {COPYRIGHT_YEAR} Café Ladera. Tienda de demostración, no se realizan ventas
            reales.
          </p>
          {/* "#top" lleva al inicio del documento por definición de HTML, sin JavaScript. */}
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-pill border border-white px-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink-900 focus-visible:outline-white md:self-auto"
          >
            <ArrowUpIcon className="size-4" />
            Desplazarse hasta arriba
          </a>
        </div>
      </Container>
    </footer>
  );
}

/**
 * Título de un bloque del pie.
 *
 * @param props - Texto del título.
 * @returns Un `h2` pequeño en mayúsculas.
 */
function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="text-sm font-semibold tracking-wide text-white uppercase">{children}</h2>
  );
}

/**
 * Enlace externo del pie de página.
 *
 * @param props - Destino y texto del enlace.
 * @returns Un enlace con área táctil de 44 px y foco claro sobre fondo oscuro.
 */
function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center rounded-sm text-base font-medium text-white underline underline-offset-4 hover:decoration-2 focus-visible:outline-white"
    >
      {children}
    </a>
  );
}
