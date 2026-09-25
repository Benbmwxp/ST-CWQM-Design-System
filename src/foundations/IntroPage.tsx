import { useState, type ReactNode } from 'react';
import {
  ArrowRight, Blocks, Check, Component, Copy, Droplets, Eye, LayoutDashboard, LayoutTemplate, Layers, Moon, Palette,
  PieChart, ShieldCheck, Sun, Atom,
} from 'lucide-react';
import stLogo from '../assets/severn-trent-logo.png';
import aiLogo from '../assets/powered-by-ai-and-i.png';
import tokens from '../tokens/tokens.generated.json';
import { icons } from '../lib/icons';
import { tv } from '../lib/tokens';
import { bandOf, operabilityColours, OPERABILITY_BANDS } from '../lib/operability';
import { KpiTile } from '../organisms/KpiTile/KpiTile';
import { DeltaIndicator } from '../molecules/DeltaIndicator/DeltaIndicator';
import { StatusShape } from '../atoms/StatusShape/StatusShape';
import { cn } from '../lib/cn';

const CHART_TYPES = 4; // dual-axis, grouped bar, column, donut

/* Counts come from the file system, so they stay true as the library grows. */
const count = (files: Record<string, unknown>) => Object.keys(files).filter((f) => !/stories|index/.test(f)).length;
const COUNTS = {
  atoms: count(import.meta.glob('../atoms/*/*.tsx')),
  molecules: count(import.meta.glob('../molecules/*/*.tsx')),
  // Chart types are counted once each, not per file
  organisms: Object.keys(import.meta.glob('../organisms/*/*.tsx')).filter((f) => !/stories|index|\/charts\//.test(f)).length + CHART_TYPES,
  templates: count(import.meta.glob('../templates/*/*.tsx')),
  pages: count(import.meta.glob('../pages/*/*.tsx')),
  tokens: tokens.light.length,
  icons: Object.values(icons).reduce((n, g) => n + Object.keys(g).length, 0),
};

/** Links into Storybook from inside the docs iframe. Relative, so it also works when hosted under a sub-path. */
const sb = (path: string) => `./?path=${path}`;

const BRAND = { green: '#3BAA35', teal: '#05A38A', blue: '#049FE3', sky: '#CDECF8', navy: '#0A1A6E' };

type Theme = 'light' | 'dark';

export function IntroPage() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <div data-theme={theme} className="st-intro -mx-2 overflow-hidden rounded-xl bg-surface-page font-sans text-content-default">
      <style>{css}</style>
      <Hero theme={theme} setTheme={setTheme} />
      <div className="space-y-3xl px-xl pb-3xl pt-2xl md:px-2xl">
        <Stats />
        <Playground />
        <LibraryMap />
        <Principles />
        <GetStarted />
      </div>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <header className="relative isolate overflow-hidden px-xl pb-3xl pt-2xl md:px-2xl">
      <Waves />
      <div className="relative z-10 flex items-center justify-between gap-md">
        <span className="rounded-pill border border-line-default bg-surface-default/80 px-sm py-2xs text-xs font-semibold uppercase tracking-[0.14em] text-content-subtle backdrop-blur">
          Severn Trent · CWQM
        </span>
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>

      <div className="relative z-10 mt-2xl grid items-center gap-2xl lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="st-rise space-y-lg">
          <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-content-heading">
            Clean Water Quality
            <br />
            Monitoring{' '}
            <span className="st-gradient-text">Design System</span>
          </h1>
          <p className="max-w-[36rem] text-lg leading-relaxed text-content-subtle">
            One set of colours, components and dashboard layouts for CWQM operability, concern codes, missing data and data
            streams. Accessible, themeable in light and dark, and built from the same tokens as the designs.
          </p>
          <div className="flex flex-wrap gap-sm">
            <a href={sb('/docs/atoms-button--docs')} target="_top" className="st-btn st-btn-primary">
              Explore components <ArrowRight aria-hidden className="size-5" />
            </a>
            <a href={sb('/story/pages-cwqm-dashboards--operability-all-sites-page')} target="_top" className="st-btn st-btn-secondary">
              <LayoutDashboard aria-hidden className="size-5" /> View dashboards
            </a>
          </div>
        </div>

        <LogoCard />
      </div>
    </header>
  );
}

