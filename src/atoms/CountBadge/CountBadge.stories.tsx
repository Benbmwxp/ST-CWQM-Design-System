import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountBadge } from './CountBadge';

const meta = { title: 'Atoms/CountBadge', component: CountBadge, tags: ['autodocs'], args: { count: 2, label: 'filters applied' } } satisfies Meta<typeof CountBadge>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
