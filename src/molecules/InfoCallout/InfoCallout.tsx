import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '../../lib/cn';

export function InfoCallout({ children, title, className }: { children: ReactNode; title?: string; className?: string }) {
  return (
    <div role="note" className={cn('flex items-start gap-md rounded-lg border border-line-default bg-surface-accent p-lg', className)}>
      <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-feedback-info text-white"><Info className="size-5" /></span>
      <div className="text-md leading-relaxed text-content-subtle">
        {title && <p className="mb-2xs font-bold text-content-accent">{title}</p>}
        {children}
      </div>
    </div>
  );
}
