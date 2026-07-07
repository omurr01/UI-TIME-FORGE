import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Clock,
  FileText,
  MessageSquare,
  BarChart2,
  TrendingUp,
  Bell,
  DollarSign,
  Users,
  Settings,
  UserCheck,
  Shield,
} from 'lucide-react';
import type { UserRole } from '@/features/dashboard/types';

export interface NavItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  roles: UserRole[];
  group: 'main' | 'management' | 'finance' | 'system';
  description?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItemConfig[];
}

export const NAV_ITEMS: NavItemConfig[] = [
  // Main
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and summary',
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
    group: 'main',
  },
  {
    label: 'Time Tracking',
    href: '/time-tracking',
    icon: Clock,
    description: 'Clock in and out',
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
    group: 'main',
  },
  {
    label: 'Timesheets',
    href: '/timesheets',
    icon: FileText,
    badge: 3,
    description: 'Submit and review timesheets',
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
    group: 'main',
  },
  {
    label: 'Daily Scrum',
    href: '/scrum',
    icon: MessageSquare,
    description: 'Daily standup updates',
    roles: ['employee', 'supervisor', 'admin'],
    group: 'main',
  },
  {
    label: 'KPI',
    href: '/kpi',
    icon: TrendingUp,
    description: 'Performance indicators',
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
    group: 'main',
  },
  // Management
  {
    label: 'Employees',
    href: '/employees',
    icon: Users,
    description: 'Manage employee directory',
    roles: ['supervisor', 'hr_finance', 'admin'],
    group: 'management',
  },
  {
    label: 'Approvals',
    href: '/employees?tab=pending',
    icon: UserCheck,
    description: 'Pending registrations',
    badge: 4,
    roles: ['admin'],
    group: 'management',
  },
  // Finance
  {
    label: 'Payroll',
    href: '/payroll',
    icon: DollarSign,
    description: 'Payroll processing',
    roles: ['hr_finance', 'admin'],
    group: 'finance',
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart2,
    description: 'Analytics and reporting',
    roles: ['supervisor', 'hr_finance', 'admin'],
    group: 'finance',
  },
  // System
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: 5,
    description: 'Alerts and messages',
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
    group: 'system',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Account and preferences',
    roles: ['employee', 'supervisor', 'hr_finance', 'admin'],
    group: 'system',
  },
  {
    label: 'Admin Panel',
    href: '/admin',
    icon: Shield,
    description: 'System administration',
    roles: ['admin'],
    group: 'system',
  },
];

const GROUP_LABELS: Record<string, string> = {
  main: 'Workspace',
  management: 'Management',
  finance: 'Finance & Reports',
  system: 'System',
};

export function getNavGroups(role: UserRole): NavGroup[] {
  const visible = NAV_ITEMS.filter((item) => item.roles.includes(role));

  const groupOrder: Array<NavItemConfig['group']> = ['main', 'management', 'finance', 'system'];

  return groupOrder
    .map((groupId) => ({
      id: groupId,
      label: GROUP_LABELS[groupId],
      items: visible.filter((item) => item.group === groupId),
    }))
    .filter((g) => g.items.length > 0);
}

export const ROLE_LABELS: Record<UserRole, string> = {
  employee: 'Employee',
  supervisor: 'Supervisor',
  hr_finance: 'HR & Finance',
  admin: 'Administrator',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  employee: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  supervisor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  hr_finance: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  admin: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export const ROLE_REDIRECT: Record<UserRole, string> = {
  employee: '/dashboard/employee',
  supervisor: '/dashboard/supervisor',
  hr_finance: '/dashboard/hr-finance',
  admin: '/dashboard/admin',
};

// Breadcrumb label map — path segment → human label
export const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  employee: 'Employee View',
  supervisor: 'Supervisor View',
  'hr-finance': 'HR & Finance View',
  admin: 'Admin View',
  employees: 'Employees',
  'time-tracking': 'Time Tracking',
  timesheets: 'Timesheets',
  scrum: 'Daily Scrum',
  kpi: 'KPI',
  reports: 'Reports',
  notifications: 'Notifications',
  payroll: 'Payroll',
  settings: 'Settings',
  'not-found': 'Not Found',
  'access-denied': 'Access Denied',
  new: 'Add New',
  edit: 'Edit',
};
