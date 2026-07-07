import type {
  WeeklyProductivityData,
  EmployeeGrowthData,
  TimesheetTrendData,
} from '@/features/admin/types';

export const mockWeeklyProductivity: WeeklyProductivityData[] = [
  { day: 'Mon', productivity: 82, target: 80 },
  { day: 'Tue', productivity: 88, target: 80 },
  { day: 'Wed', productivity: 76, target: 80 },
  { day: 'Thu', productivity: 91, target: 80 },
  { day: 'Fri', productivity: 85, target: 80 },
  { day: 'Sat', productivity: 45, target: 0 },
  { day: 'Sun', productivity: 12, target: 0 },
];

export const mockEmployeeGrowth: EmployeeGrowthData[] = [
  { month: 'Jan', employees: 118, newHires: 4, departures: 1 },
  { month: 'Feb', employees: 121, newHires: 5, departures: 2 },
  { month: 'Mar', employees: 124, newHires: 6, departures: 3 },
  { month: 'Apr', employees: 128, newHires: 7, departures: 3 },
  { month: 'May', employees: 135, newHires: 9, departures: 2 },
  { month: 'Jun', employees: 142, newHires: 10, departures: 3 },
];

export const mockTimesheetTrend: TimesheetTrendData[] = [
  { week: 'W1 Jun', submitted: 112, approved: 108, rejected: 4 },
  { week: 'W2 Jun', submitted: 118, approved: 110, rejected: 8 },
  { week: 'W3 Jun', submitted: 105, approved: 100, rejected: 5 },
  { week: 'W4 Jun', submitted: 125, approved: 119, rejected: 6 },
  { week: 'W1 Jul', submitted: 89, approved: 77, rejected: 12 },
];
