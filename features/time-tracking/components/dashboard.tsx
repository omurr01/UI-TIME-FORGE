'use client';

import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '../../employees/components/shared/section-card';
import { InformationCard, type InfoItem } from '../../employees/components/shared/information-card';
import { useTimeDashboard } from '../hooks/use-time-tracking';
import { WorkingStatusBadge, ShiftBadge, OvertimeBadge } from '../../../components/shared/time-tracking/time-badges';

export function Dashboard() {
  const router = useRouter();
  const { data, isLoading } = useTimeDashboard('emp-0076');

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading dashboard...</div>;
  }

  if (!data) return null;

  const todayHoursStr = `${Math.floor(data.todayHours)}h ${Math.round((data.todayHours % 1) * 60)}m`;
  const weekHoursStr = `${Math.floor(data.weeklyHours)}h ${Math.round((data.weeklyHours % 1) * 60)}m`;
  
  const statItems: InfoItem[] = [
    { label: "Today's Hours", value: <span className="text-2xl font-bold">{todayHoursStr}</span> },
    { label: "Weekly Hours", value: <span className="text-2xl font-bold">{weekHoursStr}</span> },
    { label: "Overtime (Month)", value: <OvertimeBadge minutes={data.overtimeHours * 60} /> },
    { label: "Current Status", value: <WorkingStatusBadge status={data.currentStatus} /> },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Time Tracking Dashboard"
        description="Overview of your working hours and current session."
      >
        <Button onClick={() => router.push('/time-tracking/live')} className="shadow-lg shadow-primary/20">
          <Play className="mr-2 h-4 w-4" />
          Open Live Timer
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Time Summary">
            <InformationCard items={statItems} columns={4} />
          </SectionCard>

          <SectionCard title="Recent Entries" action={
            <Button variant="ghost" size="sm" onClick={() => router.push('/time-tracking/history')}>View All</Button>
          }>
            <div className="space-y-4">
              {data.recentEntries.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No recent entries.</p>
              ) : (
                data.recentEntries.map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                    <div className="space-y-1">
                      <p className="font-medium">{entry.date} <span className="text-muted-foreground text-sm font-normal ml-2">{new Date(entry.clockIn).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Present'}</span></p>
                      <p className="text-xs text-muted-foreground">{entry.projectName}</p>
                    </div>
                    <WorkingStatusBadge status={entry.status} />
                  </div>
                ))
              )}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          {data.upcomingShift && (
            <SectionCard title="Upcoming Shift">
              <div className="space-y-3">
                <ShiftBadge shift={data.upcomingShift.shift} className="w-full justify-center py-2 text-sm" />
                <p className="text-center text-sm font-medium mt-2">Starts at {data.upcomingShift.startTime}</p>
              </div>
            </SectionCard>
          )}

          <SectionCard title="Quick Actions">
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/time-tracking/manual-entry')}>
                Add Manual Entry
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/time-tracking/history')}>
                View Time History
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
