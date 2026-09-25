import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = { title: 'Atoms/Switch', component: Switch, tags: ['autodocs'], args: { checked: true, label: 'Show values', onChange: () => {} } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interactive: Story = {
  render: (args) => {
    const [on, setOn] = useState(args.checked);
    return <Switch {...args} checked={on} onChange={setOn} />;
  },
};
export const Off: Story = { args: { checked: false } };
