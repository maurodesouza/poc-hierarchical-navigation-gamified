// Canonical dataset — source of truth copied verbatim into POCs 2–4.
// Do NOT modify this file without updating all other POCs.

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

export const world: AreaNode = {
  id: 'world',
  name: 'World',
  children: [
    {
      id: 'house',
      name: 'House',
      children: [
        {
          id: 'kitchen',
          name: 'Kitchen',
          objects: [
            {
              id: 'refrigerator',
              name: 'Refrigerator',
              translations: { en: 'Refrigerator', pt: 'Geladeira', ja: '冷蔵庫' },
              description:
                'A large kitchen appliance used to keep food and beverages cold and fresh.',
              actions: ['Open', 'Close', 'Clean'],
            },
          ],
        },
      ],
    },
  ],
};
