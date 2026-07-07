import { TableSkeleton } from '@/components/shared/loading-skeleton';

export function LoadingTable() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <TableSkeleton rows={5} columns={6} />
    </div>
  );
}
