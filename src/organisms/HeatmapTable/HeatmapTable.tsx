import { cn } from '../../lib/cn';
import { operabilityColours } from '../../lib/operability';

export interface HeatmapTableProps {
  caption: string;
  rowHeader: string;
  columns: string[];
  rows: { label: string; values: Record<string, number> }[];
  showValues?: boolean;
  format?: (v: number) => string;
  className?: string;
}

/**
 * Operability heatmap. Colour follows the operability scale tokens.
 * When values are hidden they remain available to screen readers, and each
 * cell keeps a title so the number is never conveyed by colour alone.
 */
export function HeatmapTable({ caption, rowHeader, columns, rows, showValues = true, format = (v) => `${v.toFixed(2)}%`, className }: HeatmapTableProps) {
  return (
    <div className={cn('overflow-auto rounded-md', className)}>
      <table className="w-full border-collapse text-md">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 z-10">
          <tr>
            {[rowHeader, ...columns].map((h) => (
              <th key={h} scope="col" className="whitespace-nowrap bg-surface-strong px-sm py-md text-center font-semibold text-content-on-strong">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-line-default">
              <th scope="row" className="whitespace-nowrap bg-surface-default px-sm py-sm text-left font-medium text-content-default">{r.label}</th>
              {columns.map((c) => {
                const v = r.values[c];
                const colours = operabilityColours(v);
                return (
                  <td key={c} title={format(v)} style={colours} className="tabular border-l border-white/10 px-sm py-sm text-center">
                    <span className={showValues ? undefined : 'sr-only'}>{format(v)}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
