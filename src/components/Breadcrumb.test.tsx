import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Breadcrumb } from "./Breadcrumb";

const items = [
  { label: "Inicio", href: "/" },
  { label: "Cafeteras", href: "/#cafeteras" },
  { label: "Cafetera de espresso Ladera Pro", href: "/no-se-usa" },
];

describe("Breadcrumb", () => {
  it("usa un nav con nombre y una lista ordenada", () => {
    const html = renderToStaticMarkup(<Breadcrumb items={items} />);

    expect(html).toMatch(/^<nav aria-label="Ruta de navegación"><ol/);
    expect(html.match(/<li/g)).toHaveLength(3);
  });

  it("enlaza los niveles anteriores", () => {
    const html = renderToStaticMarkup(<Breadcrumb items={items} />);

    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Inicio<\/a>/);
    expect(html).toMatch(/<a[^>]*href="\/#cafeteras"[^>]*>Cafeteras<\/a>/);
  });

  it("marca el último nivel como página actual sin enlace", () => {
    const html = renderToStaticMarkup(<Breadcrumb items={items} />);

    expect(html).toMatch(/<span aria-current="page"[^>]*>Cafetera de espresso Ladera Pro<\/span>/);
    expect(html).not.toContain("/no-se-usa");
    expect(html.match(/aria-current=/g)).toHaveLength(1);
  });

  it("oculta los separadores a lectores de pantalla", () => {
    const html = renderToStaticMarkup(<Breadcrumb items={items} />);

    expect(html.match(/<svg[^>]*aria-hidden="true"/g)).toHaveLength(2);
  });

  it("no muestra nada sin niveles", () => {
    expect(renderToStaticMarkup(<Breadcrumb items={[]} />)).toBe("");
  });
});
