import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from './TextLink';

const meta = { title: 'Atoms/TextLink', component: TextLink, tags: ['autodocs'], args: { children: 'View all' } } satisfies Meta<typeof TextLink>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const NoArrow: StoryObj<typeof meta> = { args: { arrow: false, children: 'Clear all' } };
