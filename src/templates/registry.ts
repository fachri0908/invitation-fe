import React from "react";
import type { TemplateProps } from "./types";

export interface TemplateRegistryEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl: string | null;
  /** Tailwind bg colour class used for the card swatch */
  accentColor: string;
  component: React.LazyExoticComponent<React.ComponentType<TemplateProps>>;
}

/**
 * Central registry of all available invitation templates.
 * To add a new template:
 *   1. Create src/templates/<template-id>/index.tsx
 *   2. Add an entry here.
 */
export const templateRegistry: TemplateRegistryEntry[] = [
  {
    id: "elegant-script",
    name: "Elegant Script",
    description:
      "A romantic, script-forward wedding invitation with a floral hero, countdown timer, and event schedule — inspired by luxury destination weddings.",
    category: "Wedding",
    thumbnailUrl: null,
    accentColor: "bg-rose-50",
    component: React.lazy(() =>
      import("./elegant-script/index").then((m) => ({ default: m.ElegantScriptTemplate }))
    ),
  },
];

/** Look up a registry entry by template id. Returns undefined if not found. */
export function findTemplateById(id: string): TemplateRegistryEntry | undefined {
  return templateRegistry.find((t) => t.id === id);
}
