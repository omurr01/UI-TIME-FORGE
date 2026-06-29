import Link from 'next/link';
import {
  Clock4,
  BarChart3,
  Users,
  Shield,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthLogo } from '@/features/auth/components/auth-logo';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';

const features = [
  {
    icon: Clock4,
    title: 'Precision Time Tracking',
    description:
      'Track employee hours with clock-in/out, overtime detection, and automated timesheets.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description:
      'Build and manage shift schedules effortlessly with conflict detection and swap requests.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Generate powerful workforce reports with real-time insights across all departments.',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description:
      'Granular permissions for employees, supervisors, HR/Finance, and administrators.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'SOC 2 compliant with end-to-end encryption, SSO, and audit trails.',
  },
  {
    icon: Globe,
    title: 'Multi-Location Support',
    description:
      'Manage distributed teams across departments, locations, and time zones.',
  },
];

const stats = [
  { label: 'Companies trust TimeForge', value: '2,400+' },
  { label: 'Hours tracked monthly', value: '18M+' },
  { label: 'Uptime SLA', value: '99.9%' },
  { label: 'Countries supported', value: '40+' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <AuthLogo size="md" href="/" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">
                Get started
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-20 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
              <Zap size={12} />
              Workforce Management Reimagined
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
              Time tracking built
              <br />
              <span className="text-primary">for modern teams</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              TimeForge unifies time tracking, scheduling, and HR analytics into a single
              platform — giving every role the tools they need to work smarter.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/register">
                  Start free trial
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="/login">Sign in to your account</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 size={14} className="text-success" />
              No credit card required
              <span className="mx-2 text-border">·</span>
              <CheckCircle2 size={14} className="text-success" />
              14-day free trial
              <span className="mx-2 text-border">·</span>
              <CheckCircle2 size={14} className="text-success" />
              Cancel anytime
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="py-16 px-6 border-y border-border/60 bg-muted/30">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything your workforce needs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A complete suite of tools designed to streamline operations from
                the shop floor to the executive suite.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-200 space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    <feature.icon size={20} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-lg opacity-85 max-w-xl mx-auto">
              Join thousands of companies already using TimeForge to optimize their
              workforce operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-base bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/register">Create your account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base border-white/40 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <AuthLogo size="sm" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TimeForge. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
