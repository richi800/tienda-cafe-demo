import { describe, expect, it } from "vitest";

import { getDiscountPercentage } from "@/domain/product";

import { sampleProducts } from "./sample-products";

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

  it("declara los colores en hexadecimal de seis dígitos", () => {
    const colors = sampleProducts.flatMap((product) => product.colorOptions ?? []);

    expect(colors.length).toBeGreaterThan(0);
    for (const color of colors) {
      expect(color.hex).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });
});
