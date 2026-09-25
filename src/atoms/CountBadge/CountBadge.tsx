import { cn } from '../../lib/cn';

/** Small numeric badge, e.g. number of active filters. */
export function CountBadge({ count, label, className }: { count: number; label: string; className?: string }) {
  return (
    <span
      aria-label={`${count} ${label}`}
      className={cn('inline-flex h-6 min-w-6 items-center justify-center rounded-pill bg-action-primary px-2xs text-xs font-bold text-content-on-action', className)}
    >
      {count}
    </span>
  );
}
