import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ColourDot } from '../../atoms/ColourDot/ColourDot';

export interface LegendItemProps {
  colour: string;
  label: ReactNode;
  value?: ReactNode;
  shape?: 'dot' | 'line' | 'square';
  className?: string;
}

export function LegendItem({ colour, label, value, shape, className }: LegendItemProps) {
  return (
    <span className={cn('flex items-center gap-xs text-sm text-content-default', value !== undefined && 'justify-between gap-md', className)}>
      <span className="flex items-center gap-xs"><ColourDot colour={colour} shape={shape} />{label}</span>
      {value !== undefined && <span className="tabular font-semibold">{value}</span>}
    </span>
  );
}
