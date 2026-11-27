// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { MAIN_NAV_ITEMS } from "./main-navigation";
import { MobileMenu } from "./MobileMenu";

afterEach(cleanup);

/** Monta el menú y devuelve el botón y el panel. */
function setup() {
  const user = userEvent.setup();
  render(<MobileMenu items={MAIN_NAV_ITEMS} panelId="menu" />);
  const button = screen.getByRole("button", { name: "Abrir menú" });
  const panel = document.getElementById("menu");
  if (panel === null) {
    throw new Error("No se encontró el panel del menú");
  }
  return { user, button, panel };
}

describe("MobileMenu (interacción)", () => {
  it("abre y cierra el panel con el botón", async () => {
    const { user, button, panel } = setup();

    await user.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(button.getAttribute("aria-label")).toBe("Cerrar menú");
    expect(panel.hidden).toBe(false);

    await user.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(panel.hidden).toBe(true);
  });

  it("se cierra con Escape y devuelve el foco al botón", async () => {
    const { user, button, panel } = setup();

    await user.click(button);
    await user.tab();
    expect(document.activeElement?.textContent).toBe("Promociones");

    await user.keyboard("{Escape}");
    expect(panel.hidden).toBe(true);
    expect(document.activeElement).toBe(button);
  });

  it("se cierra al elegir un enlace", async () => {
    const { user, button, panel } = setup();

    await user.click(button);
    await user.click(screen.getByRole("link", { name: "Café" }));

    expect(panel.hidden).toBe(true);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });
});
