import { Children, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../../atoms/Card/Card';

export interface FilterBarProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

/** Row of filter fields separated by dividers, on one card. Wraps on narrow screens. */
export function FilterBar({ children, className, label = 'Filters' }: FilterBarProps) {
  const items = Children.toArray(children);
  return (
    <Card as="section" aria-label={label} className={cn('flex flex-wrap items-end', className)}>
      {items.map((child, i) => (
        <div key={i} className={cn('flex-1 basis-44 px-sm py-md', i > 0 && 'border-l border-line-default')}>
          {child}
        </div>
      ))}
    </Card>
  );
}
