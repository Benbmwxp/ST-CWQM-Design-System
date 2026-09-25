import type { ReactNode } from 'react';

export interface ChartTooltipProps {
  title?: ReactNode;
  rows: { label: ReactNode; value: ReactNode; colour?: string }[];
}

/** Library-agnostic tooltip body. Chart organisms render this inside their library's tooltip. */
export function ChartTooltip({ title, rows }: ChartTooltipProps) {
  return (
    <div className="min-w-40 rounded-md border border-line-default bg-surface-default px-sm py-xs text-sm shadow-raised">
      {title && <p className="mb-2xs font-semibold text-content-default">{title}</p>}
      {rows.map((r, i) => (
        <div key={i} className="mt-2xs">
          <p style={{ color: r.colour }} className="text-content-subtle">{r.label}</p>
          <p style={{ color: r.colour }} className="text-lg font-bold">{r.value}</p>
        </div>
      ))}
    </div>
  );
}
