/**
 * Icono de una sección de la portada.
 *
 * @packageDocumentation
 */

import type { JSX } from "react";

import { BeanIcon, CupIcon, LeafIcon, MachineIcon, TagIcon, type IconProps } from "./icons";
import type { SectionIconName } from "./store-sections";

const ICONS: Record<SectionIconName, (props: IconProps) => JSX.Element> = {
  bean: BeanIcon,
  machine: MachineIcon,
  cup: CupIcon,
  leaf: LeafIcon,
  tag: TagIcon,
};

/**
 * Muestra el icono decorativo que corresponde a una sección.
 *
 * @param props - Nombre del icono y clases opcionales.
 * @returns El SVG del icono, oculto a lectores de pantalla.
 */
export function SectionIcon({ name, className }: { name: SectionIconName } & IconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}
