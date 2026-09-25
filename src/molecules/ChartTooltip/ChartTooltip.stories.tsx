import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartTooltip } from './ChartTooltip';
import { tv } from '../../lib/tokens';

const meta = {
  title: 'Molecules/ChartTooltip', component: ChartTooltip, tags: ['autodocs'],
  args: { title: '21 Jun 2026 14:00', rows: [
    { label: 'SpConductivity_us', value: '28.7 µS/cm', colour: tv('color.data.stream.primary') },
    { label: 'Index Value', value: '0.92', colour: tv('color.data.stream.secondary') },
  ] },
} satisfies Meta<typeof ChartTooltip>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
