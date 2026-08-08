import { catalog } from './catalog.js';
import type { Asset } from './types.js';

export interface Asset2dPaths {
  svg: string;
  sprite: string;
}

function findAsset(id: string): Asset {
  const asset = catalog.assets.find((item) => item.id === id);
  if (!asset) {
    throw new Error(`Asset "${id}" not found in the asset catalog`);
  }
  return asset;
}

export function get2dSvgPath(id: string): string {
  return `/2d/svg/${findAsset(id).id}.svg`;
}

export function get2dSpritePath(id: string): string {
  return `/2d/sprites/${findAsset(id).id}.png`;
}

export function get2dAssetPaths(id: string): Asset2dPaths {
  const asset = findAsset(id);
  return {
    svg: `/2d/svg/${asset.id}.svg`,
    sprite: `/2d/sprites/${asset.id}.png`,
  };
}

export function get3dAssetPath(id: string): string {
  return `/3d/${findAsset(id).id}.glb`;
}
