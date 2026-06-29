'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ShellProvider, useShell } from '@/contexts/shell-context';
import { Sidebar } from '@/features/dashboard/components/sidebar';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';
import { RoleBadge } from '@/features/dashboard/components/role-badge';
import { Badge } from '@/components/ui/badge';
import { getNavGroups, ROLE_LABELS } from '@/lib/nav-config';
import type { UserRole } from '@/features/dashboard/types';

// ─── Info panel ───────────────────────────────────────────────────────────────

function InfoPanel({ role }: { role: UserRole }) {
  const { sidebarCollapsed } = useShell();
  const groups = getNavGroups(role);
  const totalItems = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Back + header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/sidebar-preview"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft size={13} />
            All roles
          </Link>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            {ROLE_LABELS[role]} Sidebar
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {totalItems} nav items across {groups.length} groups
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* State */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">State:</span>
        <Badge variant="outline" className="text-xs">
          {sidebarCollapsed ? 'Collapsed · 64px' : 'Expanded · 240px'}
        </Badge>
        <RoleBadge role={role} size="sm" />
      </div>

      {/* Nav groups breakdown */}
      <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
        {groups.map((group) => (
          <div key={group.id} className="px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.href} className="flex items-center gap-2.5">
                    <Icon size={13} className="text-muted-foreground shrink-0" />
                    <span className="text-xs text-foreground">{item.label}</span>
                    {item.badge ? (
                      <Badge variant="destructive" className="ml-auto h-4 px-1.5 text-[10px]">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-2">
        <p className="text-xs font-semibold text-foreground">Try it</p>
        {[
          'Click "Collapse" at the bottom of the sidebar',
          'Hover nav items when collapsed to see tooltips',
          'Toggle dark/light mode above',
          'Active route highlights in blue',
        ].map((tip) => (
          <div key={tip} className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
            <p className="text-xs text-muted-foreground">{tip}</p>
          </div>
        ))}
      </div>

      {/* Other roles */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Other roles
        </p>
        <div className="flex flex-wrap gap-2">
          {(['employee', 'supervisor', 'hr_finance', 'admin'] as UserRole[])
            .filter((r) => r !== role)
            .map((r) => (
              <Link
                key={r}
                href={`/sidebar-preview/${r === 'hr_finance' ? 'hr-finance' : r}`}
                className="text-xs px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 transition-all text-foreground"
              >
                {ROLE_LABELS[r]}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

// ─── Preview shell ────────────────────────────────────────────────────────────

function PreviewShell({ role }: { role: UserRole }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Right panel */}
      <div className="flex-1 relative flex flex-col min-w-0 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div className="relative flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-sm">
            <InfoPanel role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Exported wrapper — sets the initial role via context ─────────────────────

interface RolePreviewProps {
  role: UserRole;
}

export function RolePreview({ role }: RolePreviewProps) {
  return (
    <ShellProvider initialRole={role}>
      <PreviewShell role={role} />
    </ShellProvider>
  );
}
