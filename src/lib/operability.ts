import { tv } from './tokens';

/** Positions of the colour stops on the operability scale (%). Colours come from tokens. */
const STOPS = [0, 30, 50, 70, 85, 93, 96, 98, 100];

/**
 * Background and text colour for an operability value, blended between the two
 * nearest stops so the heatmap reads as a smooth scale, as in the designs.
 * Uses color-mix on CSS variables, so it re-themes without re-rendering.
 */
export function operabilityColours(value: number) {
  const v = Math.max(0, Math.min(100, value));
  let i = STOPS.findIndex((s, idx) => v >= s && v <= STOPS[idx + 1]);
  if (i === -1) i = STOPS.length - 2;
  const [a, b] = [STOPS[i], STOPS[i + 1]];
  const t = (v - a) / (b - a);
  const pct = Math.round(t * 100);
  return {
    background: `color-mix(in oklab, ${tv(`color.data.operability.${b}.bg`)} ${pct}%, ${tv(`color.data.operability.${a}.bg`)})`,
    color: tv(`color.data.operability.${t >= 0.5 ? b : a}.on`),
  };
}

export const OPERABILITY_BANDS = [
  { key: '95', label: '≥ 95%', min: 95, max: Infinity },
  { key: '70', label: '70 – 95%', min: 70, max: 95 },
  { key: '50', label: '50 – 70%', min: 50, max: 70 },
  { key: '30', label: '30 – 50%', min: 30, max: 50 },
  { key: '0', label: '< 30%', min: -Infinity, max: 30 },
] as const;

export const bandOf = (value: number) => OPERABILITY_BANDS.find((b) => value >= b.min && value < b.max)!;
