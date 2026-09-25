import type { Meta, StoryObj } from '@storybook/react-vite';
import { DualAxisChart } from './DualAxisChart';
import { GroupedBarChart, ColumnChart } from './BarCharts';
import { DonutChart } from './DonutChart';
import { tv, PARAMETERS, parameterColour } from '../../lib/tokens';

const meta = { title: 'Organisms/Charts', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj;

const trend = ['30 Aug\n00:00', '31 Aug\n00:00', '01 Sep\n00:00', '02 Sep\n00:00', '03 Sep\n00:00'].map((t, i) => ({
  t, operability: [97.27, 97.01, 97.4, 97.4, 98.31][i], missing: [0.4, 0.5, 0.4, 0.4, 0.3][i], bad: [1.8, 2, 1.8, 1.7, 1.4][i],
}));
const pct = (v: number) => `${v.toFixed(2)}%`;

export const DualAxisTrend: Story = {
  render: () => (
    <DualAxisChart
      label="Operability trend, upstream" data={trend} xKey="t"
      leftAxis={{ label: 'Operability %', domain: [90, 100], ticks: [90, 92, 94, 96, 98, 100], format: (v) => `${v}%` }}
      rightAxis={{ label: 'Missing & Bad Data %', domain: [0, 10], ticks: [0, 2, 4, 6, 8, 10], format: (v) => `${v}%` }}
      series={[
        { key: 'operability', label: 'Operability%', colour: tv('color.data.trend.operability'), axis: 'left', showLabels: true, format: pct },
        { key: 'missing', label: 'Missing Data%', colour: tv('color.data.trend.missing'), axis: 'right', dashed: true, format: pct },
        { key: 'bad', label: 'Total Bad Data%', colour: tv('color.data.trend.bad'), axis: 'right', dashed: true, format: pct },
      ]}
    />
  ),
};

export const GroupedBars: Story = {
  render: () => (
    <GroupedBarChart
      label="Available vs expected readings" xKey="d" yLabel="Readings" yDomain={[0, 120]} yTicks={[0, 20, 40, 60, 80, 100, 120]}
      data={['30 Aug', '31 Aug', '01 Sep', '02 Sep', '03 Sep'].map((d, i) => ({ d, ...Object.fromEntries(PARAMETERS.map((p) => [p.key, i === 4 ? 88 : 96])) }))}
      series={PARAMETERS.map((p) => ({ key: p.key, label: p.key, colour: parameterColour(p.key) }))}
    />
  ),
};

export const Columns: Story = {
  render: () => (
    <ColumnChart label="Upstream instances by parameter" seriesLabel="Ammonia_NH3" yLabel="No. of Instances" colour={tv('color.data.flow.upstream')} yDomain={[0, 30]}
      data={[{ label: '30 Aug\n00:00', value: 21 }, { label: '30 Aug\n12:00', value: 23 }, { label: '31 Aug\n00:00', value: 20 }, { label: '01 Sep\n00:00', value: 20 }, { label: '02 Sep\n00:00', value: 13 }]} />
  ),
};

export const Donut: Story = {
  render: () => (
    <DonutChart
      label="Operability bands"
      segments={[{ label: '≥ 95%', value: 112, colour: tv('color.data.band.95') }, { label: '70 – 95%', value: 14, colour: tv('color.data.band.70') }, { label: '50 – 70%', value: 4, colour: tv('color.data.band.50') }, { label: '30 – 50%', value: 2, colour: tv('color.data.band.30') }, { label: '< 30%', value: 4, colour: tv('color.data.band.0') }]}
      centre={<><span className="text-3xl font-extrabold text-content-heading">86.2%</span><span className="text-sm text-content-subtle">Average<br />Operability</span></>}
    />
  ),
};
