'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { PageHeader } from '@/components/shared/page-header';
import { FormSection } from '../../employees/components/shared/form-section';
import { FormGrid } from '../../employees/components/shared/form-grid';
import { timeEntrySchema, type TimeEntryFormValues, defaultTimeEntryValues } from '../schemas/time-entry.schema';
import { MOCK_PROJECTS, MOCK_TASKS, SHIFT_LABELS, TIME_STATUS_LABELS } from '../types';
import { mockEmployees } from '../../employees/mocks/employees';

export function ManualEntryForm() {
  const router = useRouter();

  const form = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: defaultTimeEntryValues,
  });

  const onSubmit = async (values: TimeEntryFormValues) => {
    try {
      // In a real app, we'd call createManualEntry mutation here
      // await createMutation.mutateAsync(values);
      console.log('Submitted values:', values);
      toast.success('Manual time entry created successfully');
      router.push('/time-tracking/history');
    } catch (error) {
      toast.error('Failed to create manual entry');
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Manual Time Entry"
        description="Add a time entry manually for yourself or an employee."
      >
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          <Save className="mr-2 h-4 w-4" />
          Save Entry
        </Button>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card border border-border rounded-xl p-6 lg:p-8">
          
          <FormSection title="Employee & Date" description="Select the employee and work date." separator={false}>
            <FormGrid>
              <FormField control={form.control} name="employeeId" render={({ field }) => (
                <FormItem><FormLabel>Employee *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {mockEmployees.slice(0, 20).map(e => <SelectItem key={e.id} value={e.id}>{e.fullName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          <FormSection title="Time Details" description="Clock in, out, and break times.">
            <FormGrid cols={2}>
              <FormField control={form.control} name="clockInTime" render={({ field }) => (
                <FormItem><FormLabel>Clock In *</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="clockOutTime" render={({ field }) => (
                <FormItem><FormLabel>Clock Out</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="breakStartTime" render={({ field }) => (
                <FormItem><FormLabel>Break Start</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="breakEndTime" render={({ field }) => (
                <FormItem><FormLabel>Break End</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          <FormSection title="Work Information" description="Project, task, and location.">
            <FormGrid cols={2}>
              <FormField control={form.control} name="projectId" render={({ field }) => (
                <FormItem><FormLabel>Project *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {MOCK_PROJECTS.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="taskId" render={({ field }) => (
                <FormItem><FormLabel>Task</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select task" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {MOCK_TASKS.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="shift" render={({ field }) => (
                <FormItem><FormLabel>Shift</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select shift" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(SHIFT_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(TIME_STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Location</FormLabel><FormControl><Input placeholder="Office, Remote, etc." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          <FormSection title="Notes" description="Additional descriptions or remarks.">
            <FormGrid cols={1}>
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="What was worked on..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="remarks" render={({ field }) => (
                <FormItem><FormLabel>Remarks / Justification</FormLabel><FormControl><Textarea placeholder="Reason for manual entry..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </FormGrid>
          </FormSection>

          <div className="flex justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Save Entry</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
