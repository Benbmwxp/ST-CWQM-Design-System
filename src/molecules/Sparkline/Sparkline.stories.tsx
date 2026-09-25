import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkline } from './Sparkline';
import { tv } from '../../lib/tokens';

const meta = { title: 'Molecules/Sparkline', component: Sparkline, tags: ['autodocs'], args: { values: [2, 3, 2.5, 5, 4.2, 6.5, 8], colour: tv('color.content.accent') } } satisfies Meta<typeof Sparkline>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
