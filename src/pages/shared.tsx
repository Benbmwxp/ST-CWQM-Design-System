import type { ReactNode } from 'react';
import {
  Activity, Bell, CalendarDays, CircleAlert, ClipboardList, Download, EllipsisVertical, FileText, Gauge, House,
  Network, Settings, Share2, ShieldCheck, Wrench,
} from 'lucide-react';
import { Button, IconButton } from '../atoms';
import { Sidebar } from '../organisms';
import type { NavItemProps } from '../molecules';
import logoUrl from '../assets/severn-trent-logo.png';

export type Section = 'Overview' | 'CWQM' | 'Data Streams' | 'Concern Codes' | 'Operability';

/** One navigation order for every page (the mockups varied between screens). */
const NAV: Omit<NavItemProps, 'active'>[] = [
  { label: 'Overview', icon: <House aria-hidden /> },
  { label: 'CWQM', icon: <Network aria-hidden /> },
  { label: 'Data Streams', icon: <Activity aria-hidden /> },
  { label: 'Concern Codes', icon: <CircleAlert aria-hidden /> },
  { label: 'Operability', icon: <Gauge aria-hidden /> },
  { label: 'Compliance', icon: <ShieldCheck aria-hidden /> },
  { label: 'Equipment', icon: <Wrench aria-hidden /> },
  { label: 'Reports', icon: <FileText aria-hidden /> },
  { label: 'Alerts', icon: <Bell aria-hidden />, alert: true },
  { label: 'Settings', icon: <Settings aria-hidden /> },
];

export function AppSidebar({ active, dateRange, refreshed }: { active: Section; dateRange?: { label: string; value: string }; refreshed?: string }) {
  return (
    <Sidebar
      logo={<img src={logoUrl} alt="Severn Trent" width={176} height={79} className="h-auto w-44 rounded-sm" />}
      items={NAV.map((n) => ({ ...n, active: n.label === active }))}
      tagline={'Cleaner Rivers.\nHealthier Communities.\nA Brighter Tomorrow.'}
      footer={
        (dateRange || refreshed) && (
          <div className="space-y-md">
            {dateRange && (
              <div className="space-y-2xs">
                <p className="text-sm text-nav-muted">{dateRange.label}</p>
                <p className="flex items-center gap-xs rounded-md border border-white/20 px-sm py-xs text-sm"><CalendarDays aria-hidden className="size-4" />{dateRange.value}</p>
              </div>
            )}
            {refreshed && (
              <div className="text-sm">
                <p className="flex items-center gap-xs font-semibold text-[#3EE08A]"><span aria-hidden className="size-2.5 rounded-pill bg-[#3EE08A]" />Data refreshed</p>
                <p className="pl-md">{refreshed}</p>
              </div>
            )}
          </div>
        )
      }
    />
  );
}

export function HeaderActions({ children, notifications, share = true, exportable = true }: { children?: ReactNode; notifications?: boolean; share?: boolean; exportable?: boolean }) {
  return (
    <>
      {children}
      {notifications && <IconButton aria-label="Notifications" className="size-12"><Bell aria-hidden /></IconButton>}
      {share && <Button variant="secondary" size="lg"><Share2 aria-hidden />Share</Button>}
      {exportable && <Button variant="secondary" size="lg"><Download aria-hidden />Export</Button>}
      <IconButton aria-label="More options" className="size-12"><EllipsisVertical aria-hidden /></IconButton>
    </>
  );
}

export const icons = { ClipboardList };
