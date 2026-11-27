// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { pickActiveSection, useActiveSection } from "./use-active-section";

/** Callback del observador creado por el hook, para simular el desplazamiento. */
let notify: IntersectionObserverCallback | undefined;

beforeEach(() => {
  notify = undefined;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        notify = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
  for (const id of ["cafe", "cafeteras"]) {
    const section = document.createElement("section");
    section.id = id;
    document.body.append(section);
  }
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

/** Simula que una sección entra o sale de la banda de lectura. */
function cross(id: string, isIntersecting: boolean) {
  const target = document.getElementById(id);
  if (!notify || !target) {
    throw new Error("Observador o sección no disponibles");
  }
  const callback = notify;
  act(() => {
    callback(
      [{ target, isIntersecting } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

/** Componente mínimo que expone el resultado del hook. */
function Probe() {
  return <output>{useActiveSection(["cafe", "cafeteras"]) ?? "ninguna"}</output>;
}

const current = () => document.querySelector("output")?.textContent;

describe("pickActiveSection", () => {
  it("devuelve la primera sección, en orden de página, que está en la banda", () => {
    expect(pickActiveSection(["a", "b", "c"], new Set(["c", "b"]))).toBe("b");
  });

  it("devuelve null si ninguna está en la banda", () => {
    expect(pickActiveSection(["a", "b"], new Set())).toBeNull();
    expect(pickActiveSection(["a", "b"], new Set(["pie"]))).toBeNull();
  });
});

describe("useActiveSection", () => {
  it("empieza sin sección activa", () => {
    render(<Probe />);

    expect(current()).toBe("ninguna");
  });

  it("sigue a la sección que entra en la banda", () => {
    render(<Probe />);

    cross("cafe", true);
    expect(current()).toBe("cafe");

    cross("cafe", false);
    cross("cafeteras", true);
    expect(current()).toBe("cafeteras");
  });

  it("vuelve a null cuando la banda pasa a una sección que no es de catálogo", () => {
    render(<Probe />);

    cross("cafeteras", true);
    cross("cafeteras", false);

    expect(current()).toBe("ninguna");
  });
});
