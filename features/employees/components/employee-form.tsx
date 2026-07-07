'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Camera, Save, ArrowLeft, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { PageHeader } from '@/components/shared/page-header';
import { FormSection } from './shared/form-section';
import { FormGrid } from './shared/form-grid';
import { employeeSchema, type EmployeeFormValues, defaultEmployeeValues } from '../schemas/employee.schema';
import type { Employee } from '../types';
import {
  DEPARTMENTS,
  POSITIONS,
  EMPLOYEE_ROLE_LABELS,
  EMPLOYMENT_TYPE_LABELS,
  EMPLOYMENT_STATUS_LABELS,
  ACCOUNT_STATUS_LABELS,
} from '../types';
import { useCreateEmployee, useUpdateEmployee } from '../hooks/use-employees';
import { mockEmployees } from '../mocks/employees';

interface EmployeeFormProps {
  initialData?: Employee;
}

export function EmployeeForm({ initialData }: EmployeeFormProps) {
  const router = useRouter();
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const isEditing = !!initialData;

  const defaultValues: EmployeeFormValues = initialData
    ? {
        firstName: initialData.firstName,
        middleName: initialData.middleName ?? '',
        lastName: initialData.lastName,
        employeeId: initialData.employeeId,
        email: initialData.email,
        phone: initialData.phone,
        departmentId: initialData.department.id,
        positionId: initialData.position.id,
        role: initialData.role,
        employmentType: initialData.employmentType,
        employmentStatus: initialData.employmentStatus,
        accountStatus: initialData.accountStatus,
        hireDate: initialData.hireDate,
        managerId: initialData.managerId ?? '',
        street: initialData.address.street,
        city: initialData.address.city,
        state: initialData.address.state,
        zipCode: initialData.address.zipCode,
        country: initialData.address.country,
        emergencyContactName: initialData.emergencyContact.name,
        emergencyContactRelationship: initialData.emergencyContact.relationship,
        emergencyContactPhone: initialData.emergencyContact.phone,
        notes: initialData.notes ?? '',
      }
    : defaultEmployeeValues;

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const { isDirty } = form.formState;

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to discard them?')) {
      return;
    }
    router.back();
  };

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: initialData.id, input: values });
        toast.success('Employee updated successfully');
        router.push(`/employees/${initialData.id}`);
      } else {
        const newEmp = await createMutation.mutateAsync(values);
        toast.success('Employee created successfully');
        form.reset();
        router.push(`/employees/${newEmp.id}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  // Filter positions based on selected department
  const selectedDeptId = form.watch('departmentId');
  const availablePositions = POSITIONS.filter(p => !selectedDeptId || p.departmentId === selectedDeptId);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      <PageHeader
        title={isEditing ? 'Edit Employee' : 'Add New Employee'}
        description={isEditing ? 'Update employee information and status.' : 'Create a new employee profile.'}
      >
        <Button variant="outline" onClick={handleCancel} disabled={isPending}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending || !isDirty}>
          {isPending ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isEditing ? 'Save Changes' : 'Create Employee'}
        </Button>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card border border-border rounded-xl p-6 lg:p-8">
          
          {/* Profile Photo (UI Only) */}
          <FormSection title="Profile Photo" description="Upload a professional profile picture." separator={false}>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden shrink-0">
                {isEditing && initialData.avatarUrl ? (
                  <img src={initialData.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-8 w-8 text-muted-foreground/50" />
                )}
              </div>
              <div className="space-y-3">
                <Button variant="outline" type="button" size="sm">Choose File</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>
          </FormSection>

          {/* Personal Information */}
          <FormSection title="Personal Information" description="Basic personal details.">
            <FormGrid>
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem><FormLabel>First Name *</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="middleName" render={({ field }) => (
                <FormItem><FormLabel>Middle Name</FormLabel><FormControl><Input placeholder="Robert" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem><FormLabel>Last Name *</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input placeholder="john.doe@company.com" type="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone Number *</FormLabel><FormControl><Input placeholder="+1 (555) 000-0000" type="tel" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          {/* Employment Details */}
          <FormSection title="Employment Details" description="Job role, department, and status.">
            <FormGrid cols={3}>
              <FormField control={form.control} name="employeeId" render={({ field }) => (
                <FormItem><FormLabel>Employee ID *</FormLabel><FormControl><Input placeholder="EMP-0000" {...field} disabled={isEditing} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="hireDate" render={({ field }) => (
                <FormItem><FormLabel>Hire Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="departmentId" render={({ field }) => (
                <FormItem><FormLabel>Department *</FormLabel>
                  <Select onValueChange={(val) => { field.onChange(val); form.setValue('positionId', ''); }} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {DEPARTMENTS.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="positionId" render={({ field }) => (
                <FormItem><FormLabel>Position *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger disabled={!selectedDeptId}><SelectValue placeholder="Select position" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {availablePositions.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>System Role *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(EMPLOYEE_ROLE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="managerId" render={({ field }) => (
                <FormItem><FormLabel>Assigned Manager</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {mockEmployees.filter(e => e.role !== 'employee' && e.id !== initialData?.id).slice(0, 15).map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.fullName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </FormGrid>

            <FormGrid cols={3} className="mt-6">
              <FormField control={form.control} name="employmentType" render={({ field }) => (
                <FormItem><FormLabel>Employment Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(EMPLOYMENT_TYPE_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="employmentStatus" render={({ field }) => (
                <FormItem><FormLabel>Employment Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(EMPLOYMENT_STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="accountStatus" render={({ field }) => (
                <FormItem><FormLabel>Account Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(ACCOUNT_STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </FormGrid>
          </FormSection>

          {/* Address */}
          <FormSection title="Address" description="Employee's residential address.">
            <FormGrid>
              <FormField control={form.control} name="street" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Street Address *</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City *</FormLabel><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem><FormLabel>State/Province *</FormLabel><FormControl><Input placeholder="State" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="zipCode" render={({ field }) => (
                <FormItem><FormLabel>ZIP/Postal Code *</FormLabel><FormControl><Input placeholder="Zip" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem><FormLabel>Country *</FormLabel><FormControl><Input placeholder="Country" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          {/* Emergency Contact */}
          <FormSection title="Emergency Contact" description="Who to contact in case of emergency.">
            <FormGrid cols={3}>
              <FormField control={form.control} name="emergencyContactName" render={({ field }) => (
                <FormItem><FormLabel>Name *</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="emergencyContactRelationship" render={({ field }) => (
                <FormItem><FormLabel>Relationship *</FormLabel><FormControl><Input placeholder="Spouse" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="emergencyContactPhone" render={({ field }) => (
                <FormItem><FormLabel>Phone Number *</FormLabel><FormControl><Input placeholder="+1 (555) 000-0000" type="tel" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          {/* Notes */}
          <FormSection title="Additional Notes" description="Internal notes about the employee.">
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem><FormControl><Textarea placeholder="Add any relevant notes..." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </FormSection>

          <div className="flex justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isPending}>Cancel</Button>
            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Save Changes' : 'Create Employee'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
