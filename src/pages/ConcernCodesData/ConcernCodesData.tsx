import { useMemo, useState } from 'react';
import { BarChart3, Clock, Download, FileText, Filter, MapPin, TriangleAlert } from 'lucide-react';
import { Button, CountBadge, Input, StatusShape, TextLink } from '../../atoms';
import { DateRangeField, DeltaIndicator, FormField, SearchField, SegmentedControl, SelectField } from '../../molecules';
import { ActionList, DataTable, FilterBar, KeyInsight, KpiTile, PageHeader, Pagination, PanelCard, type Column } from '../../organisms';
import { Card } from '../../atoms';
import { AppShell } from '../../templates';
import { AppSidebar, HeaderActions } from '../shared';
import { concernInstances, PARAM_KEYS, SITES } from '../data/sample';

type Row = (typeof concernInstances)[number];
const columns: Column<Row>[] = [
  { key: 'site', header: 'Site', sortable: true, rowHeader: true },
  { key: 'stream', header: 'Data Stream', sortable: true },
  { key: 'priority', header: 'Priority', sortable: true, render: (r) => <span className="inline-flex items-center gap-xs"><StatusShape status="neutral" />{r.priority}</span> },
  { key: 'code', header: 'Code Name', sortable: true },
  { key: 'value', header: 'Value', sortable: true, highlight: true, render: (r) => r.value.toFixed(4) },
  { key: 'time', header: 'Phenomenon Time', sortable: true, sortValue: (r) => r.id.padStart(4, '0') },
];

export function ConcernCodesData() {
  const [site, setSite] = useState('Buxton');
  const [param, setParam] = useState('All');
  const [code, setCode] = useState('Flatline');
  const [range, setRange] = useState({ from: '2026-08-30', to: '2026-09-03' });
  const [quick, setQuick] = useState('Last 7 days');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const filtered = useMemo(
    () => concernInstances.filter((r) => `${r.site} ${r.stream} ${r.code}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <AppShell
      sidebar={<AppSidebar active="Concern Codes" dateRange={{ label: 'Date range (global)', value: '30 Aug – 03 Sep 2026' }} refreshed="03 Sep 2026, 08:45" />}
      header={
        <PageHeader
          breadcrumb={[{ label: 'CWQM' }, { label: 'Concern Codes' }]}
          title="CWQM: Concern Codes Data"
          subtitle="View, filter and explore all concern code instances for the selected site, parameter and date range."
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
          <p className="text-sm font-semibold text-content-accent">Quick filters</p>
          <SegmentedControl label="Quick filters" appearance="separate" options={['Last 7 days', 'Last 30 days', 'Last 90 days']} value={quick} onChange={setQuick} />
        </Card>
      </div>

      <div className="grid gap-lg sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile variant="tinted" icon={<FileText />} tone="blue" label="Total Instances" value="146" detail={<DeltaIndicator value={8} higherIsBetter={false} comparison="vs previous period" layout="stacked" />} />
        <KpiTile variant="tinted" icon={<TriangleAlert />} tone="red" label="Unique Concern Codes" value="1" detail={<span>Flatline<br />(in selected filters)</span>} />
        <KpiTile variant="tinted" icon={<MapPin />} tone="teal" label="Sites Affected" value="2" detail="BuxtonDS, BuxtonUS" />
        <KpiTile variant="tinted" icon={<Clock />} tone="orange" label="Time Range" value={<span className="text-2xl">30 Aug – 03 Sep 2026</span>} detail="5 days" />
      </div>

      <div className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_400px]">
        <PanelCard
          title="Concern Code Instances"
          description={`Showing ${filtered.length ? (page - 1) * pageSize + 1 : 0}–${Math.min(filtered.length, page * pageSize)} of ${filtered.length} instances`}
          actions={
            <>
              <SearchField value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Search by site, parameter or code…" aria-label="Search instances" className="h-10 w-72" />
              <Button variant="secondary"><Filter aria-hidden />Filters<CountBadge count={2} label="filters applied" /></Button>
            </>
          }
        >
          <DataTable caption="Concern code instances" columns={columns} rows={pageRows} getRowKey={(r) => r.id} onRowAction={() => {}} maxHeight={640} dense />
          <Pagination className="mt-md" page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={(n) => { setPageSize(n); setPage(1); }} />
        </PanelCard>

        <div className="space-y-lg">
          <PanelCard title="Filter & Refine" actions={<TextLink arrow={false}>Clear all</TextLink>}>
            <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
              <FormField label="Priority"><SelectField options={['All', 'High', 'Medium', 'Low']} /></FormField>
              <FormField label="Data Stream"><SelectField options={['All', ...PARAM_KEYS]} /></FormField>
              <fieldset>
                <legend className="mb-2xs text-sm font-semibold text-content-accent">Value range</legend>
                <div className="flex items-center gap-xs"><Input aria-label="Minimum value" placeholder="Min" inputMode="decimal" /><span aria-hidden>–</span><Input aria-label="Maximum value" placeholder="Max" inputMode="decimal" /></div>
              </fieldset>
              <fieldset>
                <legend className="mb-2xs text-sm font-semibold text-content-accent">Phenomenon Time</legend>
                <div className="flex items-center gap-xs"><Input type="date" aria-label="From date" /><Input type="date" aria-label="To date" /></div>
              </fieldset>
              <Button type="submit" size="lg" block>Apply Filters</Button>
            </form>
          </PanelCard>
          <KeyInsight action={<TextLink href="#">View trend analysis</TextLink>}>
            Flatline is the only concern code in the selected period, with 146 instances across 2 sites. Most instances occur on 30 Aug 2026 and 31 Aug 2026.
          </KeyInsight>
          <ActionList title="Useful Actions" actions={[{ icon: <Download />, label: 'Export filtered data' }, { icon: <BarChart3 />, label: 'View site comparison' }]} />
        </div>
      </div>
    </AppShell>
  );
}
