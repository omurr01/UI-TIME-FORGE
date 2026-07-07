import { addDays, subDays, startOfDay, addHours, addMinutes, isWeekend, format } from 'date-fns';
import { TimeEntry, CurrentSession, MOCK_PROJECTS, MOCK_TASKS, ShiftType, TimeStatus, EntrySource } from '../types';
import { mockEmployees } from '../../employees/mocks/employees';

// Helper to generate a deterministically random number
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateMockData(): { entries: TimeEntry[], session: CurrentSession | null } {
  const entries: TimeEntry[] = [];
  const employees = mockEmployees.slice(0, 10); // Pick 10 employees
  const today = startOfDay(new Date());

  let idCounter = 1;

  for (let i = 0; i < 20; i++) {
    // Generate data for the past 20 days
    const currentDate = subDays(today, i);
    
    // Skip some weekends but not all
    if (isWeekend(currentDate) && i % 3 !== 0) continue;

    for (let j = 0; j < employees.length; j++) {
      const emp = employees[j];
      const seed = i * 100 + j;
      const r = seededRandom(seed);
      
      // Some employees might be absent on some days
      if (r < 0.1) continue;

      const dateStr = format(currentDate, 'yyyy-MM-dd');
      
      let shift: ShiftType = 'flexible';
      if (r > 0.8) shift = 'night';
      else if (r > 0.6) shift = 'morning';
      else if (r > 0.4) shift = 'afternoon';

      // Base clock in (around 9 AM)
      let clockInTime = addHours(currentDate, 9);
      
      // Variance in clock in (-30 to +60 minutes)
      const clockInVariance = Math.floor(seededRandom(seed + 1) * 90) - 30;
      clockInTime = addMinutes(clockInTime, clockInVariance);

      // Night shift starts at 8 PM
      if (shift === 'night') {
        clockInTime = addHours(currentDate, 20);
      }

      // Base clock out (around 5 PM / 8 hours later)
      let clockOutTime = addHours(clockInTime, 8);
      
      // Variance in clock out (-120 to +180 minutes) -> half days or overtime
      const clockOutVariance = Math.floor(seededRandom(seed + 2) * 300) - 120;
      clockOutTime = addMinutes(clockOutTime, clockOutVariance);

      // Break handling (usually 1 hour in the middle)
      const hasBreak = r < 0.9 && clockOutVariance > -100; // Almost everyone has a break unless very early clock out
      let breakStart = addHours(clockInTime, 4);
      let breakDurationMinutes = 60;
      
      if (r < 0.2) breakDurationMinutes = 30;
      else if (r > 0.8) breakDurationMinutes = 90;

      let breakEnd = addMinutes(breakStart, breakDurationMinutes);

      const totalMinutes = (clockOutTime.getTime() - clockInTime.getTime()) / 1000 / 60;
      const totalBreakMinutes = hasBreak ? breakDurationMinutes : 0;
      const totalWorkingMinutes = Math.max(0, totalMinutes - totalBreakMinutes);
      
      const regularMinutes = Math.min(8 * 60, totalWorkingMinutes);
      const overtimeMinutes = Math.max(0, totalWorkingMinutes - 8 * 60);

      // Projects and tasks
      const projIdx = Math.floor(seededRandom(seed + 3) * MOCK_PROJECTS.length);
      const project = MOCK_PROJECTS[projIdx];
      const taskIdx = Math.floor(seededRandom(seed + 4) * MOCK_TASKS.length);
      const task = MOCK_TASKS[taskIdx];

      // Status
      let status: TimeStatus = 'completed';
      if (r < 0.05) status = 'rejected';
      else if (r < 0.15) status = 'pending_approval';

      let source: EntrySource = 'live_timer';
      if (r > 0.8) source = 'manual';
      else if (r > 0.95) source = 'system_adjustment';

      entries.push({
        id: `te-${idCounter++}`,
        employeeId: emp.id,
        employee: emp,
        date: dateStr,
        clockIn: clockInTime.toISOString(),
        clockOut: clockOutTime.toISOString(),
        breaks: hasBreak ? [
          {
            id: `b-${idCounter}-1`,
            startTime: breakStart.toISOString(),
            endTime: breakEnd.toISOString(),
            durationMinutes: breakDurationMinutes,
          }
        ] : [],
        totalWorkingMinutes,
        totalBreakMinutes,
        regularMinutes,
        overtimeMinutes,
        projectId: project.id,
        projectName: project.name,
        taskId: task.id,
        taskName: task.name,
        description: source === 'manual' ? 'Forgot to clock in' : undefined,
        remarks: status === 'rejected' ? 'Invalid entry time' : undefined,
        location: r > 0.5 ? 'HQ Office' : 'Remote',
        status,
        source,
        shift,
        createdAt: clockInTime.toISOString(),
        updatedAt: clockOutTime.toISOString(),
      });
    }
  }

  // Generate a Current Session for a specific mocked user (emp-0076 or first user)
  const currentEmp = employees[0];
  const clockInToday = addHours(today, 9);
  
  const currentSession: CurrentSession = {
    id: `cs-${Date.now()}`,
    employeeId: currentEmp.id,
    clockIn: clockInToday.toISOString(),
    currentBreakStart: null,
    projectId: MOCK_PROJECTS[0].id,
    projectName: MOCK_PROJECTS[0].name,
    taskId: MOCK_TASKS[0].id,
    taskName: MOCK_TASKS[0].name,
    status: 'working',
    location: 'HQ Office',
    shift: 'flexible',
  };

  return { entries: entries.sort((a, b) => new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime()), session: currentSession };
}

const generated = generateMockData();

export const mockTimeEntries = generated.entries;
export const mockCurrentSession = generated.session;
