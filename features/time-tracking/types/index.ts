import type { Employee } from '../../employees/types';

export type TimeStatus = 'working' | 'on_break' | 'completed' | 'pending_approval' | 'rejected';
export type EntrySource = 'live_timer' | 'manual' | 'system_adjustment';
export type ShiftType = 'morning' | 'afternoon' | 'night' | 'flexible';

export interface TimeBreak {
  id: string;
  startTime: string; // ISO string
  endTime: string | null;
  durationMinutes: number;
}

export interface TimeEntry {
  id: string;
  employeeId: string; // references Employee.id
  employee?: Employee; // Optional populated reference
  date: string; // YYYY-MM-DD
  clockIn: string; // ISO string
  clockOut: string | null; // ISO string or null if still working
  breaks: TimeBreak[];
  totalWorkingMinutes: number;
  totalBreakMinutes: number;
  regularMinutes: number;
  overtimeMinutes: number;
  projectId: string;
  projectName: string;
  taskId?: string;
  taskName?: string;
  description?: string;
  remarks?: string;
  location?: string;
  status: TimeStatus;
  source: EntrySource;
  shift: ShiftType;
  managerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentSession {
  id: string;
  employeeId: string;
  clockIn: string; // ISO string
  currentBreakStart: string | null;
  projectId: string;
  projectName: string;
  taskId?: string;
  taskName?: string;
  status: 'working' | 'on_break';
  location?: string;
  shift: ShiftType;
}

export interface DashboardSummary {
  todayHours: number;
  weeklyHours: number;
  monthlyHours: number;
  overtimeHours: number;
  currentStatus: TimeStatus | 'not_working';
  currentShift: ShiftType | null;
  recentEntries: TimeEntry[];
  upcomingShift: {
    date: string;
    shift: ShiftType;
    startTime: string;
  } | null;
}

export interface TimeFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  project: string;
  employee: string;
}

export const TIME_STATUS_LABELS: Record<TimeStatus, string> = {
  working: 'Working',
  on_break: 'On Break',
  completed: 'Completed',
  pending_approval: 'Pending Approval',
  rejected: 'Rejected',
};

export const SHIFT_LABELS: Record<ShiftType, string> = {
  morning: 'Morning Shift',
  afternoon: 'Afternoon Shift',
  night: 'Night Shift',
  flexible: 'Flexible',
};

// Projects mock lookup
export const MOCK_PROJECTS = [
  { id: 'prj-001', name: 'Internal Tools Modernization' },
  { id: 'prj-002', name: 'Client Portal V2' },
  { id: 'prj-003', name: 'Cloud Migration' },
  { id: 'prj-004', name: 'Mobile App Redesign' },
  { id: 'prj-005', name: 'Security Audit Q3' },
];

export const MOCK_TASKS = [
  { id: 'tsk-001', name: 'Frontend Development' },
  { id: 'tsk-002', name: 'Backend API Integration' },
  { id: 'tsk-003', name: 'UI/UX Design' },
  { id: 'tsk-004', name: 'Database Migration' },
  { id: 'tsk-005', name: 'Quality Assurance Testing' },
  { id: 'tsk-006', name: 'Documentation' },
];
