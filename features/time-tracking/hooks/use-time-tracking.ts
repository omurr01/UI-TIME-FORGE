'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TimeTrackingService } from '../services/time-tracking.service';
import type { TimeFilters } from '../types';

export const timeKeys = {
  all: ['time-tracking'] as const,
  dashboard: (empId?: string) => [...timeKeys.all, 'dashboard', empId] as const,
  session: (empId?: string) => [...timeKeys.all, 'session', empId] as const,
  lists: () => [...timeKeys.all, 'list'] as const,
  list: (filters?: Partial<TimeFilters>) => [...timeKeys.lists(), filters] as const,
  details: () => [...timeKeys.all, 'detail'] as const,
  detail: (id: string) => [...timeKeys.details(), id] as const,
};

export function useTimeDashboard(employeeId?: string) {
  return useQuery({
    queryKey: timeKeys.dashboard(employeeId),
    queryFn: () => TimeTrackingService.getDashboard(employeeId),
    refetchInterval: 60000, // refresh every minute to update hours
  });
}

export function useCurrentSession(employeeId?: string) {
  return useQuery({
    queryKey: timeKeys.session(employeeId),
    queryFn: () => TimeTrackingService.getCurrentSession(employeeId),
  });
}

export function useTimeEntries(filters?: Partial<TimeFilters>) {
  return useQuery({
    queryKey: timeKeys.list(filters),
    queryFn: () => TimeTrackingService.getTimeEntries(filters),
  });
}

export function useTimeEntry(id: string) {
  return useQuery({
    queryKey: timeKeys.detail(id),
    queryFn: () => TimeTrackingService.getEntry(id),
    enabled: Boolean(id),
  });
}

// Mutations
export function useClockIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ empId, projectId, taskId }: { empId: string, projectId: string, taskId?: string }) => 
      TimeTrackingService.clockIn(empId, projectId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timeKeys.all });
    },
  });
}

export function useClockOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => TimeTrackingService.clockOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timeKeys.all });
    },
  });
}

export function useStartBreak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => TimeTrackingService.startBreak(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timeKeys.all });
    },
  });
}

export function useEndBreak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => TimeTrackingService.endBreak(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timeKeys.all });
    },
  });
}
