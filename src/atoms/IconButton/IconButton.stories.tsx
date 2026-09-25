import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, EllipsisVertical } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = { title: 'Atoms/IconButton', component: IconButton, tags: ['autodocs'], args: { 'aria-label': 'More options', children: <EllipsisVertical aria-hidden /> } } satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const More: Story = {};
export const Notifications: Story = { args: { 'aria-label': 'Notifications', children: <Bell aria-hidden /> } };
