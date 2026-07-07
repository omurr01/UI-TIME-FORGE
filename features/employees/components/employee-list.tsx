'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';

import { useEmployees, useDeleteEmployee, useArchiveEmployee } from '../hooks/use-employees';
import { useEmployeeFilters } from '../hooks/use-employee-filters';
import { getEmployeeColumns } from './employee-columns';

import { DataTable } from './shared/data-table';
import { SearchBar } from './shared/search-bar';
import { FilterBar } from './shared/filter-bar';
import { PaginationControls } from './shared/pagination-controls';
import { ConfirmationDialog } from './shared/confirmation-dialog';

export function EmployeeList() {
  const router = useRouter();
  
  // State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);

  // Filters & Data
  const {
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
  } = useEmployeeFilters();

  const { data: result, isLoading } = useEmployees(filters, pagination, sort);
  const deleteMutation = useDeleteEmployee();
  const archiveMutation = useArchiveEmployee();

  // Handlers
  const handleView = (id: string) => router.push(`/employees/${id}`);
  const handleEdit = (id: string) => router.push(`/employees/${id}/edit`);
  const handleCreate = () => router.push('/employees/new');

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const handleArchive = async () => {
    if (!archiveId) return;
    await archiveMutation.mutateAsync(archiveId);
    setArchiveId(null);
  };

  const handleSelect = (id: string, selected: boolean) => {
    setSelectedIds((prev) => 
      selected ? [...prev, id] : prev.filter((val) => val !== id)
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (!result?.data) return;
    setSelectedIds(selected ? result.data.map((e) => e.id) : []);
  };

  const columns = getEmployeeColumns({
    onView: handleView,
    onEdit: handleEdit,
    onArchive: setArchiveId,
    onDelete: setDeleteId,
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 flex flex-col h-[calc(100vh-4rem)]">
      <PageHeader
        title="Employee Management"
        description="Manage employee records, roles, and statuses."
      >
        <Button variant="outline" className="hidden sm:flex">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm shrink-0">
        <SearchBar
          value={filters.search}
          onChange={setSearch}
          placeholder="Search employees..."
          className="w-full sm:w-[300px]"
        />
        <FilterBar
          filters={filters}
          onFilterChange={setFilter}
          onReset={resetFilters}
          activeCount={activeFilterCount}
        />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-[400px]">
        {selectedIds.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-t-xl px-4 py-2 flex items-center justify-between shrink-0">
            <span className="text-sm font-medium text-primary">
              {selectedIds.length} employee{selectedIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs border-primary/20 hover:bg-primary/20">
                Bulk Edit
              </Button>
            </div>
          </div>
        )}
        
        <DataTable
          data={result?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          sort={sort}
          onSort={toggleSort}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          getRowId={(emp) => emp.id}
          emptyMessage={
            filters.search || activeFilterCount > 0
              ? 'No employees match your search criteria.'
              : 'No employees found.'
          }
        />
      </div>

      <div className="pt-4 shrink-0 border-t border-border mt-auto">
        <PaginationControls
          page={result?.page ?? 1}
          pageSize={result?.pageSize ?? 10}
          total={result?.total ?? 0}
          totalPages={result?.totalPages ?? 1}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {/* Dialogs */}
      <ConfirmationDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Employee"
        description="Are you sure you want to delete this employee? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />

      <ConfirmationDialog
        open={!!archiveId}
        onOpenChange={(open) => !open && setArchiveId(null)}
        title="Archive Employee"
        description="Are you sure you want to archive this employee? They will no longer have access to the system."
        confirmLabel="Archive"
        variant="warning"
        onConfirm={handleArchive}
        isPending={archiveMutation.isPending}
      />
    </div>
  );
}
