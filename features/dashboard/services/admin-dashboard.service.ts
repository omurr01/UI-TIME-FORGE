import type {
  AdminStat,
  AdminActivity,
  AdminNotification,
  UpcomingEvent,
  AdminChartData,
} from '../types/admin';
import {
  adminStats,
  adminActivities,
  adminNotifications,
  upcomingEvents,
  weeklyProductivity,
  employeeGrowth,
  timesheetTrend,
} from '../mocks';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(): Promise<void> {
  const ms = 400 + Math.floor(Math.random() * 300);
  return delay(ms);
}

export async function getDashboardStats(): Promise<AdminStat[]> {
  await randomDelay();
  return adminStats;
}

export async function getRecentActivities(): Promise<AdminActivity[]> {
  await randomDelay();
  return adminActivities;
}

export async function getNotifications(): Promise<AdminNotification[]> {
  await randomDelay();
  return adminNotifications;
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  await randomDelay();
  return upcomingEvents;
}

export async function getDashboardCharts(): Promise<AdminChartData> {
  await randomDelay();
  return {
    weeklyProductivity,
    employeeGrowth,
    timesheetTrend,
  };
}
