import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColourDot } from './ColourDot';
import { tv } from '../../lib/tokens';

const meta = { title: 'Atoms/ColourDot', component: ColourDot, tags: ['autodocs'], args: { colour: tv('color.data.trend.operability') } } satisfies Meta<typeof ColourDot>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Dot: Story = {};
export const Line: Story = { args: { shape: 'line', colour: tv('color.data.stream.primary') } };
export const Square: Story = { args: { shape: 'square', colour: tv('color.data.flow.downstream') } };
