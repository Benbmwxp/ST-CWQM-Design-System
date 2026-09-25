// Public API of @severn-trent/cwqm-design-system.
// The font is a normal dependency, so the app's bundler emits its files and browsers fetch only the subsets they need.
import '@fontsource-variable/plus-jakarta-sans';
// Styles are shipped separately: import '@severn-trent/cwqm-design-system/styles.css' once in your app.
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';

// Helpers
export { cn } from './lib/cn';
export { tv, PARAMETERS, parameterColour, type ParameterKey, type Tone } from './lib/tokens';
export { operabilityColours, OPERABILITY_BANDS, bandOf } from './lib/operability';
export { chartTheme } from './lib/chartTheme';
export { icons, type IconGroup } from './lib/icons';
