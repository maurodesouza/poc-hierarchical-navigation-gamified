import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog } from './catalog.js';
import { generateSvg, renderPng } from './render-2d.js';

const distDir = dirname(fileURLToPath(import.meta.url));
const sourcesDir = join(dirname(distDir), 'sources');

const out3d = join(distDir, '3d');
const outSvg = join(distDir, '2d', 'svg');
const outSprites = join(distDir, '2d', 'sprites');

const sourcePaths = {
  glb: join(sourcesDir, '3d')
} as const;

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

async function build(): Promise<void> {
  ensureDir(out3d);
  ensureDir(outSvg);
  ensureDir(outSprites);

  const missing: string[] = [];
  const frames: Record<string, unknown> = {};

  for (const asset of catalog.assets) {
    const { id } = asset;

    const glbSource = join(sourcePaths.glb, `${id}.glb`);
    if (copySource(glbSource, join(out3d, `${id}.glb`), '3d')) {
      asset.glb = { ...asset.glb, generated: true, path: `3d/${id}.glb` };
    } else {
      missing.push(id);
    }

    const svg = generateSvg(id);
    const svgDest = join(outSvg, `${id}.svg`);
    writeFileSync(svgDest, svg);
    asset.svg = {
      ...asset.svg,
      generated: true,
      path: `2d/svg/${id}.svg`,
      generator: 'render-2d'
    };

    const pngDest = join(outSprites, `${id}.png`);
    const info = await renderPng(svg, pngDest);
    asset.sprite = {
      ...asset.sprite,
      generated: true,
      path: `2d/sprites/${id}.png`,
      generator: 'render-2d'
    };
    frames[id] = {
      filename: `${id}.png`,
      frame: { x: 0, y: 0, w: info.width, h: info.height },
      sourceSize: { w: info.width, h: info.height },
      pivot: { x: 0.5, y: 0.5 }
    };
  }

  for (const file of collectExtraFiles(sourcePaths.glb, '.glb')) {
    const dest = join(out3d, file);
    const src = join(sourcePaths.glb, file);
    if (!existsSync(dest)) {
      copyFileSync(src, dest);
      console.log(`  extra 3d: ${dest}`);
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

  if (missing.length > 0) {
    console.warn(
      `\nMissing 3D sources for ${missing.length} asset(s): ${missing.join(', ')}`
    );
  }

  console.log(
    `\nAsset build complete: ${catalog.assets.length} asset(s) processed.`
  );
}

build().catch((err) => {
  console.error('Asset build failed:', err);
  process.exit(1);
});
