export interface AssetSource {
  type: 'canonical' | 'procedural' | 'external';
  path?: string;
  generator?: string;
}

export interface AssetBackendOutput {
  path?: string;
  generated?: boolean;
  generator?: string;
}

export interface AssetBoundingBox {
  width: number;
  height: number;
  depth: number;
}

export interface AssetHotspot {
  id: string;
  x: number;
  y: number;
  z?: number;
  label?: string;
  target?: string;
}

export interface AssetMaterial {
  id: string;
  name?: string;
  color?: string;
}

export interface Asset {
  id: string;
  name: string;
  tags: string[];
  source: AssetSource;
  glb: AssetBackendOutput;
  svg: AssetBackendOutput;
  sprite: AssetBackendOutput;
  boundingBox: AssetBoundingBox;
  hotspots: AssetHotspot[];
  materials: AssetMaterial[];
  scale: number;
}

export interface AssetCatalog {
  version: string;
  generatedAt?: string;
  assets: Asset[];
}
