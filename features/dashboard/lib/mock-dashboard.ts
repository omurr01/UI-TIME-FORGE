import type {
  DashboardData,
  DashboardStats,
  ActivityItem,
  QuickAction,
  WeeklyHoursData,
  TeamMember,
} from '../types';

const MOCK_DELAY = 600;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Weekly hours (shared base) ────────────────────────────────────────────
const weeklyHours: WeeklyHoursData[] = [
  { day: 'Mon', hours: 8.5, target: 8 },
  { day: 'Tue', hours: 7.75, target: 8 },
  { day: 'Wed', hours: 9.0, target: 8 },
  { day: 'Thu', hours: 8.25, target: 8 },
  { day: 'Fri', hours: 6.5, target: 8 },
  { day: 'Sat', hours: 0, target: 0 },
  { day: 'Sun', hours: 0, target: 0 },
];

// ─── Activity feed ──────────────────────────────────────────────────────────
const sharedActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'clock_in',
    actor: { name: 'Alex Johnson', initials: 'AJ' },
    description: 'Clocked in',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    meta: '9:01 AM',
  },
  {
    id: '2',
    type: 'timesheet_submitted',
    actor: { name: 'Morgan Chen', initials: 'MC' },
    description: 'Submitted timesheet for review',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    meta: 'Week of Jun 23',
  },
  {
    id: '3',
    type: 'timesheet_approved',
    actor: { name: 'Jordan Martinez', initials: 'JM' },
    description: 'Approved timesheet',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    meta: 'Riley Thompson',
  },
  {
    id: '4',
    type: 'leave_requested',
    actor: { name: 'Riley Thompson', initials: 'RT' },
    description: 'Requested annual leave',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    meta: 'Jul 4 – Jul 8',
  },
  {
    id: '5',
    type: 'scrum_submitted',
    actor: { name: 'Alex Johnson', initials: 'AJ' },
    description: 'Submitted daily scrum update',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    type: 'task_completed',
    actor: { name: 'Sam Park', initials: 'SP' },
    description: 'Completed task',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    meta: 'Refactor API layer',
  },
];

// ─── Team members ────────────────────────────────────────────────────────────
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    initials: 'AJ',
    role: 'Software Engineer',
    department: 'Engineering',
    status: 'online',
    clockedIn: true,
    hoursToday: 6.5,
  },
  {
    id: '2',
    name: 'Morgan Chen',
    initials: 'MC',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'online',
    clockedIn: true,
    hoursToday: 7.25,
  },
  {
    id: '3',
    name: 'Sam Park',
    initials: 'SP',
    role: 'Product Designer',
    department: 'Design',
    status: 'away',
    clockedIn: true,
    hoursToday: 4.0,
  },
  {
    id: '4',
    name: 'Taylor Kim',
    initials: 'TK',
    role: 'QA Engineer',
    department: 'Engineering',
    status: 'offline',
    clockedIn: false,
    hoursToday: 0,
  },
  {
    id: '5',
    name: 'Jordan Lee',
    initials: 'JL',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'online',
    clockedIn: true,
    hoursToday: 5.75,
  },
];

// ─── Employee dashboard ──────────────────────────────────────────────────────
const employeeStats: DashboardStats[] = [
  {
    label: 'Hours This Week',
    value: '38.5h',
    change: 4.8,
    changeLabel: 'vs last week',
    trend: 'up',
    icon: 'Clock',
    color: 'blue',
  },
  {
    label: 'Pending Timesheets',
    value: 1,
    trend: 'neutral',
    icon: 'FileText',
    color: 'amber',
  },
  {
    label: 'Leave Balance',
    value: '12 days',
    trend: 'neutral',
    icon: 'CalendarDays',
    color: 'green',
  },
  {
    label: 'Tasks Completed',
    value: 8,
    change: 14.3,
    changeLabel: 'vs last week',
    trend: 'up',
    icon: 'CheckSquare',
    color: 'purple',
  },
];

const employeeQuickActions: QuickAction[] = [
  {
    label: 'Clock In / Out',
    description: 'Record your work time',
    href: '/time-tracking',
    icon: 'Clock',
    color: 'blue',
  },
  {
    label: 'Submit Timesheet',
    description: 'Review and submit hours',
    href: '/timesheets',
    icon: 'FileText',
    color: 'green',
  },
  {
    label: 'Daily Scrum',
    description: 'Post your standup update',
    href: '/scrum',
    icon: 'MessageSquare',
    color: 'purple',
  },
  {
    label: 'Request Leave',
    description: 'Apply for time off',
    href: '/leave',
    icon: 'CalendarDays',
    color: 'amber',
  },
];

// ─── Supervisor dashboard ────────────────────────────────────────────────────
const supervisorStats: DashboardStats[] = [
  {
    label: 'Team Clocked In',
    value: '4 / 5',
    trend: 'neutral',
    icon: 'Users',
    color: 'blue',
  },
  {
    label: 'Timesheets Pending',
    value: 3,
    trend: 'neutral',
    icon: 'FileText',
    color: 'amber',
  },
  {
    label: 'Team Hours This Week',
    value: '164h',
    change: 2.1,
    changeLabel: 'vs last week',
    trend: 'up',
    icon: 'Clock',
    color: 'green',
  },
  {
    label: 'Overdue Tasks',
    value: 2,
    trend: 'down',
    icon: 'AlertCircle',
    color: 'red',
  },
];

