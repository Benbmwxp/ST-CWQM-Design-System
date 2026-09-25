import type { HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import type { Tone } from '../../lib/tokens';

const circle = cva('inline-flex shrink-0 items-center justify-center rounded-pill', {
  variants: {
    size: { sm: 'size-8 [&_svg]:size-4', md: 'size-11 [&_svg]:size-5', lg: 'size-16 [&_svg]:size-8' },
    variant: { soft: '', solid: 'text-content-on-strong', glass: 'bg-white/15 text-white' },
    tone: { blue: '', red: '', teal: '', orange: '', green: '', pink: '', purple: '', navy: '' },
  },
  compoundVariants: (['blue', 'red', 'teal', 'orange', 'green', 'pink', 'purple', 'navy'] as const).flatMap((t) => [
    { tone: t, variant: 'soft' as const, className: `bg-tone-${t}-bg text-tone-${t}-fg` },
    { tone: t, variant: 'solid' as const, className: `bg-tone-${t}-fg` },
  ]),
  defaultVariants: { size: 'md', variant: 'soft', tone: 'blue' },
});

/* Tailwind needs to see every class name in full to generate it: */
// bg-tone-blue-bg text-tone-blue-fg bg-tone-blue-fg bg-tone-red-bg text-tone-red-fg bg-tone-red-fg
// bg-tone-teal-bg text-tone-teal-fg bg-tone-teal-fg bg-tone-orange-bg text-tone-orange-fg bg-tone-orange-fg
// bg-tone-green-bg text-tone-green-fg bg-tone-green-fg bg-tone-pink-bg text-tone-pink-fg bg-tone-pink-fg
// bg-tone-purple-bg text-tone-purple-fg bg-tone-purple-fg bg-tone-navy-bg text-tone-navy-fg bg-tone-navy-fg

export interface IconCircleProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'soft' | 'solid' | 'glass';
}

/** Decorative icon holder used in KPI tiles and card headers. */
export function IconCircle({ tone, size, variant, className, ...props }: IconCircleProps) {
  return <span aria-hidden className={cn(circle({ tone, size, variant }), className)} {...props} />;
}
