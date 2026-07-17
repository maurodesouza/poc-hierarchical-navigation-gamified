import { colors, interaction, type PaletteColor } from './palette';

export interface MatteOptions {
  color?: PaletteColor | string;
  hovered?: boolean;
  flatShading?: boolean;
  roughness?: number;
  metalness?: number;
}

const DEFAULTS = {
  roughness: 0.6,
  metalness: 0,
  flatShading: true,
};

function isPaletteColor(value: string): value is PaletteColor {
  return value in colors;
}

export function matte({
  color = 'cream',
  hovered = false,
  flatShading = DEFAULTS.flatShading,
  roughness = DEFAULTS.roughness,
  metalness = DEFAULTS.metalness,
}: MatteOptions = {}) {
  const resolvedColor = isPaletteColor(color) ? colors[color] : color;

  return {
    color: resolvedColor,
    roughness,
    metalness,
    flatShading,
    emissive: hovered ? interaction.hoverGlow : '#000000',
    emissiveIntensity: hovered ? 0.35 : 0,
  };
}
