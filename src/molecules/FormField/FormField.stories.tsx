import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { SelectField } from '../SelectField/SelectField';

const meta = { title: 'Molecules/FormField', component: FormField, tags: ['autodocs'] } satisfies Meta<typeof FormField>;
export default meta;
export const WithSelect: StoryObj<typeof meta> = {
  args: { label: 'Parameter', className: 'max-w-[20rem]', children: <SelectField options={['All', 'Ammonia_NH3', 'pH']} /> },
};
