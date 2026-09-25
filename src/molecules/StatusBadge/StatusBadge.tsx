import type { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { StatusShape, type Status } from '../../atoms/StatusShape/StatusShape';

/**
 * Status is always encoded three ways: colour, shape and a text label.
 * Colour alone is never enough (CVD users, greyscale print).
 */
const badge = cva(
  'inline-flex items-center gap-2xs rounded-pill border px-xs py-3xs text-sm font-medium bg-surface-default',
  {
    variants: {
      status: {
        ok: 'border-feedback-positive',
        warning: 'border-feedback-warning',
        info: 'border-feedback-info',
        neutral: 'border-line-strong',
      },
    },
  }
);

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: Status;
  /** Visible label - required, so meaning never depends on colour or shape alone. */
  label: string;
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(badge({ status }), className)} {...props}>
      <StatusShape status={status} />
      <span className="text-content-default">{label}</span>
    </span>
  );
}
