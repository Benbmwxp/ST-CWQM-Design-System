// Builds the publishable library into dist/ (JS + one CSS file).
// Storybook, pages and docs are not included in the package.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json' with { type: 'json' };

const external = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
  'react/jsx-runtime',
];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: { index: 'src/index.ts', 'styles-entry': 'src/styles-entry.ts' },
      formats: ['es'],
    },
    rolldownOptions: {
      external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: { assetFileNames: (info) => (info.names?.[0]?.endsWith('.css') ? 'styles.css' : 'assets/[name]-[hash][extname]') },
    },
  },
});
