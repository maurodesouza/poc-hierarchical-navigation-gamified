# @poc-hierarchical/assets

Canonical asset catalog and backend build pipeline for the hierarchical navigation POCs.

## Catalog

The catalog is the single source of truth for every canonical asset. It lives in [`src/catalog.ts`](./src/catalog.ts) and is validated against [`src/schema.json`](./src/schema.json) by `npm run validate`.

## Build pipeline

The asset build pipeline transforms canonical source files into backend-specific artifacts under `dist/`.

### Source layout

Place source assets in `sources/`:

```text
packages/assets/sources/
├── 3d/
│   └── <asset-id>.glb
├── 2d/
│   ├── svg/
│   │   └── <asset-id>.svg
│   └── sprites/
│       └── <asset-id>.png
```

For each catalog entry, the pipeline looks for files named after the asset `id`:

- `sources/3d/<id>.glb` -> `dist/3d/<id>.glb`
- `sources/2d/svg/<id>.svg` -> `dist/2d/svg/<id>.svg`
- `sources/2d/sprites/<id>.png` -> `dist/2d/sprites/<id>.png`

Any additional files found in the source directories are also copied to the matching backend output directory.

### Spritesheet

`dist/2d/sprites/spritesheet.json` is generated automatically with one entry per copied sprite. The frame data is a placeholder (`w: 0`, `h: 0`) because the pipeline does not pack the sprites yet; it provides the manifest consumers need to build a real spritesheet later.

### Missing assets

If a source file is missing for a catalog asset, the build emits a warning but continues and exits successfully. This lets the pipeline be wired and run before all source assets have been authored.

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Compile the package TypeScript sources. |
| `npm run build:assets` | Compile and run the asset build pipeline. |
| `npm run clean` | Remove `dist/`. |
| `npm run validate` | Validate the catalog against the JSON schema. |

From the repository root:

| Script | Description |
| --- | --- |
| `npm run assets:build` | Build the asset pipeline artifacts. |
| `npm run assets:clean` | Clean the asset pipeline artifacts. |
