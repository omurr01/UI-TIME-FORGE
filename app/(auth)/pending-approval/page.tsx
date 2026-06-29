import Link from 'next/link';
import { Clock, CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthCard } from '@/features/auth/components/auth-card';

const steps = [
  { icon: CheckCircle2, label: 'Registration submitted', done: true },
  { icon: CheckCircle2, label: 'Email verified', done: true },
  { icon: Clock, label: 'Admin review in progress', done: false, active: true },
  { icon: Mail, label: 'Invitation email sent', done: false },
];

export default function PendingApprovalPage() {
  return (
    <AuthCard>
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-warning/10 flex items-center justify-center">
          <Clock size={36} className="text-warning" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Pending approval</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Your account is currently under review. Admins typically respond within
            1–2 business days.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 text-left space-y-4">
          <p className="text-sm font-semibold text-foreground">Registration progress</p>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    step.done
                      ? 'bg-success/15 text-success'
                      : step.active
                      ? 'bg-warning/15 text-warning'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <step.icon size={16} />
                </div>
                <div>
                  <span
                    className={`text-sm ${
                      step.done
                        ? 'text-success font-medium'
                        : step.active
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.active && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-warning">
                      <span className="animate-pulse">●</span> In progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-left space-y-1">
          <p className="font-medium text-primary">What to expect</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Once approved, you&apos;ll receive an email with your role, department assignment,
            and a secure link to complete your profile setup.
          </p>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href="mailto:support@timeforge.com">
              <Mail size={15} />
              Contact support
            </a>
          </Button>
          <Link
            href="/login"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
