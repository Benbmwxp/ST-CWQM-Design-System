import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../tokens/tokens.generated.json';

function TypeScale() {
  const sizes = tokens.light.filter((t) => t.group === 'text');
  const families = tokens.light.filter((t) => t.group === 'font');
  return (
    <div className="max-w-4xl space-y-xl text-content-default">
      <section>
        <h2 className="mb-sm text-lg font-bold">Families</h2>
        {families.map((f) => (
          <div key={f.name} className="border-b border-line-default py-sm">
            <div className="text-xl" style={{ fontFamily: f.value as string }}>Operability across all sites</div>
            <div className="font-mono text-xs text-content-muted">font-{f.tailwind} - {f.value}</div>
          </div>
        ))}
        <p className="mt-sm text-sm text-content-muted">Plus Jakarta Sans is the closest free match to the typeface in the designs (SIL Open Font License). If Severn Trent supplies its own font, change font.sans in tokens/core/core.json.</p>
      </section>
      <section>
        <h2 className="mb-sm text-lg font-bold">Size scale</h2>
        {sizes.map((s) => (
          <div key={s.name} className="flex items-baseline gap-lg border-b border-line-default py-sm">
            <span className="w-28 shrink-0 font-mono text-xs text-content-muted">text-{s.tailwind} ({s.value})</span>
            <span style={{ fontSize: s.value as string }}>Measurements analysis</span>
          </div>
        ))}
      </section>
    </div>
  );
}

const meta = { title: 'Foundations/Typography', component: TypeScale } satisfies Meta<typeof TypeScale>;
export default meta;
export const Scale: StoryObj<typeof meta> = {};
