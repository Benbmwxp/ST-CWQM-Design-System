import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectField } from './SelectField';

const meta = { title: 'Molecules/SelectField', component: SelectField, tags: ['autodocs'], args: { options: ['All', 'Ammonia_NH3', 'Ammonium_NH4', 'pH'], 'aria-label': 'Parameter', className: 'max-w-[20rem]' } } satisfies Meta<typeof SelectField>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Small: StoryObj<typeof meta> = { args: { size: 'sm' } };
