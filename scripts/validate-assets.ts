import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog } from '@poc-hierarchical/assets';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'packages/assets/dist');
let hasErrors = false;

function error(message: string) {
  console.error(message);
  hasErrors = true;
}

function checkManifest() {
  const ids = catalog.assets.map((asset) => asset.id);
  const unique = new Set(ids);

  if (unique.size !== ids.length) {
    error('Duplicate asset ids detected in the catalog.');
  }

  const incomplete = catalog.assets
    .filter((asset) => !asset.id || !asset.name || !asset.boundingBox)
    .map((asset) => asset.id || '<unknown>');

  if (incomplete.length > 0) {
    error(`Incomplete catalog entries: ${incomplete.join(', ')}`);
  }
}

function checkGlbArtifacts() {
  for (const asset of catalog.assets) {
    const glbPath = join(dist, '3d', `${asset.id}.glb`);

    if (!existsSync(glbPath) || statSync(glbPath).size === 0) {
      error(`Missing or empty GLB for asset "${asset.id}" (expected 3d/${asset.id}.glb)`);
      continue;
    }

    const buffer = readFileSync(glbPath);
    const magic = buffer.toString('utf-8', 0, Math.min(4, buffer.length));

    if (magic !== 'glTF') {
      error(`Invalid GLB for asset "${asset.id}": missing glTF magic header.`);
    }
  }
}

function check2dArtifacts() {
  for (const asset of catalog.assets) {
    const svgPath = join(dist, '2d', 'svg', `${asset.id}.svg`);
    const spritePath = join(dist, '2d', 'sprites', `${asset.id}.png`);

    if (!existsSync(svgPath) || statSync(svgPath).size === 0) {
      error(`Missing or empty SVG for asset "${asset.id}" (expected 2d/svg/${asset.id}.svg)`);
    }

    if (!existsSync(spritePath) || statSync(spritePath).size === 0) {
      error(`Missing or empty PNG sprite for asset "${asset.id}" (expected 2d/sprites/${asset.id}.png)`);
    }
  }
}

function checkSpritesheet() {
  const spritesheetPath = join(dist, '2d', 'sprites', 'spritesheet.json');

  if (!existsSync(spritesheetPath) || statSync(spritesheetPath).size === 0) {
    error('Missing or empty 2D spritesheet manifest.');
  }
}

const primitiveTags = [
  'Box',
  'Sphere',
  'Cylinder',
  'Cone',
  'Torus',
  'Plane',
  'Circle',
  'Ring',
  'Dodecahedron',
  'Icosahedron',
  'Octahedron',
  'Tetrahedron',
  'Capsule',
  'Tube',
  'Lathe',
  'Extrude',
  'Shape',
  'RoundedBox',
  'boxGeometry',
  'sphereGeometry',
  'cylinderGeometry',
  'coneGeometry',
  'torusGeometry',
  'planeGeometry',
  'circleGeometry',
  'ringGeometry',
  'dodecahedronGeometry',
  'icosahedronGeometry',
  'octahedronGeometry',
  'tetrahedronGeometry',
  'capsuleGeometry',
  'tubeGeometry',
  'latheGeometry',
  'extrudeGeometry',
  'shapeGeometry',
  'roundedBoxGeometry',
];

function checkPropsPrimitiveGeometry() {
  const propsDir = join(root, 'poc-5-3d/src/components/props');

  if (!existsSync(propsDir)) {
    return;
  }

  const pattern = new RegExp(
    `<(${primitiveTags.join('|')})[\\s/>]`,
    'g'
  );

  for (const file of readdirSync(propsDir)) {
    if (!file.endsWith('.tsx')) {
      continue;
    }

    const content = readFileSync(join(propsDir, file), 'utf-8');
    const matches = [...content.matchAll(pattern)];

    for (const match of matches) {
      error(
        `Primitive geometry found in poc-5-3d/src/components/props/${file}: <${match[1]}>`
      );
    }
  }
}

checkManifest();
checkGlbArtifacts();
check2dArtifacts();
checkSpritesheet();
checkPropsPrimitiveGeometry();

if (hasErrors) {
  console.error('\nAsset validation failed.');
  process.exit(1);
}

console.log(
  `Asset validation passed for ${catalog.assets.length} canonical assets.`
);
