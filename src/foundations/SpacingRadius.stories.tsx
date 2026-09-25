import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../tokens/tokens.generated.json';

function SpacingRadius() {
  const spacing = tokens.light.filter((t) => t.group === 'spacing');
  const radius = tokens.light.filter((t) => t.group === 'radius');
  return (
    <div className="max-w-4xl space-y-xl text-content-default">
      <section>
        <h2 className="mb-sm text-lg font-bold">Spacing</h2>
        {spacing.map((s) => (
          <div key={s.name} className="flex items-center gap-md py-2xs">
            <span className="w-32 shrink-0 font-mono text-xs text-content-muted">p-{s.tailwind} ({s.value})</span>
            <span className="h-4 bg-action-primary" style={{ width: s.value as string }} />
          </div>
        ))}
      </section>
      <section>
        <h2 className="mb-sm text-lg font-bold">Radius</h2>
        <div className="flex flex-wrap gap-lg">
          {radius.map((r) => (
            <div key={r.name} className="text-center">
              <div className="h-16 w-16 border-2 border-line-strong bg-surface-sunken" style={{ borderRadius: r.value as string }} />
              <div className="mt-2xs font-mono text-xs text-content-muted">rounded-{r.tailwind}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = { title: 'Foundations/Spacing and radius', component: SpacingRadius } satisfies Meta<typeof SpacingRadius>;
export default meta;
export const Scales: StoryObj<typeof meta> = {};
