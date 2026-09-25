export interface SparklineProps {
  values: number[];
  colour?: string;
  width?: number;
  height?: number;
  className?: string;
}

/** Tiny trend line for KPI tiles. Decorative - the tile states the numbers in text. */
export function Sparkline({ values, colour = 'currentColor', width = 120, height = 40, className }: SparklineProps) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 4;
  const pts = values.map((v, i) => [
    pad + (i / (values.length - 1)) * (width - pad * 2),
    height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2),
  ]);
  return (
    <svg aria-hidden width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={colour} strokeWidth="1.75" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill={colour} />)}
    </svg>
  );
}