function LogoCard() {
  return (
    <div className="st-rise st-delay relative mx-auto w-full max-w-[26rem]">
      <div aria-hidden className="st-orbit absolute -inset-6 rounded-[2rem]" />
      <div className="relative rounded-[1.5rem] border border-white/60 bg-white p-xl shadow-raised">
        <img src={stLogo} alt="Severn Trent" width={532} height={238} className="mx-auto h-auto w-[78%]" />
        <div className="my-lg flex items-center gap-sm" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#05A38A]" />
          <Droplets className="size-5 text-[#049FE3]" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#05A38A]" />
        </div>
        <img src={aiLogo} alt="Powered by AI & I Data Science" width={900} height={727} className="mx-auto h-auto w-[62%]" />
        <p className="mt-md text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#5A6880]">Green Power</p>
      </div>
    </div>
  );
}

/** Flowing background, echoing the curved panels in the Severn Trent slide template. */
function Waves() {
  return (
    <svg aria-hidden viewBox="0 0 1200 520" preserveAspectRatio="none" className="absolute inset-0 -z-10 h-full w-full">
      <defs>
        <linearGradient id="st-line" x1="0" x2="1">
          <stop offset="0" stopColor={BRAND.green} />
          <stop offset="0.5" stopColor={BRAND.teal} />
          <stop offset="1" stopColor={BRAND.blue} />
        </linearGradient>
      </defs>
      <path className="st-wave-fill" d="M0 440 C 260 380, 520 500, 820 420 S 1120 330, 1200 360 L1200 520 L0 520 Z" />
      <path className="st-wave-fill st-wave-2" d="M0 480 C 300 430, 600 520, 900 460 S 1140 420, 1200 440 L1200 520 L0 520 Z" />
      <g className="st-drift" fill="none" stroke="url(#st-line)" strokeWidth="1.4" opacity="0.55">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M-40 ${420 + i * 8} C 260 ${370 + i * 10}, 560 ${490 - i * 6}, 860 ${410 + i * 5} S 1160 ${330 + i * 8}, 1260 ${360 + i * 6}`} />
        ))}
      </g>
    </svg>
  );
}

function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div role="group" aria-label="Preview theme" className="flex rounded-pill border border-line-default bg-surface-default/80 p-3xs backdrop-blur">
      {(['light', 'dark'] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => setTheme(t)}
          className={cn(
            'flex items-center gap-2xs rounded-pill px-sm py-2xs text-sm font-semibold capitalize transition-colors',
            theme === t ? 'bg-action-primary text-content-on-action' : 'text-content-accent hover:bg-action-secondary-hover'
          )}
        >
          {t === 'light' ? <Sun aria-hidden className="size-4" /> : <Moon aria-hidden className="size-4" />}
          {t}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Stats */

function Stats() {
  const items = [
    { label: 'Design tokens', value: COUNTS.tokens, note: 'per theme' },
    { label: 'Atoms', value: COUNTS.atoms },
    { label: 'Molecules', value: COUNTS.molecules },
    { label: 'Organisms', value: COUNTS.organisms },
    { label: 'Dashboard pages', value: COUNTS.pages },
    { label: 'Icons', value: COUNTS.icons },
  ];
  return (
    <section aria-label="Library at a glance" className="grid grid-cols-2 gap-sm sm:grid-cols-3 xl:grid-cols-6">
      {items.map((s, i) => (
        <div key={s.label} className="st-rise rounded-lg border border-line-default bg-surface-default p-md shadow-card" style={{ animationDelay: `${i * 60}ms` }}>
          <p className="tabular text-3xl font-extrabold text-content-heading">{s.value}</p>
          <p className="text-sm text-content-subtle">
            {s.label}
            {s.note && <span className="text-content-muted"> {s.note}</span>}
          </p>
        </div>
      ))}
    </section>
  );
}

/* ---------------------------------------------------------------- Playground */

function Playground() {
  const [value, setValue] = useState(86.2);
  const band = bandOf(value);
  const colours = operabilityColours(value);
  const sample = [value - 2.4, value - 1.1, value + 0.6, value - 0.3, value].map((v) => Math.max(0, Math.min(100, v)));

  return (
    <section aria-labelledby="try-it" className="grid gap-xl rounded-xl border border-line-default bg-surface-default p-xl shadow-card lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="space-y-md">
        <SectionTitle id="try-it" eyebrow="Try it" title="See the operability scale respond" />
        <p className="text-md text-content-subtle">
          Drag the slider. The heatmap cell, band and KPI tile below are the real library components, reading the same tokens as
          the dashboards. Switch light and dark at the top to see both themes.
        </p>
        <label className="block space-y-xs">
          <span className="flex items-baseline justify-between text-sm font-semibold text-content-accent">
            Operability <span className="tabular text-2xl font-extrabold text-content-heading">{value.toFixed(1)}%</span>
          </span>
          <input
            type="range" min={0} max={100} step={0.1} value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="st-range w-full"
            aria-valuetext={`${value.toFixed(1)} percent, band ${band.label}`}
          />
        </label>
        <ul className="flex flex-wrap gap-xs" aria-label="Operability bands">
          {OPERABILITY_BANDS.slice().reverse().map((b) => (
            <li key={b.key}>
              <button
                type="button"
                onClick={() => setValue(b.key === '0' ? 12 : b.key === '95' ? 99 : (b.min + b.max) / 2)}
                className={cn(
                  'flex items-center gap-2xs rounded-pill border px-sm py-3xs text-sm transition-colors',
                  band.key === b.key ? 'border-line-focus bg-surface-accent font-semibold text-content-accent' : 'border-line-default text-content-default hover:bg-surface-subtle'
                )}
              >
                <span aria-hidden className="size-3 rounded-pill" style={{ background: tv(`color.data.band.${b.key}`) }} />
                {b.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-md sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col items-center gap-xs">
          <div
            className="flex size-32 items-center justify-center rounded-lg text-2xl font-extrabold transition-colors duration-300"
            style={colours}
            aria-label={`Heatmap cell showing ${value.toFixed(2)} percent`}
          >
            {value.toFixed(2)}%
          </div>
          <p className="text-sm text-content-subtle">Heatmap cell</p>
        </div>
        <div className="space-y-md">
          <KpiTile
            icon={<icons.data.operability />}
            tone={value >= 95 ? 'green' : value >= 50 ? 'orange' : 'red'}
            label="Operability"
            value={`${value.toFixed(1)}%`}
            detail={<DeltaIndicator value={+(value - 90).toFixed(2)} comparison="vs 90% target" layout="stacked" />}
          />
          <div className="flex items-end gap-2xs" aria-label="Recent readings">
            {sample.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-3xs">
                <div className="w-full rounded-sm transition-[height] duration-300" style={{ height: `${Math.max(6, v * 0.6)}px`, ...operabilityColours(v) }} />
                <span className="text-2xs text-content-muted">D{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-xs text-sm text-content-default">
            <StatusShape status={value >= 95 ? 'ok' : value >= 50 ? 'warning' : 'info'} />
            {value >= 95 ? 'Healthy data availability' : value >= 50 ? 'Worth a look – some readings missing' : 'Investigate – most readings missing'}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Library map */

function LibraryMap() {
  const levels: { title: string; icon: ReactNode; text: string; count?: number; href: string; accent: string }[] = [
    { title: 'Foundations', icon: <Palette />, text: 'Colour, type, spacing and icons – the tokens everything else uses.', href: '/story/foundations-colour--semantic-colours', accent: BRAND.green },
    { title: 'Atoms', icon: <Atom />, text: 'Single elements: buttons, inputs, switches, icon circles.', count: COUNTS.atoms, href: '/docs/atoms-button--docs', accent: '#2FA84A' },
    { title: 'Molecules', icon: <Component />, text: 'Small groups doing one job: search, date range, delta, legend.', count: COUNTS.molecules, href: '/docs/molecules-searchfield--docs', accent: BRAND.teal },
    { title: 'Organisms', icon: <Blocks />, text: 'Sections: KPI tiles, tables, heatmap, charts, sidebar.', count: COUNTS.organisms, href: '/docs/organisms-kpitile--docs', accent: '#04A1B2' },
    { title: 'Templates', icon: <LayoutTemplate />, text: 'Page layouts with slots, ready for content.', count: COUNTS.templates, href: '/story/templates-appshell--layout', accent: '#04A0CC' },
    { title: 'Pages', icon: <LayoutDashboard />, text: 'The six CWQM dashboards, rebuilt from the library.', count: COUNTS.pages, href: '/story/pages-cwqm-dashboards--operability-all-sites-page', accent: BRAND.blue },
  ];
  return (
    <section aria-labelledby="map" className="space-y-lg">
      <SectionTitle id="map" eyebrow="Atomic design" title="Built up in six levels" />
      <ol className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
        {levels.map((l, i) => (
          <li key={l.title}>
            <a
              href={sb(l.href)}
              target="_top"
              className="st-card group relative flex h-full flex-col gap-sm overflow-hidden rounded-lg border border-line-default bg-surface-default p-lg shadow-card"
              style={{ ['--accent' as string]: l.accent }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: l.accent }} />
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-pill text-white [&_svg]:size-5" style={{ background: l.accent }}>{l.icon}</span>
                <span className="text-xs font-semibold text-content-muted">{String(i).padStart(2, '0')}</span>
              </div>
              <h3 className="text-xl font-bold text-content-accent">
                {l.title}
                {l.count !== undefined && <span className="ml-xs text-md font-semibold text-content-muted">{l.count}</span>}
              </h3>
              <p className="flex-1 text-md text-content-subtle">{l.text}</p>
              <span className="flex items-center gap-2xs text-sm font-semibold text-content-accent">
                Open <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- Principles */

function Principles() {
  const items = [
    { icon: <Layers />, title: 'Tokens only', text: 'Every colour comes from a token. Tailwind’s default palette is switched off, so off-brand colours can’t creep in.' },
    { icon: <Eye />, title: 'Never colour alone', text: 'Values are always available as text, status pairs colour with shape, and change arrows show direction as well as good or bad.' },
    { icon: <ShieldCheck />, title: 'Accessible by default', text: 'WCAG 2.1 AA checks run on every story in both themes. Controls are labelled and keyboard friendly.' },
    { icon: <PieChart />, title: 'Swappable charts', text: 'Charts are wrapped in one folder and styled from tokens, so the chart library can change without touching pages.' },
  ];
  return (
    <section aria-labelledby="principles" className="space-y-lg">
      <SectionTitle id="principles" eyebrow="How we build" title="Principles" />
      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {items.map((p) => (
          <div key={p.title} className="rounded-lg border border-line-default bg-surface-default p-lg shadow-card">
            <span className="mb-sm flex size-10 items-center justify-center rounded-md bg-surface-accent text-content-accent [&_svg]:size-5">{p.icon}</span>
            <h3 className="mb-2xs text-lg font-bold text-content-accent">{p.title}</h3>
            <p className="text-md text-content-subtle">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Get started */

const GUIDES = [
  {
    id: 'run',
    label: 'Work on the library',
    intro: 'For anyone adding or changing components. Needs Node 20 or later.',
    blocks: [
      { label: 'First time', code: `npm install\nnpm run test:install     # one-off: Chromium for the tests\nnpm run storybook        # http://localhost:6006` },
      { label: 'Before you push', code: `npm run check            # tokens, types, atomic layers, class names\nnpm test                 # every story as a test, incl. accessibility\nnpm run test:coverage    # report in coverage/index.html\nnpm run ci               # all of the above + Storybook build` },
    ],
  },
  {
    id: 'use',
    label: 'Use it in an app',
    intro: 'For React 18 or 19 apps. Import the stylesheet once, set data-theme on a wrapper, then use components.',
    blocks: [
      { label: 'Install', code: `npm install @severn-trent/cwqm-design-system` },
      { label: 'Use', code: `import '@severn-trent/cwqm-design-system/styles.css';\nimport { KpiTile, DeltaIndicator, icons } from '@severn-trent/cwqm-design-system';\n\nexport function Operability() {\n  return (\n    <div data-theme="light">  {/* or "dark" */}\n      <KpiTile icon={<icons.data.operability />} tone="green"\n        label="Operability" value="98.31%"\n        detail={<DeltaIndicator value={0.91} comparison="vs previous day" />} />\n    </div>\n  );\n}` },
    ],
  },
  {
    id: 'publish',
    label: 'Publish a release',
    intro: 'Publish to your private registry only (GitHub Packages, Azure Artifacts or the company registry) - never public npm.',
    blocks: [
      { label: 'One-off: point the scope at your registry (.npmrc)', code: `@severn-trent:registry=https://YOUR-REGISTRY-URL/\n//YOUR-REGISTRY-URL/:_authToken=\${NPM_TOKEN}` },
      { label: 'Each release', code: `npm run ci               # must pass\nnpm version minor        # or patch / major\nnpm publish              # builds dist/ first, then uploads\ngit push --follow-tags` },
    ],
  },
] as const;

