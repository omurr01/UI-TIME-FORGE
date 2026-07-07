'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Shell
import { RoleSync } from '@/features/dashboard/components/role-sync';

// Admin components
import { DashboardHeader }    from '@/features/admin/components/dashboard-header';
import { StatCard }           from '@/features/admin/components/stat-card';
import { QuickActionCard, ADMIN_QUICK_ACTIONS } from '@/features/admin/components/quick-action-card';
import { ActivityTimeline }   from '@/features/admin/components/activity-timeline';
import { NotificationCard }   from '@/features/admin/components/notification-card';
import { UpcomingEventCard }  from '@/features/admin/components/upcoming-event-card';
import { SystemStatusCard }   from '@/features/admin/components/system-status-card';
import { ChartCard }          from '@/features/admin/components/chart-card';
import { WeeklyProductivityChart } from '@/features/admin/components/charts/weekly-productivity-chart';
import { EmployeeGrowthChart }     from '@/features/admin/components/charts/employee-growth-chart';
import { TimesheetTrendChart }     from '@/features/admin/components/charts/timesheet-trend-chart';

// Shared
import { SectionHeader }      from '@/components/shared/section-header';
import { Container }          from '@/components/shared/container';
import { EmptyState }         from '@/components/shared/empty-state';

// Service
import {
  getDashboardStats,
  getRecentActivities,
  getNotifications,
  getUpcomingEvents,
  getSystemStatus,
} from '@/src/services/dashboard/adminDashboardService';

// Mock charts data (imported directly — charts don't need async)
import { mockWeeklyProductivity, mockEmployeeGrowth, mockTimesheetTrend }
  from '@/src/mocks/dashboard/charts';

// Types
import type {
  AdminStatCard,
  AdminActivity,
  AdminNotification,
  UpcomingEvent,
  SystemStatusItem,
} from '@/features/admin/types';

// Button
import { Button } from '@/components/ui/button';
import { Bell, ChevronRight } from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.06 } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [stats,         setStats]         = useState<AdminStatCard[]>([]);
  const [activities,    setActivities]    = useState<AdminActivity[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [events,        setEvents]        = useState<UpcomingEvent[]>([]);
  const [systemStatus,  setSystemStatus]  = useState<SystemStatusItem[]>([]);

  const [loadingStats,  setLoadingStats]  = useState(true);
  const [loadingMisc,   setLoadingMisc]   = useState(true);
  const [refreshing,    setRefreshing]    = useState(false);

  const fetchAll = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else { setLoadingStats(true); setLoadingMisc(true); }

    const [s, a, n, e, ss] = await Promise.all([
      getDashboardStats(),
      getRecentActivities(),
      getNotifications(),
      getUpcomingEvents(),
      getSystemStatus(),
    ]);

    setStats(s);
    setActivities(a);
    setNotifications(n);
    setEvents(e);
    setSystemStatus(ss);
    setLoadingStats(false);
    setLoadingMisc(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <RoleSync role="admin" />
      <Container>
        <div className="space-y-8">

          {/* ── Welcome header ─────────────────────────────────────────────── */}
          <DashboardHeader
            onRefresh={() => fetchAll(true)}
            isRefreshing={refreshing}
          />

          {/* ── Stats grid ─────────────────────────────────────────────────── */}
          <section aria-label="Dashboard statistics">
            <SectionHeader
              title="Platform Overview"
              description="Real-time snapshot of your organisation"
              className="mb-4"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {loadingStats
                ? Array.from({ length: 8 }).map((_, i) => (
                    <StatCard key={i} stat={{} as AdminStatCard} loading />
                  ))
                : stats.map((stat) => (
                    <motion.div key={stat.id} variants={fadeUp}>
                      <StatCard stat={stat} />
                    </motion.div>
                  ))}
            </motion.div>
          </section>

          {/* ── Quick actions ───────────────────────────────────────────────── */}
          <section aria-label="Quick actions">
            <SectionHeader title="Quick Actions" className="mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {ADMIN_QUICK_ACTIONS.map((action) => (
                <QuickActionCard key={action.id} action={action} />
              ))}
            </div>
          </section>

          {/* ── Charts row ──────────────────────────────────────────────────── */}
          <section aria-label="Analytics charts">
            <SectionHeader title="Analytics" description="Platform-wide metrics at a glance" className="mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ChartCard
                title="Weekly Productivity"
                description="Average productivity score vs 80% target"
              >
                <WeeklyProductivityChart data={mockWeeklyProductivity} />
              </ChartCard>

              <ChartCard
                title="Employee Growth"
                description="New hires and departures per month"
              >
                <EmployeeGrowthChart data={mockEmployeeGrowth} />
              </ChartCard>

              <ChartCard
                title="Timesheet Trend"
                description="Submitted, approved & rejected by week"
              >
                <TimesheetTrendChart data={mockTimesheetTrend} />
              </ChartCard>
            </div>
          </section>

          {/* ── Main content area ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Recent Activity (2/3 width) */}
            <div className="xl:col-span-2 space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <SectionHeader
                  title="Recent Activity"
                  description="Latest platform events"
                  action={
                    <Link href="/reports">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                        View all <ChevronRight size={13} />
                      </Button>
                    </Link>
                  }
                  className="mb-4"
                />
                {loadingMisc ? (
                  <ActivityTimeline activities={[]} loading />
                ) : activities.length === 0 ? (
                  <EmptyState
                    title="No recent activity"
                    description="Events will appear here as your team uses the platform."
                    size="sm"
                  />
                ) : (
                  <ActivityTimeline activities={activities} />
                )}
              </div>

              {/* Notification panel */}
              <div className="rounded-xl border border-border bg-card p-5">
                <SectionHeader
                  title="Notifications"
                  description={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                  action={
                    <Link href="/notifications">
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                        <Bell size={13} />
                        {unreadCount > 0 && (
                          <span className="bg-destructive text-destructive-foreground rounded-full text-[10px] px-1.5 py-0 font-bold">
                            {unreadCount}
                          </span>
                        )}
                        Manage
                      </Button>
                    </Link>
                  }
                  className="mb-4"
                />
                {loadingMisc ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : notifications.length === 0 ? (
                  <EmptyState
                    title="No notifications"
                    description="You're all caught up."
                    size="sm"
                  />
                ) : (
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <NotificationCard key={n.id} notification={n} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">

              {/* Upcoming Events */}
              <div className="rounded-xl border border-border bg-card p-5">
                <SectionHeader
                  title="Upcoming Events"
                  description="Next 30 days"
                  className="mb-2"
                />
                {loadingMisc ? (
                  <div className="space-y-3 mt-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-14 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : events.length === 0 ? (
                  <EmptyState title="No upcoming events" size="sm" />
                ) : (
                  <div>
                    {events.map((evt) => (
                      <UpcomingEventCard key={evt.id} event={evt} />
                    ))}
                  </div>
                )}
              </div>

              {/* System Status */}
              <div className="rounded-xl border border-border bg-card p-5">
                <SectionHeader
                  title="System Status"
                  description="Live infrastructure health"
                  className="mb-4"
                />
                <SystemStatusCard items={systemStatus} loading={loadingMisc} />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}
