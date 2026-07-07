import type { 
  TimeEntry, 
  CurrentSession, 
  DashboardSummary, 
  TimeFilters, 
  ShiftType,
} from '../types';
import { mockTimeEntries, mockCurrentSession, MOCK_PROJECTS, MOCK_TASKS } from '../mocks/time-tracking.mocks';
import { startOfDay, endOfDay, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, differenceInMinutes } from 'date-fns';

let entriesStore: TimeEntry[] = [...mockTimeEntries];
let currentSessionStore: CurrentSession | null = mockCurrentSession;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(): Promise<void> {
  return delay(300 + Math.random() * 300);
}

export const TimeTrackingService = {
  async getDashboard(employeeId?: string): Promise<DashboardSummary> {
    await randomDelay();
    const now = new Date();
    const today = startOfDay(now);
    
    // Filter entries for current employee if provided, otherwise aggregate
    const employeeEntries = employeeId 
      ? entriesStore.filter(e => e.employeeId === employeeId) 
      : entriesStore;

    const todayEntries = employeeEntries.filter(e => 
      isWithinInterval(parseISO(e.date), { start: today, end: endOfDay(now) })
    );

    const weekEntries = employeeEntries.filter(e => 
      isWithinInterval(parseISO(e.date), { start: startOfWeek(now), end: endOfWeek(now) })
    );

    const monthEntries = employeeEntries.filter(e => 
      isWithinInterval(parseISO(e.date), { start: startOfMonth(now), end: endOfMonth(now) })
    );

    const sumHours = (ents: TimeEntry[]) => ents.reduce((acc, curr) => acc + (curr.totalWorkingMinutes / 60), 0);
    const sumOvertime = (ents: TimeEntry[]) => ents.reduce((acc, curr) => acc + (curr.overtimeMinutes / 60), 0);

    let currentStatus: DashboardSummary['currentStatus'] = 'not_working';
    let currentShift: ShiftType | null = null;

    if (currentSessionStore && (!employeeId || currentSessionStore.employeeId === employeeId)) {
      currentStatus = currentSessionStore.status;
      currentShift = currentSessionStore.shift;
    }

    // Add ongoing session to today's hours dynamically
    let ongoingMinutes = 0;
    if (currentSessionStore && currentSessionStore.status === 'working') {
       ongoingMinutes = differenceInMinutes(now, parseISO(currentSessionStore.clockIn));
       // simple approx: subtract break if there is one (omitted for brevity)
    }

    return {
      todayHours: sumHours(todayEntries) + (ongoingMinutes / 60),
      weeklyHours: sumHours(weekEntries) + (ongoingMinutes / 60),
      monthlyHours: sumHours(monthEntries) + (ongoingMinutes / 60),
      overtimeHours: sumOvertime(monthEntries),
      currentStatus,
      currentShift,
      recentEntries: employeeEntries.slice(0, 5),
      upcomingShift: {
        date: new Date().toISOString(),
        shift: 'morning',
        startTime: '09:00',
      },
    };
  },

  async getCurrentSession(employeeId?: string): Promise<CurrentSession | null> {
    await randomDelay();
    if (employeeId && currentSessionStore?.employeeId !== employeeId) return null;
    return currentSessionStore ? { ...currentSessionStore } : null;
  },

  async clockIn(employeeId: string, projectId: string, taskId?: string): Promise<CurrentSession> {
    await randomDelay();
    if (currentSessionStore) {
      throw new Error('Already clocked in');
    }

    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    const task = taskId ? MOCK_TASKS.find(t => t.id === taskId) : undefined;

    const session: CurrentSession = {
      id: `cs-${Date.now()}`,
      employeeId,
      clockIn: new Date().toISOString(),
      currentBreakStart: null,
      projectId,
      projectName: project?.name || 'Unknown Project',
      taskId,
      taskName: task?.name,
      status: 'working',
      location: 'Office',
      shift: 'flexible',
    };

    currentSessionStore = session;
    return { ...session };
  },

  async clockOut(): Promise<TimeEntry> {
    await randomDelay();
    if (!currentSessionStore) {
      throw new Error('No active session to clock out from');
    }

    if (currentSessionStore.status === 'on_break') {
      throw new Error('Cannot clock out while on break. End break first.');
    }

    const clockOutTime = new Date();
    const clockInTime = parseISO(currentSessionStore.clockIn);
    const totalWorkingMinutes = differenceInMinutes(clockOutTime, clockInTime);

    const entry: TimeEntry = {
      id: `te-${Date.now()}`,
      employeeId: currentSessionStore.employeeId,
      date: startOfDay(clockInTime).toISOString().split('T')[0],
      clockIn: currentSessionStore.clockIn,
      clockOut: clockOutTime.toISOString(),
      breaks: [], // Simplification for mock
      totalWorkingMinutes,
      totalBreakMinutes: 0,
      regularMinutes: Math.min(8 * 60, totalWorkingMinutes),
      overtimeMinutes: Math.max(0, totalWorkingMinutes - 8 * 60),
      projectId: currentSessionStore.projectId,
      projectName: currentSessionStore.projectName,
      taskId: currentSessionStore.taskId,
      taskName: currentSessionStore.taskName,
      status: 'completed',
      source: 'live_timer',
      shift: currentSessionStore.shift,
      createdAt: clockInTime.toISOString(),
      updatedAt: clockOutTime.toISOString(),
    };

    entriesStore = [entry, ...entriesStore];
    currentSessionStore = null;

    return { ...entry };
  },

  async startBreak(): Promise<CurrentSession> {
    await randomDelay();
    if (!currentSessionStore) throw new Error('No active session');
    if (currentSessionStore.status === 'on_break') throw new Error('Already on break');

    currentSessionStore = {
      ...currentSessionStore,
      status: 'on_break',
      currentBreakStart: new Date().toISOString(),
    };

    return { ...currentSessionStore };
  },

  async endBreak(): Promise<CurrentSession> {
    await randomDelay();
    if (!currentSessionStore) throw new Error('No active session');
    if (currentSessionStore.status !== 'on_break') throw new Error('Not on break');

    // In a real app, we'd record the break duration here.
    currentSessionStore = {
      ...currentSessionStore,
      status: 'working',
      currentBreakStart: null,
    };

    return { ...currentSessionStore };
  },

  async getTimeEntries(filters?: Partial<TimeFilters>): Promise<TimeEntry[]> {
    await randomDelay();
    let result = [...entriesStore];

    if (filters) {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(e => 
          e.projectName.toLowerCase().includes(q) || 
          e.employee?.fullName.toLowerCase().includes(q)
        );
      }
      if (filters.status && filters.status !== 'all') {
        result = result.filter(e => e.status === filters.status);
      }
      // other filters omitted for brevity
    }

    return result;
  },

  async getEntry(id: string): Promise<TimeEntry> {
    await randomDelay();
    const entry = entriesStore.find(e => e.id === id);
    if (!entry) throw new Error('Entry not found');
    return { ...entry };
  },
};
