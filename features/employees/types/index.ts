// ─── Enums ────────────────────────────────────────────────────────────────────

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern';

export type EmploymentStatus = 'active' | 'inactive' | 'on_leave' | 'terminated';

export type AccountStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export type EmployeeRole = 'employee' | 'supervisor' | 'hr_finance' | 'admin';

// ─── Department & Position ────────────────────────────────────────────────────

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Position {
  id: string;
  title: string;
  departmentId: string;
}

// ─── Emergency Contact ────────────────────────────────────────────────────────

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

// ─── Address ─────────────────────────────────────────────────────────────────

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export type EmployeeActivityType =
  | 'created'
  | 'updated'
  | 'status_changed'
  | 'role_changed'
  | 'department_changed'
  | 'archived'
  | 'restored'
  | 'login';

export interface EmployeeActivity {
  id: string;
  type: EmployeeActivityType;
  description: string;
  timestamp: string;
  performedBy: string;
}

// ─── Employee ─────────────────────────────────────────────────────────────────

export interface Employee {
  id: string;
  employeeId: string; // e.g. "EMP-0001"
  firstName: string;
  middleName?: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;

  // Employment
  department: Department;
  position: Position;
  role: EmployeeRole;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  accountStatus: AccountStatus;
  hireDate: string; // ISO date YYYY-MM-DD
  managerId?: string;
  managerName?: string;

  // Personal
  address: Address;
  emergencyContact: EmergencyContact;
  notes?: string;

  // Metadata
  activities: EmployeeActivity[];
  createdAt: string;
  updatedAt: string;
}

// ─── Filters ─────────────────────────────────────────────────────────────────

export interface EmployeeFilters {
  search: string;
  department: string;
  role: EmployeeRole | '';
  employmentStatus: EmploymentStatus | '';
  accountStatus: AccountStatus | '';
  employmentType: EmploymentType | '';
  hireDateFrom: string;
  hireDateTo: string;
}

export const DEFAULT_FILTERS: EmployeeFilters = {
  search: '',
  department: '',
  role: '',
  employmentStatus: '',
  accountStatus: '',
  employmentType: '',
  hireDateFrom: '',
  hireDateTo: '',
};

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export const DEFAULT_PAGINATION: PaginationParams = {
  page: 1,
  pageSize: 10,
};

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

export interface SortParams {
  field: keyof Employee | string;
  direction: SortDirection;
}

// ─── Form Input ───────────────────────────────────────────────────────────────

export interface CreateEmployeeInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
  email: string;
  phone: string;
  departmentId: string;
  positionId: string;
  role: EmployeeRole;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  accountStatus: AccountStatus;
  hireDate: string;
  managerId?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  notes?: string;
}

export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

// ─── Label Maps ──────────────────────────────────────────────────────────────

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  intern: 'Intern',
};

export const EMPLOYMENT_STATUS_LABELS: Record<EmploymentStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  on_leave: 'On Leave',
  terminated: 'Terminated',
};

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  suspended: 'Suspended',
};

export const EMPLOYEE_ROLE_LABELS: Record<EmployeeRole, string> = {
  employee: 'Employee',
  supervisor: 'Supervisor',
  hr_finance: 'HR & Finance',
  admin: 'Admin',
};

export const DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Engineering', code: 'ENG' },
  { id: 'dept-2', name: 'Human Resources', code: 'HR' },
  { id: 'dept-3', name: 'Finance', code: 'FIN' },
  { id: 'dept-4', name: 'Marketing', code: 'MKT' },
  { id: 'dept-5', name: 'Operations', code: 'OPS' },
  { id: 'dept-6', name: 'Sales', code: 'SLS' },
  { id: 'dept-7', name: 'Product', code: 'PRD' },
  { id: 'dept-8', name: 'Design', code: 'DSG' },
  { id: 'dept-9', name: 'IT', code: 'IT' },
  { id: 'dept-10', name: 'Legal', code: 'LGL' },
];

export const POSITIONS: Position[] = [
  // Engineering
  { id: 'pos-1', title: 'Software Engineer', departmentId: 'dept-1' },
  { id: 'pos-2', title: 'Senior Software Engineer', departmentId: 'dept-1' },
  { id: 'pos-3', title: 'Engineering Manager', departmentId: 'dept-1' },
  { id: 'pos-4', title: 'DevOps Engineer', departmentId: 'dept-1' },
  { id: 'pos-5', title: 'QA Engineer', departmentId: 'dept-1' },
  // HR
  { id: 'pos-6', title: 'HR Manager', departmentId: 'dept-2' },
  { id: 'pos-7', title: 'HR Specialist', departmentId: 'dept-2' },
  { id: 'pos-8', title: 'Recruiter', departmentId: 'dept-2' },
  // Finance
  { id: 'pos-9', title: 'Finance Manager', departmentId: 'dept-3' },
  { id: 'pos-10', title: 'Accountant', departmentId: 'dept-3' },
  { id: 'pos-11', title: 'Financial Analyst', departmentId: 'dept-3' },
  // Marketing
  { id: 'pos-12', title: 'Marketing Manager', departmentId: 'dept-4' },
  { id: 'pos-13', title: 'Content Strategist', departmentId: 'dept-4' },
  { id: 'pos-14', title: 'SEO Specialist', departmentId: 'dept-4' },
  // Operations
  { id: 'pos-15', title: 'Operations Manager', departmentId: 'dept-5' },
  { id: 'pos-16', title: 'Operations Analyst', departmentId: 'dept-5' },
  // Sales
  { id: 'pos-17', title: 'Sales Manager', departmentId: 'dept-6' },
  { id: 'pos-18', title: 'Account Executive', departmentId: 'dept-6' },
  { id: 'pos-19', title: 'Sales Representative', departmentId: 'dept-6' },
  // Product
  { id: 'pos-20', title: 'Product Manager', departmentId: 'dept-7' },
  { id: 'pos-21', title: 'Product Analyst', departmentId: 'dept-7' },
  // Design
  { id: 'pos-22', title: 'UI/UX Designer', departmentId: 'dept-8' },
  { id: 'pos-23', title: 'Graphic Designer', departmentId: 'dept-8' },
  // IT
  { id: 'pos-24', title: 'System Administrator', departmentId: 'dept-9' },
  { id: 'pos-25', title: 'Network Engineer', departmentId: 'dept-9' },
  // Legal
  { id: 'pos-26', title: 'Legal Counsel', departmentId: 'dept-10' },
  { id: 'pos-27', title: 'Compliance Officer', departmentId: 'dept-10' },
];
