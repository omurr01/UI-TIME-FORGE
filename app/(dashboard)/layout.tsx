'use client';

import { ShellProvider, useShell } from '@/contexts/shell-context';
import { Sidebar } from '@/features/dashboard/components/sidebar';
import { Topbar } from '@/features/dashboard/components/topbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { QueryProvider } from '@/components/providers/query-provider';

// ─── Inner shell (consumes context) ──────────────────────────────────────────

function ShellInner({ children }: { children: React.ReactNode }) {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useShell();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-60" aria-label="Navigation menu">
          {/* Sidebar in mobile mode is never collapsed */}
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto scroll-smooth"
          tabIndex={-1}
          aria-label="Page content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Layout root (provides context) ──────────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ShellProvider>
        <ShellInner>{children}</ShellInner>
      </ShellProvider>
    </QueryProvider>
  );
}
