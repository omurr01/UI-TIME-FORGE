# TimeForge — Frontend Design Document

> **Version:** Sprint 2  
> **Last Updated:** June 30, 2026  
> **Repository:** [github.com/omurr01/UI-TIME-FORGE](https://github.com/omurr01/UI-TIME-FORGE)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Architecture](#3-folder-architecture)
4. [Design System](#4-design-system)
5. [Application Shell](#5-application-shell)
6. [Authentication Module](#6-authentication-module)
7. [Dashboard Module](#7-dashboard-module)
8. [Shared Components](#8-shared-components)
9. [Navigation & Routing](#9-navigation--routing)
10. [State Management](#10-state-management)
11. [Mock Services](#11-mock-services)
12. [Role System](#12-role-system)
13. [Responsive Design](#13-responsive-design)
14. [Accessibility](#14-accessibility)
15. [Dark Mode](#15-dark-mode)
16. [Sprint Roadmap](#16-sprint-roadmap)

---

## 1. Project Overview

TimeForge is an enterprise employee productivity SaaS platform. The frontend is built as a production-quality Next.js application with a feature-first architecture. It covers:

| Module | Status |
|---|---|
| Authentication | ✅ Sprint 1 |
| Application Shell | ✅ Sprint 2 |
| Dashboard (4 roles) | ✅ Sprint 1–2 |
| Employee Management | 🔜 Sprint 3 |
| Time Tracking | 🔜 Sprint 4 |
| Timesheets | 🔜 Sprint 5 |
| Daily Scrum | 🔜 Sprint 6 |
| KPI & Reports | 🔜 Sprint 7 |
| Payroll | 🔜 Sprint 8 |
| Notifications | 🔜 Sprint 9 |
| Settings | 🔜 Sprint 10 |

**Design Inspiration:** Linear, Vercel Dashboard, Notion, Stripe  
**Approach:** Minimal, professional, enterprise-grade. Desktop-first with full tablet/mobile support.

---

## 2. Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 13.5.1 |
| UI Library | React | 18.2.0 |
| Language | TypeScript | 5.2.2 |
| Styling | Tailwind CSS | 3.3.3 |
| Components | shadcn/ui (Radix UI) | Latest |
| Animations | Framer Motion | 10.18.0 |
| Forms | React Hook Form | ^7.53 |
| Validation | Zod | ^3.23 |
| Icons | Lucide React | ^0.446 |
| Charts | Recharts | ^2.12 |
| Date Utils | date-fns | ^3.6 |
| Themes | next-themes | ^0.3 |
| Font | Inter (Google Fonts) | Variable |
| Auth (future) | Supabase Auth | ^2.58 |

---

## 3. Folder Architecture

```
project/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group (no shell)
│   │   ├── layout.tsx            # Auth shell: logo + theme toggle
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   ├── verify-email/page.tsx
│   │   ├── pending-approval/page.tsx
│   │   ├── rejected/page.tsx
│   │   └── session-expired/page.tsx
│   │
│   ├── (dashboard)/              # Authenticated route group (with shell)
│   │   ├── layout.tsx            # App shell: ShellProvider + Sidebar + Topbar
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Generic dashboard (redirects / placeholder)
│   │   │   ├── employee/page.tsx
│   │   │   ├── supervisor/page.tsx
│   │   │   ├── hr-finance/page.tsx
│   │   │   └── admin/page.tsx
│   │   ├── employees/page.tsx    # Stub — Sprint 3
│   │   ├── time-tracking/page.tsx
│   │   ├── timesheets/page.tsx
│   │   ├── scrum/page.tsx
│   │   ├── kpi/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── payroll/page.tsx
│   │   ├── settings/page.tsx
│   │   └── access-denied/page.tsx
│   │
│   ├── sidebar-preview/          # Design preview pages (dev tool)
│   │   ├── page.tsx              # Hub — links to all 4 role previews
│   │   ├── employee/page.tsx
│   │   ├── supervisor/page.tsx
│   │   ├── hr-finance/page.tsx
│   │   ├── admin/page.tsx
│   │   └── _components/role-preview.tsx
│   │
│   ├── globals.css               # CSS variables, Tailwind directives
│   ├── layout.tsx                # Root layout: Inter font, ThemeProvider
│   ├── not-found.tsx             # Global 404 page
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── shared/                   # Reusable layout/UI primitives
│   │   ├── container.tsx         # Max-width wrapper with responsive padding
│   │   ├── dashboard-card.tsx    # Card with noPadding and hoverable variants
│   │   ├── empty-state.tsx       # Empty state with icon, title, actions
│   │   ├── error-state.tsx       # Error state with variants
│   │   ├── loading-skeleton.tsx  # Skeleton components (5 variants)
│   │   ├── page-header.tsx       # Page title + description + actions slot
│   │   └── section-header.tsx    # Section title + optional action
│   │
│   ├── ui/                       # shadcn/ui components (45+)
│   └── theme-provider.tsx        # next-themes wrapper
│
├── contexts/
│   └── shell-context.tsx         # Global ShellProvider (user, role, sidebar state)
│
├── features/
│   ├── auth/                     # Authentication feature
│   │   ├── components/
│   │   │   ├── auth-card.tsx     # Card wrapper + header
│   │   │   ├── auth-alert.tsx    # Error/success/info alert
│   │   │   ├── auth-logo.tsx     # TimeForge logo (3 sizes)
│   │   │   ├── password-input.tsx # Show/hide + strength meter
│   │   │   └── theme-toggle.tsx  # Dark/light toggle
│   │   ├── lib/
│   │   │   ├── mock-auth.ts      # Mock async auth service
│   │   │   └── validation.ts     # Zod schemas for all forms
│   │   └── types/index.ts        # Auth types & interfaces
│   │
│   └── dashboard/                # Dashboard feature
│       ├── components/
│       │   ├── sidebar.tsx       # Collapsible sidebar with Framer Motion
│       │   ├── topbar.tsx        # Header with breadcrumbs + user menu
│       │   ├── breadcrumbs.tsx   # Auto-generated from pathname
│       │   ├── role-badge.tsx    # Colored role indicator
│       │   ├── role-sync.tsx     # Syncs context role to URL
│       │   ├── welcome-banner.tsx
│       │   ├── stat-card.tsx     # KPI metric card
│       │   ├── activity-feed.tsx # Timeline activity list
│       │   ├── quick-actions.tsx # 2-col action grid
│       │   ├── weekly-hours-chart.tsx # Recharts bar chart
│       │   └── team-status.tsx   # Online/away/offline roster
│       ├── lib/
│       │   └── mock-dashboard.ts # Mock data per role
│       └── types/index.ts        # Dashboard types
│
├── lib/
│   ├── nav-config.ts             # Navigation items, groups, labels, redirects
│   └── utils.ts                  # cn() utility
│
└── hooks/
    └── use-toast.ts
```

---

## 4. Design System

### Color Palette

All colors use CSS custom properties (HSL format) defined in `globals.css`, supporting both light and dark mode.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--primary` | `214 89% 52%` | `214 89% 60%` | Brand blue, CTAs, active states |
| `--background` | `210 20% 98%` | `222 47% 7%` | Page background |
| `--card` | `0 0% 100%` | `222 40% 10%` | Card surfaces |
| `--foreground` | `215 25% 10%` | `210 20% 95%` | Primary text |
| `--muted` | `210 16% 93%` | `222 35% 15%` | Subtle backgrounds |
| `--muted-foreground` | `215 16% 47%` | `215 16% 55%` | Secondary text |
| `--border` | `214 20% 88%` | `222 30% 18%` | Borders, dividers |
| `--destructive` | `0 84% 60%` | `0 72% 51%` | Errors, danger |
| `--success` | `142 71% 45%` | same | Success states |
| `--warning` | `38 92% 50%` | same | Warning states |
| `--radius` | `0.625rem` | — | Base border radius |

### Typography

- **Font:** Inter (Google Fonts, variable), fallback: `system-ui, sans-serif`
- **Scale:** Uses Tailwind's default type scale
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Role Colors

| Role | Color |
|---|---|
| Employee | Blue (`bg-blue-500/10 text-blue-600`) |
| Supervisor | Purple (`bg-purple-500/10 text-purple-600`) |
| HR & Finance | Amber (`bg-amber-500/10 text-amber-600`) |
| Administrator | Red (`bg-red-500/10 text-red-600`) |

### Spacing & Sizing

- Border radius: `rounded-xl` (16px) for cards, `rounded-lg` (10px) for inputs/buttons
- Card padding: `p-5` (20px)
- Page padding: `px-4 md:px-6 lg:px-8 py-6 md:py-8`
- Max content width: `max-w-7xl mx-auto`

---

## 5. Application Shell

### Layout Structure

```
┌──────────────────────────────────────────────────────┐
│  Sidebar (240px)  │           Topbar (h-16)           │
│                   ├──────────────────────────────────│
│  Logo             │  Breadcrumbs  Search  🔔  Avatar  │
│  ─────────────    ├──────────────────────────────────│
│  WORKSPACE        │                                   │
│  ● Dashboard      │                                   │
│  ● Time Tracking  │           Page Content            │
│  ● Timesheets     │                                   │
│  ● Daily Scrum    │                                   │
│  ● KPI            │                                   │
│  ─────────────    │                                   │
│  MANAGEMENT       │                                   │
│  ● Employees      │                                   │
│  ─────────────    │                                   │
│  FINANCE          │                                   │
│  ● Payroll        │                                   │
│  ● Reports        │                                   │
│  ─────────────    │                                   │
│  SYSTEM           │                                   │
│  ● Notifications  │                                   │
│  ● Settings       │                                   │
│  ─────────────    │                                   │
│  Sign out         │                                   │
│  [Collapse ←]     │                                   │
└───────────────────┴───────────────────────────────────┘
```

### Sidebar

**File:** `features/dashboard/components/sidebar.tsx`

| Feature | Detail |
|---|---|
| Width | 240px expanded, 64px collapsed |
| Animation | Framer Motion width transition (250ms, cubic-bezier easing) |
| Collapse | Toggle button at bottom; state persisted in `ShellContext` |
| Logo | Full wordmark when expanded, icon-only when collapsed |
| Nav groups | Workspace / Management / Finance & Reports / System |
| Role filtering | Items filtered client-side by `user.role` from context |
| Active state | Blue fill (`bg-primary`) on current route via `usePathname()` |
| Badges | Red badge on Timesheets (3) and Notifications (5) |
| Collapsed tooltips | Radix `Tooltip` on each nav item when sidebar is collapsed |
| Mobile | Not rendered — replaced by `Sheet` drawer triggered by hamburger |
| Accessibility | `aria-label="Main navigation"`, `role="navigation"`, keyboard focusable links |

### Topbar

**File:** `features/dashboard/components/topbar.tsx`

| Feature | Detail |
|---|---|
| Left | Breadcrumbs (auto-generated from pathname) |
| Center | Search input (visual only, `max-w-72`) |
| Right | ThemeToggle → Notifications button → User avatar dropdown |
| Breadcrumbs | Built from URL segments, mapped to human labels via `BREADCRUMB_LABELS` |
| User dropdown | Name, email, role badge, Settings, Notifications, role switcher (demo), Sign out |
| Role switcher | Radio group sub-menu — switches `ShellContext` role and redirects |
| Notification badge | Red badge showing unread count (9+ capped) |
| Mobile | Hamburger button (visible `md:hidden`) opens mobile Sheet drawer |

### ShellContext

**File:** `contexts/shell-context.tsx`

Provides global state to all dashboard components:

```typescript
interface ShellContextValue {
  user: MockUser;            // current mock user object
  setRole: (role) => void;   // switch role (demo)
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v) => void;
  toggleSidebar: () => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v) => void;
  notificationCount: number;
}
```

Mock users are pre-defined for all 4 roles. `initialRole` prop allows sidebar preview pages to start with a specific role without affecting the main app.

---

## 6. Authentication Module

**Route group:** `app/(auth)/`  
**Layout:** `app/(auth)/layout.tsx` — header with logo + theme toggle, centered content, footer

### Auth Pages

| Route | Page | Key Behavior |
|---|---|---|
| `/login` | Sign In | Email + password, rememberMe, demo credential buttons, error redirect links |
| `/register` | Register | Full form: name, email, phone, department, job title, password + strength |
| `/forgot-password` | Forgot Password | Email → success state "check your inbox" |
| `/reset-password` | Reset Password | Token-based, requirement checklist |
| `/verify-email` | Verify Email | Stepper, resend with 3-attempt limit |
| `/pending-approval` | Pending | 4-step progress stepper |
| `/rejected` | Rejected | Reasons list, support + re-register CTAs |
| `/session-expired` | Session Expired | Timeout message, sign-in-again CTA |

### Auth Components

| Component | Purpose |
|---|---|
| `AuthCard` + `AuthCardHeader` | Card wrapper with consistent padding |
| `AuthAlert` | Error / success / info alert with icon |
| `AuthLogo` | Clock4 icon + "Time**Forge**" wordmark, sizes: sm/md/lg |
| `PasswordInput` | Input with show/hide toggle, optional 5-bar strength meter |
| `ThemeToggle` | Sun/Moon icon button using `next-themes` |

### Mock Auth Service

**File:** `features/auth/lib/mock-auth.ts`

All functions return `AuthResult<T>` (discriminated union: `{ success: true, data }` | `{ success: false, error }`).

| Function | Simulated Delay |
|---|---|
| `mockLogin(credentials)` | 1200ms |
| `mockRegister(data)` | 1200ms |
| `mockForgotPassword(data)` | 1200ms |
| `mockResetPassword(data)` | 1200ms |
| `mockResendVerification(email)` | 1200ms |

**Demo credentials** (password: `Password1!`):

| Email | Role |
|---|---|
| `employee@timeforge.com` | Employee |
| `supervisor@timeforge.com` | Supervisor |
| `hr@timeforge.com` | HR & Finance |
| `admin@timeforge.com` | Administrator |
| `pending@timeforge.com` | Pending approval |
| `rejected@timeforge.com` | Rejected |

---

## 7. Dashboard Module

### Role-Specific Dashboards

Each role has its own page at `/dashboard/{role}` with tailored content. A `<RoleSync role="...">` component on each page syncs the shell context so the sidebar shows the correct navigation.

| Route | User | Unique Content |
|---|---|---|
| `/dashboard/employee` | Alex Johnson | Hours, pending timesheets, leave balance, task count |
| `/dashboard/supervisor` | Morgan Chen | Team status panel (online/away/offline), team hours |
| `/dashboard/hr-finance` | Jordan Martinez | Total employees, monthly payroll, org-wide stats |
| `/dashboard/admin` | Riley Thompson | Total users, pending registrations, system uptime |

### Dashboard Components

| Component | Purpose |
|---|---|
| `WelcomeBanner` | Greeting + date + live clock |
| `StatCard` | KPI card with trend arrow and skeleton loading |
| `WeeklyHoursChart` | Recharts `BarChart` with 8h reference line |
| `ActivityFeed` | Timeline with avatar, actor, description, relative time |
| `QuickActions` | 2-column grid of action links with color-coded icons |
| `TeamStatus` | Member list with online/away/offline dot indicators |
| `RoleBadge` | Colored pill badge showing role name + icon |
| `RoleSync` | Invisible component that syncs URL role to context |

### Mock Dashboard Service

**File:** `features/dashboard/lib/mock-dashboard.ts`

```typescript
getEmployeeDashboard()   → Promise<DashboardData>  // 600ms delay
getSupervisorDashboard() → Promise<DashboardData>
getHrFinanceDashboard()  → Promise<DashboardData>
getAdminDashboard()      → Promise<DashboardData>
```

---

## 8. Shared Components

**Location:** `components/shared/`

| Component | Props | Purpose |
|---|---|---|
| `Container` | `fluid?`, `className?` | Max-width wrapper (`max-w-7xl`) with responsive padding |
| `PageHeader` | `title`, `description?`, `children?` (actions) | Page-level header with flex layout |
| `SectionHeader` | `title`, `description?`, `action?` | Section-level header inside cards |
| `DashboardCard` | `noPadding?`, `hoverable?` | Base card with `rounded-xl border bg-card` |
| `DashboardCardHeader` | `className?` | Header section with `mb-4` |
| `DashboardCardBody` | `className?` | Body section |
| `EmptyState` | `icon?`, `title`, `description?`, `action?`, `size?` | Empty placeholder with 3 size variants |
| `ErrorState` | `variant?`, `title?`, `description?`, `onRetry?` | Error display (generic/network/unauthorized/notFound) |
| `Skeleton` | `className?` | Base skeleton element (`animate-pulse bg-muted`) |
| `StatCardSkeleton` | — | Pre-built stat card loading state |
| `TableSkeleton` | `rows?`, `columns?` | Table loading state with avatar column |
| `CardSkeleton` | `lines?` | Card loading state with heading + lines |
| `ActivitySkeleton` | `rows?` | Activity feed loading state |
| `PageSkeleton` | — | Full page loading state |

---

## 9. Navigation & Routing

### Nav Configuration

**File:** `lib/nav-config.ts` — single source of truth for all navigation.

```typescript
// Nav groups per section
type NavGroup = 'main' | 'management' | 'finance' | 'system';

// Group labels
{
  main: 'Workspace',
  management: 'Management',
  finance: 'Finance & Reports',
  system: 'System'
}
```

### Role-Filtered Navigation

| Nav Item | Employee | Supervisor | HR/Finance | Admin |
|---|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Time Tracking | ✅ | ✅ | ✅ | ✅ |
| Timesheets | ✅ | ✅ | ✅ | ✅ |
| Daily Scrum | ✅ | ✅ | — | ✅ |
| KPI | ✅ | ✅ | ✅ | ✅ |
| Employees | — | ✅ | ✅ | ✅ |
| Approvals | — | — | — | ✅ |
| Payroll | — | — | ✅ | ✅ |
| Reports | — | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ | ✅ |
| Admin Panel | — | — | — | ✅ |

### Breadcrumb Mapping

URL segments are mapped to human labels via `BREADCRUMB_LABELS`:

```
/dashboard/hr-finance → Home › Dashboard › HR & Finance View
/timesheets           → Home › Timesheets
```

### Role Redirects

```typescript
const ROLE_REDIRECT = {
  employee:   '/dashboard/employee',
  supervisor: '/dashboard/supervisor',
  hr_finance: '/dashboard/hr-finance',
  admin:      '/dashboard/admin',
};
```

---

## 10. State Management

| Concern | Solution |
|---|---|
| Shell state (user, role, sidebar) | `ShellContext` via React Context |
| Form state | React Hook Form + Zod |
| Server data (future) | TanStack Query |
| Auth session (future) | Supabase Auth + Context |
| Theme | `next-themes` |

No global state library (Redux, Zustand) — complexity does not yet warrant it.

---

## 11. Mock Services

The project uses a **frontend-only mock layer**. No backend is implemented. All service functions:

- Are `async` with a configurable delay (simulates real API latency)
- Return typed results using discriminated unions (`AuthResult<T>`, `Promise<DashboardData>`)
- Are located in `features/{module}/lib/mock-*.ts`
- Can be replaced with real API calls by swapping the implementation

```
features/auth/lib/mock-auth.ts       → Replace with Supabase Auth
features/dashboard/lib/mock-dashboard.ts → Replace with tRPC / REST / GraphQL
```

---

## 12. Role System

### User Roles

```typescript
type UserRole = 'employee' | 'supervisor' | 'hr_finance' | 'admin';
```

### Permissions Model (Frontend)

Role-based access is handled entirely client-side for the mock phase:

1. **Navigation filtering** — `getNavGroups(role)` in `nav-config.ts`
2. **Dashboard content** — separate page per role (`/dashboard/employee`, etc.)
3. **Sidebar sync** — `<RoleSync role="...">` on each page syncs context
4. **Role switcher** — demo tool in topbar user menu (dev/demo only)

When connecting to a real backend, authorization should be enforced server-side. The frontend role system becomes a UI hint only.

### MockUser per Role

```typescript
MOCK_USERS = {
  employee:   { name: 'Alex Johnson',   dept: 'Engineering', title: 'Software Engineer' },
  supervisor: { name: 'Morgan Chen',    dept: 'Engineering', title: 'Engineering Manager' },
  hr_finance: { name: 'Jordan Martinez',dept: 'Human Resources', title: 'HR Manager' },
  admin:      { name: 'Riley Thompson', dept: 'IT', title: 'System Administrator' },
}
```

---

## 13. Responsive Design

**Strategy:** Desktop-first. All layouts use Tailwind's responsive prefixes.

| Breakpoint | Behavior |
|---|---|
| `< md` (mobile) | Sidebar hidden; hamburger button shows; Sheet drawer on open |
| `md – lg` (tablet) | Sidebar visible, may collapse; grid switches to 2-col |
| `≥ lg` (desktop) | Full sidebar + full grid layouts |

### Key Responsive Patterns

```tsx
// Sidebar: hidden on mobile, shown on desktop
<div className="hidden md:flex h-full">
  <Sidebar />
</div>

// Grid: 1-col mobile, 3-col desktop
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// Stat cards: 2-col mobile, 4-col desktop
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

// Text: hidden on small screens
<p className="hidden md:block">
```

---

## 14. Accessibility

| Feature | Implementation |
|---|---|
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<aside>` with `role` and `aria-label` |
| Keyboard navigation | All interactive elements are focusable; `focus-visible:ring-2` styles |
| ARIA labels | `aria-label` on icon-only buttons, `aria-current="page"` on active breadcrumb |
| Screen reader hints | `role="alert"` on error states, `role="status"` on empty states |
| Color contrast | Primary blue on white meets WCAG AA; tested in both modes |
| Skip navigation | `id="main-content"` on `<main>` for skip-link support |
| Tooltip fallback | All collapsed sidebar items have `Tooltip` with full label |

> **Note:** Full WCAG compliance requires manual testing with assistive technologies (VoiceOver, NVDA) and expert review.

---

## 15. Dark Mode

Implemented via `next-themes` with CSS custom property switching.

| Mechanism | Detail |
|---|---|
| Strategy | `class` strategy — toggles `dark` class on `<html>` |
| Default | `system` (follows OS preference) |
| Toggle | `ThemeToggle` component in both auth layout and dashboard topbar |
| CSS vars | All colors defined as HSL values in `globals.css` for both `:root` and `.dark` |
| Framer Motion | Animations use `var()` references so they respond correctly to theme changes |
| No flash | `suppressHydrationWarning` on `<html>` prevents hydration mismatch |

---

## 16. Sprint Roadmap

```
Sprint 1  ✅  Dashboard module (KPI cards, charts, activity, quick actions)
Sprint 2  ✅  Application shell (sidebar, topbar, breadcrumbs, shared components)
Sprint 3  🔜  Employee Management (directory, add/edit/deactivate, role assignment)
Sprint 4  🔜  Time Tracking (clock in/out, live timer, manual entry)
Sprint 5  🔜  Timesheets (submit, review, approve workflow)
Sprint 6  🔜  Daily Scrum (async standup board, blocker tracking)
Sprint 7  🔜  KPI & Reports (metrics, charts, CSV export)
Sprint 8  🔜  Payroll (processing, pay stubs, history)
Sprint 9  🔜  Notifications (real-time alerts, preferences)
Sprint 10 🔜  User Settings (profile, security, preferences)
```

Each sprint is independently runnable and never modifies completed modules unless integration requires it.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
http://localhost:3000

# Key demo URLs
http://localhost:3000/login
http://localhost:3000/dashboard/employee
http://localhost:3000/dashboard/supervisor
http://localhost:3000/dashboard/hr-finance
http://localhost:3000/dashboard/admin
http://localhost:3000/sidebar-preview
http://localhost:3000/sidebar-preview/admin
```

**Demo login:** Any email from the table in section 6, password `Password1!`

---

*This document is updated at the end of each sprint. Backend integration points are marked with `(future)` and the corresponding service file to replace.*
