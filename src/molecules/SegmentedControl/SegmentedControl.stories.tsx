import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = { title: 'Molecules/SegmentedControl', component: SegmentedControl, tags: ['autodocs'] } satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const TimeRange: Story = {
  args: { options: ['1D', '7D', '30D', '90D', '180D'], value: '7D', onChange: () => {}, label: 'Time range' },
  render: (a) => { const [v, setV] = useState(a.value); return <SegmentedControl {...a} value={v} onChange={setV} />; },
};
export const QuickFilters: Story = {
  args: { options: ['Last 7 days', 'Last 30 days', 'Last 90 days'], value: 'Last 7 days', onChange: () => {}, label: 'Quick filters', appearance: 'separate' },
  render: (a) => { const [v, setV] = useState(a.value); return <SegmentedControl {...a} value={v} onChange={setV} />; },
};
