import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Card } from '../../atoms/Card/Card';
import { IconCircle } from '../../atoms/IconCircle/IconCircle';

export interface KeyInsightProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function KeyInsight({ title = 'Key Insight', children, action, className }: KeyInsightProps) {
  return (
    <Card as="section" tone="accent" aria-label={title} className={cn('flex items-start gap-md p-lg', className)}>
      <IconCircle tone="blue" variant="solid" size="lg"><Lightbulb /></IconCircle>
      <div className="min-w-0 space-y-sm">
        <h2 className="text-xl font-bold text-content-accent">{title}</h2>
        <div className="text-md leading-relaxed text-content-subtle">{children}</div>
        {action}
      </div>
    </Card>
  );
}
