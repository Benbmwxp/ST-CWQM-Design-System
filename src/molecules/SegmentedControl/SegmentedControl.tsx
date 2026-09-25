import { cn } from '../../lib/cn';

export interface SegmentedControlProps<T extends string> {
  options: readonly (T | { value: T; label: string })[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  /** "joined" = one bordered group (1D/7D…); "separate" = spaced buttons (quick filters). */
  appearance?: 'joined' | 'separate';
  size?: 'sm' | 'md';
  className?: string;
}

/** Single-choice button group. Each option exposes its state with aria-pressed. */
export function SegmentedControl<T extends string>({
  options, value, onChange, label, appearance = 'joined', size = 'md', className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'inline-flex',
        appearance === 'joined' ? 'overflow-hidden rounded-md border border-line-default bg-surface-default' : 'gap-xs',
        className
      )}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'whitespace-nowrap font-semibold transition-colors',
              size === 'md' ? 'h-10 px-md text-md' : 'h-9 px-sm text-sm',
              appearance === 'joined' ? 'border-l border-line-default first:border-l-0' : 'rounded-md border border-line-default',
              active
                ? 'border-transparent bg-action-selected text-content-on-action'
                : 'bg-surface-default text-content-accent hover:bg-action-secondary-hover'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
