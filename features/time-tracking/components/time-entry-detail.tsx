'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Briefcase, CalendarDays, MapPin, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '../../employees/components/shared/section-card';
import { InformationCard, type InfoItem } from '../../employees/components/shared/information-card';
import { AvatarCell } from '../../employees/components/shared/avatar-cell';
import { WorkingStatusBadge, ShiftBadge, OvertimeBadge } from '../../../components/shared/time-tracking/time-badges';
import { useTimeEntry } from '../hooks/use-time-tracking';

export function TimeEntryDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: entry, isLoading, error } = useTimeEntry(id);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading time entry...</div>;
  }

  if (error || !entry) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-destructive">Time entry not found.</p>
        <Button onClick={() => router.push('/time-tracking/history')} variant="outline">
          Back to History
        </Button>
      </div>
    );
  }

  const timeFormat = { hour: '2-digit', minute: '2-digit' } as const;

  const summaryInfo: InfoItem[] = [
    { label: 'Date', value: format(new Date(entry.date), 'MMMM d, yyyy'), icon: CalendarDays },
    { label: 'Clock In', value: new Date(entry.clockIn).toLocaleTimeString([], timeFormat), icon: Clock },
    { label: 'Clock Out', value: entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString([], timeFormat) : 'Ongoing', icon: Clock },
    { label: 'Shift', value: <ShiftBadge shift={entry.shift} />, icon: Clock },
  ];

  const workInfo: InfoItem[] = [
    { label: 'Project', value: entry.projectName, icon: Briefcase },
    { label: 'Task', value: entry.taskName || 'None', icon: CheckCircle },
    { label: 'Location', value: entry.location || 'Unknown', icon: MapPin },
  ];

  const hoursInfo: InfoItem[] = [
    { label: 'Total Hours', value: `${(entry.totalWorkingMinutes / 60).toFixed(2)}h` },
    { label: 'Regular Hours', value: `${(entry.regularMinutes / 60).toFixed(2)}h` },
    { label: 'Overtime', value: <OvertimeBadge minutes={entry.overtimeMinutes} /> },
    { label: 'Break Time', value: `${(entry.totalBreakMinutes / 60).toFixed(2)}h` },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="-ml-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Time Entry Details</h1>
            <WorkingStatusBadge status={entry.status} />
          </div>
          {entry.employee && (
            <AvatarCell employee={entry.employee} />
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline">Edit Entry</Button>
          {entry.status === 'pending_approval' && (
            <Button>Approve Entry</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Time Summary" icon={Clock}>
          <InformationCard items={summaryInfo} columns={2} />
        </SectionCard>

        <SectionCard title="Work Details" icon={Briefcase}>
          <InformationCard items={workInfo} columns={2} />
        </SectionCard>
      </div>

      <SectionCard title="Hours Calculation">
        <InformationCard items={hoursInfo} columns={4} />
      </SectionCard>

      {(entry.description || entry.remarks || entry.managerNotes) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(entry.description || entry.remarks) && (
            <SectionCard title="Notes & Remarks">
              <div className="space-y-4">
                {entry.description && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                    <p className="text-sm">{entry.description}</p>
                  </div>
                )}
                {entry.remarks && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Remarks</h4>
                    <p className="text-sm">{entry.remarks}</p>
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {entry.managerNotes && (
            <SectionCard title="Manager Notes">
              <p className="text-sm text-muted-foreground italic">"{entry.managerNotes}"</p>
            </SectionCard>
          )}
        </div>
      )}
      
      {entry.breaks && entry.breaks.length > 0 && (
        <SectionCard title="Breaks Taken">
          <div className="space-y-3">
            {entry.breaks.map((b, idx) => (
              <div key={b.id} className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/30">
                <span className="font-medium text-sm">Break {idx + 1}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(b.startTime).toLocaleTimeString([], timeFormat)} - 
                  {b.endTime ? new Date(b.endTime).toLocaleTimeString([], timeFormat) : 'Ongoing'}
                  <span className="font-medium text-foreground ml-4">
                    ({b.durationMinutes} min)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
