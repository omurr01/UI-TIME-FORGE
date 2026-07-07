import { TimeEntryDetail } from '@/features/time-tracking/components/time-entry-detail';

export const metadata = {
  title: 'Time Entry Details | TimeForge',
  description: 'View detailed information for a time entry.',
};

export default function TimeEntryDetailPage({ params }: { params: { id: string } }) {
  return <TimeEntryDetail id={params.id} />;
}
