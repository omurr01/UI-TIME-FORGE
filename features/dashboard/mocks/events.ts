import type { UpcomingEvent } from '../types/admin';

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Independence Day',
    type: 'holiday',
    date: new Date(new Date().getFullYear(), 6, 4).toISOString(),
    description: 'Public holiday — office closed',
    color: 'green',
  },
  {
    id: '2',
    title: 'July Payroll Processing',
    type: 'payroll',
    date: new Date(new Date().getFullYear(), 6, 10).toISOString(),
    description: 'Monthly payroll batch run',
    color: 'blue',
  },
  {
    id: '3',
    title: 'Q3 Planning Meeting',
    type: 'meeting',
    date: new Date(new Date().getFullYear(), 6, 15).toISOString(),
    description: 'All-hands strategy and goal setting',
    color: 'purple',
  },
  {
    id: '4',
    title: 'Timesheet Submission Deadline',
    type: 'deadline',
    date: new Date(new Date().getFullYear(), 6, 19).toISOString(),
    description: 'Last day for June timesheets',
    color: 'red',
  },
  {
    id: '5',
    title: 'System Maintenance Window',
    type: 'deadline',
    date: new Date(new Date().getFullYear(), 6, 7).toISOString(),
    description: 'Scheduled downtime: 2:00–4:00 AM UTC',
    color: 'red',
  },
];
