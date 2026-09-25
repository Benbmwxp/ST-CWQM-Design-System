import type { ReactNode } from 'react';
import { chartTheme } from '../../lib/chartTheme';
import { ChartTooltip } from '../../molecules/ChartTooltip/ChartTooltip';
import { LegendItem } from '../../molecules/LegendItem/LegendItem';

export interface SeriesDef {
  key: string;
  label: string;
  colour: string;
  format?: (v: number) => string;
}

/** X-axis tick that supports two-line labels ("30 Aug\n00:00"). */
export function MultiLineTick(props: { x?: number; y?: number; payload?: { value: string }; format?: (v: string) => string }) {
  const { x = 0, y = 0, payload, format } = props;
  const raw = String(payload?.value ?? '');
  const lines = (format ? format(raw) : raw).split('\n');
  return (
    <text x={x} y={y + 14} textAnchor="middle" fill={chartTheme.axis.tick.fill} fontSize={12}>
      {lines.map((l, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : 16}>{l}</tspan>)}
    </text>
  );
}

type TooltipPayload = readonly { dataKey?: unknown; value?: unknown }[];

export function tooltipRenderer(series: SeriesDef[]) {
  return ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload; label?: string | number }) => {
    if (!active || !payload?.length) return null;
    const rows = payload
      .map((p) => {
        const s = series.find((x) => x.key === p.dataKey);
        if (!s || typeof p.value !== 'number') return null;
        return { label: s.label, value: s.format ? s.format(p.value) : p.value, colour: s.colour };
      })
      .filter(Boolean) as { label: string; value: ReactNode; colour: string }[];
    return <ChartTooltip title={String(label ?? '').replace('\n', ' ')} rows={rows} />;
  };
}

export function ChartLegend({ series, shape = 'dot' }: { series: SeriesDef[]; shape?: 'dot' | 'line' | 'square' }) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-lg gap-y-2xs pt-sm">
      {series.map((s) => <li key={s.key}><LegendItem colour={s.colour} label={s.label} shape={shape} /></li>)}
    </ul>
  );
}

/** Wraps every chart: an accessible name and a text summary for screen readers. */
export function ChartFigure({ label, summary, children, className }: { label: string; summary?: string; children: ReactNode; className?: string }) {
  return (
    <figure aria-label={label} className={className}>
      {children}
      {summary && <figcaption className="sr-only">{summary}</figcaption>}
    </figure>
  );
}
