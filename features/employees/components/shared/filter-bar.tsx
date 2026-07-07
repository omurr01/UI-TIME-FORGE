import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';
import type { EmployeeFilters } from '../../types';
import {
  DEPARTMENTS,
  EMPLOYMENT_STATUS_LABELS,
  ACCOUNT_STATUS_LABELS,
  EMPLOYEE_ROLE_LABELS,
  EMPLOYMENT_TYPE_LABELS,
} from '../../types';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  filters: EmployeeFilters;
  onFilterChange: <K extends keyof EmployeeFilters>(key: K, value: EmployeeFilters[K]) => void;
  onReset: () => void;
  activeCount: number;
}

export function FilterBar({ filters, onFilterChange, onReset, activeCount }: FilterBarProps) {
  const content = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <Select
        value={filters.department}
        onValueChange={(v) => onFilterChange('department', v === 'all' ? '' : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {DEPARTMENTS.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.role}
        onValueChange={(v) => onFilterChange('role', v === 'all' ? '' : v as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {Object.entries(EMPLOYEE_ROLE_LABELS).map(([k, v]) => (
            <SelectItem key={k} value={k}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.employmentStatus}
        onValueChange={(v) => onFilterChange('employmentStatus', v === 'all' ? '' : v as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Employment Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Emp. Status</SelectItem>
          {Object.entries(EMPLOYMENT_STATUS_LABELS).map(([k, v]) => (
            <SelectItem key={k} value={k}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.accountStatus}
        onValueChange={(v) => onFilterChange('accountStatus', v === 'all' ? '' : v as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Account Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Acc. Status</SelectItem>
          {Object.entries(ACCOUNT_STATUS_LABELS).map(([k, v]) => (
            <SelectItem key={k} value={k}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.employmentType}
        onValueChange={(v) => onFilterChange('employmentType', v === 'all' ? '' : v as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Employment Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {Object.entries(EMPLOYMENT_TYPE_LABELS).map(([k, v]) => (
            <SelectItem key={k} value={k}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {/* Desktop filters */}
      <div className="hidden lg:flex flex-1 items-center gap-3 overflow-hidden">
        {content}
        {activeCount > 0 && (
          <Button
            variant="ghost"
            onClick={onReset}
            className="text-muted-foreground shrink-0 h-10 px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Mobile/Tablet filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 border-dashed">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 rounded-sm px-1.5 font-normal">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              {content}
              {activeCount > 0 && (
                <Button variant="outline" onClick={onReset} className="mt-4 w-full">
                  Reset Filters
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
