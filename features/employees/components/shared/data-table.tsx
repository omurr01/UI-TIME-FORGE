import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { EmptyState } from '@/components/shared/empty-state';
import { TableSkeleton } from '@/components/shared/loading-skeleton';
import { ArrowDown, ArrowUp, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SortParams } from '../../types';

export interface Column<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T | string;
  cell: (item: T) => React.ReactNode;
  enableSorting?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  isEmpty?: boolean;
  sort?: SortParams;
  onSort?: (field: string) => void;
  selectedIds?: string[];
  onSelect?: (id: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  getRowId: (item: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  isEmpty,
  sort,
  onSort,
  selectedIds,
  onSelect,
  onSelectAll,
  getRowId,
  emptyMessage = 'No results found.',
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds?.length === data.length;
  const someSelected = data.length > 0 && selectedIds && selectedIds.length > 0 && selectedIds.length < data.length;

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card">
        <TableSkeleton rows={5} columns={columns.length + (selectedIds ? 1 : 0)} />
      </div>
    );
  }

  if (isEmpty || data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8">
        <EmptyState title={emptyMessage} size="sm" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {selectedIds && onSelectAll && (
                <TableHead className="w-12 pl-4">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                    onCheckedChange={(c) => onSelectAll(c === true)}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              
              {columns.map((col) => {
                const isSorted = sort?.field === col.accessorKey;
                const isAsc = isSorted && sort?.direction === 'asc';
                
                return (
                  <TableHead
                    key={col.id}
                    className={cn('whitespace-nowrap', col.className)}
                  >
                    {col.enableSorting && col.accessorKey && onSort ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                        onClick={() => onSort(col.accessorKey as string)}
                      >
                        {col.header}
                        {isSorted ? (
                          isAsc ? (
                            <ArrowUp className="ml-2 h-3.5 w-3.5" />
                          ) : (
                            <ArrowDown className="ml-2 h-3.5 w-3.5" />
                          )
                        ) : (
                          <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-50" />
                        )}
                      </Button>
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {col.header}
                      </span>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const id = getRowId(item);
              const isSelected = selectedIds?.includes(id);

              return (
                <TableRow
                  key={id}
                  data-state={isSelected ? 'selected' : undefined}
                  className="group transition-colors"
                >
                  {selectedIds && onSelect && (
                    <TableCell className="w-12 pl-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(c) => onSelect(id, c === true)}
                        aria-label={`Select row`}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.id} className={cn('py-3', col.className)}>
                      {col.cell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
