'use client';

import { useEffect, useState } from 'react';
import { WelcomeBanner } from '@/features/dashboard/components/welcome-banner';
import { StatCard } from '@/features/dashboard/components/stat-card';
import { ActivityFeed } from '@/features/dashboard/components/activity-feed';
import { QuickActions } from '@/features/dashboard/components/quick-actions';
import { WeeklyHoursChart } from '@/features/dashboard/components/weekly-hours-chart';
import { getAdminDashboard } from '@/features/dashboard/lib/mock-dashboard';
import { RoleSync } from '@/features/dashboard/components/role-sync';
import type { DashboardData } from '@/features/dashboard/types';

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <RoleSync role="admin" />
      <WelcomeBanner name="Riley Thompson" role="admin" />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatCard key={i} stat={{} as any} loading />
            ))
          : data?.stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Platform Activity — Hours Logged</h2>
              <span className="text-xs text-muted-foreground">Mon – Sun</span>
            </div>
            <WeeklyHoursChart data={data?.weeklyHours ?? []} loading={loading} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
            <QuickActions actions={data?.quickActions ?? []} loading={loading} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">System Activity</h2>
          <ActivityFeed items={data?.recentActivity ?? []} loading={loading} />
        </div>
      </div>
    </div>
  );
}
