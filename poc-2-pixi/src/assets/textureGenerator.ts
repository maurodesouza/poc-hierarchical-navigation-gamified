import { Graphics } from 'pixi.js';
import palette from '../../../docs/palette.json';

/**
 * Generates isometric sprite graphics programmatically.
 * This creates visual assets without requiring external image files.
 * Returns Graphics objects that can be used directly as display objects.
 */

type PaletteColor = keyof typeof palette.colors;
type Point = [number, number];

const graphicsCache = new Map<string, Graphics>();
const colors = Object.fromEntries(
  Object.entries(palette.colors).map(([name, value]) => [name, Number.parseInt(value.slice(1), 16)])
) as Record<PaletteColor, number>;
const interaction = {
  shadowTint: Number.parseInt(palette.interaction.shadowTint.slice(1), 16),
};

export function getPaletteColor(color: PaletteColor): number {
  return colors[color];
}

function shade(color: number, multiplier: number): number {
  const channel = (shift: number) => Math.min(255, Math.round(((color >> shift) & 0xff) * multiplier));
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}

function polygon(graphics: Graphics, points: Point[], color: number, alpha = 1): void {
  graphics.poly(points.flat()).fill({ color, alpha });
}

function ellipse(graphics: Graphics, x: number, y: number, width: number, height: number, color: number, alpha = 1): void {
  graphics.ellipse(x, y, width, height).fill({ color, alpha });
}

function diamond(graphics: Graphics, x: number, y: number, width: number, height: number, color: number): void {
  polygon(graphics, [[x, y - height / 2], [x + width / 2, y], [x, y + height / 2], [x - width / 2, y]], color);
}

function box(graphics: Graphics, x: number, y: number, width: number, depth: number, height: number, color: number): void {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const top: Point[] = [[x, y - height - halfDepth], [x + halfWidth, y - height], [x, y - height + halfDepth], [x - halfWidth, y - height]];
  const left: Point[] = [top[3], top[2], [x, y + halfDepth], [x - halfWidth, y]];
  const right: Point[] = [top[2], top[1], [x + halfWidth, y], [x, y + halfDepth]];
  polygon(graphics, top, shade(color, palette.faceShading.top));
  polygon(graphics, left, shade(color, palette.faceShading.left));
  polygon(graphics, right, shade(color, palette.faceShading.right));
}

function cache(key: string, create: () => Graphics): Graphics {
  const existing = graphicsCache.get(key);
  if (existing) return existing;
  const graphics = create();
  graphicsCache.set(key, graphics);
  return graphics;
}

function tree(graphics: Graphics, x: number, y: number, scale = 1): void {
  ellipse(graphics, x, y + 5 * scale, 34 * scale, 10 * scale, interaction.shadowTint, palette.interaction.shadowTintAlpha);
  graphics.roundRect(x - 8 * scale, y - 40 * scale, 16 * scale, 45 * scale, 6 * scale).fill({ color: colors.woodDark });
  ellipse(graphics, x + 8 * scale, y - 52 * scale, 35 * scale, 31 * scale, colors.leafDark);
  ellipse(graphics, x - 5 * scale, y - 61 * scale, 35 * scale, 32 * scale, colors.leaf);
}

function refrigerator(graphics: Graphics, x: number, y: number, scale = 1): void {
  const width = 108 * scale;
  const depth = 54 * scale;
  const height = 170 * scale;
  ellipse(graphics, x, y + 14 * scale, 72 * scale, 19 * scale, interaction.shadowTint, palette.interaction.shadowTintAlpha);
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const top: Point[] = [[x, y - height - halfDepth], [x + halfWidth, y - height], [x, y - height + halfDepth], [x - halfWidth, y - height]];
  const left: Point[] = [top[3], top[2], [x, y + halfDepth], [x - halfWidth, y]];
  const right: Point[] = [top[2], top[1], [x + halfWidth, y], [x, y + halfDepth]];
  polygon(graphics, top, shade(colors.mintAppliance, palette.faceShading.top));
  polygon(graphics, left, colors.mintAppliance);
  polygon(graphics, right, colors.mintApplianceDark);
  graphics.moveTo(x - halfWidth + 8 * scale, y - height / 2 - 11 * scale).lineTo(x, y - height / 2 + 16 * scale).lineTo(x + halfWidth - 8 * scale, y - height / 2 - 11 * scale).stroke({ color: colors.cream, width: 5 * scale, cap: 'round' });
  graphics.roundRect(x - 16 * scale, y - height + 35 * scale, 10 * scale, 43 * scale, 5 * scale).fill({ color: colors.steelWarm });
  graphics.roundRect(x - 18 * scale, y - height / 2 + 23 * scale, 10 * scale, 68 * scale, 5 * scale).fill({ color: colors.steelWarm });
}

