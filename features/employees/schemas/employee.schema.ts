import { z } from 'zod';

// ─── Employee Form Schema ─────────────────────────────────────────────────────

export const employeeSchema = z.object({
  // Personal
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  middleName: z
    .string()
    .max(50, 'Middle name must be 50 characters or less')
    .optional()
    .or(z.literal('')),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),

  // Identity
  employeeId: z
    .string()
    .min(1, 'Employee ID is required')
    .regex(/^EMP-\d{4,6}$/, 'Employee ID must follow format EMP-XXXX'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s\-().]{7,20}$/, 'Enter a valid phone number'),

  // Employment
  departmentId: z.string().min(1, 'Department is required'),
  positionId: z.string().min(1, 'Position is required'),
  role: z.enum(['employee', 'supervisor', 'hr_finance', 'admin'], {
    required_error: 'Role is required',
  }),
  employmentType: z.enum(['full_time', 'part_time', 'contract', 'intern'], {
    required_error: 'Employment type is required',
  }),
  employmentStatus: z.enum(['active', 'inactive', 'on_leave', 'terminated'], {
    required_error: 'Employment status is required',
  }),
  accountStatus: z.enum(['active', 'inactive', 'pending', 'suspended'], {
    required_error: 'Account status is required',
  }),
  hireDate: z.string().min(1, 'Hire date is required'),
  managerId: z.string().optional().or(z.literal('')),

  // Address
  street: z.string().min(1, 'Street address is required').max(100),
  city: z.string().min(1, 'City is required').max(50),
  state: z.string().min(1, 'State is required').max(50),
  zipCode: z.string().min(1, 'ZIP code is required').max(10),
  country: z.string().min(1, 'Country is required').max(50),

  // Emergency Contact
  emergencyContactName: z.string().min(1, 'Emergency contact name is required').max(100),
  emergencyContactRelationship: z
    .string()
    .min(1, 'Relationship is required')
    .max(50),
  emergencyContactPhone: z
    .string()
    .min(1, 'Emergency contact phone is required')
    .regex(/^[+]?[\d\s\-().]{7,20}$/, 'Enter a valid phone number'),

  // Optional
  notes: z.string().max(1000, 'Notes must be 1000 characters or less').optional().or(z.literal('')),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

// ─── Default Values ───────────────────────────────────────────────────────────

export const defaultEmployeeValues: EmployeeFormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  employeeId: '',
  email: '',
  phone: '',
  departmentId: '',
  positionId: '',
  role: 'employee',
  employmentType: 'full_time',
  employmentStatus: 'active',
  accountStatus: 'active',
  hireDate: '',
  managerId: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'Philippines',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactPhone: '',
  notes: '',
};
