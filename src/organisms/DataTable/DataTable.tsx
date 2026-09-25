import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, EllipsisVertical } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface Column<T> {
  key: string;
  header: ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  /** Value used for sorting; defaults to row[key]. */
  sortValue?: (row: T) => string | number;
  render?: (row: T) => ReactNode;
  /** Extra classes or inline style for this column's cells (e.g. heatmap colours). */
  cellClassName?: string | ((row: T) => string);
  cellStyle?: (row: T) => React.CSSProperties;
  /** Tints the whole column, as the Value column does in the designs. */
  highlight?: boolean;
  /** Header text for the first cell is row header (<th scope="row">). */
  rowHeader?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  /** Optional header row above the column headers, e.g. parameter names spanning several columns. */
  groups?: { header: ReactNode; span: number }[];
  headerTone?: 'strong' | 'subtle';
  striped?: boolean;
  dense?: boolean;
  /** Scrolls the body inside a fixed height, header stays visible. */
  maxHeight?: number | string;
  initialSort?: { key: string; direction: 'asc' | 'desc' };
  /** Renders a row menu button; receives the row. */
  onRowAction?: (row: T) => void;
  className?: string;
}

export function DataTable<T>({
  caption, columns, rows, getRowKey, groups, headerTone = 'subtle', striped = true, dense, maxHeight,
  initialSort, onRowAction, className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState(initialSort ?? null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const get = col.sortValue ?? ((r: T) => (r as Record<string, unknown>)[col.key] as string | number);
    return [...rows].sort((a, b) => {
      const [x, y] = [get(a), get(b)];
      const cmp = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y));
      return sort.direction === 'asc' ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key === key ? { key, direction: s.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }));

  const strong = headerTone === 'strong';
  const headCell = cn(
    'px-sm font-semibold whitespace-nowrap',
    dense ? 'py-xs text-sm' : 'py-sm text-md',
    strong ? 'bg-surface-strong text-content-on-strong' : 'bg-surface-subtle text-content-accent'
  );
  const alignClass = (a?: Column<T>['align']) => (a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left');

  return (
    <div className={cn('overflow-auto rounded-md border border-line-default', className)} style={{ maxHeight }}>
      <table className="w-full border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 z-10">
          {groups && (
            <tr>
              {groups.map((g, i) => (
                <th key={i} scope="colgroup" colSpan={g.span} className={cn(headCell, 'text-center', i > 0 && 'border-l border-white/20')}>
                  {g.header}
                </th>
              ))}
            </tr>
          )}
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key;
              const ariaSort = active ? (sort!.direction === 'asc' ? 'ascending' : 'descending') : c.sortable ? 'none' : undefined;
              return (
                <th key={c.key} scope="col" aria-sort={ariaSort} style={{ width: c.width }} className={cn(headCell, alignClass(c.align))}>
                  {c.sortable ? (
                    <button type="button" onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-2xs">
                      {c.header}
                      {active ? (sort!.direction === 'asc' ? <ArrowUp aria-hidden className="size-4" /> : <ArrowDown aria-hidden className="size-4" />) : <ArrowUpDown aria-hidden className="size-4 opacity-70" />}
                    </button>
                  ) : c.header}
                </th>
              );
            })}
            {onRowAction && <th scope="col" className={headCell}><span className="sr-only">Actions</span></th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={getRowKey(row, i)} className={cn('border-t border-line-default', striped && i % 2 === 1 ? 'bg-surface-subtle' : 'bg-surface-default')}>
              {columns.map((c) => {
                const Cell = c.rowHeader ? 'th' : 'td';
                const extra = typeof c.cellClassName === 'function' ? c.cellClassName(row) : c.cellClassName;
                return (
                  <Cell
                    key={c.key}
                    scope={c.rowHeader ? 'row' : undefined}
                    style={c.cellStyle?.(row)}
                    className={cn(
                      'tabular px-sm text-content-default', dense ? 'py-xs text-sm' : 'py-sm text-md',
                      c.rowHeader && 'font-semibold', alignClass(c.align),
                      c.highlight && 'bg-surface-highlight text-content-subtle', extra
                    )}
                  >
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </Cell>
                );
              })}
              {onRowAction && (
                <td className="px-xs text-center">
                  <button type="button" aria-label="Row actions" onClick={() => onRowAction(row)} className="rounded-sm p-2xs text-content-accent hover:bg-surface-subtle">
                    <EllipsisVertical aria-hidden className="size-5 rotate-90" />
                  </button>
                </td>
              )}
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr><td colSpan={columns.length + (onRowAction ? 1 : 0)} className="px-md py-xl text-center text-content-muted">No results match the current filters.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
