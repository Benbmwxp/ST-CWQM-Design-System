import type { ReactNode } from 'react';
import { NavItem, type NavItemProps } from '../../molecules/NavItem/NavItem';

export interface SidebarProps {
  /** The client logo. Pass the official SVG/PNG asset - a placeholder shows until then. */
  logo?: ReactNode;
  items: NavItemProps[];
  /** Area above the tagline, e.g. global date range and data refresh status. */
  footer?: ReactNode;
  tagline?: string;
}

export function Sidebar({ logo, items, footer, tagline }: SidebarProps) {
  return (
    <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden bg-nav-bg px-sm pb-xl pt-xl text-nav-text">
      <div className="mb-2xl flex justify-center px-sm">
        {logo ?? (
          <div className="flex h-20 w-44 items-center justify-center rounded-md border border-dashed border-white/40 text-sm text-nav-muted">
            Client logo
          </div>
        )}
      </div>
      <nav aria-label="Main">
        <ul className="space-y-2xs">
          {items.map((item) => <li key={item.label}><NavItem {...item} /></li>)}
        </ul>
      </nav>
      <div className="relative z-10 mt-auto space-y-md px-xs pt-xl">
        {footer}
        {tagline && <p className="whitespace-pre-line text-md leading-snug">{tagline}</p>}
      </div>
      <Waves />
    </aside>
  );
}

/** Decorative flowing lines at the foot of the sidebar. */
function Waves() {
  const lines = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg aria-hidden viewBox="0 0 256 220" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 h-56 w-full opacity-70">
      <defs>
        <linearGradient id="st-wave" x1="0" x2="1">
          <stop offset="0" stopColor="#1C7CFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3DB2FF" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {lines.map((i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 3} C 60 ${40 + i * 6}, 120 ${200 - i * 4}, 256 ${90 + i * 5}`}
          fill="none"
          stroke="url(#st-wave)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}
