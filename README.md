# POC Hierarchical Navigation Gamified

A workspace of proofs-of-concept for a gamified hierarchical navigation system. The repo is structured as a TypeScript monorepo and shares a single canonical asset catalog between 2D and 3D backends.

## Asset pipeline

The shared asset pipeline lives in [`packages/assets`](./packages/assets) and produces the artifacts consumed by every POC.

| Command | Description |
| --- | --- |
| `npm run assets:build` | Compile and generate 2D/3D artifacts from the shared catalog. |
| `npm run assets:validate` | Verify the built manifest, GLB files, 2D artifacts and no primitive geometry in `poc-5-3d/src/components/props`. |
| `npm run assets:clean` | Remove generated `dist/` folders. |

## Adding an asset

1. Add the asset entry to [`packages/assets/src/catalog.ts`](./packages/assets/src/catalog.ts).
2. Drop a `packages/assets/sources/3d/<id>.glb` file for 3D consumers.
3. Add or reuse `packages/assets/sources/2d/<id>.svg` for 2D scenes; other 2D illustrations are generated procedurally.
4. Run `npm run assets:build` to generate artifacts.
5. Run `npm run assets:validate` to check the pipeline.
6. Import `get2dAssetPaths` or `get3dAssetPath` from `@poc-hierarchical/assets` in the target POC and render it.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full technical overview.
