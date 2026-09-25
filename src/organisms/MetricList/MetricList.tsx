import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { Tone } from '../../lib/tokens';
import { IconCircle } from '../../atoms/IconCircle/IconCircle';

export interface MetricListProps {
  items: { icon: ReactNode; tone: Tone; label: string; value: ReactNode; detail?: ReactNode }[];
  className?: string;
}

/** Stacked metric rows - "Latest Values", "Key Metrics". */
export function MetricList({ items, className }: MetricListProps) {
  return (
    <ul className={cn('space-y-xs', className)}>
      {items.map((m) => (
        <li key={m.label} className="flex items-center gap-md rounded-md bg-surface-subtle p-sm">
          <IconCircle tone={m.tone} variant="solid" size="md">{m.icon}</IconCircle>
          <div className="min-w-0 flex-1">
            <p className="text-md text-content-default">{m.label}</p>
          </div>
          <div className="flex flex-col items-end gap-3xs text-right">
            <span className="tabular text-2xl font-extrabold text-content-heading">{m.value}</span>
            {m.detail}
          </div>
        </li>
      ))}
    </ul>
  );
}
