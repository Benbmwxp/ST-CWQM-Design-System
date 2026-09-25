import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const inputFrame =
  'h-11 w-full rounded-md border border-line-strong/60 bg-surface-default text-md text-content-default ' +
  'placeholder:text-content-muted focus-within:border-line-focus';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(inputFrame, 'px-sm outline-none focus-visible:outline-2', className)} {...props} />
));
Input.displayName = 'Input';
