import { describe, expect, it } from "vitest";

import { BRAND_LOGO_PATH, resolveBrandLogo } from "./logo";

describe("resolveBrandLogo", () => {
  it("devuelve la ruta pública cuando el logo existe", () => {
    expect(resolveBrandLogo(() => true)).toBe("/brand/logo.svg");
  });

  it("devuelve null cuando el logo no existe", () => {
    expect(resolveBrandLogo(() => false)).toBeNull();
  });

  it("consulta la ruta del logo de la marca", () => {
    const checked: string[] = [];

    resolveBrandLogo((path) => {
      checked.push(path);
      return false;
    });

    expect(checked).toEqual([BRAND_LOGO_PATH]);
  });
});
