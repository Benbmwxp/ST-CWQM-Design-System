import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { tv, type Tone } from '../../lib/tokens';
import { Card } from '../../atoms/Card/Card';
import { IconCircle } from '../../atoms/IconCircle/IconCircle';
import { Sparkline } from '../../molecules/Sparkline/Sparkline';

export interface KpiTileProps {
  icon: ReactNode;
  tone?: Tone;
  label: string;
  /** Small line under the label, e.g. "(in selected filters)" or "PRIMARY STREAM". */
  eyebrow?: string;
  value: ReactNode;
  unit?: string;
  /** Detail next to or under the value: a delta, sites list, "5 days". */
  detail?: ReactNode;
  /** Footer row, used by solid tiles for "vs previous 7 days". */
  footer?: ReactNode;
  trend?: number[];
  /**
   * soft   - white card, soft icon circle (most pages)
   * tinted - card tinted with the tone colour (Concern Codes, dark)
   * solid  - filled with the tone colour (Data Streams)
   */
  variant?: 'soft' | 'tinted' | 'solid';
  className?: string;
}

export function KpiTile({ icon, tone = 'blue', label, eyebrow, value, unit, detail, footer, trend, variant = 'soft', className }: KpiTileProps) {
  const solid = variant === 'solid';
  return (
    <Card
      as="section"
      aria-label={label}
      className={cn('flex flex-col gap-sm p-lg', solid && 'border-transparent text-white', className)}
      style={
        solid
          ? { background: tv(`color.tone.${tone}.solid`) }
          : variant === 'tinted'
            ? { background: `color-mix(in oklab, ${tv(`color.tone.${tone}.bg`)} 55%, ${tv('color.surface.default')})` }
            : undefined
      }
    >
      <div className="flex items-start gap-md">
        <IconCircle tone={tone} size="lg" variant={solid ? 'glass' : 'soft'}>{icon}</IconCircle>
        <div className="min-w-0 flex-1">
          {solid && eyebrow && <p className="whitespace-nowrap text-xs font-bold uppercase tracking-wide text-white/90">{eyebrow}</p>}
          <p
            className={cn('text-lg font-semibold', solid ? 'text-white' : variant === 'tinted' ? '' : 'text-content-accent')}
            style={variant === 'tinted' ? { color: tv(`color.tone.${tone}.fg`) } : undefined}
          >
            {label}
          </p>
          {!solid && eyebrow && <p className="text-sm text-content-muted">{eyebrow}</p>}
          <div className="mt-2xs flex flex-wrap items-end gap-x-md gap-y-2xs">
            <p className={cn('tabular text-3xl font-extrabold leading-none', solid ? 'text-white' : 'text-content-heading')}>
              {value}
              {unit && <span className="ml-2xs text-lg font-semibold">{unit}</span>}
            </p>
            {detail && <div className={cn('text-sm', solid ? 'text-white/90' : 'text-content-subtle')}>{detail}</div>}
          </div>
        </div>
        {trend && <Sparkline values={trend} width={88} height={36} colour={solid ? '#FFFFFF' : tv(`color.tone.${tone}.fg`)} className="hidden shrink-0 self-end 2xl:block" />}
      </div>
      {footer && <div className={cn('border-t pt-sm text-sm', solid ? 'border-white/25 text-white' : 'border-line-default')}>{footer}</div>}
    </Card>
  );
}
