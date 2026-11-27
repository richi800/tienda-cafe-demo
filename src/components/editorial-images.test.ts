import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { readWebpSize } from "@/lib/images/webp-size";

import { EDITORIAL_IMAGES, HERO_IMAGE } from "./editorial-images";

describe("fotos editoriales", () => {
  it("existen en public con las medidas declaradas", () => {
    for (const image of EDITORIAL_IMAGES) {
      const file = readFileSync(join(process.cwd(), "public", image.src));

      expect(readWebpSize(file)).toEqual({ width: image.width, height: image.height });
    }
  });

  it("describen la escena sin transcribir textos de empaques o letreros", () => {
    for (const image of EDITORIAL_IMAGES) {
      expect(image.alt.length).toBeGreaterThan(20);
      expect(image.alt).not.toMatch(
        /landera|ladera|single origin|coffee roasters|cold brew|campamento|cosecha|altura/i,
      );
    }
  });

  it("no asocia la foto del hero a un origen", () => {
    expect(HERO_IMAGE.alt).not.toMatch(/colombia|origen|chiapas|veracruz|oaxaca/i);
  });
});
