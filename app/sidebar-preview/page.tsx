'use client';

import { useState } from 'react';
import { ShellProvider, useShell } from '@/contexts/shell-context';
import { Sidebar } from '@/features/dashboard/components/sidebar';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';
import { RoleBadge } from '@/features/dashboard/components/role-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROLE_LABELS } from '@/lib/nav-config';
import type { UserRole } from '@/features/dashboard/types';

const ROLES: UserRole[] = ['employee', 'supervisor', 'hr_finance', 'admin'];

// ─── Controls overlay (role switcher + state display) ─────────────────────────

function PreviewControls() {
  const { user, setRole, sidebarCollapsed } = useShell();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">Sidebar Preview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Interactive preview — collapse, switch roles, toggle theme
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* State chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">Current state:</span>
        <Badge variant="outline" className="text-xs">
          {sidebarCollapsed ? 'Collapsed (64px)' : 'Expanded (240px)'}
        </Badge>
        <RoleBadge role={user.role} size="sm" />
      </div>

      {/* Role switcher */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Switch Role
        </p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <Button
              key={role}
              size="sm"
              variant={user.role === role ? 'default' : 'outline'}
              onClick={() => setRole(role)}
              className="text-xs h-8"
            >
              {ROLE_LABELS[role]}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Nav items filter per role — Employees, Payroll and Approvals are role-restricted.
        </p>
      </div>

      {/* Feature callouts */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-2.5">
        <p className="text-xs font-semibold text-foreground">Features</p>
        {[
          'Smooth Framer Motion width animation',
          'Section group headers (Workspace / Management / Finance / System)',
          'Active route highlighting',
          'Notification badges with dot indicator when collapsed',
          'Tooltips on all items when collapsed',
          'Logo swaps between full wordmark and icon',
          'Fully accessible — keyboard nav + ARIA labels',
          'Dark mode supported',
        ].map((f) => (
          <div key={f} className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inner layout (consumes ShellProvider) ────────────────────────────────────

function PreviewInner() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — full height, left edge */}
      <Sidebar />

      {/* Right panel — controls + info */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="relative flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-lg">
            <PreviewControls />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function SidebarPreviewPage() {
  return (
    <ShellProvider>
      <PreviewInner />
    </ShellProvider>
  );
}
