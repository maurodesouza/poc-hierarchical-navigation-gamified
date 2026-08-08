# Architecture

## Overview

This monorepo explores a gamified hierarchical navigation experience through a series of focused POCs. The shared infrastructure sits under `packages/` and feeds the individual POCs under `poc-*/`.

```text
poc-hierarchical-navigation-gamified
├── packages
│   ├── assets      # canonical catalog, 2D/3D build pipeline and validation
│   └── core        # shared runtime helpers
├── poc-1-svg       # SVG-based areas and objects
├── poc-2-pixi      # PixiJS sprite rendering
├── poc-3-phaser    # Phaser scene/object rendering
├── poc-4-tree      # generic tree navigation
└── poc-5-3d        # Three.js / React Three Fiber GLB rendering
```

## Asset catalog

The catalog in `packages/assets/src/catalog.ts` is the single source of truth for every canonical asset. It declares the asset `id`, `name`, `tags`, `boundingBox`, `scale` and source metadata. The catalog is validated against `packages/assets/src/schema.json` when it is compiled.

## Asset workflow

### 1. Author or update the catalog

Add an entry to `packages/assets/src/catalog.ts` with the expected metadata.

### 2. Provide 3D source files

Place the GLB for the asset in `packages/assets/sources/3d/<id>.glb`. The build pipeline copies each GLB to `packages/assets/dist/3d/<id>.glb`. Any extra `.glb` files in `sources/3d/` are copied as well.

### 3. Provide 2D source artwork (optional)

For scene assets that have existing canonical illustrations, place an SVG in `packages/assets/sources/2d/<id>.svg`. All other assets receive procedurally generated SVG and PNG sprites from `packages/assets/src/render-2d.ts`.

### 4. Build

Run:

```bash
npm run assets:build
```

This compiles `packages/assets`, copies or renders the 2D/3D artifacts and writes `packages/assets/dist/2d/manifest.json` plus `packages/assets/dist/2d/sprites/spritesheet.json`.

### 5. Validate

Run:

```bash
npm run assets:validate
```

The validation script `scripts/validate-assets.ts` performs the following checks:

- **Manifest completeness**: every catalog entry has a unique `id`, `name` and `boundingBox`.
- **GLB validity**: every catalog asset has a `3d/<id>.glb` file that starts with the `glTF` magic header.
- **2D artifact presence**: every catalog asset has a `2d/svg/<id>.svg` and `2d/sprites/<id>.png`.
- **Spritesheet**: `2d/sprites/spritesheet.json` exists and is not empty.
- **No primitive geometry in `poc-5-3d/src/components/props`**: if the `props` directory exists, any TSX file that uses common Three.js primitive tags (e.g. `<Box>`, `<boxGeometry>`, `<Sphere>`) causes the validator to fail, ensuring props are authored as GLB-based assets.

### 6. Consume the asset in a POC

Import the manifest helpers from `@poc-hierarchical/assets`:

```ts
import { get2dAssetPaths, get3dAssetPath } from '@poc-hierarchical/assets';

const svg = get2dSvgPath('house');
const glb = get3dAssetPath('refrigerator');
```

## Continuous integration

The `.github/workflows/assets.yml` workflow runs on every pull request to `main`. It installs dependencies, executes `npm run assets:build` and then `npm run assets:validate` so the pipeline is exercised before a PR is merged.
