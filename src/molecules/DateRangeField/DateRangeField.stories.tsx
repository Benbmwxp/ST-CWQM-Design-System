import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangeField } from './DateRangeField';

const meta = { title: 'Molecules/DateRangeField', component: DateRangeField, tags: ['autodocs'], args: { from: '2026-08-30', to: '2026-09-03', onChange: () => {} } } satisfies Meta<typeof DateRangeField>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: (a) => { const [r, setR] = useState({ from: a.from, to: a.to }); return <DateRangeField {...r} onChange={setR} className="max-w-[28rem]" />; },
};
