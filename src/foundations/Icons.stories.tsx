import type { Meta, StoryObj } from '@storybook/react-vite';
import { icons } from '../lib/icons';
import { IconCircle } from '../atoms/IconCircle/IconCircle';

function IconSet() {
  return (
    <div className="max-w-[64rem] space-y-xl text-content-default">
      <p className="text-md text-content-subtle">
        Icons come from Lucide (ISC licence) and are grouped by meaning in <code className="font-mono">src/lib/icons.ts</code>.
        Use the same icon for the same idea everywhere. Icons are decorative: set <code className="font-mono">aria-hidden</code>, and give icon-only buttons an <code className="font-mono">aria-label</code>.
      </p>
      {Object.entries(icons).map(([group, set]) => (
        <section key={group}>
          <h2 className="mb-sm text-lg font-bold capitalize text-content-accent">{group}</h2>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-sm">
            {Object.entries(set).map(([name, Icon]) => (
              <li key={name} className="flex flex-col items-center gap-xs rounded-md border border-line-default bg-surface-default p-md text-center">
                <Icon aria-hidden className="size-6 text-content-accent" />
                <span className="text-sm">{name}</span>
                <code className="font-mono text-2xs text-content-muted">{Icon.displayName}</code>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section>
        <h2 className="mb-sm text-lg font-bold text-content-accent">Sizes</h2>
        <div className="flex flex-wrap items-end gap-xl">
          {[{ c: 'size-4', l: '16px – inline, links, table sort' }, { c: 'size-5', l: '20px – inputs, buttons' }, { c: 'size-6', l: '24px – navigation' }].map((s) => (
            <div key={s.c} className="flex flex-col items-center gap-xs text-sm">
              <icons.actions.search aria-hidden className={`${s.c} text-content-accent`} />
              <span>{s.l}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-xs text-sm">
            <IconCircle tone="blue" size="lg"><icons.data.chart /></IconCircle>
            <span>In an IconCircle – KPI tiles, card headers</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const meta = { title: 'Foundations/Icons', component: IconSet } satisfies Meta<typeof IconSet>;
export default meta;
export const AllIcons: StoryObj<typeof meta> = { name: 'Icon set' };
