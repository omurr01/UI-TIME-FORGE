import type { UpcomingEvent } from '@/features/admin/types';

export const mockEvents: UpcomingEvent[] = [
  {
    id: 'evt-1',
    title: 'Independence Day Holiday',
    type: 'holiday',
    date: '2026-07-04',
    description: 'Company-wide public holiday. Office closed.',
    allDay: true,
  },
  {
    id: 'evt-2',
    title: 'July Payroll Processing',
    type: 'payroll',
    date: '2026-07-15',
    description: 'Monthly payroll processing deadline. Ensure all timesheets are approved.',
    allDay: false,
    time: '09:00 AM',
  },
  {
    id: 'evt-3',
    title: 'All-Hands Team Meeting',
    type: 'meeting',
    date: '2026-07-08',
    description: 'Quarterly all-hands company meeting. Attendance mandatory.',
    allDay: false,
    time: '10:00 AM',
  },
  {
    id: 'evt-4',
    title: 'Q2 Report Submission Deadline',
    type: 'deadline',
    date: '2026-07-10',
    description: 'All department heads must submit Q2 performance reports.',
    allDay: false,
    time: '05:00 PM',
  },
  {
    id: 'evt-5',
    title: 'New Employee Onboarding',
    type: 'meeting',
    date: '2026-07-07',
    description: 'Orientation session for 3 new hires joining this month.',
    allDay: false,
    time: '09:00 AM',
  },
];
