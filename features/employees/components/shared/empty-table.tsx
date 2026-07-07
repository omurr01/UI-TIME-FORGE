import { EmptyState } from '@/components/shared/empty-state';
import { Users } from 'lucide-react';

interface EmptyTableProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyTable({
  title = 'No employees found',
  description = 'Try adjusting your search or filters to find what you are looking for.',
  action,
}: EmptyTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-12">
      <EmptyState
        icon={Users}
        title={title}
        description={description}
        action={action}
      />
    </div>
  );
}
