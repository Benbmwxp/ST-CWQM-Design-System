import { ArrowRight, CalendarDays } from 'lucide-react';
import { cn } from '../../lib/cn';
import { inputFrame } from '../../atoms/Input/Input';

export interface DateRangeFieldProps {
  from: string; // yyyy-mm-dd
  to: string;
  onChange: (range: { from: string; to: string }) => void;
  id?: string;
  className?: string;
}

/** From → to date range. Uses native date inputs so the picker is accessible and localised. */
export function DateRangeField({ from, to, onChange, id, className }: DateRangeFieldProps) {
  const dateInput =
    'min-w-0 flex-1 bg-transparent font-semibold text-content-accent outline-none [&::-webkit-calendar-picker-indicator]:opacity-70';
  return (
    <div className={cn(inputFrame, 'flex min-w-[17rem] items-center gap-xs px-sm', className)}>
      <CalendarDays aria-hidden className="size-5 shrink-0 text-content-accent" />
      <input id={id} type="date" aria-label="From date" value={from} max={to} onChange={(e) => onChange({ from: e.target.value, to })} className={dateInput} />
      <ArrowRight aria-hidden className="size-4 shrink-0 text-content-accent" />
      <input type="date" aria-label="To date" value={to} min={from} onChange={(e) => onChange({ from, to: e.target.value })} className={dateInput} />
    </div>
  );
}
