import { useState } from 'react';
import { Activity, BarChart3, CalendarDays, EllipsisVertical, Flag, Info, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import { Button, IconButton, Input, TextLink } from '../../atoms';
import { DeltaIndicator, FormField, LegendItem, SearchField, SegmentedControl, SelectField } from '../../molecules';
import { ColumnChart, DonutChart, DualAxisChart, FilterBar, InsightStepCard, KpiTile, MetricList, PageHeader, PanelCard } from '../../organisms';
import { AppShell } from '../../templates';
import { tv } from '../../lib/tokens';
import { AppSidebar, HeaderActions } from '../shared';
import { PARAM_KEYS, SITES, streamSeries } from '../data/sample';

const white = '[&_*]:!text-white';

export function DataStreams() {
  const [site, setSite] = useState('LittleAston');
  const [param, setParam] = useState('All');
  const [range, setRange] = useState('7D');
  const [mode, setMode] = useState<'Line' | 'Area'>('Area');
  const [compare, setCompare] = useState('Absolute');

  const primary = tv('color.data.stream.primary');
  const secondary = tv('color.data.stream.secondary');
  const quality = [
    { label: 'Good', value: 98.6, colour: tv('color.data.quality.good') },
    { label: 'Fair', value: 1.2, colour: tv('color.data.quality.fair') },
    { label: 'Poor', value: 0.2, colour: tv('color.data.quality.poor') },
  ];

  return (
    <AppShell
      sidebar={<AppSidebar active="Data Streams" dateRange={{ label: 'Date range (local)', value: '18 – 25 Jun 2026' }} refreshed="25 Jun 2026, 08:45" />}
      header={
        <PageHeader
          title="CWQM: Data Streams Analysis"
          subtitle="Dual-axis view of two correlated data streams. Understand the relationship between physical and index values over time."
          actions={<HeaderActions exportable={false} />}
        />
      }
    >
      <FilterBar>
        <FormField label="Site"><SearchField value={site} onChange={setSite} clearable options={SITES} /></FormField>
        <FormField label="Parameter"><SelectField value={param} onChange={(e) => setParam(e.target.value)} options={['All', ...PARAM_KEYS]} /></FormField>
        <FormField label="Data Streams (2)"><SelectField options={['SpConductivity_us & Index Value', 'Temperature & Index Value']} /></FormField>
        <FormField label="From"><Input type="date" defaultValue="2026-06-18" /></FormField>
        <FormField label="To"><Input type="date" defaultValue="2026-06-25" /></FormField>
        <div className="flex h-full items-end"><Button size="lg" block>Apply</Button></div>
      </FilterBar>

      <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile variant="solid" tone="teal" icon={<Activity />} eyebrow="Primary stream" label="SpConductivity_us" value="21.3" unit="µS/cm" detail="Avg (selected range)" trend={[16, 17, 16.5, 19, 18, 21, 24]} footer={<DeltaIndicator value={8.4} comparison="vs previous 7 days" className={white} />} />
        <KpiTile variant="solid" tone="purple" icon={<BarChart3 />} eyebrow="Secondary stream" label="Index Value" value="0.62" detail="Avg (selected range)" trend={[0.5, 0.52, 0.51, 0.58, 0.55, 0.6, 0.66]} footer={<DeltaIndicator value={-3.1} unit="%" comparison="vs previous 7 days" className={white} />} />
        <KpiTile variant="solid" tone="navy" icon={<Activity />} eyebrow="Correlation (R)" label="Strong positive" value="0.84" trend={[0.7, 0.72, 0.71, 0.78, 0.76, 0.8, 0.84]} footer={<DeltaIndicator value={5} comparison="vs previous 7 days" className={white} />} />
        <KpiTile variant="solid" tone="blue" icon={<ShieldCheck />} eyebrow="Data quality (both)" label="Good" value="98.6%" trend={[97.6, 97.9, 97.8, 98.2, 98.1, 98.4, 98.6]} footer={<DeltaIndicator value={0.6} comparison="vs previous 7 days" className={white} />} />
      </div>

      <div className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_420px]">
        <PanelCard
          title="Dual Data Stream Analysis"
          actions={
            <>
              <SegmentedControl label="Time range" size="sm" options={['1D', '7D', '30D', '90D', '180D']} value={range} onChange={setRange} />
              <SegmentedControl label="Chart style" size="sm" options={['Line', 'Area'] as const} value={mode} onChange={setMode} />
              <IconButton aria-label="Chart options" size="sm"><EllipsisVertical aria-hidden /></IconButton>
            </>
          }
        >
          <DualAxisChart
            label="SpConductivity and Index Value, 18 to 25 June 2026"
            summary="Both streams rise and fall together. Three events are marked: 1 on 19 June, 2 on 21 June, 3 on 24 June."
            data={streamSeries} xKey="label" mode={mode === 'Area' ? 'area' : 'line'} legendPosition="top" navigator height={420}
            xTickFormat={(v) => v.split(' ').slice(0, 2).join(' ')} xInterval={3}
            leftAxis={{ label: 'SpConductivity_us (µS/cm)', domain: [0, 50], ticks: [0, 10, 20, 30, 40, 50], colour: primary }}
            rightAxis={{ label: 'Index Value (0–2 scale)', domain: [0, 2], ticks: [0, 0.5, 1, 1.5, 2], colour: secondary }}
            series={[
              { key: 'conductivity', label: 'SpConductivity_us (µS/cm)', colour: primary, axis: 'left', format: (v) => `${v} µS/cm` },
              { key: 'index', label: 'Index Value (0–2 scale)', colour: secondary, axis: 'right', format: (v) => v.toFixed(2) },
            ]}
            markers={[
              { x: streamSeries[6].label, y: streamSeries[6].index, axis: 'right', label: '1' },
              { x: streamSeries[11].label, y: streamSeries[11].conductivity, axis: 'left', label: '2' },
              { x: streamSeries[25].label, y: streamSeries[25].index, axis: 'right', label: '3' },
            ]}
          />
          <p className="mt-xs flex items-center gap-xs text-sm text-content-subtle"><Info aria-hidden className="size-4" />Drag the handles under the chart to adjust the visible time range.</p>
        </PanelCard>

        <div className="space-y-lg">
          <PanelCard title="Key Metrics">
            <MetricList
              items={[
                { icon: <Activity />, tone: 'blue', label: 'SpConductivity_us', value: '21.3 µS/cm', detail: <DeltaIndicator value={8.4} /> },
                { icon: <BarChart3 />, tone: 'purple', label: 'Index Value', value: '0.62', detail: <DeltaIndicator value={-3.1} /> },
                { icon: <Target />, tone: 'teal', label: 'Correlation (R)', value: '0.84', detail: <DeltaIndicator value={5} /> },
                { icon: <ShieldCheck />, tone: 'green', label: 'Data Quality (Both)', value: '98.6%', detail: <DeltaIndicator value={0.6} /> },
              ]}
            />
          </PanelCard>
          <PanelCard title="Stream Comparison" titleSuffix="(Averages)" actions={<SegmentedControl label="Comparison" size="sm" options={['Absolute', 'Relative (%)']} value={compare} onChange={setCompare} />}>
            <ColumnChart
              label="Average of each stream" seriesLabel="Average" yLabel="Average Value" colour={primary} showLegend={false} height={220} yDomain={[0, 40]}
              data={[{ label: 'SpConductivity_us\n(µS/cm)', value: 21.3, colour: primary }, { label: 'Index Value\n(0–2 scale)', value: 0.62, colour: secondary }]}
            />
          </PanelCard>
        </div>
      </div>

      <section aria-labelledby="insights" className="space-y-md">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="insights" className="text-2xl font-bold text-content-accent">Data Confidence & Insights</h2>
            <p className="text-md text-content-subtle">Understand the data quality, identified events and what the data is telling us.</p>
          </div>
          <TextLink>View all insights</TextLink>
        </div>
        <div className="grid gap-lg md:grid-cols-2 xl:grid-cols-4">
          <InsightStepCard step={1} title="Data Confidence" tone="green">
            <div className="flex items-center gap-md">
              <DonutChart label="Reading quality" size={130} thickness={16} segments={quality} centre={<span className="text-2xl font-extrabold text-content-heading">98.6%</span>} />
              <ul className="flex-1 space-y-2xs">{quality.map((q) => <li key={q.label}><LegendItem colour={q.colour} label={q.label} value={`${q.value}%`} /></li>)}</ul>
            </div>
            <p className="mt-sm text-sm text-content-subtle">98.6% of readings passed quality checks. 1.2% require review and 0.2% have significant issues.</p>
          </InsightStepCard>
          <InsightStepCard step={2} title="Events Requiring Attention" tone="purple">
            <p className="flex items-center gap-sm"><CalendarDays aria-hidden className="size-7 text-content-accent" /><span className="text-3xl font-extrabold text-content-heading">3</span><span className="text-sm">unusual events detected in the selected period.</span></p>
            <ul className="my-sm space-y-2xs">
              {[['High', 'severity.high', 'Investigate first'], ['Medium', 'severity.medium', 'Review required'], ['Low', 'severity.low', 'Monitor']].map(([l, t, a]) => (
                <li key={l} className="grid grid-cols-[1fr_auto_1.4fr] gap-sm text-sm"><LegendItem colour={tv(`color.data.${t}`)} label={l} /><span>1</span><span className="text-content-subtle">{a}</span></li>
              ))}
            </ul>
            <Button variant="secondary" block>View Anomalies</Button>
          </InsightStepCard>
          <InsightStepCard step={3} title="What the Data Shows" tone="blue">
            <p className="flex gap-sm"><Lightbulb aria-hidden className="size-6 shrink-0 text-content-accent" /><span>Both streams show a strong positive correlation (R = 0.84). Index Value tends to rise when SpConductivity_us increases, with a slight lag.</span></p>
            <p className="mt-sm rounded-md bg-surface-accent p-sm text-sm text-content-subtle">Correlation indicates the streams move together; it does not necessarily mean one causes the other.</p>
          </InsightStepCard>
          <InsightStepCard step={4} title="Recommended Next Step" tone="green">
            <p className="flex gap-sm"><Flag aria-hidden className="size-6 shrink-0 text-feedback-positive" /><span>Investigate the high-severity event to understand the cause and whether any action is required.</span></p>
            <Button className="mt-md" size="lg" block>Investigate High-Severity Event</Button>
          </InsightStepCard>
        </div>
      </section>
    </AppShell>
  );
}
