'use client';

import type { Column } from './shared/data-table';
import type { Employee } from '../types';
import { EMPLOYMENT_TYPE_LABELS } from '../types';
import { format } from 'date-fns';
import { AvatarCell } from './shared/avatar-cell';
import { StatusBadge } from './shared/status-badge';
import { RoleBadge } from './shared/role-badge';
import { ActionMenu } from './shared/action-menu';

interface EmployeeColumnsProps {
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function getEmployeeColumns({
  onView,
  onEdit,
  onArchive,
  onDelete,
}: EmployeeColumnsProps): Column<Employee>[] {
  return [
    {
      id: 'employeeId',
      header: 'ID',
      accessorKey: 'employeeId',
      enableSorting: true,
      className: 'w-[100px] font-medium',
      cell: (emp) => emp.employeeId,
    },
    {
      id: 'fullName',
      header: 'Employee',
      accessorKey: 'fullName',
      enableSorting: true,
      className: 'min-w-[250px]',
      cell: (emp) => <AvatarCell employee={emp} />,
    },
    {
      id: 'department',
      header: 'Department / Position',
      accessorKey: 'department',
      enableSorting: true,
      className: 'min-w-[200px]',
      cell: (emp) => (
        <div className="flex flex-col">
          <span className="font-medium">{emp.department.name}</span>
          <span className="text-xs text-muted-foreground">{emp.position.title}</span>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      enableSorting: true,
      className: 'w-[120px]',
      cell: (emp) => <RoleBadge role={emp.role} />,
    },
    {
      id: 'employmentStatus',
      header: 'Status',
      accessorKey: 'employmentStatus',
      enableSorting: true,
      className: 'w-[120px]',
      cell: (emp) => <StatusBadge status={emp.employmentStatus} type="employment" />,
    },
    {
      id: 'employmentType',
      header: 'Type',
      accessorKey: 'employmentType',
      enableSorting: true,
      className: 'w-[120px]',
      cell: (emp) => (
        <span className="text-sm">{EMPLOYMENT_TYPE_LABELS[emp.employmentType]}</span>
      ),
    },
    {
      id: 'hireDate',
      header: 'Hire Date',
      accessorKey: 'hireDate',
      enableSorting: true,
      className: 'w-[120px]',
      cell: (emp) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {format(new Date(emp.hireDate), 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      className: 'w-[60px] text-right',
      cell: (emp) => (
        <ActionMenu
          onView={() => onView(emp.id)}
          onEdit={() => onEdit(emp.id)}
          onArchive={() => onArchive(emp.id)}
          onDelete={() => onDelete(emp.id)}
          disableArchive={emp.employmentStatus === 'inactive' || emp.employmentStatus === 'terminated'}
        />
      ),
    },
  ];
}
