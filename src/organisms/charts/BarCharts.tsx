import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { chartTheme } from '../../lib/chartTheme';
import { ChartFigure, ChartLegend, MultiLineTick, tooltipRenderer, type SeriesDef } from './shared';

export interface GroupedBarChartProps {
  label: string;
  summary?: string;
  data: Record<string, string | number>[];
  xKey: string;
  series: SeriesDef[];
  yLabel: string;
  yDomain?: [number, number];
  yTicks?: number[];
  showValues?: boolean;
  height?: number;
}

/** Several bars per category - one per parameter. Used for available vs expected readings. */
export function GroupedBarChart({ label, summary, data, xKey, series, yLabel, yDomain, yTicks, showValues = true, height = 280 }: GroupedBarChartProps) {
  return (
    <ChartFigure label={label} summary={summary}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, bottom: 0, left: 0 }} barCategoryGap="18%" barGap={1} style={{ fontFamily: chartTheme.font }}>
            <CartesianGrid {...chartTheme.grid} vertical={false} />
            <XAxis dataKey={xKey} tick={<MultiLineTick />} tickLine={false} axisLine={{ stroke: chartTheme.axis.stroke }} height={30} />
            <YAxis domain={yDomain} ticks={yTicks} tick={chartTheme.axis.tick} tickLine={false} axisLine={false} width={52}
              label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 10, style: { ...chartTheme.axisLabel, textAnchor: 'middle' } }} />
            <Tooltip content={tooltipRenderer(series)} cursor={{ fill: 'rgba(120,150,200,0.12)' }} />
            {series.map((s) => (
              <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.colour} radius={[3, 3, 0, 0]} isAnimationActive={false}>
                {showValues && (
                  <LabelList
                    dataKey={s.key}
                    content={(p: { x?: number | string; y?: number | string; width?: number | string; value?: unknown }) =>
                      Number(p.width) >= 14 ? (
                        <text x={Number(p.x) + Number(p.width) / 2} y={Number(p.y) - 4} textAnchor="middle" fill={chartTheme.valueLabel.fill} fontSize={10} fontWeight={600}>{String(p.value)}</text>
                      ) : null
                    }
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend series={series} />
    </ChartFigure>
  );
}

export interface ColumnChartProps {
  label: string;
  summary?: string;
  /** A datum may set its own colour, e.g. one bar per stream. */
  data: { label: string; value: number; colour?: string }[];
  colour: string;
  seriesLabel: string;
  yLabel: string;
  yDomain?: [number, number];
  yTicks?: number[];
  format?: (v: number) => string;
  showLegend?: boolean;
  height?: number;
}

/** One series of labelled columns. Used for instances by parameter and stream averages. */
export function ColumnChart({ label, summary, data, colour, seriesLabel, yLabel, yDomain, yTicks, format, showLegend = true, height = 260 }: ColumnChartProps) {
  const series: SeriesDef[] = [{ key: 'value', label: seriesLabel, colour, format }];
  return (
    <ChartFigure label={label} summary={summary}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 0 }} barCategoryGap="20%" style={{ fontFamily: chartTheme.font }}>
            <CartesianGrid {...chartTheme.grid} />
            <XAxis dataKey="label" tick={<MultiLineTick />} tickLine={false} axisLine={{ stroke: chartTheme.axis.stroke }} height={46} interval={0} />
            <YAxis domain={yDomain} ticks={yTicks} tick={chartTheme.axis.tick} tickLine={false} axisLine={false} width={52}
              label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 10, style: { ...chartTheme.axisLabel, textAnchor: 'middle' } }} />
            <Tooltip content={tooltipRenderer(series)} cursor={{ fill: 'rgba(120,150,200,0.12)' }} />
            <Bar dataKey="value" name={seriesLabel} fill={colour} radius={[2, 2, 0, 0]} maxBarSize={110} isAnimationActive={false}>
              {data.map((d, i) => <Cell key={i} fill={d.colour ?? colour} />)}
              <LabelList dataKey="value" position="top" formatter={(v: unknown) => (format && typeof v === 'number' ? format(v) : String(v))} style={{ ...chartTheme.valueLabel, fontSize: 14, fontWeight: 700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {showLegend && <ChartLegend series={series} />}
    </ChartFigure>
  );
}
