// Sample data taken from the design mockups. Replace with API data.
import { PARAMETERS } from '../../lib/tokens';

export const PARAM_KEYS = PARAMETERS.map((p) => p.key);
export const SITES = ['Buxton', 'Goscote', 'LittleAston', 'Shenstone', 'Sperna', 'Alfreton', 'Trescott', 'Tideswell'];

const row = (label: string, first: number, rest: number | Partial<Record<string, number>> = 100) => ({
  label,
  values: Object.fromEntries(
    PARAM_KEYS.map((k, i) => [k, i === 0 ? first : typeof rest === 'number' ? rest : rest[k] ?? 100])
  ) as Record<string, number>,
});

export const operabilityAllSites = [
  row('TideswellDS', 0, 0),
  row('TideswellUS', 0, 0),
  row('GoscoteUS', 13.75),
  row('TrescottDS', 99.79, { Turbidity: 32.92 }),
  row('LittleAston_US', 45),
  row('ShenstoneUS', 52.71, { Turbidity: 99.79 }),
  row('BuxtonDS', 88.13, 98.33),
  row('BuxtonUS', 79.79),
  row('SpernalUS', 90.42),
  row('LittleAston_DS', 92.5),
  row('GoscoteDS', 93.33),
  row('AlfretonUS', 96.25),
  row('AlfretonDS', 96.46),
  row('TrescottUS', 98.75),
];

export const trendTimes = ['30 Aug\n00:00', '30 Aug\n12:00', '31 Aug\n00:00', '31 Aug\n12:00', '01 Sep\n00:00', '01 Sep\n12:00', '02 Sep\n00:00', '02 Sep\n12:00', '03 Sep\n00:00'];

const interp = (points: [number, number][], n = trendTimes.length) =>
  Array.from({ length: n }, (_, i) => {
    const j = points.findIndex(([x]) => x >= i);
    if (j <= 0) return points[0][1];
    const [[x0, y0], [x1, y1]] = [points[j - 1], points[j]];
    return +(y0 + ((y1 - y0) * (i - x0)) / (x1 - x0)).toFixed(2);
  });

export const upstreamTrend = trendTimes.map((t, i) => ({
  t,
  operability: interp([[0, 97.27], [2, 97.01], [4, 97.4], [6, 97.4], [8, 98.31]])[i],
  missing: interp([[0, 0.5], [8, 0.32]])[i],
  bad: interp([[0, 1.8], [2, 1.95], [8, 1.37]])[i],
}));

export const downstreamTrend = trendTimes.map((t, i) => ({
  t,
  operability: interp([[0, 98.57], [2, 98.31], [4, 98.83], [6, 98.7], [8, 90.89]])[i],
  missing: interp([[0, 0.6], [2, 0.8], [4, 0.5], [6, 1.6], [8, 8.12]])[i],
  bad: interp([[0, 1.4], [2, 1.6], [4, 1.35], [6, 1.2], [8, 1.02]])[i],
}));

export const breakdown = [
  { site: 'BuxtonDS', Ammonia_NH3: [88.13, 1.67, 10.21, 10.21, 0], Ammonium_NH4: [98.33, 1.67, 0, 0, 0], ODO_mgL: [98.33, 1.67, 0, 0, 0] },
  { site: 'BuxtonUS', Ammonia_NH3: [79.79, 0, 20.21, 20.21, 0], Ammonium_NH4: [100, 0, 0, 0, 0], ODO_mgL: [100, 0, 0, 0, 0] },
];

export const badReadingsUp = [0, 1, 2, 3, 4, 5].map((i) => ({ site: 'BuxtonUS', parameter: 'Ammonia_NH3', code: 'Flatline', value: 0.0021, time: `30/08/2026 ${['00:30', '00:45', '01:00', '01:15', '01:30', '01:45'][i]}:00` }));
export const badReadingsDown = [0.0027, 0.0029, 0.0028, 0.0026, 0.0027, 0.0027].map((value, i) => ({ site: 'BuxtonDS', parameter: 'Ammonia_NH3', code: 'Flatline', value, time: `30/08/2026 ${['07:00', '08:00', '09:45', '10:30', '12:15', '12:30'][i]}:00` }));

