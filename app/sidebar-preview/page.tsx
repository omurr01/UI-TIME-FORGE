import Link from 'next/link';
import { ArrowRight, User, Users, DollarSign, Shield } from 'lucide-react';
import { ThemeToggle } from '@/features/auth/components/theme-toggle';
import { AuthLogo } from '@/features/auth/components/auth-logo';

const ROLE_PAGES = [
  {
    role: 'employee',
    href: '/sidebar-preview/employee',
    label: 'Employee',
    description: 'Standard nav — Dashboard, Time Tracking, Timesheets, Scrum, KPI, Notifications, Settings',
    icon: User,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    border: 'hover:border-blue-500/40',
    items: 7,
  },
  {
    role: 'supervisor',
    href: '/sidebar-preview/supervisor',
    label: 'Supervisor',
    description: 'Adds Employees and Reports. Can review timesheets and view team KPIs.',
    icon: Users,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    border: 'hover:border-purple-500/40',
    items: 9,
  },
  {
    role: 'hr_finance',
    href: '/sidebar-preview/hr-finance',
    label: 'HR & Finance',
    description: 'Adds Payroll and Reports. Full access to employee management and financials.',
    icon: DollarSign,
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    border: 'hover:border-amber-500/40',
    items: 9,
  },
  {
    role: 'admin',
    href: '/sidebar-preview/admin',
    label: 'Administrator',
    description: 'Full access — all modules including Approvals and Admin Panel.',
    icon: Shield,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    border: 'hover:border-red-500/40',
    items: 11,
  },
];

export default function SidebarPreviewIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AuthLogo size="sm" href="/" />
          <div className="h-4 w-px bg-border" />
          <div>
            <p className="text-sm font-semibold text-foreground">Sidebar Preview</p>
            <p className="text-xs text-muted-foreground hidden sm:block">Select a role to view its sidebar</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-14">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Sidebar Design
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Each role has a filtered navigation. Click a card to see the full interactive
            sidebar for that role — collapse it, toggle dark mode, and inspect every nav item.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLE_PAGES.map(({ href, label, description, icon: Icon, color, border, items }) => (
            <Link
              key={href}
              href={href}
              className={`group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-sm ${border}`}
            >
              {/* Icon + label */}
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 ${color}`}>
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all mt-1"
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-base font-bold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 pt-1 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {items} nav items
                </span>
                <span className="ml-auto text-xs font-medium text-primary group-hover:underline">
                  View sidebar →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center mt-8">
          All sidebars support collapse, dark mode, keyboard navigation, and Framer Motion animations.
        </p>
      </main>
    </div>
  );
}
