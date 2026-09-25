import type { ReactNode } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { tv } from '../../lib/tokens';
import { ChartFigure } from './shared';

export interface DonutChartProps {
  label: string;
  segments: { label: string; value: number; colour: string }[];
  /** Content in the hole, e.g. "86.2% Average Operability". */
  centre?: ReactNode;
  size?: number;
  thickness?: number;
}

/** Ring chart with a centre label. The segment breakdown is also given as text for screen readers. */
export function DonutChart({ label, segments, centre, size = 200, thickness = 26 }: DonutChartProps) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const summary = segments.map((s) => `${s.label}: ${s.value}`).join(', ');
  return (
    <ChartFigure label={label} summary={summary} className="relative shrink-0" >
      <div style={{ width: size, height: size }} className="relative">
        <PieChart width={size} height={size}>
          <Pie
            data={total ? segments : [{ label: 'none', value: 1, colour: tv('color.data.track') }]}
            dataKey="value" nameKey="label" cx="50%" cy="50%"
            innerRadius={size / 2 - thickness} outerRadius={size / 2 - 2}
            startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}
          >
            {(total ? segments : [{ colour: tv('color.data.track') }]).map((s, i) => <Cell key={i} fill={s.colour} />)}
          </Pie>
        </PieChart>
        {centre && <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{centre}</div>}
      </div>
    </ChartFigure>
  );
}
