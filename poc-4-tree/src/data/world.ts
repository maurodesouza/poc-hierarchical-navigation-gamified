/**
 * Canonical dataset and types for POC 1 — Visual Navigation with HTML + Interactive SVG
 *
 * This file is the source of truth and must be copied verbatim into POCs 2–4.
 * All POCs must use identical data structures and content.
 */

export interface ObjectInfo {
  id: string;
  name: string;
  translations: { en: string; pt: string; ja: string };
  description: string;
  actions: string[];
}

export interface AreaNode {
  id: string;
  name: string;
  children?: AreaNode[];
  objects?: ObjectInfo[];
}

/**
 * World → House → Kitchen → [Refrigerator]
 *
 * This is the canonical hierarchical navigation structure.
 * All POCs must replicate this exact data structure.
 */
export const world: AreaNode = {
  id: "world",
  name: "World",
  children: [
    {
      id: "house",
      name: "House",
      children: [
        {
          id: "kitchen",
          name: "Kitchen",
          objects: [
            {
              id: "refrigerator",
              name: "Refrigerator",
              translations: {
                en: "Refrigerator",
                pt: "Geladeira",
                ja: "冷蔵庫"
              },
              description: "A kitchen appliance used for food storage and preservation.",
              actions: ["Open", "Close", "Clean"]
            }
          ]
        }
      ]
    }
  ]
};
