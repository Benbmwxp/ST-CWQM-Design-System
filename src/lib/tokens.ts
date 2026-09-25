/**
 * CSS variable for a token path, for places Tailwind classes can't reach
 * (chart strokes, inline styles). Theme-aware: the value follows data-theme.
 *   tv('color.data.param.ph') -> 'var(--st-color-data-param-ph)'
 */
export const tv = (path: string) => `var(--st-${path.split('.').join('-')})`;

export const PARAMETERS = [
  { key: 'Ammonia_NH3', token: 'ammonia-nh3' },
  { key: 'Ammonium_NH4', token: 'ammonium-nh4' },
  { key: 'ODO_mgL', token: 'odo-mgl' },
  { key: 'ODO_Sat', token: 'odo-sat' },
  { key: 'pH', token: 'ph' },
  { key: 'SpConductivity_us', token: 'spconductivity' },
  { key: 'Temperature', token: 'temperature' },
  { key: 'Turbidity', token: 'turbidity' },
] as const;

export type ParameterKey = (typeof PARAMETERS)[number]['key'];

/** Each parameter keeps one colour across every chart, with a light and dark shade. */
export const parameterColour = (key: string) => {
  const p = PARAMETERS.find((x) => x.key === key);
  return p ? tv(`color.data.param.${p.token}`) : tv('color.content.muted');
};

export type Tone = 'blue' | 'red' | 'teal' | 'orange' | 'green' | 'pink' | 'purple' | 'navy';
