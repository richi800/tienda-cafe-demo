// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SectionNav } from "./SectionNav";
import { CATALOG_SECTIONS } from "./store-sections";

/** Observadores creados durante la prueba, para simular el desplazamiento. */
let observers: { callback: IntersectionObserverCallback; targets: Element[] }[] = [];

beforeEach(() => {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      targets: Element[] = [];
      constructor(callback: IntersectionObserverCallback) {
        observers.push({ callback, targets: this.targets });
      }
      observe(target: Element) {
        this.targets.push(target);
      }
      disconnect() {}
    },
  );
  const hero = document.createElement("section");
  hero.id = "inicio";
  document.body.append(hero);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

/** Simula que el hero salió de la pantalla por arriba. */
function scrollPastHero() {
  const observer = observers.find((item) => item.targets.some((target) => target.id === "inicio"));
  const target = observer?.targets[0];
  if (!observer || !target) {
    throw new Error("No se observó el hero");
  }
  act(() => {
    observer.callback(
      [
        {
          target,
          isIntersecting: false,
          boundingClientRect: { top: -400 } as DOMRectReadOnly,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
  });
}

describe("SectionNav", () => {
  it("empieza oculto e inerte mientras el hero está a la vista", () => {
    render(<SectionNav sections={CATALOG_SECTIONS} triggerId="inicio" />);
    const nav = document.querySelector("nav");

    expect(nav?.hasAttribute("inert")).toBe(true);
    expect(nav?.hasAttribute("data-visible")).toBe(false);
  });

  it("aparece al pasar el hero, con un chip por sección", () => {
    render(<SectionNav sections={CATALOG_SECTIONS} triggerId="inicio" />);
    scrollPastHero();

    const nav = screen.getByRole("navigation", { name: "Secciones del catálogo" });
    expect(nav.hasAttribute("inert")).toBe(false);
    for (const section of CATALOG_SECTIONS) {
      expect(screen.getAllByRole("link", { name: section.label })[0]?.getAttribute("href")).toBe(
        `#${section.id}`,
      );
    }
  });

  it("cierra el desplegable con Escape y devuelve el foco al resumen", async () => {
    const user = userEvent.setup();
    render(<SectionNav sections={CATALOG_SECTIONS} triggerId="inicio" />);
    scrollPastHero();
    const details = document.querySelector("details");
    const summary = details?.querySelector("summary");
    if (!details || !summary) {
      throw new Error("No se encontró el desplegable");
    }

    details.open = true;
    const firstOption = details.querySelector("a");
    firstOption?.focus();
    await user.keyboard("{Escape}");

    expect(details.open).toBe(false);
    expect(document.activeElement).toBe(summary);
  });
});
