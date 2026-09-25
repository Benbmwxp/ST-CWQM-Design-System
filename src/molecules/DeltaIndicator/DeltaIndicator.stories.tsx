import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeltaIndicator } from './DeltaIndicator';

const meta = {
  title: 'Molecules/DeltaIndicator',
  component: DeltaIndicator,
  tags: ['autodocs'],
  args: { value: 0.91, comparison: 'vs previous day' },
  parameters: { docs: { description: { component: 'Arrow shows direction; colour shows whether the change is good or bad for that metric. Set higherIsBetter=false for metrics like missing data or concern code instances.' } } },
} satisfies Meta<typeof DeltaIndicator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Improvement: Story = {};
export const Decline: Story = { args: { value: -7.81 } };
export const MissingDataRose: Story = { args: { value: 6.45, higherIsBetter: false } };
export const MissingDataFell: Story = { args: { value: -0.18, higherIsBetter: false } };
export const Stacked: Story = { args: { layout: 'stacked' } };
