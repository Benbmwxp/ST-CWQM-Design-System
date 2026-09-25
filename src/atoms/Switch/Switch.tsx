import { cn } from '../../lib/cn';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

/** Labelled on/off switch (role="switch"). */
export function Switch({ checked, onChange, label, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn('inline-flex h-10 items-center gap-sm rounded-md bg-surface-accent px-sm text-sm font-semibold text-content-accent', className)}
    >
      {label}
      <span className={cn('relative h-6 w-11 rounded-pill transition-colors', checked ? 'bg-action-primary' : 'bg-line-strong')}>
        <span className={cn('absolute top-0.5 size-5 rounded-pill bg-white shadow transition-[left]', checked ? 'left-[22px]' : 'left-0.5')} />
      </span>
    </button>
  );
}
