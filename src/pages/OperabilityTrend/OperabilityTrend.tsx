import { useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, BarChart3, CircleAlert, Grid2x2, Settings2 } from 'lucide-react';
import { TextLink } from '../../atoms';
import { DateRangeField, DeltaIndicator, FormField, InfoCallout, PeriodChip, SearchField, SelectField } from '../../molecules';
import { DataTable, DualAxisChart, FilterBar, MetricList, PageHeader, PanelCard, type Column, type DualAxisSeries } from '../../organisms';
import { AppShell } from '../../templates';
import { tv } from '../../lib/tokens';
import { operabilityColours } from '../../lib/operability';
import { AppSidebar, HeaderActions } from '../shared';
import { badReadingsDown, badReadingsUp, breakdown, downstreamTrend, PARAM_KEYS, SITES, upstreamTrend } from '../data/sample';

const pct = (v: number) => `${v.toFixed(2)}%`;
const series: DualAxisSeries[] = [
  { key: 'operability', label: 'Operability%', colour: tv('color.data.trend.operability'), axis: 'left', showLabels: true, format: pct },
  { key: 'missing', label: 'Missing Data%', colour: tv('color.data.trend.missing'), axis: 'right', dashed: true, format: pct },
  { key: 'bad', label: 'Total Bad Data%', colour: tv('color.data.trend.bad'), axis: 'right', dashed: true, format: pct },
];
const axes = {
  leftAxis: { label: 'Operability %', domain: [90, 100] as [number, number], ticks: [90, 92, 94, 96, 98, 100], format: (v: number) => `${v}%` },
  rightAxis: { label: 'Missing & Bad Data %', domain: [0, 10] as [number, number], ticks: [0, 2, 4, 6, 8, 10], format: (v: number) => `${v}%` },
};

/** Tints for data-quality columns: higher is worse. */
const qualityStyle = (v: number) =>
  v === 0 ? {} : { background: `color-mix(in oklab, ${tv(v >= 5 ? 'color.feedback.negative' : 'color.feedback.warning')} ${v >= 5 ? 28 : 22}%, ${tv('color.surface.default')})`, color: tv(v >= 5 ? 'color.feedback.negative' : 'color.feedback.warning') };

type BreakdownRow = (typeof breakdown)[number];
const METRICS = ['Operability %', 'Missing Data %', 'Total Bad Data %', 'Flatline %', 'Impossible Value %'];
const PARAMS = ['Ammonia_NH3', 'Ammonium_NH4', 'ODO_mgL'] as const;
const breakdownColumns: Column<BreakdownRow>[] = [
  { key: 'site', header: 'Site', rowHeader: true },
  ...PARAMS.flatMap((p) =>
    METRICS.map((m, mi) => ({
      key: `${p}-${mi}`,
      header: m,
      align: 'center' as const,
      render: (r: BreakdownRow) => pct(r[p][mi]),
      cellStyle: (r: BreakdownRow) => (mi === 0 ? operabilityColours(r[p][mi]) : qualityStyle(r[p][mi])),
      cellClassName: 'font-semibold',
    }))
  ),
];

type Reading = (typeof badReadingsUp)[number];
const readingColumns: Column<Reading>[] = [
  { key: 'site', header: 'Site', rowHeader: true },
  { key: 'parameter', header: 'Parameter' },
  { key: 'code', header: 'E&C Code' },
  { key: 'value', header: 'Value', render: (r) => r.value.toFixed(4) },
  { key: 'time', header: 'Phenomenon Time' },
];

