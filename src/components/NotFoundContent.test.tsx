import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NotFoundContent } from "./NotFoundContent";

describe("NotFoundContent", () => {
  it("muestra el título como h1, la explicación y el enlace a la portada", () => {
    const html = renderToStaticMarkup(
      <NotFoundContent title="No encontramos este producto" description="Vuelve a la portada." />,
    );

    expect(html).toMatch(/<h1[^>]*>No encontramos este producto<\/h1>/);
    expect(html).toContain("Vuelve a la portada.");
    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>Ir a la portada<\/a>/);
    expect(html).toMatch(/<a[^>]*href="\/#promociones"[^>]*>Ver promociones<\/a>/);
  });
});
