import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoCallout } from './InfoCallout';

const meta = { title: 'Molecules/InfoCallout', component: InfoCallout, tags: ['autodocs'], args: { className: 'max-w-[42rem]', children: 'Operability shows the percentage of valid readings for each parameter at each site. Darker colours indicate higher operability.' } } satisfies Meta<typeof InfoCallout>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const WithTitle: StoryObj<typeof meta> = { args: { title: 'About Operability', children: 'Operability % shows the proportion of valid readings received for each parameter at each site.' } };