export const readingsByDay = (site: 'US' | 'DS') =>
  ['30 Aug', '31 Aug', '01 Sep', '02 Sep', '03 Sep'].map((d, i) => ({
    d,
    ...Object.fromEntries(PARAM_KEYS.map((k, j) => [k, i === 4 ? 88 : site === 'DS' && i === 3 && j === 7 ? 98 : 96])),
  }));

export const siteAverages = [
  ['TideswellDS', 0], ['TideswellUS', 0], ['BuxtonDS', 98.3], ['AlfretonDS', 100], ['AlfretonUS', 100], ['BuxtonUS', 100], ['GoscoteDS', 100], ['GoscoteUS', 100],
].map(([site, available]) => ({ site: site as string, available: available as number, missing: 100 - (available as number) }));

export const parameterAvailability = PARAM_KEYS.map((parameter) => ({ parameter, available: 98.3, missing: 1.7 }));

export const missingUp = [['Ammonia_NH3', '02:00'], ['Ammonium_NH4', '02:00'], ['ODO_mgL', '02:00'], ['Temperature', '03:00'], ['Turbidity', '04:00'], ['pH', '05:00']].map(([parameter, t]) => ({ site: 'BuxtonDS', parameter, time: `03/09/2026 ${t}:00` }));
export const missingDown = [['Ammonia_NH3', '02:00'], ['ODO_Sat', '02:00'], ['pH', '03:00'], ['SpConductivity_us', '04:00'], ['Temperature', '05:00'], ['Turbidity', '06:00']].map(([parameter, t]) => ({ site: 'BuxtonUS', parameter, time: `03/09/2026 ${t}:00` }));

const values = [27, 29, 28, 26, 27, 27, 30, 30, 30, 31, 31, 31, 34, 34, 34, 35, 35, 35, 37, 37, 37, 37, 33, 36, 32];
const times = ['30/08 07:00', '30/08 08:00', '30/08 09:45', '30/08 10:30', '30/08 12:15', '30/08 12:30', '30/08 15:15', '30/08 15:30', '30/08 20:30', '30/08 20:45', '30/08 21:00', '31/08 01:00', '31/08 01:15', '31/08 02:30', '31/08 02:45', '31/08 03:00', '31/08 03:15', '31/08 05:30', '31/08 05:45', '31/08 06:00', '31/08 06:45', '31/08 07:30', '31/08 08:15', '31/08 09:00', '31/08 10:45'];
export const concernInstances = Array.from({ length: 146 }, (_, i) => {
  const [d, t] = times[i % times.length].split(' ');
  const day = i < 60 ? d : i < 110 ? '01/09' : '02/09';
  return {
    id: String(i),
    site: i % 3 === 2 ? 'BuxtonUS' : 'BuxtonDS',
    stream: 'Ammonia_NH3',
    priority: 'Flatline',
    code: 'Flatline',
    value: values[i % values.length] / 10000,
    time: `${day}/2026 ${t}:00`,
  };
});

export const upstreamByTime = [['30 Aug\n00:00', 21], ['30 Aug\n12:00', 23], ['31 Aug\n00:00', 20], ['01 Sep\n00:00', 20], ['02 Sep\n00:00', 13], ['03 Sep\n00:00', 0]].map(([label, value]) => ({ label: label as string, value: value as number }));
export const downstreamByTime = [['30 Aug\n00:00', 11], ['30 Aug\n12:00', 13], ['31 Aug\n00:00', 9], ['01 Sep\n00:00', 10], ['02 Sep\n00:00', 6], ['03 Sep\n00:00', 0]].map(([label, value]) => ({ label: label as string, value: value as number }));

// Data streams: hourly-ish points between 18 and 25 Jun
export const streamSeries = Array.from({ length: 29 }, (_, i) => {
  const day = 18 + Math.floor(i / 4);
  const hour = [2, 8, 14, 20][i % 4];
  const phase = (i / 28) * Math.PI * 4.2;
  const cond = +(20 + 6.5 * Math.sin(phase + 0.4) + (i === 11 ? 3 : 0)).toFixed(1);
  const index = +(0.52 + 0.24 * Math.sin(phase - 0.1)).toFixed(2);
  return { t: `${day} Jun`, label: `${day} Jun 2026 ${String(hour).padStart(2, '0')}:00`, conductivity: cond, index };
});
