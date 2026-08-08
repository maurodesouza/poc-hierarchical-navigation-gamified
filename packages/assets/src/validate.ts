import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Ajv } from 'ajv';
import { catalog } from './catalog.js';

const baseDir = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(
  readFileSync(join(baseDir, '../src/schema.json'), 'utf-8')
);

const ajv = new Ajv({ allErrors: true, strict: true });
const validate = ajv.compile(schema);
const valid = validate(catalog);

if (!valid) {
  console.error('Manifest validation failed:');
  for (const error of validate.errors ?? []) {
    console.error(`  - ${error.instancePath || '/'}: ${error.message}`);
  }
  process.exit(1);
}

const canonicalIds = new Set([
  'world',
  'house',
  'kitchen',
  'refrigerator',
  'stove',
  'counter',
  'sink',
  'cabinet',
  'sofa',
  'coffee-table',
  'rug',
  'tree',
  'path',
  'wall',
  'window',
  'ground'
]);

const ids = new Set(catalog.assets.map((asset) => asset.id));

if (ids.size !== catalog.assets.length) {
  console.error('Duplicate asset ids detected in the manifest.');
  process.exit(1);
}

const missing = [...canonicalIds].filter((id) => !ids.has(id));
if (missing.length > 0) {
  console.error(`Missing canonical assets: ${missing.join(', ')}`);
  process.exit(1);
}

console.log(
  `Manifest is valid (${catalog.assets.length} assets, version ${catalog.version}).`
);