const supervisorQuickActions: QuickAction[] = [
  {
    label: 'Review Timesheets',
    description: '3 pending approvals',
    href: '/timesheets',
    icon: 'FileText',
    color: 'amber',
  },
  {
    label: 'Team Schedule',
    description: 'View attendance overview',
    href: '/time-tracking',
    icon: 'CalendarDays',
    color: 'blue',
  },
  {
    label: 'Scrum Board',
    description: 'Daily standup updates',
    href: '/scrum',
    icon: 'MessageSquare',
    color: 'purple',
  },
  {
    label: 'KPI Overview',
    description: 'Team performance metrics',
    href: '/kpi',
    icon: 'BarChart2',
    color: 'green',
  },
];

// ─── HR / Finance dashboard ──────────────────────────────────────────────────
const hrFinanceStats: DashboardStats[] = [
  {
    label: 'Total Employees',
    value: 142,
    change: 3.6,
    changeLabel: 'vs last month',
    trend: 'up',
    icon: 'Users',
    color: 'blue',
  },
  {
    label: 'Payroll This Month',
    value: '$284,500',
    change: -1.2,
    changeLabel: 'vs last month',
    trend: 'down',
    icon: 'DollarSign',
    color: 'green',
  },
  {
    label: 'Leave Requests',
    value: 7,
    trend: 'neutral',
    icon: 'CalendarDays',
    color: 'amber',
  },
  {
    label: 'Pending Approvals',
    value: 12,
    trend: 'neutral',
    icon: 'CheckCircle',
    color: 'purple',
  },
];

const hrFinanceQuickActions: QuickAction[] = [
  {
    label: 'Employee Directory',
    description: 'Manage staff records',
    href: '/employees',
    icon: 'Users',
    color: 'blue',
  },
  {
    label: 'Run Payroll',
    description: 'Process this month\'s payroll',
    href: '/payroll',
    icon: 'DollarSign',
    color: 'green',
  },
  {
    label: 'Reports',
    description: 'Generate HR reports',
    href: '/reports',
    icon: 'BarChart2',
    color: 'purple',
  },
  {
    label: 'Leave Management',
    description: 'Review leave requests',
    href: '/leave',
    icon: 'CalendarDays',
    color: 'amber',
  },
];

// ─── Admin dashboard ─────────────────────────────────────────────────────────
const adminStats: DashboardStats[] = [
  {
    label: 'Total Users',
    value: 156,
    change: 5.4,
    changeLabel: 'vs last month',
    trend: 'up',
    icon: 'Users',
    color: 'blue',
  },
  {
    label: 'Pending Registrations',
    value: 4,
    trend: 'neutral',
    icon: 'UserPlus',
    color: 'amber',
  },
  {
    label: 'System Uptime',
    value: '99.98%',
    trend: 'up',
    icon: 'Activity',
    color: 'green',
  },
  {
    label: 'Active Sessions',
    value: 38,
    trend: 'neutral',
    icon: 'Monitor',
    color: 'purple',
  },
];

const adminQuickActions: QuickAction[] = [
  {
    label: 'Manage Users',
    description: 'Add, edit, or deactivate users',
    href: '/employees',
    icon: 'Users',
    color: 'blue',
  },
  {
    label: 'Approve Registrations',
    description: '4 users awaiting approval',
    href: '/employees?tab=pending',
    icon: 'UserPlus',
    color: 'amber',
  },
  {
    label: 'System Reports',
    description: 'Platform usage analytics',
    href: '/reports',
    icon: 'BarChart2',
    color: 'purple',
  },
  {
    label: 'Notifications',
    description: 'Manage system alerts',
    href: '/notifications',
    icon: 'Bell',
    color: 'green',
  },
];

// ─── Service functions ───────────────────────────────────────────────────────
export async function getEmployeeDashboard(): Promise<DashboardData> {
  await delay(MOCK_DELAY);
  return {
    stats: employeeStats,
    recentActivity: sharedActivity.slice(0, 5),
    quickActions: employeeQuickActions,
    weeklyHours,
  };
}

export async function getSupervisorDashboard(): Promise<DashboardData> {
  await delay(MOCK_DELAY);
  return {
    stats: supervisorStats,
    recentActivity: sharedActivity,
    quickActions: supervisorQuickActions,
    weeklyHours,
    teamMembers,
  };
}

export async function getHrFinanceDashboard(): Promise<DashboardData> {
  await delay(MOCK_DELAY);
  return {
    stats: hrFinanceStats,
    recentActivity: sharedActivity,
    quickActions: hrFinanceQuickActions,
    weeklyHours,
  };
}

export async function getAdminDashboard(): Promise<DashboardData> {
  await delay(MOCK_DELAY);
  return {
    stats: adminStats,
    recentActivity: sharedActivity,
    quickActions: adminQuickActions,
    weeklyHours,
  };
}