/**
 * Clear all cached graphics (call when changing areas)
 */
export function clearTextureCache(): void {
  graphicsCache.forEach(graphics => graphics.destroy());
  graphicsCache.clear();
}

/**
 * Generate a world background graphics with sky and ground
 */
export function getWorldTexture(): Graphics {
  return cache('world', () => {
    const graphics = new Graphics();
    graphics.rect(0, 0, 800, 600).fill({ color: colors.skyDay });
    ellipse(graphics, 120, 92, 44, 44, colors.butter);
    ellipse(graphics, 120, 92, 30, 30, colors.cream);
    ellipse(graphics, 320, 88, 48, 16, colors.cream);
    ellipse(graphics, 355, 75, 30, 13, colors.cream);
    ellipse(graphics, 620, 125, 54, 17, colors.cream);
    polygon(graphics, [[400, 270], [720, 430], [400, 590], [80, 430]], colors.grassLight);
    polygon(graphics, [[80, 430], [400, 590], [400, 612], [80, 452]], colors.grassDark);
    polygon(graphics, [[400, 590], [720, 430], [720, 452], [400, 612]], colors.leafDark);
    polygon(graphics, [[378, 456], [422, 456], [444, 484], [408, 505], [430, 531], [397, 550], [418, 579], [370, 579], [352, 550], [382, 528], [361, 504], [392, 483]], colors.tileWarm);
    tree(graphics, 235, 486, 1);
    tree(graphics, 585, 472, 0.88);
    ellipse(graphics, 470, 508, 27, 13, colors.leafDark);
    ellipse(graphics, 462, 502, 21, 11, colors.leaf);
    return graphics;
  });
}

/**
 * Generate a house sprite graphics (isometric-style)
 */
export function getHouseTexture(): Graphics {
  return cache('house', () => {
    const graphics = new Graphics();
    ellipse(graphics, 0, 92, 136, 26, interaction.shadowTint, palette.interaction.shadowTintAlpha);
    box(graphics, 0, 76, 150, 76, 88, colors.cream);
    polygon(graphics, [[-87, -11], [0, -91], [87, -11], [0, 29]], colors.coral);
    polygon(graphics, [[0, -91], [42, -112], [130, -31], [87, -11]], colors.terracotta);
    polygon(graphics, [[-87, -11], [0, -91], [42, -112], [-45, -31]], colors.peach);
    graphics.roundRect(-26, 12, 52, 68, 10).fill({ color: colors.coral });
    graphics.roundRect(-17, 20, 34, 52, 7).fill({ color: colors.terracotta });
    graphics.circle(14, 51, 5).fill({ color: colors.butter });
    for (const x of [-55, 32]) {
      graphics.roundRect(x, 17, 27, 31, 5).fill({ color: colors.cream });
      graphics.roundRect(x + 4, 21, 19, 23, 3).fill({ color: colors.glass });
      graphics.moveTo(x + 13.5, 21).lineTo(x + 13.5, 44).stroke({ color: colors.cream, width: 2 });
      graphics.moveTo(x + 4, 32.5).lineTo(x + 23, 32.5).stroke({ color: colors.cream, width: 2 });
    }
    return graphics;
  });
}

/**
 * Generate a kitchen sprite graphics (isometric-style)
 */
export function getKitchenTexture(): Graphics {
  return cache('kitchen', () => {
    const graphics = new Graphics();
    polygon(graphics, [[0, -60], [205, 43], [0, 146], [-205, 43]], colors.tileWarm);
    diamond(graphics, -90, 45, 80, 40, colors.cream);
    diamond(graphics, 0, 89, 80, 40, colors.cream);
    diamond(graphics, 90, 45, 80, 40, colors.cream);
    box(graphics, -90, 35, 150, 74, 68, colors.woodHoney);
    diamond(graphics, -90, -34, 52, 26, colors.steelWarm);
    graphics.arc(-90, -42, 19, Math.PI, Math.PI * 2).stroke({ color: colors.steelWarm, width: 7, cap: 'round' });
    box(graphics, 23, 25, 72, 42, 62, colors.steelWarm);
    ellipse(graphics, 9, -31, 12, 6, colors.ink);
    ellipse(graphics, 35, -18, 12, 6, colors.ink);
    for (const [x, y] of [[4, 5], [19, -2], [34, 5]]) graphics.circle(x, y, 5).fill({ color: colors.coral });
    graphics.roundRect(-146, -130, 95, 54, 8).fill({ color: colors.cream });
    graphics.moveTo(-98, -130).lineTo(-98, -76).stroke({ color: colors.wallInteriorShade, width: 2 });
    graphics.circle(-108, -102, 3).fill({ color: colors.woodDark });
    graphics.circle(-88, -102, 3).fill({ color: colors.woodDark });
    refrigerator(graphics, 102, 37, 0.76);
    return graphics;
  });
}

