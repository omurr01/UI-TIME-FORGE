'use client';

import { Clock, ArrowRight, Zap, BarChart2, CalendarDays, Users, FileText, MessageSquare } from 'lucide-react';
import { useShell } from '@/contexts/shell-context';
import { RoleBadge } from '@/features/dashboard/components/role-badge';
import { DashboardCard, DashboardCardHeader, DashboardCardBody } from '@/components/shared/dashboard-card';
import { SectionHeader } from '@/components/shared/section-header';
import { Container } from '@/components/shared/container';
import { PageHeader } from '@/components/shared/page-header';
import { ActivitySkeleton, Skeleton } from '@/components/shared/loading-skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ROLE_LABELS } from '@/lib/nav-config';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ─── Coming-soon section card ─────────────────────────────────────────────────

interface ComingSoonCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  sprint: string;
}

function ComingSoonCard({ icon: Icon, title, description, href, sprint }: ComingSoonCardProps) {
  return (
    <DashboardCard hoverable>
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-muted p-2.5 shrink-0">
          <Icon size={18} className="text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
              {sprint}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </DashboardCard>
  );
}

// ─── Quick action placeholder ─────────────────────────────────────────────────

interface QuickActionItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
}

function QuickActionItem({ icon: Icon, label, href, color }: QuickActionItemProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/30 hover:bg-primary/5 transition-all duration-150"
    >
      <div className={cn('rounded-lg p-2 shrink-0', color)}>
        <Icon size={16} />
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {label}
      </span>
      <ArrowRight
        size={14}
        className="ml-auto text-muted-foreground group-hover:text-primary transition-colors"
      />
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useShell();

  return (
    <Container>
      <div className="space-y-8">
        {/* Welcome card */}
        <DashboardCard className="bg-gradient-to-br from-card to-muted/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Clock size={22} className="text-primary" />
                </div>
                <RoleBadge role={user.role} size="md" />
              </div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {getGreeting()}, {user.firstName} 👋
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-lg">
                Welcome to <span className="font-semibold text-foreground">TimeForge</span>. You&apos;re signed in as{' '}
                <span className="font-semibold text-foreground">{ROLE_LABELS[user.role]}</span>. Your workspace is ready.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm bg-muted/60 border border-border px-4 py-3 rounded-xl shrink-0">
              <Clock size={15} className="text-primary" />
              <div>
                <p className="font-bold text-foreground text-base">
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Quick actions + Coming soon */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick actions placeholder */}
            <DashboardCard>
              <DashboardCardHeader>
                <SectionHeader
                  title="Quick Actions"
                  description="Jump to frequently used features"
                />
              </DashboardCardHeader>
              <DashboardCardBody>
                <div className="space-y-2">
                  <QuickActionItem
                    icon={Clock}
                    label="Clock In / Out"
                    href="/time-tracking"
                    color="bg-primary/10 text-primary"
                  />
                  <QuickActionItem
                    icon={FileText}
                    label="Submit Timesheet"
                    href="/timesheets"
                    color="bg-success/10 text-success"
                  />
                  <QuickActionItem
                    icon={MessageSquare}
                    label="Daily Scrum Update"
                    href="/scrum"
                    color="bg-purple-500/10 text-purple-500"
                  />
                  <QuickActionItem
                    icon={CalendarDays}
                    label="Request Leave"
                    href="/timesheets"
                    color="bg-warning/10 text-warning"
                  />
                </div>
              </DashboardCardBody>
            </DashboardCard>

            {/* Coming soon modules */}
            <DashboardCard>
              <DashboardCardHeader>
                <SectionHeader
                  title="Upcoming Modules"
                  description="Features being built sprint by sprint"
                  action={
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      In progress
                    </span>
                  }
                />
              </DashboardCardHeader>
              <DashboardCardBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ComingSoonCard
                    icon={Users}
                    title="Employee Management"
                    description="View, add, and manage the employee directory."
                    href="/employees"
                    sprint="Sprint 3"
                  />
                  <ComingSoonCard
                    icon={Clock}
                    title="Time Tracking"
                    description="Real-time clock in/out with GPS and manual entry."
                    href="/time-tracking"
                    sprint="Sprint 4"
                  />
                  <ComingSoonCard
                    icon={FileText}
                    title="Timesheets"
                    description="Submit, review, and approve weekly timesheets."
                    href="/timesheets"
                    sprint="Sprint 5"
                  />
                  <ComingSoonCard
                    icon={MessageSquare}
                    title="Daily Scrum"
                    description="Async standup board with blocker tracking."
                    href="/scrum"
                    sprint="Sprint 6"
                  />
                  <ComingSoonCard
                    icon={BarChart2}
                    title="KPI & Reports"
                    description="Performance metrics, charts, and exports."
                    href="/kpi"
                    sprint="Sprint 7"
                  />
                  <ComingSoonCard
                    icon={CalendarDays}
                    title="Payroll"
                    description="Payroll processing and pay stub management."
                    href="/payroll"
                    sprint="Sprint 8"
                  />
                </div>
              </DashboardCardBody>
            </DashboardCard>
          </div>

          {/* Right: Activity placeholder */}
          <div className="space-y-6">
            <DashboardCard>
              <DashboardCardHeader>
                <SectionHeader
                  title="Recent Activity"
                  description="Loading your activity…"
                />
              </DashboardCardHeader>
              <DashboardCardBody>
                {/* Skeleton — activity data loads in role-specific pages */}
                <ActivitySkeleton rows={5} />
              </DashboardCardBody>
            </DashboardCard>

            {/* Status snapshot */}
            <DashboardCard>
              <DashboardCardHeader>
                <SectionHeader title="Your Status" />
              </DashboardCardHeader>
              <DashboardCardBody>
                <div className="space-y-3">
                  {[
                    { label: 'Hours this week', value: '— h' },
                    { label: 'Pending timesheets', value: '—' },
                    { label: 'Leave balance', value: '— days' },
                    { label: 'Scrum streak', value: '— days' },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-xs text-muted-foreground">{label}</span>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Full stats available in your{' '}
                  <Link href={`/dashboard/${user.role.replace('_', '-')}`} className="text-primary hover:underline">
                    role dashboard
                  </Link>
                </p>
              </DashboardCardBody>
            </DashboardCard>
          </div>
        </div>

        {/* Role-specific dashboard CTA */}
        <DashboardCard className="border-primary/20 bg-primary/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Zap size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Go to your full dashboard
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  See KPI cards, charts, and team data for {ROLE_LABELS[user.role]}
                </p>
              </div>
            </div>
            <Button asChild size="sm" className="shrink-0">
              <Link href={`/dashboard/${user.role === 'hr_finance' ? 'hr-finance' : user.role}`}>
                Open {ROLE_LABELS[user.role]} Dashboard
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </DashboardCard>
      </div>
    </Container>
  );
}
