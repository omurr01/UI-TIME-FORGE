'use client';

import { useState } from 'react';
import { Play, Square, Pause, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimerDisplay } from '../../../components/shared/time-tracking/timer-display';
import { WorkingStatusBadge } from '../../../components/shared/time-tracking/time-badges';
import { useTimer } from '../hooks/use-timer';
import { useCurrentSession, useClockIn, useClockOut, useStartBreak, useEndBreak } from '../hooks/use-time-tracking';
import { MOCK_PROJECTS, MOCK_TASKS } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConfirmationDialog } from '../../employees/components/shared/confirmation-dialog';
import { toast } from 'sonner';

export function LiveTimer() {
  // Use mock employee ID for now
  const empId = 'emp-0076';
  const { data: session, isLoading } = useCurrentSession(empId);
  const clockInMutation = useClockIn();
  const clockOutMutation = useClockOut();
  const startBreakMutation = useStartBreak();
  const endBreakMutation = useEndBreak();

  const [projectId, setProjectId] = useState(MOCK_PROJECTS[0].id);
  const [taskId, setTaskId] = useState('');
  
  const [showClockOutDialog, setShowClockOutDialog] = useState(false);

  const isWorking = session?.status === 'working';
  const isOnBreak = session?.status === 'on_break';
  const hasSession = !!session;

  const timerStart = isOnBreak ? session.currentBreakStart : session?.clockIn;
  const { formattedHours, formattedMinutes, formattedSeconds } = useTimer(timerStart, hasSession);

  const handleClockIn = async () => {
    try {
      await clockInMutation.mutateAsync({ empId, projectId, taskId });
      toast.success('Successfully clocked in.');
    } catch (e: any) {
      toast.error(e.message || 'Failed to clock in');
    }
  };

  const handleClockOut = async () => {
    try {
      await clockOutMutation.mutateAsync();
      toast.success('Successfully clocked out.');
      setShowClockOutDialog(false);
    } catch (e: any) {
      toast.error(e.message || 'Failed to clock out');
    }
  };

  const toggleBreak = async () => {
    try {
      if (isWorking) {
        await startBreakMutation.mutateAsync();
        toast.success('Break started.');
      } else if (isOnBreak) {
        await endBreakMutation.mutateAsync();
        toast.success('Break ended, resumed working.');
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to toggle break');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading timer state...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-card rounded-3xl p-8 border border-border shadow-xl text-center space-y-10 relative overflow-hidden">
        
        {/* Status Indicator */}
        <div className="flex justify-center">
          <WorkingStatusBadge status={session?.status || 'completed'} className="px-4 py-1.5 text-sm" />
        </div>

        {/* Timer Display */}
        <TimerDisplay 
          hours={formattedHours} 
          minutes={formattedMinutes} 
          seconds={formattedSeconds} 
          isRunning={hasSession}
          isBreak={isOnBreak}
        />

        {/* Project Selection (only if not running) */}
        {!hasSession && (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground ml-1">Project</label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PROJECTS.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground ml-1">Task</label>
              <Select value={taskId} onValueChange={setTaskId}>
                <SelectTrigger>
                  <SelectValue placeholder="Task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Task</SelectItem>
                  {MOCK_TASKS.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {hasSession && (
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{session.projectName}</span>
            {session.taskName && <span> • {session.taskName}</span>}
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 pt-4 border-t border-border/50">
          {!hasSession ? (
            <Button size="lg" className="h-16 px-12 text-lg rounded-full shadow-lg shadow-primary/20" onClick={handleClockIn} disabled={clockInMutation.isPending}>
              <Play className="mr-3 h-6 w-6" />
              Clock In
            </Button>
          ) : (
            <>
              <Button 
                size="lg" 
                variant={isOnBreak ? 'default' : 'secondary'} 
                className="h-16 px-8 text-lg rounded-full shadow-lg transition-all"
                onClick={toggleBreak}
                disabled={startBreakMutation.isPending || endBreakMutation.isPending}
              >
                {isOnBreak ? <PlayCircle className="mr-3 h-6 w-6" /> : <Pause className="mr-3 h-6 w-6" />}
                {isOnBreak ? 'End Break' : 'Start Break'}
              </Button>
              <Button 
                size="lg" 
                variant="destructive" 
                className="h-16 px-8 text-lg rounded-full shadow-lg shadow-destructive/20"
                onClick={() => setShowClockOutDialog(true)}
                disabled={isOnBreak || clockOutMutation.isPending}
              >
                <Square className="mr-3 h-6 w-6" />
                Clock Out
              </Button>
            </>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={showClockOutDialog}
        onOpenChange={setShowClockOutDialog}
        title="Clock Out"
        description="Are you sure you want to clock out for the day?"
        confirmLabel="Yes, Clock Out"
        onConfirm={handleClockOut}
        isPending={clockOutMutation.isPending}
      />
    </div>
  );
}
