import Link from 'next/link';
import { TimerOff, LogIn, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthCard } from '@/features/auth/components/auth-card';

export default function SessionExpiredPage() {
  return (
    <AuthCard>
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
          <TimerOff size={36} className="text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Session expired</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Your session has timed out due to inactivity. Please sign in again to
            continue where you left off.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3 text-left">
          <div className="flex items-start gap-3">
            <ShieldAlert size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Why did this happen?</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                For security, TimeForge automatically signs you out after 60 minutes of
                inactivity. Any unsaved work may have been lost.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-left">
          <p className="font-medium text-primary mb-1">Tip</p>
          <p className="text-muted-foreground leading-relaxed">
            Select &quot;Keep me signed in&quot; on the login page to extend your session to
            30 days on trusted devices.
          </p>
        </div>

        <div className="space-y-3">
          <Button className="w-full gap-2 h-11" asChild>
            <Link href="/login">
              <LogIn size={15} />
              Sign in again
            </Link>
          </Button>
          <Link
            href="/"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
