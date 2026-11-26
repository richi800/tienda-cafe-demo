import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  ArrowUpIcon,
  BagIcon,
  BeanIcon,
  CameraIcon,
  ChevronDownIcon,
  CupIcon,
  HelpIcon,
  LeafIcon,
  MachineIcon,
  MessageIcon,
  PlayIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "./icons";

const ICONS = [
  ArrowUpIcon,
  BagIcon,
  BeanIcon,
  CameraIcon,
  ChevronDownIcon,
  CupIcon,
  HelpIcon,
  LeafIcon,
  MachineIcon,
  MessageIcon,
  PlayIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
];

describe("icons", () => {
  it.each(ICONS.map((Icon) => [Icon.name, Icon] as const))(
    "%s es decorativo, no recibe foco y hereda el color del texto",
    (_name, Icon) => {
      const html = renderToStaticMarkup(<Icon />);

      expect(html).toMatch(/^<svg /);
      expect(html).toContain('aria-hidden="true"');
      expect(html).toContain('focusable="false"');
      expect(html).toContain('stroke="currentColor"');
      expect(html).toContain('width="24"');
    },
  );

  it("acepta clases para cambiar el tamaño", () => {
    expect(renderToStaticMarkup(<SearchIcon className="size-5" />)).toContain('class="size-5"');
  });
});
