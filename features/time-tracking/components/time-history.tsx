'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { useTimeEntries } from '../hooks/use-time-tracking';
import { DataTable, type Column } from '../../employees/components/shared/data-table';
import type { TimeEntry } from '../types';
import { WorkingStatusBadge, ShiftBadge, OvertimeBadge } from '../../../components/shared/time-tracking/time-badges';
import { AvatarCell } from '../../employees/components/shared/avatar-cell';
import { ActionMenu } from '../../employees/components/shared/action-menu';

export function TimeHistory() {
  const router = useRouter();
  const { data: entries, isLoading } = useTimeEntries();

  const handleView = (id: string) => router.push(`/time-tracking/history/${id}`);

  const columns: Column<TimeEntry>[] = [
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
      enableSorting: true,
      className: 'w-[120px] font-medium',
      cell: (entry) => entry.date,
    },
    {
      id: 'employee',
      header: 'Employee',
      className: 'min-w-[200px]',
      cell: (entry) => entry.employee ? <AvatarCell employee={entry.employee} size="sm" showEmail={false} /> : <span>Unknown</span>,
    },
    {
      id: 'times',
      header: 'In / Out',
      className: 'w-[150px]',
      cell: (entry) => (
        <div className="flex flex-col text-sm">
          <span>{new Date(entry.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="text-muted-foreground">{entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Ongoing'}</span>
        </div>
      ),
    },
    {
      id: 'hours',
      header: 'Hours',
      className: 'w-[100px]',
      cell: (entry) => (
        <div className="flex flex-col text-sm">
          <span className="font-medium">{(entry.totalWorkingMinutes / 60).toFixed(2)}h</span>
          {entry.overtimeMinutes > 0 && <span className="text-xs text-purple-600 font-medium">+{ (entry.overtimeMinutes / 60).toFixed(1)}h OT</span>}
        </div>
      ),
    },
    {
      id: 'project',
      header: 'Project',
      className: 'min-w-[150px]',
      cell: (entry) => (
        <div className="flex flex-col text-sm">
          <span className="truncate max-w-[150px]">{entry.projectName}</span>
          {entry.taskName && <span className="text-xs text-muted-foreground truncate max-w-[150px]">{entry.taskName}</span>}
        </div>
      ),
    },
    {
      id: 'shift',
      header: 'Shift',
      className: 'w-[120px]',
      cell: (entry) => <ShiftBadge shift={entry.shift} />,
    },
    {
      id: 'status',
      header: 'Status',
      className: 'w-[120px]',
      cell: (entry) => <WorkingStatusBadge status={entry.status} />,
    },
    {
      id: 'actions',
      header: '',
      className: 'w-[60px] text-right',
      cell: (entry) => (
        <ActionMenu
          onView={() => handleView(entry.id)}
          onDelete={() => console.log('Delete', entry.id)}
        />
      ),
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 flex flex-col h-[calc(100vh-4rem)]">
      <PageHeader
        title="Time History"
        description="View and manage all time entries across the organization."
      />
      <div className="flex-1 overflow-hidden flex flex-col min-h-[400px]">
        <DataTable
          data={entries ?? []}
          columns={columns}
          isLoading={isLoading}
          getRowId={(e) => e.id}
          emptyMessage="No time entries found."
        />
      </div>
    </div>
  );
}
