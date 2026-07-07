'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Building2, Briefcase, CalendarDays, Key, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useEmployee } from '../hooks/use-employees';
import { AvatarCell } from './shared/avatar-cell';
import { StatusBadge } from './shared/status-badge';
import { RoleBadge } from './shared/role-badge';
import { SectionCard } from './shared/section-card';
import { InformationCard, type InfoItem } from './shared/information-card';
import { Timeline } from './shared/timeline';
import { EMPLOYMENT_TYPE_LABELS } from '../types';
import { format } from 'date-fns';

export function EmployeeDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: employee, isLoading, error } = useEmployee(id);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading employee data...</div>;
  }

  if (error || !employee) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-destructive">Employee not found or an error occurred.</p>
        <Button onClick={() => router.push('/employees')} variant="outline">
          Back to Employees
        </Button>
      </div>
    );
  }

  const personalInfo: InfoItem[] = [
    { label: 'Full Name', value: employee.fullName, icon: Users },
    { label: 'Email', value: <a href={`mailto:${employee.email}`} className="text-primary hover:underline">{employee.email}</a>, icon: Mail },
    { label: 'Phone', value: employee.phone, icon: Phone },
    { label: 'Location', value: `${employee.address.city}, ${employee.address.country}`, icon: MapPin },
  ];

  const employmentInfo: InfoItem[] = [
    { label: 'Employee ID', value: employee.employeeId, icon: Key },
    { label: 'Department', value: employee.department.name, icon: Building2 },
    { label: 'Position', value: employee.position.title, icon: Briefcase },
    { label: 'Hire Date', value: format(new Date(employee.hireDate), 'MMMM d, yyyy'), icon: CalendarDays },
    { label: 'Employment Type', value: EMPLOYMENT_TYPE_LABELS[employee.employmentType] },
    { label: 'Manager', value: employee.managerName || 'None' },
  ];

  const addressInfo: InfoItem[] = [
    { label: 'Street', value: employee.address.street },
    { label: 'City', value: employee.address.city },
    { label: 'State/Province', value: employee.address.state },
    { label: 'ZIP Code', value: employee.address.zipCode },
    { label: 'Country', value: employee.address.country },
  ];

  const emergencyInfo: InfoItem[] = [
    { label: 'Contact Name', value: employee.emergencyContact.name },
    { label: 'Relationship', value: employee.emergencyContact.relationship },
    { label: 'Phone', value: employee.emergencyContact.phone, icon: Phone },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
          <AvatarCell employee={employee} size="lg" showEmail={false} className="scale-150 transform origin-center md:origin-top-left mb-4 md:mb-0" />
          <div className="space-y-3 mt-4 md:mt-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{employee.fullName}</h1>
              <p className="text-muted-foreground">{employee.position.title} • {employee.department.name}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <StatusBadge status={employee.employmentStatus} type="employment" />
              <StatusBadge status={employee.accountStatus} type="account" />
              <RoleBadge role={employee.role} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={() => router.push('/employees')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => router.push(`/employees/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card border border-border w-full justify-start h-auto p-1 overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview" className="py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="personal" className="py-2.5">Personal & Contact</TabsTrigger>
          <TabsTrigger value="activity" className="py-2.5">Activity History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 focus-visible:outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SectionCard title="Employment Information" icon={Briefcase}>
                <InformationCard items={employmentInfo} columns={2} />
              </SectionCard>
              
              {employee.notes && (
                <SectionCard title="Notes">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {employee.notes}
                  </p>
                </SectionCard>
              )}
            </div>
            
            <div className="space-y-6">
              <SectionCard title="Quick Contact" icon={Mail}>
                <InformationCard items={personalInfo} columns={1} />
              </SectionCard>
              
              <SectionCard title="System Stats">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Profile Created</span>
                    <span className="text-sm font-medium">{format(new Date(employee.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">{format(new Date(employee.updatedAt), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Activities Recorded</span>
                    <span className="text-sm font-medium">{employee.activities.length}</span>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personal" className="space-y-6 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Address Information" icon={MapPin}>
              <InformationCard items={addressInfo} columns={2} />
            </SectionCard>
            
            <SectionCard title="Emergency Contact" icon={Phone}>
              <InformationCard items={emergencyInfo} columns={1} />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="focus-visible:outline-none">
          <SectionCard title="Activity Timeline" description="Recent system activities related to this employee.">
            <Timeline activities={employee.activities} />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
