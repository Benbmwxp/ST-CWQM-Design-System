import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock } from 'lucide-react';
import { PeriodChip } from './PeriodChip';

const meta = { title: 'Molecules/PeriodChip', component: PeriodChip, tags: ['autodocs'], args: { label: 'Selected period', value: '30 Aug 2026 – 03 Sep 2026', detail: '(5 days)', className: 'w-fit' } } satisfies Meta<typeof PeriodChip>;
export default meta;
export const SelectedPeriod: StoryObj<typeof meta> = {};
export const DataFreshness: StoryObj<typeof meta> = { args: { label: 'Telemetry data available through', value: '18/09/2026 06:15', detail: undefined, icon: <Clock /> } };
