import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = { title: 'Molecules/SearchField', component: SearchField, tags: ['autodocs'], args: { value: '', onChange: () => {}, 'aria-label': 'Search site' } } satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Search: Story = {
  render: (a) => { const [v, setV] = useState(''); return <SearchField {...a} value={v} onChange={setV} placeholder="Search site…" className="max-w-[20rem]" />; },
};
export const SitePicker: Story = {
  render: (a) => { const [v, setV] = useState('Buxton'); return <SearchField {...a} value={v} onChange={setV} clearable options={['Buxton', 'Goscote', 'LittleAston', 'Trescott']} className="max-w-[20rem]" />; },
};
