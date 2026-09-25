import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'accent';
  as?: 'div' | 'section' | 'aside' | 'article';
}

/** The base surface every panel, tile and filter bar sits on. */
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, tone = 'default', as: Tag = 'div', ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn(
      'rounded-lg border border-line-default shadow-card',
      tone === 'accent' ? 'bg-surface-accent' : 'bg-surface-default',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';
