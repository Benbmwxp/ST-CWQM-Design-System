import { tv } from './tokens';

/** Shared Recharts styling, read from tokens so charts follow the active theme. */
export const chartTheme = {
  grid: { stroke: tv('color.data.grid'), strokeDasharray: '3 4' },
  axis: {
    tick: { fill: tv('color.data.axis'), fontSize: 12 },
    stroke: tv('color.line.default'),
    tickLine: false,
  },
  axisLabel: { fill: tv('color.data.axis'), fontSize: 12 },
  valueLabel: { fill: tv('color.content.default'), fontSize: 12, fontWeight: 600 },
  cursor: { stroke: tv('color.line.strong'), strokeDasharray: '4 4' },
  font: tv('font.sans'),
} as const;
