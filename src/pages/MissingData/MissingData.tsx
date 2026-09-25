import { useState } from 'react';
import { ArrowDown, ArrowUp, BarChart3, CalendarDays, CalendarRange, CircleCheck, Clock, TriangleAlert } from 'lucide-react';
import { ProgressBar, TextLink } from '../../atoms';
import { DateRangeField, FormField, InfoCallout, PeriodChip, SearchField, SelectField } from '../../molecules';
import { DataTable, FilterBar, GroupedBarChart, KpiTile, PageHeader, PanelCard, type Column } from '../../organisms';
import { AppShell } from '../../templates';
import { PARAMETERS, parameterColour, tv } from '../../lib/tokens';
import { AppSidebar, HeaderActions } from '../shared';
import { missingDown, missingUp, PARAM_KEYS, parameterAvailability, readingsByDay, SITES, siteAverages } from '../data/sample';

const series = PARAMETERS.map((p) => ({ key: p.key, label: p.key, colour: parameterColour(p.key) }));
const fmt = (v: number) => `${v.toFixed(1)}%`;

const availabilityCell = (value: number, missing = false) => (
  <div className="flex items-center gap-sm">
    <span className={`tabular w-14 shrink-0 font-semibold ${missing ? 'text-feedback-negative' : value >= 95 ? 'text-feedback-positive' : 'text-content-default'}`}>{fmt(value)}</span>
    <ProgressBar
      label={missing ? `Missing ${fmt(value)}` : `Available ${fmt(value)}`}
      value={value}
      className="h-4 min-w-12"
      colour={tv(missing ? 'color.data.missing' : value >= 95 ? 'color.data.band.70' : 'color.data.missing')}
      track={tv(missing ? 'color.data.missing-track' : 'color.data.track')}
    />
  </div>
);

type SiteRow = (typeof siteAverages)[number];
const siteColumns: Column<SiteRow>[] = [
  { key: 'site', header: 'Site', rowHeader: true, sortable: true },
  { key: 'available', header: 'Available %', sortable: true, render: (r) => availabilityCell(r.available) },
  { key: 'missing', header: 'Missing %', sortable: true, render: (r) => <span className={`tabular font-semibold ${r.missing > 0 ? 'text-feedback-negative' : 'text-feedback-positive'}`}>{fmt(r.missing)}</span> },
];

type ParamRow = (typeof parameterAvailability)[number];
const paramColumns: Column<ParamRow>[] = [
  { key: 'parameter', header: 'Parameter', rowHeader: true },
  { key: 'available', header: 'Available %', render: (r) => <div className="flex items-center gap-sm"><span className="tabular w-14">{fmt(r.available)}</span><ProgressBar label={`Available ${fmt(r.available)}`} value={r.available} className="min-w-12" /></div> },
  { key: 'missing', header: 'Missing %', render: (r) => availabilityCell(r.missing, true) },
];

type MissingRow = (typeof missingUp)[number];
const missingColumns: Column<MissingRow>[] = [
  { key: 'site', header: 'Site', rowHeader: true },
  { key: 'parameter', header: 'Parameter' },
  { key: 'time', header: 'Missing Reading' },
];

export function MissingData() {
  const [site, setSite] = useState('Buxton');
  const [param, setParam] = useState('All');
  const [range, setRange] = useState({ from: '2026-08-30', to: '2026-09-03' });

  return (
    <AppShell
      sidebar={<AppSidebar active="Concern Codes" />}
      header={
        <PageHeader
          breadcrumb={[{ label: 'CWQM' }, { label: 'Missing Data' }]}
          title="Missing Data – Available vs Expected"
          subtitle="Compare available and expected telemetry data to identify potential data gaps across sites and parameters."
          actions={<HeaderActions><PeriodChip icon={<Clock />} label="Telemetry data available through" value="18/09/2026 06:15" /></HeaderActions>}
        />
      }
    >
      <div className="grid gap-lg xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <FilterBar>
          <FormField label="Site"><SearchField value={site} onChange={setSite} clearable options={SITES} /></FormField>
          <FormField label="Parameter"><SelectField value={param} onChange={(e) => setParam(e.target.value)} options={['All', ...PARAM_KEYS]} /></FormField>
          <FormField label="Date range"><DateRangeField from={range.from} to={range.to} onChange={setRange} /></FormField>
        </FilterBar>
        <InfoCallout>
          <strong>Note:</strong> Visuals on this page reflect the selected site, parameter(s) and date period. Exception: the Site-Level Average % table always shows all sites to help identify concerned sites.
        </InfoCallout>
      </div>

      <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile icon={<BarChart3 />} tone="blue" label="Total Expected Readings" value="1,200" detail="Across 8 parameters (Buxton)" />
        <KpiTile icon={<CircleCheck />} tone="teal" label="Total Available Readings" value="1,160" detail={<span className="font-semibold text-feedback-positive">▲ 96.7% <span className="font-normal text-content-subtle">availability</span></span>} />
        <KpiTile icon={<TriangleAlert />} tone="red" label="Total Missing Readings" value="40" detail={<span className="font-semibold text-feedback-negative">3.3% <span className="font-normal text-content-subtle">missing</span></span>} />
        <KpiTile icon={<CalendarDays />} tone="blue" label="Date Range" value={<span className="text-2xl">30 Aug – 03 Sep 2026</span>} detail="5 days (hourly data)" />
      </div>

      <div className="grid gap-lg xl:grid-cols-2">
        {(['US', 'DS'] as const).map((s) => (
          <PanelCard key={s} icon={<BarChart3 />} title={`Buxton${s} : Available vs Expected Readings`} actions={<TextLink>View details</TextLink>}>
            <GroupedBarChart label={`Buxton${s} readings per day by parameter`} data={readingsByDay(s)} xKey="d" series={series} yLabel="Readings" yDomain={[0, 120]} yTicks={[0, 20, 40, 60, 80, 100, 120]} />
          </PanelCard>
        ))}
      </div>

      <div className="grid items-start gap-lg xl:grid-cols-3">
        <PanelCard icon={<BarChart3 />} title="Site-Level Average %" description="(Each site value is averaged across the selected parameter(s) and date period.)">
          <DataTable caption="Site-level average availability" columns={siteColumns} rows={siteAverages} getRowKey={(r) => r.site} dense />
        </PanelCard>
        <PanelCard icon={<CalendarRange />} title="Available vs Missing Data %" titleSuffix="(By Parameter)">
          <DataTable caption="Availability by parameter" columns={paramColumns} rows={parameterAvailability} getRowKey={(r) => r.parameter} dense />
        </PanelCard>
        <div className="space-y-lg">
          {[{ title: 'Missing Readings – Upstream', icon: <ArrowUp />, rows: missingUp }, { title: 'Missing Readings – Downstream', icon: <ArrowDown />, rows: missingDown }].map((t) => (
            <PanelCard key={t.title} icon={t.icon} title={t.title} actions={<TextLink>View all</TextLink>}>
              <DataTable caption={t.title} columns={missingColumns} rows={t.rows} getRowKey={(r) => r.parameter + r.time} dense maxHeight={210} />
            </PanelCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
