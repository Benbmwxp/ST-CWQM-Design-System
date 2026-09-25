import { cn } from '../../lib/cn';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';

export interface ValueBarProps {
  label: string;
  value: number;
  colour?: string;
  track?: string;
  format?: (v: number) => string;
  className?: string;
}

/** Label, bar and value in one row - parameter averages, site availability. */
export function ValueBar({ label, value, colour, track, format = (v) => `${v.toFixed(1)}%`, className }: ValueBarProps) {
  return (
    <div className={cn('grid grid-cols-[minmax(7rem,9rem)_1fr_3.5rem] items-center gap-sm text-md', className)}>
      <span className="truncate text-content-default">{label}</span>
      <ProgressBar value={value} colour={colour} track={track} label={`${label} ${format(value)}`} />
      <span className="tabular text-right text-content-default">{format(value)}</span>
    </div>
  );
}
