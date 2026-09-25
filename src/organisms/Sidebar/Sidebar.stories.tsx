import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, CircleAlert, Gauge, House } from 'lucide-react';
import { Sidebar } from './Sidebar';
import logoUrl from '../../assets/severn-trent-logo.png';

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [(S) => <div className="h-[760px]"><S /></div>],
  args: {
    logo: <img src={logoUrl} alt="Severn Trent" width={176} height={79} className="h-auto w-44 rounded-sm" />,
    items: [
      { label: 'Overview', icon: <House aria-hidden /> },
      { label: 'Concern Codes', icon: <CircleAlert aria-hidden />, active: true },
      { label: 'Operability', icon: <Gauge aria-hidden /> },
      { label: 'Alerts', icon: <Bell aria-hidden />, alert: true },
    ],
    tagline: 'Cleaner Rivers.\nHealthier Communities.\nA Brighter Tomorrow.',
  },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithLogo: Story = {};
export const LogoPlaceholder: Story = { args: { logo: undefined } };
