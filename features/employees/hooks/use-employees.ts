'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployeeService } from '../services/employee.service';
import type {
  EmployeeFilters,
  PaginationParams,
  SortParams,
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from '../types';

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (filters: Partial<EmployeeFilters>, pagination: PaginationParams, sort?: SortParams) =>
    [...employeeKeys.lists(), { filters, pagination, sort }] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
  search: (query: string) => [...employeeKeys.all, 'search', query] as const,
};

// ─── List Hook ────────────────────────────────────────────────────────────────

export function useEmployees(
  filters: Partial<EmployeeFilters>,
  pagination: PaginationParams,
  sort?: SortParams
) {
  return useQuery({
    queryKey: employeeKeys.list(filters, pagination, sort),
    queryFn: () => EmployeeService.getEmployees(filters, pagination, sort),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

// ─── Detail Hook ──────────────────────────────────────────────────────────────

export function useEmployee(id: string) {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => EmployeeService.getEmployeeById(id),
    staleTime: 60_000,
    enabled: Boolean(id),
  });
}

// ─── Search Hook ──────────────────────────────────────────────────────────────

export function useEmployeeSearch(query: string) {
  return useQuery({
    queryKey: employeeKeys.search(query),
    queryFn: () => EmployeeService.searchEmployees(query),
    staleTime: 10_000,
    enabled: query.length >= 1,
  });
}

// ─── Create Hook ──────────────────────────────────────────────────────────────

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEmployeeInput) => EmployeeService.createEmployee(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}

// ─── Update Hook ──────────────────────────────────────────────────────────────

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateEmployeeInput }) =>
      EmployeeService.updateEmployee(id, input),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      queryClient.setQueryData(employeeKeys.detail(updated.id), updated);
    },
  });
}

// ─── Delete Hook ──────────────────────────────────────────────────────────────

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => EmployeeService.deleteEmployee(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      queryClient.removeQueries({ queryKey: employeeKeys.detail(id) });
    },
  });
}

// ─── Archive Hook ─────────────────────────────────────────────────────────────

export function useArchiveEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => EmployeeService.archiveEmployee(id),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      queryClient.setQueryData(employeeKeys.detail(updated.id), updated);
    },
  });
}
