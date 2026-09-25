import { useState } from 'react';
import { ArrowDown, ArrowUp, Database, FileText, List } from 'lucide-react';
import { TextLink } from '../../atoms';
import { DateRangeField, DeltaIndicator, FormField, LegendItem, SearchField, SegmentedControl, SelectField } from '../../molecules';
import { ColumnChart, DataTable, DonutChart, FilterBar, KeyInsight, KpiTile, PageHeader, PanelCard, type Column } from '../../organisms';
import { Card } from '../../atoms';
import { AppShell } from '../../templates';
import { tv } from '../../lib/tokens';
import { AppSidebar, HeaderActions } from '../shared';
import { badReadingsDown, badReadingsUp, downstreamByTime, PARAM_KEYS, SITES, upstreamByTime } from '../data/sample';

type CodeRow = { site: string; stream: string; code: string; instances: number; share: string };
const codeRows: CodeRow[] = [
  { site: 'BuxtonDS', stream: 'Ammonia_NH3', code: 'Flatline', instances: 49, share: '33.6%' },
  { site: 'BuxtonUS', stream: 'Ammonia_NH3', code: 'Flatline', instances: 97, share: '66.4%' },
];
const codeColumns: Column<CodeRow>[] = [
  { key: 'site', header: 'Site', rowHeader: true },
  { key: 'stream', header: 'Data Stream' },
  { key: 'code', header: 'Code Name' },
  { key: 'instances', header: 'No. of Instances', align: 'center', highlight: true },
  { key: 'share', header: '% of Total', align: 'center' },
];

type Latest = (typeof badReadingsUp)[number];
const latestColumns: Column<Latest>[] = [
  { key: 'site', header: 'Site', rowHeader: true },
  { key: 'parameter', header: 'Data Stream' },
  { key: 'code', header: 'Code Name' },
  { key: 'value', header: 'Value', highlight: true, render: (r) => r.value.toFixed(4) },
  { key: 'time', header: 'Phenomenon Time', sortable: true },
];

