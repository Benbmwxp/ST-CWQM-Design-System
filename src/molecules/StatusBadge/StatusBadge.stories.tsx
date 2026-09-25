import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Molecules/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  args: { status: 'ok', label: 'Within limits' },
  argTypes: { status: { control: 'inline-radio', options: ['ok', 'warning', 'info', 'neutral'] } },
  parameters: {
    docs: {
      description: {
        component:
          'Encodes status with colour, shape and a text label together. Threshold wording in these examples is illustrative.',
      },
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ok: Story = {};
export const Warning: Story = { args: { status: 'warning', label: 'Approaching limit' } };
export const Info: Story = { args: { status: 'info', label: 'Under review' } };
export const Neutral: Story = { args: { status: 'neutral', label: 'No data' } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-sm">
      <StatusBadge status="ok" label="Within limits" />
      <StatusBadge status="warning" label="Approaching limit" />
      <StatusBadge status="info" label="Under review" />
      <StatusBadge status="neutral" label="No data" />
    </div>
  ),
};
