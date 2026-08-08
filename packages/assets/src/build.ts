import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync
} from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog } from './catalog.js';

const distDir = dirname(fileURLToPath(import.meta.url));
const sourcesDir = join(dirname(distDir), 'sources');

const out3d = join(distDir, '3d');
const outSvg = join(distDir, '2d', 'svg');
const outSprites = join(distDir, '2d', 'sprites');

const sourcePaths = {
  glb: join(sourcesDir, '3d'),
  svg: join(sourcesDir, '2d', 'svg'),
  png: join(sourcesDir, '2d', 'sprites')
} as const;

type BackendType = keyof typeof sourcePaths;

function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

function copySource(source: string, dest: string, label: string): boolean {
  if (!existsSync(source)) {
    return false;
  }
  copyFileSync(source, dest);
  console.log(`  ${label}: ${dest}`);
  return true;
}

function collectExtraFiles(dir: string, ext: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }
  return readdirSync(dir).filter((file) => file.toLowerCase().endsWith(ext));
}

function build(): void {
  ensureDir(out3d);
  ensureDir(outSvg);
  ensureDir(outSprites);

  const missing: Record<BackendType, string[]> = {
    glb: [],
    svg: [],
    png: []
  };

  const frames: Record<string, unknown> = {};

  for (const asset of catalog.assets) {
    const { id } = asset;

    const glbSource = join(sourcePaths.glb, `${id}.glb`);
    if (copySource(glbSource, join(out3d, `${id}.glb`), '3d')) {
      asset.glb = { ...asset.glb, generated: true, path: `3d/${id}.glb` };
    } else {
      missing.glb.push(id);
    }

    const svgSource = join(sourcePaths.svg, `${id}.svg`);
    if (copySource(svgSource, join(outSvg, `${id}.svg`), 'svg')) {
      asset.svg = { ...asset.svg, generated: true, path: `2d/svg/${id}.svg` };
    } else {
      missing.svg.push(id);
    }

    const pngSource = join(sourcePaths.png, `${id}.png`);
    if (copySource(pngSource, join(outSprites, `${id}.png`), 'sprite')) {
      asset.sprite = { ...asset.sprite, generated: true, path: `2d/sprites/${id}.png` };
      frames[id] = {
        filename: `${id}.png`,
        frame: { x: 0, y: 0, w: 0, h: 0 },
        sourceSize: { w: 0, h: 0 },
        pivot: { x: 0.5, y: 0.5 }
      };
    } else {
      missing.png.push(id);
    }
  }

  for (const file of collectExtraFiles(sourcePaths.glb, '.glb')) {
    const dest = join(out3d, file);
    const src = join(sourcePaths.glb, file);
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
      console.log(`  extra 3d: ${dest}`);
    }
  }

  for (const file of collectExtraFiles(sourcePaths.svg, '.svg')) {
    const dest = join(outSvg, file);
    const src = join(sourcePaths.svg, file);
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
      console.log(`  extra svg: ${dest}`);
    }
  }

  for (const file of collectExtraFiles(sourcePaths.png, '.png')) {
    const dest = join(outSprites, file);
    const src = join(sourcePaths.png, file);
    const id = parse(file).name;
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
      console.log(`  extra sprite: ${dest}`);
      frames[id] = {
        filename: file,
        frame: { x: 0, y: 0, w: 0, h: 0 },
        sourceSize: { w: 0, h: 0 },
        pivot: { x: 0.5, y: 0.5 }
      };
    }
  }

  const spritesheet = {
    meta: {
      image: 'spritesheet.png',
      size: { w: 0, h: 0 },
      scale: 1,
      generatedAt: new Date().toISOString()
    },
    frames
  };

  writeFileSync(
    join(outSprites, 'spritesheet.json'),
    JSON.stringify(spritesheet, null, 2)
  );

  const warnings: string[] = [];
  if (missing.glb.length > 0) {
    warnings.push(`Missing 3D sources for ${missing.glb.length} asset(s): ${missing.glb.join(', ')}`);
  }
  if (missing.svg.length > 0) {
    warnings.push(`Missing SVG sources for ${missing.svg.length} asset(s): ${missing.svg.join(', ')}`);
  }
  if (missing.png.length > 0) {
    warnings.push(`Missing sprite sources for ${missing.png.length} asset(s): ${missing.png.join(', ')}`);
  }

  if (warnings.length > 0) {
    console.warn('\nWarnings:');
    for (const warning of warnings) {
      console.warn(`  - ${warning}`);
    }
  }

  console.log(
    `\nAsset build complete: ${catalog.assets.length} asset(s) processed, ${Object.values(missing).flat().length} missing source(s).`
  );
}

build();
