import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = { title: 'Atoms/Input', component: Input, tags: ['autodocs'], args: { placeholder: 'Min', 'aria-label': 'Minimum value', className: 'max-w-48' } } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: '0.0021' } };
export const Disabled: Story = { args: { disabled: true } };
