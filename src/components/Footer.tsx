/**
 * Pie de página de la tienda.
 *
 * @packageDocumentation
 */

import { Container } from "./Container";

const REPOSITORY_URL = "https://github.com/richi800/tienda-cafe-demo";
const DOCS_URL = `${REPOSITORY_URL}/tree/main/docs`;

/**
 * Muestra el aviso de tienda de demostración y los enlaces al código y la documentación
 * del proyecto.
 *
 * El fondo es oscuro, por lo que el foco usa `white` en lugar del `ink-900` global, que
 * sería invisible sobre `ink-900`.
 *
 * @returns El elemento `<footer>` de la página.
 */
export function Footer() {
  return (
    <footer className="bg-ink-900 py-12 text-neutral-100 md:py-16">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-2xl font-semibold tracking-tight text-white">Café Ladera</p>
          <p className="mt-3 text-sm">
            Marca ficticia creada como proyecto de portafolio. Esta tienda es una demostración:
            no se realizan ventas ni cobros reales.
          </p>
        </div>

        <nav aria-label="Proyecto">
          <ul className="flex flex-col gap-1 md:items-end">
            <li>
              <FooterLink href={REPOSITORY_URL}>Código en GitHub</FooterLink>
            </li>
            <li>
              <FooterLink href={DOCS_URL}>Documentación técnica</FooterLink>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
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
