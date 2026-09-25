import { cn } from '../../lib/cn';
import { tv } from '../../lib/tokens';

export interface ProgressBarProps {
  /** 0-100 */
  value: number;
  colour?: string;
  track?: string;
  className?: string;
  /** Accessible description, e.g. "Ammonia_NH3 average operability". */
  label: string;
}

export function ProgressBar({ value, colour = tv('color.data.available'), track = tv('color.data.track'), className, label }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn('h-4 w-full overflow-hidden rounded-sm', className)}
      style={{ background: track }}
    >
      <div className="h-full rounded-sm" style={{ width: `${v}%`, background: colour }} />
    </div>
  );
}
