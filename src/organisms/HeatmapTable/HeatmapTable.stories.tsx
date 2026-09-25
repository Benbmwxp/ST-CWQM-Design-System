import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeatmapTable } from './HeatmapTable';

const cols = ['Ammonia_NH3', 'Ammonium_NH4', 'pH', 'Turbidity'];
const mk = (label: string, v: number[]) => ({ label, values: Object.fromEntries(cols.map((c, i) => [c, v[i]])) });
const meta = {
  title: 'Organisms/HeatmapTable', component: HeatmapTable, tags: ['autodocs'],
  args: {
    caption: 'Operability % by site and parameter', rowHeader: 'Site', columns: cols,
    rows: [mk('TideswellDS', [0, 0, 0, 0]), mk('GoscoteUS', [13.75, 100, 100, 100]), mk('LittleAston_US', [45, 100, 100, 99.79]), mk('ShenstoneUS', [52.71, 98.33, 100, 32.92]), mk('BuxtonUS', [79.79, 100, 96.25, 100]), mk('BuxtonDS', [88.13, 93.33, 98.33, 100])],
  },
} satisfies Meta<typeof HeatmapTable>;
export default meta;
export const WithValues: StoryObj<typeof meta> = {};
export const ColourOnly: StoryObj<typeof meta> = { args: { showValues: false } };
