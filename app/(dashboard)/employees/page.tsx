import { EmployeeList } from '@/features/employees/components/employee-list';

export const metadata = {
  title: 'Employees | TimeForge',
  description: 'Manage employee records and directory.',
};

export default function EmployeesPage() {
  return <EmployeeList />;
}
