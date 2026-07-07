/**
 * Admin Dashboard Service — Frontend Interface
 *
 * All functions currently return mock data.
 * Replace the mock imports with real API calls (tRPC / REST / Supabase)
 * when the backend is ready. Keep the return types and signatures unchanged.
 */

import type {
  AdminStatCard,
  AdminActivity,
  AdminNotification,
  UpcomingEvent,
  SystemStatusItem,
  AdminDashboardData,
} from '@/features/admin/types';

import { mockAdminStats } from '../../mocks/dashboard/stats';
import { mockActivities } from '../../mocks/dashboard/activities';
import { mockNotifications } from '../../mocks/dashboard/notifications';
import { mockEvents } from '../../mocks/dashboard/events';

// ─── System status mock ───────────────────────────────────────────────────────

const mockSystemStatus: SystemStatusItem[] = [
  {
    id: 'auth',
    name: 'Authentication',
    status: 'operational',
    uptime: '99.98%',
    latency: '42ms',
    lastChecked: new Date(Date.now() - 60 * 1000).toISOString(),
  },
  {
    id: 'database',
    name: 'Database',
    status: 'operational',
    uptime: '99.95%',
    latency: '18ms',
    lastChecked: new Date(Date.now() - 60 * 1000).toISOString(),
  },
  {
    id: 'storage',
    name: 'Storage',
    status: 'operational',
    uptime: '99.99%',
    latency: '24ms',
    lastChecked: new Date(Date.now() - 60 * 1000).toISOString(),
  },
  {
    id: 'notifications',
    name: 'Notifications',
    status: 'degraded',
    uptime: '98.70%',
    latency: '210ms',
    lastChecked: new Date(Date.now() - 60 * 1000).toISOString(),
  },
  {
    id: 'api',
    name: 'API Gateway',
    status: 'operational',
    uptime: '99.92%',
    latency: '56ms',
    lastChecked: new Date(Date.now() - 60 * 1000).toISOString(),
  },
];

// ─── Simulated delay ──────────────────────────────────────────────────────────

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// ─── Service functions ────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<AdminStatCard[]> {
  await delay(600);
  return mockAdminStats;
}

export async function getRecentActivities(limit = 8): Promise<AdminActivity[]> {
  await delay(500);
  return mockActivities.slice(0, limit);
}

export async function getNotifications(limit = 6): Promise<AdminNotification[]> {
  await delay(400);
  return mockNotifications.slice(0, limit);
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  await delay(350);
  return mockEvents;
}

export async function getSystemStatus(): Promise<SystemStatusItem[]> {
  await delay(300);
  return mockSystemStatus;
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  await delay(700);
  return {
    stats: mockAdminStats,
    activities: mockActivities,
    notifications: mockNotifications,
    events: mockEvents,
    systemStatus: mockSystemStatus,
  };
}
