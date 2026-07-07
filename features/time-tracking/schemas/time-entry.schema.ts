import { z } from 'zod';
import { TimeStatus, EntrySource, ShiftType } from '../types';

export const timeEntrySchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  date: z.string().min(1, 'Date is required'),
  clockInTime: z.string().min(1, 'Clock in time is required'),
  clockOutTime: z.string().optional(),
  
  projectId: z.string().min(1, 'Project is required'),
  taskId: z.string().optional(),
  
  description: z.string().optional(),
  remarks: z.string().optional(),
  location: z.string().optional(),
  
  shift: z.enum(['morning', 'afternoon', 'night', 'flexible'] as const).default('flexible'),
  status: z.enum(['working', 'on_break', 'completed', 'pending_approval', 'rejected'] as const).default('completed'),
  
  // For manual entries, breaks could be handled as a separate array or simplified fields.
  // We'll use a simplified version for the manual entry form to add a single break if needed.
  breakStartTime: z.string().optional(),
  breakEndTime: z.string().optional(),
}).refine((data) => {
  if (data.clockOutTime && data.clockInTime > data.clockOutTime) {
    return false;
  }
  return true;
}, {
  message: 'Clock out time must be after clock in time',
  path: ['clockOutTime'],
}).refine((data) => {
  if (data.breakStartTime && !data.breakEndTime && data.status === 'completed') {
    return false;
  }
  return true;
}, {
  message: 'Break end time is required if break started',
  path: ['breakEndTime'],
}).refine((data) => {
  if (data.breakStartTime && data.breakEndTime && data.breakStartTime > data.breakEndTime) {
    return false;
  }
  return true;
}, {
  message: 'Break end time must be after break start time',
  path: ['breakEndTime'],
}).refine((data) => {
  if (data.breakStartTime && data.clockInTime > data.breakStartTime) {
    return false;
  }
  return true;
}, {
  message: 'Break cannot start before clock in',
  path: ['breakStartTime'],
});

export type TimeEntryFormValues = z.infer<typeof timeEntrySchema>;

export const defaultTimeEntryValues: Partial<TimeEntryFormValues> = {
  employeeId: '',
  date: new Date().toISOString().split('T')[0],
  clockInTime: '09:00',
  clockOutTime: '17:00',
  projectId: '',
  taskId: '',
  shift: 'flexible',
  status: 'completed',
  description: '',
  remarks: '',
  location: 'Office',
  breakStartTime: '',
  breakEndTime: '',
};
