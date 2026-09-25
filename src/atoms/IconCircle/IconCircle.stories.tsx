import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity } from 'lucide-react';
import { IconCircle } from './IconCircle';

const tones = ['blue', 'red', 'teal', 'orange', 'green', 'pink', 'purple', 'navy'] as const;
const meta = { title: 'Atoms/IconCircle', component: IconCircle, tags: ['autodocs'], args: { tone: 'blue', children: <Activity /> } } satisfies Meta<typeof IconCircle>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const AllTones: Story = {
  render: () => (
    <div className="space-y-md">
      {(['soft', 'solid'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-sm">
          {tones.map((t) => <IconCircle key={t} tone={t} variant={variant} size="lg"><Activity /></IconCircle>)}
        </div>
      ))}
    </div>
  ),
};
