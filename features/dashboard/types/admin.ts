// ─── Activity ─────────────────────────────────────────────────────────────────

export type ActivityType =
  | 'employee_registered'
  | 'timesheet_submitted'
  | 'kpi_updated'
  | 'payroll_generated'
  | 'scrum_submitted'
  | 'leave_approved'
  | 'user_deactivated'
  | 'report_generated';

export type ActivityStatus = 'success' | 'warning' | 'info' | 'error';

export interface ActivityActor {
  name: string;
  initials: string;
  avatarColor: string;
}

export interface AdminActivity {
  id: string;
  type: ActivityType;
  actor: ActivityActor;
  description: string;
  timestamp: string;
  status: ActivityStatus;
  meta?: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType = 'success' | 'warning' | 'error' | 'info' | 'priority';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: string;
  actionLabel?: string;
  actionHref?: string;
}

// ─── Upcoming Events ──────────────────────────────────────────────────────────

export type EventType = 'holiday' | 'payroll' | 'meeting' | 'deadline';

export interface UpcomingEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  description: string;
  color: string;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export type StatColor = 'blue' | 'green' | 'amber' | 'red' | 'purple';

export interface AdminStat {
  id: string;
  icon: string;
  title: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  change?: number;
  changeLabel?: string;
  color: StatColor;
  badge?: 'important';
}

// ─── Charts ───────────────────────────────────────────────────────────────────

export interface WeeklyProductivityData {
  day: string;
  productivity: number;
  target: number;
}

export interface EmployeeGrowthData {
  month: string;
  total: number;
  new: number;
}

export interface TimesheetTrendData {
  week: string;
  submitted: number;
  approved: number;
  pending: number;
}

export interface AdminChartData {
  weeklyProductivity: WeeklyProductivityData[];
  employeeGrowth: EmployeeGrowthData[];
  timesheetTrend: TimesheetTrendData[];
}

// ─── System Status ────────────────────────────────────────────────────────────

export type StatusLevel = 'operational' | 'degraded' | 'outage' | 'maintenance';

export interface SystemStatus {
  name: string;
  status: StatusLevel;
  description?: string;
  uptime?: string;
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  description: string;
  href: string;
  color: 'blue' | 'green' | 'amber' | 'red' | 'purple';
}
