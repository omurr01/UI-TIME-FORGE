// ─── Stat Cards ───────────────────────────────────────────────────────────────

export interface AdminStatCard {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  suffix?: string;
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export type ActivityType =
  | 'employee_registered'
  | 'timesheet_submitted'
  | 'kpi_updated'
  | 'payroll_generated'
  | 'scrum_submitted';

export type ActivityStatus = 'success' | 'pending' | 'error' | 'info' | 'warning';

export interface AdminActivity {
  id: string;
  type: ActivityType;
  actor: {
    name: string;
    initials: string;
    avatarUrl?: string;
  };
  description: string;
  timestamp: string;
  status: ActivityStatus;
  meta?: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType = 'success' | 'warning' | 'error' | 'info';
export type NotificationPriority = 'high' | 'normal' | 'low';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: NotificationPriority;
  type: NotificationType;
  actionLabel?: string;
  actionHref?: string;
}

// ─── Events ───────────────────────────────────────────────────────────────────

export type EventType = 'holiday' | 'payroll' | 'meeting' | 'deadline';

export interface UpcomingEvent {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO date string YYYY-MM-DD
  description: string;
  allDay: boolean;
  time?: string;
}

// ─── System Status ────────────────────────────────────────────────────────────

export type SystemStatusState = 'operational' | 'degraded' | 'outage';

export interface SystemStatusItem {
  id: string;
  name: string;
  status: SystemStatusState;
  uptime: string;
  latency?: string;
  lastChecked: string;
}

// ─── Charts ───────────────────────────────────────────────────────────────────

export interface WeeklyProductivityData {
  day: string;
  productivity: number;
  target: number;
}

export interface EmployeeGrowthData {
  month: string;
  employees: number;
  newHires: number;
  departures: number;
}

export interface TimesheetTrendData {
  week: string;
  submitted: number;
  approved: number;
  rejected: number;
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

export interface AdminQuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

// ─── Dashboard aggregate ─────────────────────────────────────────────────────

export interface AdminDashboardData {
  stats: AdminStatCard[];
  activities: AdminActivity[];
  notifications: AdminNotification[];
  events: UpcomingEvent[];
  systemStatus: SystemStatusItem[];
}
