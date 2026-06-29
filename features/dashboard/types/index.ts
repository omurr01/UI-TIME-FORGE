export type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  roles?: UserRole[];
};

export type UserRole = 'employee' | 'supervisor' | 'hr_finance' | 'admin';

export interface DashboardStats {
  label: string;
  value: string | number;
  change?: number; // percent, positive = up, negative = down
  changeLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'blue' | 'green' | 'amber' | 'red' | 'purple';
}

export interface ActivityItem {
  id: string;
  type:
    | 'clock_in'
    | 'clock_out'
    | 'timesheet_submitted'
    | 'timesheet_approved'
    | 'leave_requested'
    | 'leave_approved'
    | 'task_completed'
    | 'scrum_submitted';
  actor: {
    name: string;
    avatar?: string;
    initials: string;
  };
  description: string;
  timestamp: string;
  meta?: string;
}

export interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: string;
  color: 'blue' | 'green' | 'amber' | 'purple';
}

export interface WeeklyHoursData {
  day: string;
  hours: number;
  target: number;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  status: 'online' | 'away' | 'offline';
  clockedIn: boolean;
  hoursToday: number;
}

export interface DashboardData {
  stats: DashboardStats[];
  recentActivity: ActivityItem[];
  quickActions: QuickAction[];
  weeklyHours: WeeklyHoursData[];
  teamMembers?: TeamMember[];
}
