import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Card } from '../../atoms/Card/Card';

export interface ActionListProps {
  title: string;
  actions: { icon: ReactNode; label: string; href?: string; onClick?: () => void }[];
  className?: string;
}

/** "Useful Actions" - a short list of shortcuts. */
export function ActionList({ title, actions, className }: ActionListProps) {
  return (
    <Card as="section" aria-label={title} className={cn('p-lg', className)}>
      <h2 className="mb-sm text-xl font-bold text-content-accent">{title}</h2>
      <ul className="space-y-xs">
        {actions.map((a) => (
          <li key={a.label}>
            <a
              href={a.href ?? '#'}
              onClick={a.onClick}
              className="flex items-center gap-sm rounded-md border border-line-default px-md py-sm text-md font-medium text-content-accent hover:bg-action-secondary-hover [&>svg:first-child]:size-6"
            >
              <span aria-hidden className="text-content-accent [&_svg]:size-6">{a.icon}</span>
              <span className="flex-1">{a.label}</span>
              <ChevronRight aria-hidden className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
