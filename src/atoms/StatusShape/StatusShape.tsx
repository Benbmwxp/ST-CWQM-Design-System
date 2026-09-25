import type { SVGAttributes } from 'react';
import { cn } from '../../lib/cn';

export type Status = 'ok' | 'warning' | 'info' | 'neutral';

const colour: Record<Status, string> = {
  ok: 'text-feedback-positive',
  warning: 'text-feedback-warning',
  info: 'text-feedback-info',
  neutral: 'text-content-muted',
};

const paths: Record<Status, JSX.Element> = {
  ok: <circle cx="6" cy="6" r="5" fill="currentColor" />,
  warning: <path d="M6 1 11 11H1Z" fill="currentColor" />,
  info: <path d="M6 0.5 11.5 6 6 11.5 0.5 6Z" fill="currentColor" />,
  neutral: <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />,
};

export interface StatusShapeProps extends SVGAttributes<SVGSVGElement> {
  status: Status;
  size?: number;
}

/**
 * The shape half of the colour + shape + label rule. Decorative on its own
 * (aria-hidden) - always pair it with visible text.
 */
export function StatusShape({ status, size = 12, className, ...props }: StatusShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      aria-hidden
      focusable={false}
      className={cn('shrink-0', colour[status], className)}
      {...props}
    >
      {paths[status]}
    </svg>
  );
}
