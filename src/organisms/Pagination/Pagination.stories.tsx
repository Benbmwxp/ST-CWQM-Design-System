import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = { title: 'Organisms/Pagination', component: Pagination, tags: ['autodocs'], args: { page: 1, pageSize: 25, total: 146, onPageChange: () => {} } } satisfies Meta<typeof Pagination>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: (a) => { const [p, setP] = useState(1); const [s, setS] = useState(25); return <Pagination {...a} page={p} pageSize={s} onPageChange={setP} onPageSizeChange={(n) => { setS(n); setP(1); }} />; },
};