function GetStarted() {
  const [tab, setTab] = useState<(typeof GUIDES)[number]['id']>('run');
  const guide = GUIDES.find((g) => g.id === tab)!;
  return (
    <section aria-labelledby="start" className="space-y-lg">
      <SectionTitle id="start" eyebrow="Get started" title="Run it, use it, publish it" />
      <div role="tablist" aria-label="Guides" className="flex flex-wrap gap-xs">
        {GUIDES.map((g) => (
          <button
            key={g.id}
            role="tab"
            id={`tab-${g.id}`}
            aria-selected={tab === g.id}
            aria-controls={`panel-${g.id}`}
            onClick={() => setTab(g.id)}
            className={cn(
              'rounded-pill border px-md py-xs text-sm font-semibold transition-colors',
              tab === g.id ? 'border-transparent bg-action-primary text-content-on-action' : 'border-line-default bg-surface-default text-content-accent hover:bg-action-secondary-hover'
            )}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${guide.id}`} aria-labelledby={`tab-${guide.id}`} className="space-y-md">
        <p className="text-md text-content-subtle">{guide.intro}</p>
        <div className="grid gap-md lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {guide.blocks.map((b) => <CodeBlock key={b.label} label={b.label} code={b.code} />)}
        </div>
      </div>
    </section>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard can be blocked inside iframes - the code is still selectable */
    }
  };
  return (
    <figure className="min-w-0 overflow-hidden rounded-lg border border-line-default bg-[#0B1322] shadow-card">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-md py-xs text-sm text-white/80">
        {label}
        <button type="button" onClick={copy} className="flex items-center gap-2xs rounded-md px-xs py-3xs text-white/80 hover:bg-white/10" aria-live="polite">
          {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-md font-mono text-sm leading-relaxed text-[#CDECF8]"><code>{code}</code></pre>
    </figure>
  );
}

/* ---------------------------------------------------------------- Footer */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-nav-bg px-xl py-xl text-nav-text md:px-2xl">
      <div className="flex flex-wrap items-center justify-between gap-lg">
        <p className="whitespace-pre-line text-lg font-semibold leading-snug">{'Cleaner Rivers.\nHealthier Communities.\nA Brighter Tomorrow.'}</p>
        <div className="flex items-center gap-md rounded-lg bg-white px-md py-sm">
          <img src={stLogo} alt="Severn Trent" width={532} height={238} className="h-10 w-auto" />
          <span aria-hidden className="h-10 w-px bg-[#DCE6F2]" />
          <img src={aiLogo} alt="Powered by AI & I Data Science" width={900} height={727} className="h-12 w-auto" />
        </div>
      </div>
    </footer>
  );
}

function SectionTitle({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="st-gradient-text text-xs font-bold uppercase tracking-[0.18em]">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-extrabold text-content-heading">{title}</h2>
    </div>
  );
}

/* Local styles: brand gradient, waves, entrance motion (switched off by prefers-reduced-motion in globals.css). */
const css = `
.st-intro .st-gradient-text {
  background: linear-gradient(90deg, ${BRAND.green}, ${BRAND.teal} 50%, ${BRAND.blue});
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.st-intro .st-wave-fill { fill: ${BRAND.sky}; }
.st-intro .st-wave-2 { fill: ${BRAND.sky}; opacity: .55; }
[data-theme="dark"].st-intro .st-wave-fill { fill: #0A3565; }
[data-theme="dark"].st-intro .st-wave-2 { fill: #0B2A52; opacity: .8; }
.st-intro .st-drift { animation: st-drift 14s ease-in-out infinite alternate; }
@keyframes st-drift { from { transform: translateX(-30px); } to { transform: translateX(30px); } }
.st-intro .st-rise { animation: st-rise .7s cubic-bezier(.2,.7,.2,1) both; }
.st-intro .st-delay { animation-delay: .15s; }
@keyframes st-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.st-intro .st-orbit {
  background: conic-gradient(from 0deg, ${BRAND.green}, ${BRAND.teal}, ${BRAND.blue}, ${BRAND.green});
  filter: blur(26px); opacity: .35; animation: st-spin 18s linear infinite;
}
@keyframes st-spin { to { transform: rotate(360deg); } }
.st-intro .st-btn { display: inline-flex; align-items: center; gap: .5rem; height: 3rem; padding: 0 1.25rem; border-radius: 8px; font-weight: 700; transition: transform .15s, background-color .15s, box-shadow .15s; }
.st-intro .st-btn:hover { transform: translateY(-1px); }
.st-intro .st-btn-primary { background: var(--st-color-action-primary); color: var(--st-color-content-on-action); box-shadow: 0 8px 22px rgba(0,80,240,.28); }
.st-intro .st-btn-primary:hover { background: var(--st-color-action-primary-hover); }
.st-intro .st-btn-secondary { background: var(--st-color-surface-default); color: var(--st-color-content-accent); border: 1px solid var(--st-color-line-default); }
.st-intro .st-card { transition: transform .2s, box-shadow .2s, border-color .2s; }
.st-intro .st-card:hover { transform: translateY(-3px); box-shadow: var(--st-shadow-raised); border-color: var(--accent); }
.st-intro .st-range { accent-color: var(--st-color-action-primary); height: 1.5rem; }
`;
