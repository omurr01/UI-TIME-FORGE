'use client';

import { useState, useCallback } from 'react';
import { DEFAULT_FILTERS, DEFAULT_PAGINATION, type EmployeeFilters, type PaginationParams, type SortParams } from '../types';

export function useEmployeeFilters() {
  const [filters, setFilters] = useState<EmployeeFilters>(DEFAULT_FILTERS);
  const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION);
  const [sort, setSort] = useState<SortParams | undefined>(undefined);

  const setSearch = useCallback((search: string) => {
    setFilters((f) => ({ ...f, search }));
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const setFilter = useCallback(<K extends keyof EmployeeFilters>(key: K, value: EmployeeFilters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPagination(DEFAULT_PAGINATION);
    setSort(undefined);
  }, []);

  const setPage = useCallback((page: number) => {
    setPagination((p) => ({ ...p, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination({ page: 1, pageSize });
  }, []);

  const toggleSort = useCallback((field: string) => {
    setSort((prev) => {
      if (prev?.field === field) {
        if (prev.direction === 'asc') return { field, direction: 'desc' };
        return undefined;
      }
      return { field, direction: 'asc' };
    });
  }, []);

  const activeFilterCount = Object.entries(filters).filter(
    ([key, val]) => key !== 'search' && val !== ''
  ).length;

  return {
    filters,
    pagination,
    sort,
    setSearch,
    setFilter,
    resetFilters,
    setPage,
    setPageSize,
    toggleSort,
    activeFilterCount,
  };
}
