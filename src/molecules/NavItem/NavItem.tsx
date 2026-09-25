import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  /** Shows a notification dot, e.g. unread alerts. */
  alert?: boolean;
}

export function NavItem({ icon, label, href = '#', active, alert }: NavItemProps) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-12 items-center gap-sm rounded-md px-sm text-md font-medium text-nav-text transition-colors [&_svg]:size-6 [&_svg]:shrink-0',
        active ? 'bg-nav-active' : 'hover:bg-white/10'
      )}
    >
      {icon}
      <span>{label}</span>
      {alert && (
        <>
          <span aria-hidden className="-mt-sm size-2 rounded-pill bg-nav-dot" />
          <span className="sr-only">(new alerts)</span>
        </>
      )}
    </a>
  );
}
