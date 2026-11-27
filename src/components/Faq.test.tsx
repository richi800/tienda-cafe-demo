// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import type { FaqItem } from "@/domain/faq";

import { Faq } from "./Faq";

afterEach(cleanup);

const items: readonly FaqItem[] = Array.from({ length: 6 }, (_, index) => ({
  id: `p${index + 1}`,
  question: `Pregunta ${index + 1}`,
  answer: `Respuesta ${index + 1}`,
}));

describe("Faq", () => {
  it("usa details y summary con un id enlazable por pregunta", () => {
    const html = renderToStaticMarkup(<Faq items={items} />);

    expect(html.match(/<details/g)).toHaveLength(6);
    expect(html).toMatch(/<li id="faq-p1"[^>]*><details/);
    expect(html).toContain("Respuesta 1");
  });

  it("muestra solo las cuatro primeras y oculta el resto", () => {
    render(<Faq items={items} />);

    expect(screen.getByText("Pregunta 4").closest("li")?.hidden).toBe(false);
    expect(screen.getByText("Pregunta 5").closest("li")?.hidden).toBe(true);
    expect(screen.getByRole("button", { name: "Mostrar más (2)" }).getAttribute("aria-expanded")).toBe(
      "false",
    );
  });

  it("revela el resto con Mostrar más y lleva el foco a la primera nueva", async () => {
    const user = userEvent.setup();
    render(<Faq items={items} />);

    await user.click(screen.getByRole("button", { name: "Mostrar más (2)" }));

    expect(screen.getByText("Pregunta 6").closest("li")?.hidden).toBe(false);
    expect(document.activeElement?.textContent).toBe("Pregunta 5");
    expect(screen.getByRole("button", { name: "Mostrar menos" }).getAttribute("aria-expanded")).toBe(
      "true",
    );
  });

  it("no muestra el botón si caben todas", () => {
    const html = renderToStaticMarkup(<Faq items={items.slice(0, 3)} />);

    expect(html).not.toContain("Mostrar más");
  });
});
