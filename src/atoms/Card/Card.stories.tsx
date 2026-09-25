import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = { title: 'Atoms/Card', component: Card, tags: ['autodocs'], args: { className: 'p-xl max-w-[28rem]', children: 'Card content sits on the default surface.' } } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Accent: Story = { args: { tone: 'accent', children: 'Accent surface, used for information panels.' } };
