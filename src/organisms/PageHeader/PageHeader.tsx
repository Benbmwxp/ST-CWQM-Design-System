import type { ReactNode } from 'react';
import { Breadcrumb, type BreadcrumbProps } from '../../molecules/Breadcrumb/Breadcrumb';

export interface PageHeaderProps {
  breadcrumb?: BreadcrumbProps['items'];
  title: string;
  subtitle?: string;
  /** Right-hand area: period chip, Share, Export, overflow menu. */
  actions?: ReactNode;
}

export function PageHeader({ breadcrumb, title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0 space-y-2xs">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <h1 className="text-3xl font-extrabold tracking-tight text-content-heading">{title}</h1>
        {subtitle && <p className="text-lg text-content-subtle">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-sm xl:flex-nowrap xl:justify-end">{actions}</div>}
    </header>
  );
}
