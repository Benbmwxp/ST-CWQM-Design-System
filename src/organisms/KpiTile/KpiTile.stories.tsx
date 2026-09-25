import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity, BarChart3, FileText, TriangleAlert } from 'lucide-react';
import { KpiTile } from './KpiTile';
import { DeltaIndicator } from '../../molecules/DeltaIndicator/DeltaIndicator';

const meta = { title: 'Organisms/KpiTile', component: KpiTile, tags: ['autodocs'], decorators: [(S) => <div className="max-w-[28rem]"><S /></div>] } satisfies Meta<typeof KpiTile>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Soft: Story = { args: { icon: <BarChart3 />, tone: 'blue', label: 'Total Expected Readings', value: '1,200', detail: 'Across 8 parameters (Buxton)' } };
export const WithDelta: Story = { args: { icon: <FileText />, tone: 'blue', label: 'Total Instances', value: 146, detail: <DeltaIndicator value={8} higherIsBetter={false} comparison="vs previous period" layout="stacked" /> } };
export const Tinted: Story = { args: { icon: <TriangleAlert />, tone: 'red', variant: 'tinted', label: 'Unique Concern Codes', value: 1, detail: 'Flatline (in selected filters)' } };
export const Solid: Story = {
  args: {
    icon: <Activity />, tone: 'teal', variant: 'solid', eyebrow: 'Primary stream', label: 'SpConductivity_us', value: '21.3', unit: 'µS/cm',
    detail: 'Avg (selected range)', trend: [18, 19, 18.5, 21, 20, 22.5, 24],
    footer: <DeltaIndicator value={8.4} comparison="vs previous 7 days" className="[&_*]:!text-white" />,
  },
};
