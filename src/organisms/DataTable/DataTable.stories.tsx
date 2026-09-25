import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type Column } from './DataTable';
import { StatusShape } from '../../atoms/StatusShape/StatusShape';

type Row = { site: string; stream: string; code: string; value: number; time: string };
const rows: Row[] = Array.from({ length: 8 }, (_, i) => ({
  site: 'BuxtonDS', stream: 'Ammonia_NH3', code: 'Flatline', value: 0.0026 + i * 0.0002, time: `30/08/2026 ${String(7 + i).padStart(2, '0')}:00:00`,
}));
const columns: Column<Row>[] = [
  { key: 'site', header: 'Site', sortable: true, rowHeader: true },
  { key: 'stream', header: 'Data Stream', sortable: true },
  { key: 'code', header: 'Code Name', sortable: true, render: (r) => <span className="inline-flex items-center gap-xs"><StatusShape status="neutral" />{r.code}</span> },
  { key: 'value', header: 'Value', sortable: true, highlight: true, render: (r) => r.value.toFixed(4) },
  { key: 'time', header: 'Phenomenon Time', sortable: true },
];

const meta = { title: 'Organisms/DataTable', component: DataTable<Row>, tags: ['autodocs'] } satisfies Meta<typeof DataTable<Row>>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Subtle: Story = { args: { caption: 'Concern code instances', columns, rows, getRowKey: (r) => r.time, onRowAction: () => {} } };
export const StrongHeader: Story = { args: { ...Subtle.args!, headerTone: 'strong', dense: true, onRowAction: undefined } as never };
export const ScrollingBody: Story = { args: { ...Subtle.args!, maxHeight: 220 } as never };
