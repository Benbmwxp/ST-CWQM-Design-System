// Our spacing tokens are named 3xs…3xl. Tailwind v4 resolves sizing classes such
// as max-w-md or w-xl to those spacing tokens (16px, 24px…), not to its container
// widths - which silently squashes components. Use a real size instead:
// max-w-[28rem], w-72, basis-44.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../src');
const BAD = /(?<![\w-])-?(max-w|min-w|w|h|max-h|min-h|basis|size)-(3xs|2xs|xs|sm|md|lg|xl|2xl|3xl)(?![\w-])/g;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|mdx)$/.test(e.name)) yield full;
  }
}

const problems = [];
for await (const file of walk(ROOT)) {
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(BAD)) problems.push(`${path.relative(ROOT, file)}:${i + 1}  ${m[0]}`);
  });
}
if (problems.length) {
  console.error('Sizing classes that resolve to spacing tokens (use e.g. max-w-[28rem] instead):\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log('Class check OK');
