import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Share2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Apply filters' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Export' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Clear all' } };
export const Disabled: Story = { args: { disabled: true } };
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button>Apply filters</Button>
      <Button variant="secondary"><Share2 aria-hidden />Share</Button>
      <Button variant="secondary"><Download aria-hidden />Export</Button>
      <Button variant="ghost">Clear all</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Investigate high-severity event</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