/**
 * Generate a refrigerator sprite graphics (isometric-style)
 */
export function getRefrigeratorTexture(): Graphics {
  return cache('refrigerator', () => {
    const graphics = new Graphics();
    refrigerator(graphics, 0, 85, 1.18);
    return graphics;
  });
}

/**
 * Generate a background graphics for house interior
 */
export function getHouseInteriorTexture(): Graphics {
  return cache('house-interior', () => {
    const graphics = new Graphics();
    graphics.rect(0, 0, 800, 600).fill({ color: colors.cream });
    polygon(graphics, [[400, 300], [650, 425], [400, 550], [150, 425]], colors.woodHoney);
    polygon(graphics, [[150, 425], [150, 145], [400, 20], [400, 300]], colors.wallInterior);
    polygon(graphics, [[400, 300], [400, 20], [650, 145], [650, 425]], colors.wallInteriorShade);
    polygon(graphics, [[235, 235], [300, 203], [300, 130], [235, 163]], colors.cream);
    polygon(graphics, [[241, 231], [294, 204], [294, 138], [241, 165]], colors.glass);
    polygon(graphics, [[300, 300], [385, 343], [400, 335], [315, 292]], colors.butter, 0.5);
    ellipse(graphics, 330, 424, 104, 40, colors.peach);
    ellipse(graphics, 330, 424, 81, 31, colors.cream, 0.7);
    box(graphics, 300, 397, 130, 64, 58, colors.peach);
    graphics.roundRect(218, 345, 30, 52, 14).fill({ color: colors.peach });
    graphics.roundRect(348, 379, 30, 52, 14).fill({ color: colors.coral });
    ellipse(graphics, 271, 365, 23, 12, colors.blushPink);
    ellipse(graphics, 308, 383, 23, 12, colors.blushPink);
    ellipse(graphics, 345, 427, 38, 14, interaction.shadowTint, palette.interaction.shadowTintAlpha);
    ellipse(graphics, 345, 400, 35, 18, colors.woodHoney);
    graphics.roundRect(413, 240, 42, 110, 10).fill({ color: colors.woodMid });
    graphics.roundRect(419, 248, 30, 93, 7).fill({ color: colors.butter });
    polygon(graphics, [[500, 390], [580, 430], [500, 470], [420, 430]], colors.tileWarm);
    refrigerator(graphics, 545, 377, 0.42);
    return graphics;
  });
}

/**
 * Generate a background graphics for kitchen interior
 */
export function getKitchenInteriorTexture(): Graphics {
  return cache('kitchen-interior', () => {
    const graphics = new Graphics();
    graphics.rect(0, 0, 800, 600).fill({ color: colors.cream });
    polygon(graphics, [[400, 280], [650, 405], [400, 530], [150, 405]], colors.tileWarm);
    for (const [x, y] of [[400, 343], [275, 405], [400, 468], [525, 405]]) diamond(graphics, x, y, 125, 62, colors.cream);
    polygon(graphics, [[150, 405], [150, 125], [400, 0], [400, 280]], colors.wallInterior);
    polygon(graphics, [[400, 280], [400, 0], [650, 125], [650, 405]], colors.wallInteriorShade);
    polygon(graphics, [[215, 235], [290, 197], [290, 117], [215, 155]], colors.cream);
    polygon(graphics, [[222, 230], [284, 199], [284, 125], [222, 156]], colors.glass);
    ellipse(graphics, 343, 438, 108, 39, colors.butter, 0.4);
    box(graphics, 300, 395, 160, 76, 70, colors.woodHoney);
    diamond(graphics, 300, 325, 54, 27, colors.steelWarm);
    graphics.arc(300, 317, 19, Math.PI, Math.PI * 2).stroke({ color: colors.steelWarm, width: 7, cap: 'round' });
    box(graphics, 457, 366, 78, 42, 68, colors.steelWarm);
    ellipse(graphics, 443, 306, 13, 6, colors.ink);
    ellipse(graphics, 470, 319, 13, 6, colors.ink);
    for (const [x, y] of [[440, 344], [456, 336], [472, 344]]) graphics.circle(x, y, 5).fill({ color: colors.coral });
    graphics.roundRect(245, 154, 96, 54, 8).fill({ color: colors.cream });
    graphics.moveTo(293, 154).lineTo(293, 208).stroke({ color: colors.wallInteriorShade, width: 2 });
    graphics.circle(283, 181, 3).fill({ color: colors.woodDark });
    graphics.circle(303, 181, 3).fill({ color: colors.woodDark });
    return graphics;
  });
}
