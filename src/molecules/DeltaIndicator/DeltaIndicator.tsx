import { cn } from '../../lib/cn';

export interface DeltaIndicatorProps {
  /** Signed change, e.g. 0.91 or -7.81 */
  value: number;
  unit?: string;
  /**
   * Whether a rise is good for this metric. Operability up = good,
   * missing data up = bad. Colour follows good/bad; the arrow follows direction.
   */
  higherIsBetter?: boolean;
  /** e.g. "vs previous day" */
  comparison?: string;
  layout?: 'inline' | 'stacked';
  className?: string;
}

export function DeltaIndicator({ value, unit = '%', higherIsBetter = true, comparison, layout = 'inline', className }: DeltaIndicatorProps) {
  const up = value > 0;
  const flat = value === 0;
  const good = flat ? null : up === higherIsBetter;
  const sign = up ? '+' : value < 0 ? '−' : '';
  const text = `${sign}${Number(Math.abs(value).toFixed(2))}${unit}`;
  return (
    <span className={cn('inline-flex text-sm', layout === 'stacked' ? 'flex-col items-start' : 'items-center gap-2xs', className)}>
      <span className={cn('inline-flex items-center gap-2xs font-bold', good === null ? 'text-content-muted' : good ? 'text-feedback-positive' : 'text-feedback-negative')}>
        <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
          {flat ? <rect x="1" y="5" width="10" height="2" fill="currentColor" /> : <path d={up ? 'M6 1 11 10H1Z' : 'M6 11 1 2h10Z'} fill="currentColor" />}
        </svg>
        <span>{text}</span>
        <span className="sr-only">{good === null ? 'no change' : good ? '(improvement)' : '(worse)'}</span>
      </span>
      {comparison && <span className="text-content-muted">{comparison}</span>}
    </span>
  );
}
