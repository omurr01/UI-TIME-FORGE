import { EmployeeDetail } from '@/features/employees/components/employee-detail';

export const metadata = {
  title: 'Employee Details | TimeForge',
  description: 'View employee information and activity.',
};

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  return <EmployeeDetail id={params.id} />;
}
