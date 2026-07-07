import type {
  WeeklyProductivityData,
  EmployeeGrowthData,
  TimesheetTrendData,
} from '../types/admin';

export const weeklyProductivity: WeeklyProductivityData[] = [
  { day: 'Mon', productivity: 91, target: 90 },
  { day: 'Tue', productivity: 95, target: 90 },
  { day: 'Wed', productivity: 88, target: 90 },
  { day: 'Thu', productivity: 96, target: 90 },
  { day: 'Fri', productivity: 93, target: 90 },
  { day: 'Sat', productivity: 72, target: 70 },
  { day: 'Sun', productivity: 65, target: 70 },
];

export const employeeGrowth: EmployeeGrowthData[] = [
  { month: 'Feb', total: 138, new: 3 },
  { month: 'Mar', total: 141, new: 5 },
  { month: 'Apr', total: 144, new: 6 },
  { month: 'May', total: 148, new: 8 },
  { month: 'Jun', total: 151, new: 4 },
  { month: 'Jul', total: 156, new: 7 },
];

export const timesheetTrend: TimesheetTrendData[] = [
  { week: 'W1', submitted: 98, approved: 90, pending: 8 },
  { week: 'W2', submitted: 112, approved: 105, pending: 7 },
  { week: 'W3', submitted: 105, approved: 100, pending: 5 },
  { week: 'W4', submitted: 120, approved: 108, pending: 12 },
  { week: 'W5', submitted: 115, approved: 112, pending: 3 },
  { week: 'W6', submitted: 123, approved: 111, pending: 12 },
];
