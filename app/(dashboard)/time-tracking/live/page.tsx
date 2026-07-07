import { LiveTimer } from '@/features/time-tracking/components/live-timer';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Live Timer | TimeForge',
  description: 'Live time tracking timer.',
};

export default function LiveTimerPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Live Timer"
        description="Clock in, take breaks, and clock out."
      >
        <Button variant="outline" asChild>
          <Link href="/time-tracking">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </PageHeader>
      <LiveTimer />
    </div>
  );
}
