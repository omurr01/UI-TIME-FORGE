import { EmployeeForm } from '@/features/employees/components/employee-form';

export const metadata = {
  title: 'Add Employee | TimeForge',
  description: 'Create a new employee profile.',
};

export default function NewEmployeePage() {
  return <EmployeeForm />;
}
