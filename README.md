# CWQM design system

React + Tailwind CSS v4 + Recharts + Storybook 10 component library for the Severn Trent CWQM dashboards. Colours were sampled from the light and dark dashboard designs, and each theme is kept in its own token file.

## Getting started

```bash
npm install
npm run test:install     # one-off: downloads Chromium for the tests
npm run storybook        # builds tokens, opens Storybook on http://localhost:6006
```

## Commands

| Command | What it does |
|---|---|
| `npm run storybook` | Builds tokens and starts Storybook |
| `npm run tokens` | Rebuilds CSS variables and the Tailwind theme from `tokens/` |
| `npm run check` | Tokens, type check, atomic layer check and class check |
| `npm test` | Runs every story as a test in headless Chromium, with accessibility checks |
| `npm run test:watch` | Same, re-running as you edit |
| `npm run test:coverage` | Tests plus a coverage report in `coverage/` (open `coverage/index.html`) |
| `npm run build-storybook` | Checks, then builds the static Storybook in `storybook-static/` |
| `npm run build:lib` | Builds the publishable package into `dist/` (JS, one CSS file, types, tokens) |
| `npm run ci` | Everything a pipeline should run: checks, tests, then the build |

Tests can also be run from the testing widget in the Storybook sidebar.

### If Chromium can't be downloaded

On a network that blocks the Playwright download, either set your proxy before `npm run test:install`
(`export HTTPS_PROXY=http://your-proxy:port`), or point the tests at an approved Chrome:

```bash
export CHROMIUM_PATH="/path/to/chrome"
npm test
```

### In CI

```bash
npm ci
npx playwright install --with-deps chromium
npm run ci
```

## Using the package in an app

```bash
npm install @severn-trent/cwqm-design-system
```

```tsx
import '@severn-trent/cwqm-design-system/styles.css'; // once, at the app root
import { KpiTile, DeltaIndicator, icons } from '@severn-trent/cwqm-design-system';

export function Operability() {
  return (
    <div data-theme="light"> {/* or "dark" */}
      <KpiTile icon={<icons.data.operability />} tone="green" label="Operability" value="98.31%"
        detail={<DeltaIndicator value={0.91} comparison="vs previous day" />} />
    </div>
  );
}
```

- Works with React 18 and 19. React is a peer dependency; everything else installs automatically.
- The font loads by itself; the app's bundler emits the font files, and browsers download only the subsets they need.
- Apps using Tailwind v4 can reuse the theme: `@import "@severn-trent/cwqm-design-system/tokens.css";` and `@import "@severn-trent/cwqm-design-system/tailwind-theme.css";`.
- Raw token values are also available as JSON: `@severn-trent/cwqm-design-system/tokens.json`.

## Publishing a release

Publish to a **private** registry only (GitHub Packages, Azure Artifacts or your company registry). Never publish to public npm: the package contains Severn Trent design work. `publishConfig.access` is set to `restricted` as a safeguard.

One-off setup:

```bash
cp .npmrc.example .npmrc      # then put your registry URL in it
export NPM_TOKEN=...          # from your registry; never commit it
```

Each release:

```bash
npm run ci                    # must pass
npm version minor             # patch = fixes, minor = new components, major = breaking changes
npm publish                   # runs build:lib first, then uploads dist/
git push --follow-tags
```

Check what will be uploaded at any time with `npm pack --dry-run`.

## Structure

```
tokens/
  core/core.json        spacing, radius, font, type scale (shared)
  themes/light.json     all light-theme colours and shadows
  themes/dark.json      same names, dark values
scripts/
  build-tokens.mjs      tokens -> CSS variables, Tailwind theme, docs data
  check-layers.mjs      enforces the atomic import rules
src/
  atoms/ molecules/ organisms/ templates/ pages/   see ARCHITECTURE.md
  organisms/charts/     the only place that imports Recharts
  lib/                  cn(), token helpers, operability colour scale, chart theme
  foundations/          Colour, Typography, Spacing docs pages
  styles/               Tailwind entry and generated token CSS
```

## Using tokens

- In markup, use semantic Tailwind classes: `bg-surface-default`, `text-content-accent`, `border-line-default`, `bg-action-primary`, `text-feedback-negative`.
- Where classes can't reach (chart colours, inline styles), use `tv('color.data.param.ph')`, which returns the CSS variable.
- Each parameter has a fixed colour: `parameterColour('Ammonia_NH3')`.
- Heatmap and operability colours: `operabilityColours(value)` blends between the scale stops and picks readable text.
- Tailwind's default palette is off (apart from white and black), so only token colours can be used.
- Spacing tokens are named `3xs`–`3xl`, so use them for padding, margin and gaps (`p-md`, `gap-sm`). Don't use those names for widths or heights: Tailwind would read `max-w-md` as 16px. Use `max-w-[28rem]`, `w-72` and so on. `npm run lint:classes` checks this.
- Icons come from Lucide and are listed by meaning in `src/lib/icons.ts` (see Foundations → Icons).

## Decisions

- Chart library: Recharts (MIT). Wrapped in `organisms/charts/`, so it can be swapped.
- Font: Plus Jakarta Sans (SIL Open Font License), the closest free match to the designs. Change `font.sans` in `tokens/core/core.json` to use another.
- Colours follow the designs, including the red–amber–green operability scale. Heatmap values are always available as text, and deltas show good or bad by colour and direction by arrow.
- Where the mockups disagreed, navigation order, active menu item and parameter colours were standardised.
- The official Severn Trent logo is in `src/assets/severn-trent-logo.png` and is passed to the sidebar in `src/pages/shared.tsx`.
- All figures in stories and pages are sample data from the mockups.
