import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need an accessible name. */
  'aria-label': string;
  size?: 'sm' | 'md';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'md', type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-md border border-line-default bg-action-secondary text-content-accent shadow-card transition-colors hover:bg-action-secondary-hover [&_svg]:size-5',
        size === 'md' ? 'size-10' : 'size-8',
        className
      )}
      {...props}
    />
  )
);
IconButton.displayName = 'IconButton';
