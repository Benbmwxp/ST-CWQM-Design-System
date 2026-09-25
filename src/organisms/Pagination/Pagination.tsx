import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { SelectField } from '../../molecules/SelectField/SelectField';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizes?: number[];
  className?: string;
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, pageSizes = [10, 25, 50], className }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);
  const btn = 'inline-flex size-10 items-center justify-center rounded-md border border-line-default bg-surface-default text-md font-semibold text-content-accent disabled:opacity-40 hover:bg-action-secondary-hover';
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-md', className)}>
      {onPageSizeChange ? (
        <label className="flex items-center gap-sm text-sm text-content-subtle">
          Rows per page
          <SelectField size="sm" className="w-20" value={String(pageSize)} onChange={(e) => onPageSizeChange(Number(e.target.value))} options={pageSizes.map(String)} />
        </label>
      ) : <span />}
      <nav aria-label="Pagination" className="flex items-center gap-2xs">
        <button type="button" aria-label="Previous page" className={btn} disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeft aria-hidden className="size-5" /></button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button key={p} type="button" aria-current={p === page ? 'page' : undefined} onClick={() => onPageChange(p)}
            className={cn(btn, p === page && 'border-transparent bg-action-primary text-content-on-action hover:bg-action-primary-hover')}>
            {p}
          </button>
        ))}
        <button type="button" aria-label="Next page" className={btn} disabled={page >= pages} onClick={() => onPageChange(page + 1)}><ChevronRight aria-hidden className="size-5" /></button>
      </nav>
      <span className="tabular text-sm text-content-subtle" aria-live="polite">{start}–{end} of {total}</span>
    </div>
  );
}
