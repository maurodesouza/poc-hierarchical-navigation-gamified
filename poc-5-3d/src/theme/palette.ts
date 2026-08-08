import { palette as rawPalette } from '@poc-hierarchical/core';

export type PaletteColor = keyof typeof rawPalette.colors;

export const colors = rawPalette.colors;
export const interaction = rawPalette.interaction;
export const faceShading = rawPalette.faceShading;

export const palette = {
  colors,
  interaction,
  faceShading,
} as const;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '');
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 0xff,
    g: (value >> 8) & 0xff,
    b: value & 0xff,
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  const clamp = (channel: number) => Math.max(0, Math.min(255, Math.round(channel)));
  const toChannel = (channel: number) => clamp(channel).toString(16).padStart(2, '0');
  return `#${toChannel(r)}${toChannel(g)}${toChannel(b)}`;
}

export function shadeHex(hex: string, multiplier: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: r * multiplier,
    g: g * multiplier,
    b: b * multiplier,
  });
}
