'use client';

import { useState } from 'react';
import { Sidebar } from '@/features/dashboard/components/sidebar';
import { Topbar } from '@/features/dashboard/components/topbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { UserRole } from '@/features/dashboard/types';

// In a real app this would come from auth context / session
// For the mock we hard-code a demo user that can be swapped
const DEMO_USER = {
  name: 'Alex Johnson',
  initials: 'AJ',
  role: 'employee' as UserRole,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col h-full shrink-0">
        <Sidebar
          role={DEMO_USER.role}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* Mobile sidebar (sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-60">
          <Sidebar
            role={DEMO_USER.role}
            collapsed={false}
            onToggle={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          userName={DEMO_USER.name}
          userRole={DEMO_USER.role}
          userInitials={DEMO_USER.initials}
          onMenuClick={() => setMobileOpen(true)}
          notificationCount={5}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
