import { ManualEntryForm } from '@/features/time-tracking/components/manual-entry-form';

export const metadata = {
  title: 'Manual Time Entry | TimeForge',
  description: 'Add a manual time entry.',
};

export default function ManualEntryPage() {
  return <ManualEntryForm />;
}
