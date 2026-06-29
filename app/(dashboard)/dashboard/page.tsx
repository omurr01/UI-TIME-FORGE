import { redirect } from 'next/navigation';

// Default dashboard redirect — in production this would read the session role
// For demo, redirect to the employee dashboard
export default function DashboardPage() {
  redirect('/dashboard/employee');
}
