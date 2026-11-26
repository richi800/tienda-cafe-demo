import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SectionIcon } from "./SectionIcon";
import type { SectionIconName } from "./store-sections";

const NAMES: readonly SectionIconName[] = ["bean", "machine", "cup", "leaf", "tag"];

describe("SectionIcon", () => {
  it.each(NAMES)("dibuja un icono decorativo para %s", (name) => {
    const html = renderToStaticMarkup(<SectionIcon name={name} className="size-5" />);

    expect(html).toMatch(/^<svg /);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('class="size-5"');
  });

  it("usa un dibujo distinto para cada sección", () => {
    const drawings = NAMES.map((name) => renderToStaticMarkup(<SectionIcon name={name} />));

    expect(new Set(drawings).size).toBe(NAMES.length);
  });
});
