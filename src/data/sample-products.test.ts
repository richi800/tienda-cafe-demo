import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { getDiscountPercentage } from "@/domain/product";

import { sampleProducts } from "./sample-products";

/**
 * Lee el ancho y el alto de un archivo WebP desde su cabecera (formatos VP8, VP8L y VP8X).
 *
 * @param file - Contenido del archivo.
 * @returns Las medidas en píxeles.
 * @throws {Error} Si el archivo no es WebP.
 */
function readWebpSize(file: Buffer): { width: number; height: number } {
  const chunk = file.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    return { width: file.readUInt16LE(26) & 0x3fff, height: file.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === "VP8L") {
    const bits = file.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") {
    return { width: file.readUIntLE(24, 3) + 1, height: file.readUIntLE(27, 3) + 1 };
  }
  throw new Error(`No es un archivo WebP reconocible: ${chunk}`);
}

describe("sampleProducts", () => {
  it("usa identificadores y handles únicos", () => {
    const ids = new Set(sampleProducts.map((product) => product.id));
    const handles = new Set(sampleProducts.map((product) => product.handle));

    expect(ids.size).toBe(sampleProducts.length);
    expect(handles.size).toBe(sampleProducts.length);
  });

  it("incluye productos de las tres categorías", () => {
    const categories = new Set(sampleProducts.map((product) => product.category));

    expect([...categories].sort()).toEqual(["accessories", "coffee", "machines"]);
  });

  it("solo declara precio anterior cuando hay un descuento real", () => {
    const discounted = sampleProducts.filter((product) => product.compareAtPrice);

    expect(discounted.length).toBeGreaterThan(0);
    for (const product of discounted) {
      expect(getDiscountPercentage(product.price, product.compareAtPrice)).toBeGreaterThan(0);
    }
  });

  it("solo los productos de café tienen foto por ahora", () => {
    for (const product of sampleProducts) {
      expect(product.image !== undefined).toBe(product.category === "coffee");
    }
  });

  it("declara fotos que existen en public con sus medidas reales y alt sin texto del empaque", () => {
    const images = sampleProducts.flatMap((product) => (product.image ? [product.image] : []));

    for (const image of images) {
      const file = readFileSync(join(process.cwd(), "public", image.src));
      expect(readWebpSize(file)).toEqual({ width: image.width, height: image.height });
      expect(image.alt.length).toBeGreaterThan(0);
      expect(image.alt).not.toMatch(/landera/i);
    }
  });

  it("declara los colores en hexadecimal de seis dígitos", () => {
    const colors = sampleProducts.flatMap((product) => product.colorOptions ?? []);

    expect(colors.length).toBeGreaterThan(0);
    for (const color of colors) {
      expect(color.hex).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });
});
