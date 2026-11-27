// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { HelpWidget } from "./HelpWidget";

afterEach(cleanup);

const links = [
  { label: "Preguntas frecuentes", href: "#ayuda" },
  { label: "Contacto", href: "#contacto" },
];

/** Monta el widget y devuelve el botón flotante. */
function setup() {
  const user = userEvent.setup();
  render(<HelpWidget links={links} />);
  return { user, trigger: screen.getByRole("button", { name: "¿Te ayudamos?" }) };
}

describe("HelpWidget", () => {
  it("empieza cerrado", () => {
    const { trigger } = setup();

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("abre un diálogo nombrado con los accesos y mueve el foco dentro", async () => {
    const { user, trigger } = setup();

    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "¿Te ayudamos?" });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(dialog.id);
    expect(screen.getByRole("link", { name: "Contacto" }).getAttribute("href")).toBe("#contacto");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Cerrar ayuda" }));
  });

  it("se cierra con Escape y devuelve el foco al botón flotante", async () => {
    const { user, trigger } = setup();

    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("se cierra con el botón de cerrar y devuelve el foco", async () => {
    const { user, trigger } = setup();

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Cerrar ayuda" }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("no simula un chat", async () => {
    const { user, trigger } = setup();

    await user.click(trigger);

    expect(screen.queryByRole("textbox")).toBeNull();
  });
});