function Latest({ op, missing, bad }: { op: [number, number]; missing: [number, number]; bad: [number, number] }) {
  const d = (v: number, better: boolean) => <DeltaIndicator value={v} higherIsBetter={better} comparison="vs previous day" layout="stacked" className="items-end" />;
  return (
    <MetricList
      items={[
        { icon: <Settings2 />, tone: 'green', label: 'Operability', value: pct(op[0]), detail: d(op[1], true) },
        { icon: <CircleAlert />, tone: 'pink', label: 'Missing Data', value: pct(missing[0]), detail: d(missing[1], false) },
        { icon: <CircleAlert />, tone: 'orange', label: 'Total Bad Data', value: pct(bad[0]), detail: d(bad[1], false) },
      ]}
    />
  );
}

export function OperabilityTrend() {
  const [site, setSite] = useState('Buxton');
  const [param, setParam] = useState('All');
  const [range, setRange] = useState({ from: '2026-08-30', to: '2026-09-03' });

  return (
    <AppShell
      sidebar={<AppSidebar active="Operability" />}
      header={
        <PageHeader
          breadcrumb={[{ label: 'CWQM' }, { label: 'Operability Trend Analysis' }]}
          title="Operability Trend Analysis"
          subtitle="Track operability, missing data and data quality trends across upstream and downstream."
          actions={<HeaderActions><PeriodChip label="Selected period" value="30 Aug 2026 – 03 Sep 2026" detail="(5 days)" /></HeaderActions>}
        />
      }
    >
      <div className="grid gap-lg xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <FilterBar>
          <FormField label="Site"><SearchField value={site} onChange={setSite} clearable options={SITES} /></FormField>
          <FormField label="Parameter"><SelectField value={param} onChange={(e) => setParam(e.target.value)} options={['All', ...PARAM_KEYS]} /></FormField>
          <FormField label="Date range"><DateRangeField from={range.from} to={range.to} onChange={setRange} /></FormField>
        </FilterBar>
        <InfoCallout className="items-center">This page shows operability, missing data and total bad data trends for the selected site, parameter and date range.</InfoCallout>
      </div>

      {[
        { title: 'Operability Trend – Upstream', icon: <ArrowUpRight />, data: upstreamTrend, latest: <Latest op={[98.31, 0.91]} missing={[0.32, -0.18]} bad={[1.37, -0.42]} />, side: 'Upstream - Latest Values' },
        { title: 'Operability Trend – Downstream', icon: <ArrowDown />, data: downstreamTrend, latest: <Latest op={[90.89, -7.81]} missing={[8.12, 6.45]} bad={[1.02, -0.33]} />, side: 'Downstream - Latest Values' },
      ].map((block) => (
        <div key={block.title} className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_400px]">
          <PanelCard icon={block.icon} title={block.title}>
            <DualAxisChart label={block.title} data={block.data} xKey="t" series={series} {...axes} height={260} />
          </PanelCard>
          <PanelCard icon={<BarChart3 />} title={block.side}>{block.latest}</PanelCard>
        </div>
      ))}

      <PanelCard icon={<Grid2x2 />} title="Operability & Data Quality Breakdown" actions={<TextLink>Expand</TextLink>}>
        <DataTable
          caption="Operability and data quality by site and parameter"
          columns={breakdownColumns}
          rows={breakdown}
          getRowKey={(r) => r.site}
          headerTone="strong"
          striped={false}
          dense
          groups={[{ header: '', span: 1 }, ...PARAMS.map((p) => ({ header: p, span: METRICS.length }))]}
        />
      </PanelCard>

      <div className="grid gap-lg xl:grid-cols-2">
        {[
          { title: 'Missing & Bad Data Readings – Upstream', icon: <ArrowUp />, rows: badReadingsUp },
          { title: 'Missing & Bad Data Readings – Downstream', icon: <ArrowDown />, rows: badReadingsDown },
        ].map((t) => (
          <PanelCard key={t.title} icon={t.icon} title={t.title} actions={<TextLink>View all</TextLink>}>
            <DataTable caption={t.title} columns={readingColumns} rows={t.rows} getRowKey={(r) => r.time} headerTone="strong" dense maxHeight={200} />
          </PanelCard>
        ))}
      </div>
    </AppShell>
  );
}
