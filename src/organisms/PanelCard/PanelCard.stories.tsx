import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart3 } from 'lucide-react';
import { PanelCard } from './PanelCard';
import { TextLink } from '../../atoms/TextLink/TextLink';

const meta = { title: 'Organisms/PanelCard', component: PanelCard, tags: ['autodocs'] } satisfies Meta<typeof PanelCard>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  args: {
    icon: <BarChart3 />, title: 'Site-Level Average %', description: '(Each site value is averaged across the selected parameter(s) and date period.)',
    actions: <TextLink>View all</TextLink>, className: 'max-w-[36rem]',
    children: <div className="h-32 rounded-md border border-dashed border-line-strong" />,
  },
};
