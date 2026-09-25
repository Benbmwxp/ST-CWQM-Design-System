import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, CircleAlert } from 'lucide-react';
import { NavItem } from './NavItem';

const meta = {
  title: 'Molecules/NavItem', component: NavItem, tags: ['autodocs'],
  args: { icon: <CircleAlert aria-hidden />, label: 'Concern Codes' },
  decorators: [(S) => <div className="w-60 bg-nav-bg p-sm"><S /></div>],
} satisfies Meta<typeof NavItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const WithAlert: Story = { args: { icon: <Bell aria-hidden />, label: 'Alerts', alert: true } };
