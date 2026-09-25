import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegendItem } from './LegendItem';
import { tv, PARAMETERS, parameterColour } from '../../lib/tokens';

const meta = { title: 'Molecules/LegendItem', component: LegendItem, tags: ['autodocs'], args: { colour: tv('color.data.band.95'), label: '≥ 95%', value: 112 } } satisfies Meta<typeof LegendItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithValue: Story = { args: { className: 'max-w-48' } };
export const ParameterColours: Story = {
  render: () => <div className="flex flex-wrap gap-md">{PARAMETERS.map((p) => <LegendItem key={p.key} colour={parameterColour(p.key)} label={p.key} />)}</div>,
};
