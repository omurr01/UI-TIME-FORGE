import type {
  Employee,
  EmployeeFilters,
  PaginationParams,
  PaginatedResult,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  SortParams,
} from '../types';
import { DEPARTMENTS, POSITIONS } from '../types';
import { mockEmployees } from '../mocks/employees';

// ─── Helpers ──────────────────────────────────────────────────────────────────

let employeeStore: Employee[] = [...mockEmployees];
let nextId = 76;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(): Promise<void> {
  const ms = 300 + Math.floor(Math.random() * 400);
  return delay(ms);
}

function matchesFilters(emp: Employee, filters: Partial<EmployeeFilters>): boolean {
  const {
    search = '',
    department = '',
    role = '',
    employmentStatus = '',
    accountStatus = '',
    employmentType = '',
    hireDateFrom = '',
    hireDateTo = '',
  } = filters;

  if (search) {
    const q = search.toLowerCase();
    const searchable = [
      emp.fullName,
      emp.email,
      emp.employeeId,
      emp.department.name,
      emp.position.title,
      emp.phone,
    ]
      .join(' ')
      .toLowerCase();
    if (!searchable.includes(q)) return false;
  }
  if (department && emp.department.id !== department && emp.department.name !== department) return false;
  if (role && emp.role !== role) return false;
  if (employmentStatus && emp.employmentStatus !== employmentStatus) return false;
  if (accountStatus && emp.accountStatus !== accountStatus) return false;
  if (employmentType && emp.employmentType !== employmentType) return false;
  if (hireDateFrom && emp.hireDate < hireDateFrom) return false;
  if (hireDateTo && emp.hireDate > hireDateTo) return false;

  return true;
}

