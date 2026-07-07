'use client';

import { CheckCircle2 } from 'lucide-react';
import { StatusCard } from './status-card';
import type { SystemStatus } from '../../types/admin';

const SYSTEM_SERVICES: SystemStatus[] = [
  {
    name: 'Authentication',
    status: 'operational',
    description: 'Login and session management',
    uptime: '99.99%',
  },
  {
    name: 'Database',
    status: 'operational',
    description: 'Primary data store',
    uptime: '99.98%',
  },
  {
    name: 'Storage',
    status: 'operational',
    description: 'File uploads & documents',
    uptime: '100%',
  },
  {
    name: 'Notifications',
    status: 'operational',
    description: 'Email and push alerts',
    uptime: '99.95%',
  },
  {
    name: 'API',
    status: 'operational',
    description: 'REST API gateway',
    uptime: '99.97%',
  },
];

export function SystemStatusWidget() {
  const allOperational = SYSTEM_SERVICES.every((s) => s.status === 'operational');

  return (
    <div>
      {/* Summary header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <CheckCircle2
          size={16}
          className="text-green-500 shrink-0"
          aria-hidden="true"
        />
        <p className="text-xs font-medium text-foreground">
          {allOperational
            ? 'All systems operational'
            : 'Some systems need attention'}
        </p>
      </div>

      {/* Service list */}
      <div role="list" aria-label="System service statuses">
        {SYSTEM_SERVICES.map((service) => (
          <StatusCard
            key={service.name}
            name={service.name}
            status={service.status}
            description={service.description}
            uptime={service.uptime}
          />
        ))}
      </div>
    </div>
  );
}
