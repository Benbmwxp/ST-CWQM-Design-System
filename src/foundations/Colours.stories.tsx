import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../tokens/tokens.generated.json';
import { contrast } from './contrast';

type Token = (typeof tokens)['light'][number];
const semantic = (theme: 'light' | 'dark') => tokens[theme].filter((t) => t.group === 'color');
const byName = (theme: 'light' | 'dark', name: string) => tokens[theme].find((t) => t.name === name)?.value as string;

// Text and status colours need 4.5:1 (WCAG 1.4.3). Borders that identify a control,
// and the focus ring, need 3:1 (WCAG 1.4.11). line-default is for decorative dividers,
// which 1.4.11 does not cover - use line-strong for input and control borders.
const requirement = (name: string) => {
  if (name.startsWith('color.content') || name.startsWith('color.feedback')) return 4.5;
  if (name === 'color.line.focus') return 3;
  return null;
};

// Each colour is checked against the surface it is designed to sit on.
const backgroundFor = (name: string) =>
  name === 'color.content.on-strong' ? 'color.surface.strong'
  : name === 'color.content.on-action' ? 'color.action.primary'
  : 'color.surface.default';
const exemptNote = (name: string) => (name.startsWith('color.line') ? 'Decorative only' : '-');

function Ratio({ theme, token }: { theme: 'light' | 'dark'; token: Token }) {
  const min = requirement(token.name);
  if (!min) return <span className="text-content-muted">{exemptNote(token.name)}</span>;
  const bg = backgroundFor(token.name);
  const ratio = contrast(token.value as string, byName(theme, bg));
  const pass = ratio >= min;
  return (
    <span className={pass ? 'text-content-default' : 'font-bold text-content-default underline'}>
      {ratio.toFixed(2)}:1 {pass ? 'Pass' : `Fail (needs ${min}:1)`}
      {bg !== 'color.surface.default' && <span className="text-content-muted"> on {bg.split('.').pop()}</span>}
    </span>
  );
}

function Swatch({ theme, token }: { theme: 'light' | 'dark'; token: Token }) {
  return (
    <div data-theme={theme} className="flex items-center gap-sm bg-surface-default p-xs text-content-default">
      <span className="h-8 w-8 shrink-0 rounded-md border border-line-default" style={{ background: token.value as string }} />
      <div className="text-xs">
        <div className="font-mono">{String(token.value).toUpperCase()}</div>
        <Ratio theme={theme} token={token} />
      </div>
    </div>
  );
}

function ColourTable() {
  const light = semantic('light');
  // Group by the first two levels, e.g. "surface", "data.operability", "tone.blue"
  const groupOf = (n: string) => { const p = n.split('.'); return p.length > 3 ? `${p[1]}.${p[2]}` : p[1]; };
  const groups = [...new Set(light.map((t) => groupOf(t.name)))];
  return (
    <div className="max-w-5xl space-y-xl text-content-default">
      <p className="text-sm text-content-muted">
        Each theme is resolved separately from its own token file. Contrast is measured in the same theme against the
        surface each colour is meant for. Text and feedback colours need 4.5:1; the focus ring needs 3:1. Class names are shown as used with Tailwind, for example bg-surface-page or text-content-muted.
      </p>
      {groups.map((group) => (
        <section key={group}>
          <h2 className="mb-sm text-lg font-bold capitalize">{group}</h2>
          <table className="w-full table-fixed border-collapse text-sm">
            <colgroup><col className="w-2/5" /><col className="w-[30%]" /><col className="w-[30%]" /></colgroup>
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th className="py-xs pr-md font-medium">Token</th>
                <th className="py-xs pr-md font-medium">Light</th>
                <th className="py-xs font-medium">Dark</th>
              </tr>
            </thead>
            <tbody>
              {light
                .filter((t) => groupOf(t.name) === group)
                .map((t) => {
                  const dark = tokens.dark.find((d) => d.name === t.name)!;
                  return (
                    <tr key={t.name} className="border-b border-line-default align-top">
                      <td className="py-xs pr-md">
                        <div className="font-mono text-xs">{t.tailwind}</div>
                        <div className="font-mono text-xs text-content-muted">{t.cssVar}</div>
                        {t.description && <div className="mt-2xs text-xs text-content-muted">{t.description}</div>}
                      </td>
                      <td className="py-xs pr-md"><Swatch theme="light" token={t} /></td>
                      <td className="py-xs"><Swatch theme="dark" token={dark} /></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

const meta = { title: 'Foundations/Colour', component: ColourTable, parameters: { layout: 'padded' } } satisfies Meta<typeof ColourTable>;
export default meta;
export const SemanticColours: StoryObj<typeof meta> = { name: 'Semantic colours (light and dark)' };
