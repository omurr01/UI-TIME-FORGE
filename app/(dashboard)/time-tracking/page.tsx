import { Dashboard } from '@/features/time-tracking/components/dashboard';

export const metadata = {
  title: 'Time Tracking Dashboard | TimeForge',
  description: 'Overview of working hours and status.',
};

export default function TimeTrackingPage() {
  return <Dashboard />;
}
