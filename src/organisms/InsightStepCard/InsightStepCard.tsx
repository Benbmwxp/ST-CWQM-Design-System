import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { tv, type Tone } from '../../lib/tokens';

export interface InsightStepCardProps {
  step: number;
  title: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

/** Numbered card in a left-to-right reading sequence (Data Confidence → Next Step). */
export function InsightStepCard({ step, title, tone = 'blue', children, className }: InsightStepCardProps) {
  return (
    <section aria-label={title} className={cn('flex flex-col gap-sm rounded-lg border border-line-default bg-surface-default p-lg', className)}>
      <header className="flex items-center gap-sm">
        <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-pill text-lg font-bold text-white" style={{ background: tv(`color.tone.${tone}.fg`) }}>
          {step}
        </span>
        <h3 className="text-xl font-bold" style={{ color: tv(`color.tone.${tone}.fg`) }}>
          <span className="sr-only">Step {step}: </span>{title}
        </h3>
      </header>
      <div className="flex-1 text-md text-content-default">{children}</div>
    </section>
  );
}
