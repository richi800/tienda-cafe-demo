import { describe, expect, it } from "vitest";

import { readWebpSize } from "./webp-size";

/** Arma una cabecera WebP mínima con el bloque indicado. */
function header(chunk: string, fill: (view: DataView) => void): Uint8Array {
  const bytes = new Uint8Array(32);
  bytes.set(new TextEncoder().encode("RIFF"), 0);
  bytes.set(new TextEncoder().encode("WEBP"), 8);
  bytes.set(new TextEncoder().encode(chunk), 12);
  fill(new DataView(bytes.buffer));
  return bytes;
}

describe("readWebpSize", () => {
  it("lee las medidas de un WebP con pérdida (VP8)", () => {
    const file = header("VP8 ", (view) => {
      view.setUint16(26, 1200, true);
      view.setUint16(28, 900, true);
    });

    expect(readWebpSize(file)).toEqual({ width: 1200, height: 900 });
  });

  it("lee las medidas de un WebP extendido (VP8X)", () => {
    const file = header("VP8X", (view) => {
      view.setUint16(24, 1599, true);
      view.setUint16(27, 872, true);
    });

    expect(readWebpSize(file)).toEqual({ width: 1600, height: 873 });
  });

  it("lanza un error si el archivo no es WebP", () => {
    expect(() => readWebpSize(new Uint8Array(32))).toThrow("no es un WebP");
  });
});
