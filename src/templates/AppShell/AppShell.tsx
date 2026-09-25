import type { ReactNode } from 'react';

export interface AppShellProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

/** Fixed sidebar on the left, scrolling content on the right. */
export function AppShell({ sidebar, header, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-surface-page text-content-default">
      <div className="sticky top-0 h-screen">{sidebar}</div>
      <main className="min-w-0 flex-1 space-y-lg px-2xl py-xl">
        {header}
        {children}
      </main>
    </div>
  );
}
