import { cn } from '../../lib/cn';

export interface ColourDotProps {
  /** Any CSS colour - normally a token var from tv(). */
  colour: string;
  shape?: 'dot' | 'line' | 'square';
  className?: string;
}

/** Colour key for legends. Decorative - always sits next to a text label. */
export function ColourDot({ colour, shape = 'dot', className }: ColourDotProps) {
  if (shape === 'line') {
    return (
      <svg aria-hidden width="28" height="10" viewBox="0 0 28 10" className={cn('shrink-0', className)}>
        <line x1="1" y1="5" x2="27" y2="5" stroke={colour} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="14" cy="5" r="3.5" fill={colour} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className={cn('inline-block size-3 shrink-0', shape === 'dot' ? 'rounded-pill' : 'rounded-sm', className)}
      style={{ background: colour }}
    />
  );
}
