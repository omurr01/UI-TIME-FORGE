import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/container';

export default function AccessDeniedPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-6 mb-6">
          <ShieldAlert size={48} className="text-destructive" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Access denied</h1>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          You don&apos;t have permission to view this page. This area is restricted to
          specific roles.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-8">
          <Button asChild>
            <Link href="/dashboard">
              <Home size={15} className="mr-1.5" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="javascript:history.back()">
              <ArrowLeft size={15} className="mr-1.5" />
              Go back
            </Link>
          </Button>
        </div>

        {/* Info box */}
        <div className="mt-10 rounded-xl border border-border bg-muted/40 px-5 py-4 text-left w-full">
          <p className="text-xs font-semibold text-foreground mb-2">Why am I seeing this?</p>
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>Your role doesn&apos;t have access to this section</li>
            <li>Your session may have changed</li>
            <li>You followed a link intended for a different role</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Contact your administrator if you believe this is a mistake.
          </p>
        </div>
      </div>
    </Container>
  );
}
