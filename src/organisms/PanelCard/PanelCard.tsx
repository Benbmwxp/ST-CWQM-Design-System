import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { Tone } from '../../lib/tokens';
import { Card } from '../../atoms/Card/Card';
import { IconCircle } from '../../atoms/IconCircle/IconCircle';

export interface PanelCardProps {
  title: string;
  /** Lighter text after the title, e.g. "(By Parameter)". */
  titleSuffix?: string;
  description?: ReactNode;
  icon?: ReactNode;
  iconTone?: Tone;
  iconVariant?: 'soft' | 'solid';
  /** Right side of the header: "View all" link, search, toggles, a select. */
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/** Titled card that holds a chart, table or list. */
export function PanelCard({ title, titleSuffix, description, icon, iconTone = 'blue', iconVariant = 'soft', actions, children, className, bodyClassName }: PanelCardProps) {
  return (
    <Card as="section" aria-label={title} className={cn('flex min-w-0 flex-col p-lg', className)}>
      <header className="mb-md flex flex-wrap items-start justify-between gap-sm">
        <div className="flex min-w-0 flex-1 basis-64 items-start gap-sm">
          {icon && <IconCircle tone={iconTone} variant={iconVariant} size="md">{icon}</IconCircle>}
          <div className="min-w-0 pt-2xs">
            <h2 className="text-xl font-bold text-content-accent">
              {title}
              {titleSuffix && <span className="ml-2xs font-medium text-content-subtle">{titleSuffix}</span>}
            </h2>
            {description && <p className="mt-3xs text-sm text-content-subtle">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-sm">{actions}</div>}
      </header>
      <div className={cn('min-w-0 flex-1', bodyClassName)}>{children}</div>
    </Card>
  );
}
