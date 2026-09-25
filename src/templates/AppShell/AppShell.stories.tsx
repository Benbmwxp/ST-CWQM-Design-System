import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';

const Slot = ({ label, className = '' }: { label: string; className?: string }) => (
  <div className={`flex items-center justify-center rounded-lg border-2 border-dashed border-line-strong text-content-muted ${className}`}>{label}</div>
);

const meta = {
  title: 'Templates/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: {
    sidebar: <div className="h-full w-64 bg-nav-bg" />,
    header: <Slot label="Page header" className="h-24" />,
    children: (
      <div className="space-y-lg">
        <Slot label="Filter bar + info callout" className="h-24" />
        <div className="grid grid-cols-4 gap-lg">{[1, 2, 3, 4].map((i) => <Slot key={i} label="KPI tile" className="h-28" />)}</div>
        <div className="grid grid-cols-[2fr_1fr] gap-lg"><Slot label="Main panel" className="h-96" /><Slot label="Side panels" className="h-96" /></div>
      </div>
    ),
  },
} satisfies Meta<typeof AppShell>;
export default meta;
export const Layout: StoryObj<typeof meta> = {};
