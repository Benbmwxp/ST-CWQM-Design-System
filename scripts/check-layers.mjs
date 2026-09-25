// Enforces the atomic design hierarchy: each level may import only from the
// levels below it. Organisms are the one exception - an organism may contain
// another organism (for example a panel card holding a data table).
// Shared code in lib/, styles/ and tokens/ can be imported from any level.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../src');
const LEVELS = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
const SAME_LEVEL_ALLOWED = new Set(['organisms', 'pages']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|mdx)$/.test(entry.name)) yield full;
  }
}

const levelOf = (file) => LEVELS.indexOf(path.relative(ROOT, file).split(path.sep)[0]);
const componentOf = (file) => path.relative(ROOT, file).split(path.sep).slice(0, 2).join('/');

const problems = [];
for (const level of LEVELS) {
  const dir = path.join(ROOT, level);
  try { await readdir(dir); } catch { continue; }
  for await (const file of walk(dir)) {
    // A level's index.ts only re-exports its own components - always allowed.
    if (path.relative(ROOT, file) === path.join(level, 'index.ts')) continue;
    const source = await readFile(file, 'utf8');
    for (const [, spec] of source.matchAll(/(?:from|import)\s+['"](\.[^'"]+)['"]/g)) {
      const target = path.resolve(path.dirname(file), spec);
      const from = levelOf(file);
      const to = levelOf(target);
      if (to === -1) {
        if (path.relative(ROOT, target).startsWith('foundations')) {
          problems.push(`${path.relative(ROOT, file)} imports docs-only code from foundations/`);
        }
        continue;
      }
      if (componentOf(file) === componentOf(target)) continue; // same component folder
      // Stories may demo a component alongside others from its own level, never from above.
      const isStory = file.endsWith('.stories.tsx');
      if (to > from || (to === from && !SAME_LEVEL_ALLOWED.has(LEVELS[from]) && !isStory)) {
        problems.push(`${path.relative(ROOT, file)}: ${LEVELS[from]} cannot import from ${LEVELS[to]} (${spec})`);
      }
    }
  }
}

if (problems.length) {
  console.error('Atomic layer violations:\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log('Atomic layers OK');
