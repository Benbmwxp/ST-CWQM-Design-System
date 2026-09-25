import type { Meta, StoryObj } from '@storybook/react-vite';
import { ValueBar } from './ValueBar';
import { tv } from '../../lib/tokens';

const meta = { title: 'Molecules/ValueBar', component: ValueBar, tags: ['autodocs'], args: { label: 'Ammonia_NH3', value: 68.4, colour: tv('color.data.band.50'), className: 'max-w-[28rem]' } } satisfies Meta<typeof ValueBar>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const High: StoryObj<typeof meta> = { args: { label: 'pH', value: 99.4, colour: tv('color.data.band.70') } };
