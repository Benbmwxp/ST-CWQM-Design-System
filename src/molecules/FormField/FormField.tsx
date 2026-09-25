import { useId, type ReactElement, cloneElement } from 'react';
import { cn } from '../../lib/cn';

export interface FormFieldProps {
  label: string;
  /** A single control; FormField wires up id/label for it. */
  children: ReactElement<{ id?: string }>;
  className?: string;
}

/** Label above a control. The label is linked to the control for screen readers. */
export function FormField({ label, children, className }: FormFieldProps) {
  const id = useId();
  return (
    <div className={cn('flex min-w-0 flex-col gap-2xs', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-content-accent">
        {label}
      </label>
      {cloneElement(children, { id })}
    </div>
  );
}
