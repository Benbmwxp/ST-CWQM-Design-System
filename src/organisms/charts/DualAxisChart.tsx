import { useId } from 'react';
import {
  Area, Brush, CartesianGrid, ComposedChart, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { chartTheme } from '../../lib/chartTheme';
import { tv } from '../../lib/tokens';
import { ChartFigure, ChartLegend, MultiLineTick, tooltipRenderer, type SeriesDef } from './shared';

export interface DualAxisSeries extends SeriesDef {
  axis: 'left' | 'right';
  dashed?: boolean;
  /** Print the value above each point. */
  showLabels?: boolean;
}

export interface AxisDef {
  label: string;
  domain?: [number, number];
  ticks?: number[];
  format?: (v: number) => string;
  colour?: string;
}

export interface DualAxisChartProps {
  label: string;
  summary?: string;
  data: Record<string, string | number>[];
  xKey: string;
  series: DualAxisSeries[];
  leftAxis: AxisDef;
  rightAxis?: AxisDef;
  mode?: 'line' | 'area';
  /** Numbered event markers pinned to a point. */
  markers?: { x: string; y: number; axis: 'left' | 'right'; label: string }[];
  /** Adds a draggable range navigator under the chart. */
  navigator?: boolean;
  legendPosition?: 'top' | 'bottom';
  height?: number;
  /** Format x tick labels, and show every nth tick. */
  xTickFormat?: (v: string) => string;
  xInterval?: number | 'preserveStartEnd';
}

/** Line or area chart with independent left and right axes. Used for operability trends and data stream analysis. */
export function DualAxisChart({
  label, summary, data, xKey, series, leftAxis, rightAxis, mode = 'line', markers = [], navigator, legendPosition = 'bottom', height = 280, xTickFormat, xInterval = 'preserveStartEnd',
}: DualAxisChartProps) {
  const gid = useId().replace(/:/g, '');
  const legend = <ChartLegend series={series} shape="line" />;
  return (
    <ChartFigure label={label} summary={summary}>
      {legendPosition === 'top' && <div className="-mt-xs mb-xs [&_ul]:justify-start">{legend}</div>}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 28, right: 8, bottom: 8, left: 0 }} style={{ fontFamily: chartTheme.font }}>
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`${gid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.colour} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={s.colour} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...chartTheme.grid} />
            <XAxis dataKey={xKey} tick={<MultiLineTick format={xTickFormat} />} tickLine={false} axisLine={{ stroke: chartTheme.axis.stroke }} interval={xInterval} height={46} padding={{ left: 36, right: 36 }} />
            <YAxis
              yAxisId="left" domain={leftAxis.domain} ticks={leftAxis.ticks} tickFormatter={leftAxis.format}
              tick={{ ...chartTheme.axis.tick, fill: leftAxis.colour ?? chartTheme.axis.tick.fill }} tickLine={false} axisLine={false} width={56}
              label={{ value: leftAxis.label, angle: -90, position: 'insideLeft', offset: 8, style: { ...chartTheme.axisLabel, fill: leftAxis.colour ?? chartTheme.axisLabel.fill, textAnchor: 'middle' } }}
            />
            {rightAxis && (
              <YAxis
                yAxisId="right" orientation="right" domain={rightAxis.domain} ticks={rightAxis.ticks} tickFormatter={rightAxis.format}
                tick={{ ...chartTheme.axis.tick, fill: rightAxis.colour ?? chartTheme.axis.tick.fill }} tickLine={false} axisLine={false} width={64}
                label={{ value: rightAxis.label, angle: 90, position: 'insideRight', offset: 8, style: { ...chartTheme.axisLabel, fill: rightAxis.colour ?? chartTheme.axisLabel.fill, textAnchor: 'middle' } }}
              />
            )}
            <Tooltip content={tooltipRenderer(series)} cursor={chartTheme.cursor} />
            {series.map((s) =>
              mode === 'area' ? (
                <Area
                  key={s.key} yAxisId={s.axis} dataKey={s.key} name={s.label} type="monotone"
                  stroke={s.colour} strokeWidth={2.5} fill={`url(#${gid}-${s.key})`}
                  dot={{ r: 3.5, fill: s.colour, strokeWidth: 0 }} activeDot={{ r: 6 }} isAnimationActive={false}
                />
              ) : (
                <Line
                  key={s.key} yAxisId={s.axis} dataKey={s.key} name={s.label} type={s.dashed ? 'linear' : 'monotone'}
                  stroke={s.colour} strokeWidth={s.dashed ? 2 : 2.5} strokeDasharray={s.dashed ? '5 5' : undefined}
                  dot={{ r: 4, fill: s.colour, strokeWidth: 0 }} activeDot={{ r: 6 }} isAnimationActive={false}
                  label={s.showLabels ? { position: 'top', offset: 10, ...chartTheme.valueLabel, formatter: (v: unknown) => (s.format && typeof v === 'number' ? s.format(v) : String(v)) } : undefined}
                />
              )
            )}
            {markers.map((m) => (
              <ReferenceDot
                key={m.label} yAxisId={m.axis} x={m.x} y={m.y} ifOverflow="visible"
                shape={(p: { cx?: number; cy?: number }) => <EventPin cx={p.cx ?? 0} cy={p.cy ?? 0} label={m.label} />}
              />
            ))}
            {navigator && (
              <Brush dataKey={xKey} height={44} stroke={tv('color.action.primary')} fill={tv('color.surface.subtle')} travellerWidth={10} tickFormatter={() => ''}>
                <LineChart data={data}>
                  {series.map((s) => <Line key={s.key} dataKey={s.key} stroke={s.colour} strokeWidth={1} dot={false} isAnimationActive={false} />)}
                </LineChart>
              </Brush>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {legendPosition === 'bottom' && legend}
    </ChartFigure>
  );
}

function EventPin({ cx, cy, label }: { cx: number; cy: number; label: string }) {
  const colour = tv('color.data.stream.marker');
  return (
    <g aria-label={`Event ${label}`}>
      <line x1={cx} y1={cy - 16} x2={cx} y2={cy + 40} stroke={colour} strokeWidth={2} />
      <circle cx={cx} cy={cy - 30} r={14} fill={colour} stroke="#fff" strokeWidth={2} />
      <text x={cx} y={cy - 25} textAnchor="middle" fontSize={13} fontWeight={700} fill="#fff">{label}</text>
      <circle cx={cx} cy={cy} r={4} fill={colour} />
    </g>
  );
}