export function ConcernCodesSiteAnalysis() {
  const [site, setSite] = useState('Buxton');
  const [param, setParam] = useState('All');
  const [code, setCode] = useState('Flatline');
  const [range, setRange] = useState({ from: '2026-08-30', to: '2026-09-03' });
  const [view, setView] = useState('Up & Down Stream');
  const [upParam, setUpParam] = useState('Ammonia_NH3');
  const [downParam, setDownParam] = useState('Ammonia_NH3');

  return (
    <AppShell
      sidebar={<AppSidebar active="Concern Codes" dateRange={{ label: 'Date range (local)', value: '30 Aug – 03 Sep 2026' }} refreshed="03 Sep 2026, 08:45" />}
      header={
        <PageHeader
          breadcrumb={[{ label: 'CWQM' }, { label: 'Concern Codes' }]}
          title="CWQM: Concern Codes – Site Analysis"
          subtitle="Analyse and investigate concern code instances by parameter for upstream and downstream locations."
          actions={<HeaderActions notifications />}
        />
      }
    >
      <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_auto]">
        <FilterBar>
          <FormField label="Site"><SearchField value={site} onChange={setSite} clearable options={SITES} /></FormField>
          <FormField label="Parameter"><SelectField value={param} onChange={(e) => setParam(e.target.value)} options={['All', ...PARAM_KEYS]} /></FormField>
          <FormField label="Date range"><DateRangeField from={range.from} to={range.to} onChange={setRange} /></FormField>
          <FormField label="Concern Code"><SelectField value={code} onChange={(e) => setCode(e.target.value)} options={['All', 'Flatline', 'Impossible value', 'Spike']} /></FormField>
        </FilterBar>
        <Card className="flex flex-col justify-center gap-2xs p-md">
          <p className="text-sm font-semibold text-content-accent">View by</p>
          <SegmentedControl label="View by" appearance="separate" options={['Up & Down Stream', 'Single Chart']} value={view} onChange={setView} />
        </Card>
      </div>

      <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={<Database />} tone="blue" label="Total Instances" eyebrow="(in selected filters)" value="146" detail={<DeltaIndicator value={8} higherIsBetter={false} comparison="vs previous period" layout="stacked" />} />
        <KpiTile icon={<ArrowUp />} tone="purple" label="Upstream Instances" value="97" detail={<DeltaIndicator value={12} higherIsBetter={false} comparison="vs previous period" layout="stacked" />} />
        <KpiTile icon={<ArrowDown />} tone="teal" label="Downstream Instances" value="49" detail={<DeltaIndicator value={-6} higherIsBetter={false} comparison="vs previous period" layout="stacked" />} />
        <KpiTile icon={<FileText />} tone="purple" label="Most Frequent Code" value="Flatline" detail="146 instances (100% of filtered data)" />
      </div>

      <div className="grid gap-lg xl:grid-cols-2">
        {[
          { title: 'Upstream – Instances by Parameter', icon: <ArrowUp />, tone: 'teal' as const, colour: tv('color.data.flow.upstream'), data: upstreamByTime, p: upParam, setP: setUpParam, max: 30 },
          { title: 'Downstream – Instances by Parameter', icon: <ArrowDown />, tone: 'purple' as const, colour: tv('color.data.flow.downstream'), data: downstreamByTime, p: downParam, setP: setDownParam, max: 20 },
        ].map((c) => (
          <PanelCard
            key={c.title} icon={c.icon} iconTone={c.tone} iconVariant="solid" title={c.title}
            actions={<label className="flex items-center gap-xs text-sm text-content-subtle">Parameter<SelectField size="sm" className="w-44" value={c.p} onChange={(e) => c.setP(e.target.value)} options={PARAM_KEYS} /></label>}
          >
            <ColumnChart label={c.title} data={c.data} colour={c.colour} seriesLabel={c.p} yLabel="No. of Instances" yDomain={[0, c.max]} yTicks={c.max === 30 ? [0, 10, 20, 30] : [0, 10, 20]} />
          </PanelCard>
        ))}
      </div>

      <div className="grid items-start gap-lg xl:grid-cols-2">
        <div className="space-y-lg">
          <PanelCard icon={<List />} iconVariant="solid" title="E&C Codes – Instances" titleSuffix="(in the selected filters data)">
            <div className="flex flex-wrap items-center gap-lg">
              <div className="min-w-0 flex-1">
                <DataTable caption="E&C code instances by site" columns={codeColumns} rows={codeRows} getRowKey={(r) => r.site} dense striped={false} />
                <div className="flex justify-between px-sm py-sm text-lg font-bold text-content-default"><span>Total</span><span className="tabular">146 &nbsp;&nbsp; 100%</span></div>
              </div>
              <div className="flex flex-col items-center gap-sm">
                <DonutChart
                  label="Upstream and downstream share of instances" size={170} thickness={20}
                  segments={[{ label: 'Upstream', value: 97, colour: tv('color.data.flow.upstream') }, { label: 'Downstream', value: 49, colour: tv('color.data.flow.downstream') }]}
                  centre={<><span className="text-3xl font-extrabold text-content-heading">146</span><span className="text-sm leading-tight text-content-subtle">Total<br />instances</span></>}
                />
                <ul className="w-56 space-y-2xs">
                  <li><LegendItem colour={tv('color.data.flow.upstream')} label="Upstream" value="97 (66.4%)" /></li>
                  <li><LegendItem colour={tv('color.data.flow.downstream')} label="Downstream" value="49 (33.6%)" /></li>
                </ul>
              </div>
            </div>
          </PanelCard>
          <KeyInsight>Flatline is the most frequent concern code for Ammonia_NH3 at Buxton, with higher instances upstream (66.4%) compared to downstream (33.6%) in the selected period.</KeyInsight>
        </div>
        <div className="space-y-lg">
          {[
            { title: 'Upstream Instances (Latest)', icon: <ArrowUp />, rows: badReadingsUp },
            { title: 'Downstream Instances (Latest)', icon: <ArrowDown />, rows: badReadingsDown },
          ].map((t) => (
            <PanelCard key={t.title} icon={t.icon} title={t.title} actions={<TextLink>View all</TextLink>}>
              <DataTable caption={t.title} columns={latestColumns} rows={t.rows.slice(0, 4)} getRowKey={(r) => r.time} dense />
            </PanelCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
