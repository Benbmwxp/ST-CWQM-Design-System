# Architecture

The library follows atomic design. Folders in `src/` match the levels, and so does the Storybook sidebar.

| Level | What goes here | Examples from the CWQM dashboards |
|---|---|---|
| Tokens | Design decisions as data, light and dark kept separate | colours, type, spacing, radius |
| Atoms | Single elements that can't be broken down further | button, input, toggle, badge, status shape, icon, tooltip |
| Molecules | Small groups of atoms doing one job | search field, combobox, date range picker, segmented control, delta indicator, pagination, nav item |
| Organisms | Larger sections that combine molecules or hold their own state or data logic | sidebar, page header, filter bar, KPI tile, panel card, data table, chart blocks |
| Templates | Page layouts with slots, no real data | app shell, filter bar + KPI row + two-column grid |
| Pages | Templates filled with sample data | the six CWQM dashboards, in both themes |

## Rules

**Imports go down, never up.** Each level imports only from the levels below it. Organisms may contain other organisms (a panel card holding a data table, for example), and pages may share page setup and sample data with each other. `lib/`, `styles/` and `tokens/` are shared by every level. `npm run lint:layers` checks this and runs as part of the Storybook build.

**Molecule or organism?** If a component combines other molecules, or holds its own state or data logic, it's an organism. A KPI tile combines an icon, a delta indicator and a sparkline, so it's an organism. A status badge is a shape plus a label, so it's a molecule.

**Charts are wrapped.** Only `src/organisms/charts/` imports the charting library. Legends, tooltips and axis styling are built as library-agnostic atoms, molecules and a shared chart theme, so the library can be swapped without touching anything else.

## Folder per component

```
src/molecules/StatusBadge/
  StatusBadge.tsx          component
  StatusBadge.stories.tsx  stories covering its states, viewable in both themes
```
