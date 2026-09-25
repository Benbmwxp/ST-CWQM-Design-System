import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { tv } from '../../lib/tokens';

const meta = { title: 'Atoms/ProgressBar', component: ProgressBar, tags: ['autodocs'], args: { value: 68.4, label: 'Ammonia_NH3 average', className: 'max-w-[24rem]' } } satisfies Meta<typeof ProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Missing: Story = { args: { value: 12, colour: tv('color.data.missing'), track: tv('color.data.missing-track') } };
