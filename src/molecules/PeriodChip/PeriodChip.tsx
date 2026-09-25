import type { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface PeriodChipProps {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
  className?: string;
}

/** Read-only summary of the selected period or data freshness, shown in the page header. */
export function PeriodChip({ label, value, detail, icon, className }: PeriodChipProps) {
  return (
    <div className={cn('flex items-center gap-sm rounded-lg border border-line-default bg-surface-accent px-md py-xs', className)}>
      <span aria-hidden className="text-content-accent [&_svg]:size-7">{icon ?? <CalendarDays />}</span>
      <div className="leading-tight">
        <p className="text-xs text-content-muted">{label}</p>
        <p className="text-md font-bold text-content-accent">{value}</p>
        {detail && <p className="text-xs text-content-muted">{detail}</p>}
      </div>
    </div>
  );
}
