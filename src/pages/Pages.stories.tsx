import type { Meta, StoryObj } from '@storybook/react-vite';
import { OperabilityAllSites, OperabilityTrend, MissingData, ConcernCodesData, ConcernCodesSiteAnalysis, DataStreams } from './index';

const meta = {
  title: 'Pages/CWQM Dashboards',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'The six CWQM dashboards rebuilt from the library, with sample data from the mockups. Use the toolbar to switch between light and dark. Best viewed at 1600px wide or more.' } },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj;

export const OperabilityAllSitesPage: Story = { name: 'Operability – All Sites', render: () => <OperabilityAllSites /> };
export const OperabilityTrendPage: Story = { name: 'Operability Trend Analysis', render: () => <OperabilityTrend /> };
export const MissingDataPage: Story = { name: 'Missing Data', render: () => <MissingData /> };
export const ConcernCodesDataPage: Story = { name: 'Concern Codes Data', render: () => <ConcernCodesData /> };
export const ConcernCodesSiteAnalysisPage: Story = { name: 'Concern Codes – Site Analysis', render: () => <ConcernCodesSiteAnalysis /> };
export const DataStreamsPage: Story = { name: 'Data Streams Analysis', render: () => <DataStreams /> };
