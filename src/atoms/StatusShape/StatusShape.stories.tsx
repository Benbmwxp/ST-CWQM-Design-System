import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusShape } from './StatusShape';

const meta = {
  title: 'Atoms/StatusShape',
  component: StatusShape,
  tags: ['autodocs'],
  args: { status: 'ok', size: 12 },
  argTypes: { status: { control: 'inline-radio', options: ['ok', 'warning', 'info', 'neutral'] } },
  parameters: {
    docs: { description: { component: 'Decorative shape for a status. Never used alone - pair with a text label (see Molecules/StatusBadge).' } },
  },
} satisfies Meta<typeof StatusShape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-md text-content-default text-sm">
      {(['ok', 'warning', 'info', 'neutral'] as const).map((s) => (
        <span key={s} className="flex items-center gap-2xs"><StatusShape status={s} size={16} />{s}</span>
      ))}
    </div>
  ),
};
