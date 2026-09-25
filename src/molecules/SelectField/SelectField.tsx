import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { inputFrame } from '../../atoms/Input/Input';

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: (string | { value: string; label: string })[];
  size?: 'sm' | 'md';
}

/** Native select (keyboard and screen-reader support for free), styled to the design. */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(({ options, className, size = 'md', ...props }, ref) => (
  <div className={cn('relative', className)}>
    <select
      ref={ref}
      className={cn(inputFrame, 'appearance-none pl-sm pr-10 font-medium outline-none', size === 'sm' && 'h-9 text-sm')}
      {...props}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return <option key={opt.value} value={opt.value}>{opt.label}</option>;
      })}
    </select>
    <ChevronDown aria-hidden className="pointer-events-none absolute right-sm top-1/2 size-5 -translate-y-1/2 text-content-accent" />
  </div>
));
SelectField.displayName = 'SelectField';