function sortEmployees(employees: Employee[], sort?: SortParams): Employee[] {
  if (!sort) return employees;
  const { field, direction } = sort;

  return [...employees].sort((a, b) => {
    let aVal: string | number = '';
    let bVal: string | number = '';

    switch (field) {
      case 'fullName': aVal = a.fullName; bVal = b.fullName; break;
      case 'email': aVal = a.email; bVal = b.email; break;
      case 'employeeId': aVal = a.employeeId; bVal = b.employeeId; break;
      case 'department': aVal = a.department.name; bVal = b.department.name; break;
      case 'position': aVal = a.position.title; bVal = b.position.title; break;
      case 'role': aVal = a.role; bVal = b.role; break;
      case 'employmentStatus': aVal = a.employmentStatus; bVal = b.employmentStatus; break;
      case 'accountStatus': aVal = a.accountStatus; bVal = b.accountStatus; break;
      case 'employmentType': aVal = a.employmentType; bVal = b.employmentType; break;
      case 'hireDate': aVal = a.hireDate; bVal = b.hireDate; break;
      default: aVal = String(a[field as keyof Employee] ?? ''); bVal = String(b[field as keyof Employee] ?? '');
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const cmp = aVal.localeCompare(bVal);
      return direction === 'asc' ? cmp : -cmp;
    }

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// ─── Employee Service ─────────────────────────────────────────────────────────

export const EmployeeService = {
  async getEmployees(
    filters: Partial<EmployeeFilters> = {},
    pagination: PaginationParams = { page: 1, pageSize: 10 },
    sort?: SortParams
  ): Promise<PaginatedResult<Employee>> {
    await randomDelay();

    const filtered = employeeStore.filter((e) => matchesFilters(e, filters));
    const sorted = sortEmployees(filtered, sort);

    const { page, pageSize } = pagination;
    const start = (page - 1) * pageSize;
    const data = sorted.slice(start, start + pageSize);

    return {
      data,
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize),
    };
  },

  async getEmployeeById(id: string): Promise<Employee> {
    await randomDelay();
    const emp = employeeStore.find((e) => e.id === id);
    if (!emp) throw new Error(`Employee with id "${id}" not found.`);
    return { ...emp };
  },

  async searchEmployees(query: string): Promise<Employee[]> {
    await delay(200);
    if (!query.trim()) return employeeStore.slice(0, 10);
    const q = query.toLowerCase();
    return employeeStore
      .filter(
        (e) =>
          e.fullName.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.employeeId.toLowerCase().includes(q)
      )
      .slice(0, 20);
  },

  async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    await randomDelay();

    const dept = DEPARTMENTS.find((d) => d.id === input.departmentId);
    const pos = POSITIONS.find((p) => p.id === input.positionId);

    if (!dept) throw new Error('Invalid department.');
    if (!pos) throw new Error('Invalid position.');

    const now = new Date().toISOString();
    const padded = String(nextId).padStart(4, '0');
    const newEmployee: Employee = {
      id: `emp-${padded}`,
      employeeId: input.employeeId,
      firstName: input.firstName,
      middleName: input.middleName,
      lastName: input.lastName,
      fullName: [input.firstName, input.middleName, input.lastName].filter(Boolean).join(' '),
      email: input.email,
      phone: input.phone,
      department: dept,
      position: pos,
      role: input.role,
      employmentType: input.employmentType,
      employmentStatus: input.employmentStatus,
      accountStatus: input.accountStatus,
      hireDate: input.hireDate,
      managerId: input.managerId,
      address: {
        street: input.street,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
        country: input.country,
      },
      emergencyContact: {
        name: input.emergencyContactName,
        relationship: input.emergencyContactRelationship,
        phone: input.emergencyContactPhone,
      },
      notes: input.notes,
      activities: [
        {
          id: `act-${padded}-1`,
          type: 'created',
          description: 'Employee record created',
          timestamp: now,
          performedBy: 'Admin',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    employeeStore = [newEmployee, ...employeeStore];
    nextId++;
    return { ...newEmployee };
  },

  async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    await randomDelay();

    const idx = employeeStore.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`Employee with id "${id}" not found.`);

    const existing = employeeStore[idx];
    const now = new Date().toISOString();

    const dept = input.departmentId
      ? DEPARTMENTS.find((d) => d.id === input.departmentId) ?? existing.department
      : existing.department;
    const pos = input.positionId
      ? POSITIONS.find((p) => p.id === input.positionId) ?? existing.position
      : existing.position;

    const updated: Employee = {
      ...existing,
      ...{
        firstName: input.firstName ?? existing.firstName,
        middleName: input.middleName ?? existing.middleName,
        lastName: input.lastName ?? existing.lastName,
        email: input.email ?? existing.email,
        phone: input.phone ?? existing.phone,
        role: input.role ?? existing.role,
        employmentType: input.employmentType ?? existing.employmentType,
        employmentStatus: input.employmentStatus ?? existing.employmentStatus,
        accountStatus: input.accountStatus ?? existing.accountStatus,
        hireDate: input.hireDate ?? existing.hireDate,
        managerId: input.managerId ?? existing.managerId,
        notes: input.notes ?? existing.notes,
      },
      department: dept,
      position: pos,
      address: input.street
        ? {
            street: input.street ?? existing.address.street,
            city: input.city ?? existing.address.city,
            state: input.state ?? existing.address.state,
            zipCode: input.zipCode ?? existing.address.zipCode,
            country: input.country ?? existing.address.country,
          }
        : existing.address,
      emergencyContact: input.emergencyContactName
        ? {
            name: input.emergencyContactName ?? existing.emergencyContact.name,
            relationship: input.emergencyContactRelationship ?? existing.emergencyContact.relationship,
            phone: input.emergencyContactPhone ?? existing.emergencyContact.phone,
          }
        : existing.emergencyContact,
      updatedAt: now,
      activities: [
        ...existing.activities,
        {
          id: `act-${id}-upd-${Date.now()}`,
          type: 'updated',
          description: 'Employee record updated',
          timestamp: now,
          performedBy: 'Admin',
        },
      ],
    };

    updated.fullName = [updated.firstName, updated.middleName, updated.lastName].filter(Boolean).join(' ');
    employeeStore[idx] = updated;
    return { ...updated };
  },

  async deleteEmployee(id: string): Promise<void> {
    await randomDelay();
    const idx = employeeStore.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`Employee with id "${id}" not found.`);
    employeeStore.splice(idx, 1);
  },

  async archiveEmployee(id: string): Promise<Employee> {
    await randomDelay();
    const idx = employeeStore.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`Employee with id "${id}" not found.`);

    const now = new Date().toISOString();
    const updated: Employee = {
      ...employeeStore[idx],
      employmentStatus: 'inactive',
      accountStatus: 'inactive',
      updatedAt: now,
      activities: [
        ...employeeStore[idx].activities,
        {
          id: `act-${id}-arch-${Date.now()}`,
          type: 'archived',
          description: 'Employee record archived',
          timestamp: now,
          performedBy: 'Admin',
        },
      ],
    };

    employeeStore[idx] = updated;
    return { ...updated };
  },
};
