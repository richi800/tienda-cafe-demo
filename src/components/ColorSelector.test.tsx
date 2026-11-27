// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ColorSelector } from "./ColorSelector";

afterEach(cleanup);

// jsdom no implementa CSS.escape y user-event lo usa para buscar los radios del mismo grupo
// al pulsar las flechas. Los nombres de prueba no llevan caracteres especiales.
globalThis.CSS ??= { escape: (value: string) => value } as typeof CSS;

const colors = [
  { name: "Grafito", hex: "#3A3A3A" },
  { name: "Acero", hex: "#B8B8B8" },
  { name: "Crema", hex: "#EFE6D2" },
];

/** Monta el selector y devuelve el grupo y una función para buscar opciones. */
function setup() {
  const user = userEvent.setup();
  render(<ColorSelector colors={colors} name="color-prueba" />);
  return {
    user,
    group: screen.getByRole("group", { name: "Color" }),
    option: (name: string) => screen.getByRole<HTMLInputElement>("radio", { name }),
  };
}

describe("ColorSelector", () => {
  it("agrupa los colores bajo la leyenda Color y elige el primero", () => {
    const { group, option } = setup();

    expect(group.tagName).toBe("FIELDSET");
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(option("Grafito").checked).toBe(true);
    expect(group.textContent).toContain(": Grafito");
  });

  it("muestra el nombre del color elegido con un clic", async () => {
    const { user, group, option } = setup();

    await user.click(option("Crema"));

    expect(option("Crema").checked).toBe(true);
    expect(option("Grafito").checked).toBe(false);
    expect(group.textContent).toContain(": Crema");
  });

  it("se recorre con el teclado: Tab entra al grupo y las flechas cambian el color", async () => {
    const { user, group, option } = setup();

    await user.tab();
    expect(document.activeElement).toBe(option("Grafito"));

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(option("Acero"));
    expect(option("Acero").checked).toBe(true);
    expect(group.textContent).toContain(": Acero");
  });

  it("no muestra nada si no hay colores", () => {
    const { container } = render(<ColorSelector colors={[]} name="vacio" />);

    expect(container.innerHTML).toBe("");
  });
});
