import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = { title: 'Molecules/Breadcrumb', component: Breadcrumb, tags: ['autodocs'], args: { items: [{ label: 'CWQM' }, { label: 'Concern Codes' }] } } satisfies Meta<typeof Breadcrumb>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
