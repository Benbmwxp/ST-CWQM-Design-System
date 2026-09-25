import { useMemo, useState } from 'react';
import { Grid3x3, Crosshair, ScanSearch } from 'lucide-react';
import { Switch } from '../../atoms';
import { DateRangeField, FormField, InfoCallout, LegendItem, PeriodChip, SearchField, SelectField, ValueBar } from '../../molecules';
import { DonutChart, FilterBar, HeatmapTable, PageHeader, PanelCard } from '../../organisms';
import { AppShell } from '../../templates';
import { tv } from '../../lib/tokens';
import { bandOf, OPERABILITY_BANDS } from '../../lib/operability';
import { AppSidebar, HeaderActions } from '../shared';
import { operabilityAllSites, PARAM_KEYS } from '../data/sample';

export function OperabilityAllSites() {
  const [param, setParam] = useState('All');
  const [range, setRange] = useState({ from: '2026-08-30', to: '2026-09-03' });
  const [search, setSearch] = useState('');
  const [showValues, setShowValues] = useState(true);

  const columns = param === 'All' ? PARAM_KEYS : [param];
  const rows = operabilityAllSites.filter((r) => r.label.toLowerCase().includes(search.toLowerCase()));
  const cells = operabilityAllSites.flatMap((r) => columns.map((c) => r.values[c]));
  const counts = OPERABILITY_BANDS.map((b) => ({ ...b, count: cells.filter((v) => bandOf(v).key === b.key).length }));
  const average = cells.reduce((a, v) => a + v, 0) / cells.length;
  const paramAverages = useMemo(
    () => PARAM_KEYS.map((k) => ({ k, v: operabilityAllSites.reduce((a, r) => a + r.values[k], 0) / operabilityAllSites.length })),
    []
  );

  return (
    <AppShell
      sidebar={<AppSidebar active="Operability" />}
      header={
        <PageHeader
          breadcrumb={[{ label: 'CWQM' }, { label: 'Operability' }]}
          title="Operability – All Sites"
          subtitle="View operability percentage for all sites across key parameters. Filter by parameter(s) and date range to explore site performance."
          actions={<HeaderActions><PeriodChip label="Selected period" value="30 Aug 2026 – 03 Sep 2026" detail="(5 days)" /></HeaderActions>}
        />
      }
    >
      <div className="grid gap-lg xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <FilterBar>
          <FormField label="Parameter"><SelectField value={param} onChange={(e) => setParam(e.target.value)} options={['All', ...PARAM_KEYS]} /></FormField>
          <FormField label="Date range"><DateRangeField from={range.from} to={range.to} onChange={setRange} /></FormField>
        </FilterBar>
        <InfoCallout className="items-center">
          Operability shows the percentage of valid readings for each parameter at each site. Darker colours indicate higher operability.
        </InfoCallout>
      </div>

      <div className="grid items-start gap-lg xl:grid-cols-[minmax(0,1fr)_380px]">
        <PanelCard
          icon={<Grid3x3 />}
          title="Operability % – All Sites"
          description="(Filtered by selected parameter(s) and date period. Site selection is ignored.)"
          actions={
            <>
              <SearchField value={search} onChange={setSearch} placeholder="Search site…" aria-label="Search site" className="h-10 w-56" />
              <Switch label="Show values" checked={showValues} onChange={setShowValues} />
            </>
          }
        >
          <HeatmapTable caption="Operability percentage by site and parameter" rowHeader="Site" columns={columns} rows={rows} showValues={showValues} />
        </PanelCard>

        <div className="space-y-lg">
          <PanelCard icon={<Crosshair />} title="Overall Summary">
            <div className="flex flex-wrap items-center gap-lg">
              <DonutChart
                label="Share of cells in each operability band"
                size={180}
                segments={counts.map((b) => ({ label: b.label, value: b.count, colour: tv(`color.data.band.${b.key}`) }))}
                centre={<><span className="tabular text-3xl font-extrabold text-content-heading">{average.toFixed(1)}%</span><span className="text-sm leading-tight text-content-subtle">Average<br />Operability</span></>}
              />
              <ul className="min-w-40 flex-1 space-y-xs">
                {counts.map((b) => <li key={b.key}><LegendItem colour={tv(`color.data.band.${b.key}`)} label={b.label} value={b.count} /></li>)}
                <li className="flex justify-between border-t border-line-default pt-xs font-bold text-content-accent"><span>Total cells</span><span className="tabular">{cells.length}</span></li>
              </ul>
            </div>
          </PanelCard>

          <PanelCard icon={<ScanSearch />} title="Parameter Average (All Sites)">
            <div className="space-y-sm">
              {paramAverages.map(({ k, v }) => <ValueBar key={k} label={k} value={v} colour={tv(`color.data.band.${bandOf(v).key}`)} />)}
            </div>
          </PanelCard>

          <InfoCallout title="About Operability">
            Operability % shows the proportion of valid readings received for each parameter at each site. Higher values indicate better data availability.
          </InfoCallout>
        </div>
      </div>
    </AppShell>
  );
}
