'use client';

import { useRouter } from 'next/navigation';
import { EmployeeForm } from '@/features/employees/components/employee-form';
import { useEmployee } from '@/features/employees/hooks/use-employees';
import { Button } from '@/components/ui/button';

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: employee, isLoading, error } = useEmployee(params.id);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading employee data...</div>;
  }

  if (error || !employee) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-destructive">Employee not found or an error occurred.</p>
        <Button onClick={() => router.push('/employees')} variant="outline">
          Back to Employees
        </Button>
      </div>
    );
  }

  return <EmployeeForm initialData={employee} />;
}
