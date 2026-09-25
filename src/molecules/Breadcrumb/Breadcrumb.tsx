import { ChevronRight } from 'lucide-react';

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-xs text-md">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-xs">
              {last ? (
                <span aria-current="page" className="font-semibold text-content-accent">{item.label}</span>
              ) : (
                <a href={item.href ?? '#'} className="text-content-subtle hover:underline">{item.label}</a>
              )}
              {!last && <ChevronRight aria-hidden className="size-4 text-content-muted" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
