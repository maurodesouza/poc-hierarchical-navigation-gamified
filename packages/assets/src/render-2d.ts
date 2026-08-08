import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

interface PaletteData {
  colors: Record<string, string>;
  interaction: { shadowTint: string; shadowTintAlpha: number };
  faceShading: { top: number; left: number; right: number };
}

const distDir = dirname(fileURLToPath(import.meta.url));
const palette: PaletteData = JSON.parse(
  readFileSync(join(distDir, '../../../docs/palette.json'), 'utf-8')
);

function color(name: string): string {
  const value = palette.colors[name];
  if (!value) throw new Error(`Unknown palette color: ${name}`);
  return value;
}

function shade(base: string, factor: number): string {
  const v = Number.parseInt(base.slice(1), 16);
  const r = Math.max(0, Math.min(255, Math.round(((v >> 16) & 0xff) * factor)));
  const g = Math.max(0, Math.min(255, Math.round(((v >> 8) & 0xff) * factor)));
  const b = Math.max(0, Math.min(255, Math.round((v & 0xff) * factor)));
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function toScreen(cx: number, cy: number, x: number, y: number, z: number): [number, number] {
  return [cx + x - z, cy - y + (x + z) / 2];
}

function points(list: [number, number][]): string {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

function poly(list: [number, number][], fill: string): string {
  return `<polygon points="${points(list)}" fill="${fill}" />`;
}

function svgWrapper(width: number, height: number, content: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n${content}\n</svg>`;
}

function objectWrap(content: string): string {
  return svgWrapper(256, 256, content);
}

function isoBox(cx: number, cy: number, w: number, d: number, h: number, base: string, drawShadow = true): string {
  const hw = w / 2;
  const hd = d / 2;
  const top = shade(base, palette.faceShading.top);
  const left = shade(base, palette.faceShading.left);
  const right = shade(base, palette.faceShading.right);

  const topFace: [number, number][] = [
    toScreen(cx, cy, -hw, h, -hd),
    toScreen(cx, cy, hw, h, -hd),
    toScreen(cx, cy, hw, h, hd),
    toScreen(cx, cy, -hw, h, hd)
  ];

  const leftFace: [number, number][] = [
    toScreen(cx, cy, -hw, 0, -hd),
    toScreen(cx, cy, -hw, 0, hd),
    toScreen(cx, cy, -hw, h, hd),
    toScreen(cx, cy, -hw, h, -hd)
  ];

  const rightFace: [number, number][] = [
    toScreen(cx, cy, -hw, 0, hd),
    toScreen(cx, cy, hw, 0, hd),
    toScreen(cx, cy, hw, h, hd),
    toScreen(cx, cy, -hw, h, hd)
  ];

  const shadow = drawShadow
    ? `<ellipse cx="${cx}" cy="${cy + (w + d) / 4}" rx="${(w + d) / 3}" ry="${(w + d) / 6}" fill="${palette.interaction.shadowTint}" opacity="${palette.interaction.shadowTintAlpha}" />`
    : '';

  return `${shadow}${poly(topFace, top)}${poly(leftFace, left)}${poly(rightFace, right)}`;
}

function loadCanonicalSvg(relativePath: string): string {
  try {
    const raw = readFileSync(join(distDir, relativePath), 'utf-8');
    const start = raw.indexOf('<svg');
    return start >= 0 ? raw.slice(start) : raw;
  } catch {
    return '';
  }
}

function scene(relativePath: string): () => string {
  return () => {
    const raw = loadCanonicalSvg(relativePath);
    return raw || svgWrapper(512, 384, '');
  };
}

const renders: Record<string, () => string> = {
  world: scene('../../../poc-1-svg/src/assets/world.svg'),
  house: scene('../../../poc-1-svg/src/assets/house.svg'),
  kitchen: scene('../../../poc-1-svg/src/assets/kitchen.svg'),
  refrigerator: () =>
    loadCanonicalSvg('../../../poc-3-phaser/src/assets/objects/refrigerator.svg') ||
    objectWrap(isoBox(128, 210, 90, 70, 130, color('mintAppliance'))),

  stove: () =>
    objectWrap(
      isoBox(128, 210, 100, 80, 70, color('steelWarm')) +
      `<rect x="92" y="145" width="72" height="50" rx="6" fill="${color('steelWarmDark')}" />` +
      `<rect x="98" y="151" width="60" height="30" rx="4" fill="${color('glass')}" />` +
      `<circle cx="115" cy="175" r="6" fill="${color('coral')}" />` +
      `<circle cx="141" cy="175" r="6" fill="${color('coral')}" />` +
      `<circle cx="128" cy="130" r="11" fill="${color('ink')}" />` +
      `<circle cx="150" cy="135" r="11" fill="${color('ink')}" />`
    ),

  counter: () =>
    objectWrap(
      isoBox(128, 210, 140, 80, 90, color('woodHoney')) +
      `<rect x="62" y="138" width="132" height="24" rx="4" fill="${color('steelWarm')}" />` +
      `<ellipse cx="110" cy="150" rx="28" ry="10" fill="${color('steelWarmDark')}" />` +
      `<circle cx="170" cy="180" r="5" fill="${color('woodDark')}" />` +
      `<circle cx="190" cy="160" r="5" fill="${color('woodDark')}" />`
    ),

  sink: () =>
    objectWrap(
      isoBox(128, 210, 100, 70, 50, color('steelWarm')) +
      `<ellipse cx="128" cy="160" rx="30" ry="12" fill="${color('steelWarmDark')}" />` +
      `<ellipse cx="128" cy="158" rx="24" ry="9" fill="${color('glass')}" />` +
      `<path d="M 128 130 C 128 110 150 110 150 130" fill="none" stroke="${color('steelWarmDark')}" stroke-width="6" stroke-linecap="round" />`
    ),

  cabinet: () =>
    objectWrap(
      isoBox(128, 210, 100, 60, 110, color('cream')) +
      `<line x1="100" y1="150" x2="100" y2="210" stroke="${color('wallInteriorShade')}" stroke-width="2" />` +
      `<circle cx="110" cy="185" r="6" fill="${color('woodDark')}" />` +
      `<circle cx="180" cy="185" r="6" fill="${color('woodDark')}" />`
    ),

  sofa: () =>
    objectWrap(
      isoBox(128, 210, 150, 90, 60, color('peach')) +
      `<polygon points="40,170 70,155 100,170 100,200 40,200" fill="${color('blushPink')}" />` +
      `<polygon points="156,170 186,155 216,170 216,200 156,200" fill="${color('blushPink')}" />` +
      `<rect x="70" y="125" width="116" height="45" rx="10" fill="${color('peach')}" />` +
      `<rect x="75" y="130" width="106" height="30" rx="8" fill="${color('blushPink')}" />`
    ),

  'coffee-table': () =>
    objectWrap(
      isoBox(128, 210, 90, 90, 40, color('woodHoney')) +
      `<circle cx="128" cy="160" r="16" fill="${color('blushPink')}" />` +
      `<rect x="120" y="120" width="16" height="40" rx="4" fill="${color('woodDark')}" />`
    ),

  rug: () =>
    objectWrap(
      `<ellipse cx="128" cy="210" rx="100" ry="38" fill="${color('peach')}" />` +
      `<ellipse cx="128" cy="210" rx="78" ry="28" fill="none" stroke="${color('cream')}" stroke-width="6" opacity="0.7" />` +
      `<ellipse cx="128" cy="210" rx="55" ry="18" fill="${color('blushPink')}" opacity="0.5" />`
    ),

  tree: () =>
    objectWrap(
      `<rect x="118" y="120" width="20" height="90" rx="6" fill="${color('woodDark')}" />` +
      `<circle cx="110" cy="110" r="45" fill="${color('leafDark')}" />` +
      `<circle cx="150" cy="100" r="40" fill="${color('leaf')}" />` +
      `<circle cx="130" cy="70" r="35" fill="${color('leaf')}" />`
    ),

  path: () =>
    objectWrap(
      `<path d="M 48 200 C 80 170 120 230 150 190 C 180 150 210 210 232 180 C 252 150 268 190 256 210 C 240 235 200 235 180 215 C 160 195 120 235 90 215 C 60 195 40 235 24 210 C 16 190 40 170 48 200 Z" fill="${color('tileWarm')}" />` +
      `<path d="M 48 205 C 80 175 120 235 150 195 C 180 155 210 215 232 185 C 252 155 268 195 256 215 C 240 240 200 240 180 220 C 160 200 120 240 90 220 C 60 200 40 240 24 215 C 16 195 40 175 48 205 Z" fill="${color('cream')}" opacity="0.5" />`
    ),

  wall: () =>
    objectWrap(
      `<polygon points="60,220 220,220 220,40 60,40" fill="${color('wallInterior')}" />` +
      `<polygon points="220,220 240,230 240,50 220,40" fill="${color('wallInteriorShade')}" />` +
      `<polygon points="60,40 220,40 240,50 80,50" fill="${color('cream')}" />`
    ),

  window: () =>
    objectWrap(
      `<polygon points="70,215 210,215 210,75 70,75" fill="${color('cream')}" />` +
      `<polygon points="210,75 230,85 230,225 210,215" fill="${color('wallInteriorShade')}" />` +
      `<polygon points="70,75 210,75 230,85 90,85" fill="${color('cream')}" />` +
      `<rect x="90" y="95" width="100" height="100" rx="4" fill="${color('glass')}" />` +
      `<line x1="140" y1="95" x2="140" y2="195" stroke="${color('cream')}" stroke-width="4" />` +
      `<line x1="90" y1="145" x2="190" y2="145" stroke="${color('cream')}" stroke-width="4" />`
    ),

  ground: () =>
    objectWrap(
      `<polygon points="128,20 236,100 128,180 20,100" fill="${color('grassLight')}" />` +
      `<polygon points="20,100 128,180 128,210 20,130" fill="${color('grassDark')}" />` +
      `<polygon points="128,180 236,100 236,130 128,210" fill="${color('leafDark')}" />`
    ),

  ground_diamond: () =>
    objectWrap(
      `<polygon points="128,80 196,120 128,160 60,120" fill="${color('grassLight')}" />` +
      `<polygon points="60,120 128,160 128,180 60,140" fill="${color('grassDark')}" />` +
      `<polygon points="128,160 196,120 196,140 128,180" fill="${color('leafDark')}" />`
    ),

  path_tile: () =>
    objectWrap(
      `<polygon points="128,90 188,125 128,160 68,125" fill="${color('tileWarm')}" />` +
      `<polygon points="68,125 128,160 128,175 68,140" fill="${color('woodMid')}" />` +
      `<polygon points="128,160 188,125 188,140 128,175" fill="${color('woodDark')}" />`
    ),

  bush: () =>
    objectWrap(
      `<ellipse cx="128" cy="210" rx="70" ry="22" fill="${palette.interaction.shadowTint}" opacity="${palette.interaction.shadowTintAlpha}" />` +
      `<circle cx="100" cy="170" r="40" fill="${color('leafDark')}" />` +
      `<circle cx="150" cy="165" r="45" fill="${color('leaf')}" />` +
      `<circle cx="128" cy="130" r="38" fill="${color('leaf')}" />` +
      `<circle cx="170" cy="190" r="30" fill="${color('leafDark')}" />`
    ),

  cloud: () =>
    objectWrap(
      `<rect width="256" height="256" fill="${color('skyDay')}" />` +
      `<ellipse cx="128" cy="120" rx="80" ry="28" fill="${color('cream')}" />` +
      `<ellipse cx="90" cy="120" rx="40" ry="22" fill="${color('cream')}" />` +
      `<ellipse cx="170" cy="120" rx="45" ry="24" fill="${color('cream')}" />`
    ),

  sky_backdrop: () =>
    objectWrap(
      `<rect width="256" height="256" fill="${color('skyDay')}" />` +
      `<circle cx="40" cy="40" r="24" fill="${color('butter')}" />` +
      `<ellipse cx="180" cy="70" rx="70" ry="22" fill="${color('cream')}" />` +
      `<ellipse cx="80" cy="200" rx="60" ry="18" fill="${color('cream')}" />`
    )
};

export function generateSvg(id: string): string {
  const fn = renders[id];
  if (!fn) throw new Error(`Unknown 2D asset id: ${id}`);
  return fn();
}

export async function renderPng(svg: string, outPath: string): Promise<{ width: number; height: number }> {
  const size = svg.match(/width="(\d+)" height="(\d+)"/);
  const width = size ? Number(size[1]) : 256;
  const height = size ? Number(size[2]) : 256;
  const info = await sharp(Buffer.from(svg, 'utf-8'), { density: 300 })
    .resize(width, height, { fit: 'fill' })
    .png()
    .toFile(outPath);
  return { width: info.width ?? width, height: info.height ?? height };
}
