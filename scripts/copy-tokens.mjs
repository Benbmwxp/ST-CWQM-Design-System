// Ships the raw token outputs so apps can reuse the theme in their own Tailwind setup.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
// The CSS-only entry leaves an empty JS stub behind; it isn't part of the API.
await rm('dist/styles-entry.js', { force: true });
await rm('dist/styles-entry.js.map', { force: true });
await mkdir('dist/tokens', { recursive: true });
await cp('src/styles/tokens.css', 'dist/tokens/tokens.css');
await cp('src/styles/tailwind-theme.css', 'dist/tokens/tailwind-theme.css');
await cp('src/tokens/tokens.generated.json', 'dist/tokens/tokens.json');
console.log('Tokens copied to dist/tokens');

// Type stub so `import '@severn-trent/cwqm-design-system/styles.css'` type-checks in any TypeScript setup.
await writeFile('dist/types/css.d.ts', 'export {};\n');
