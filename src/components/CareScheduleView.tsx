import React from 'react';
import { Customer, Policy, CareActivity, CareAlert } from '../types/crm';
import { UpcomingEventsWidget } from './UpcomingEventsWidget';
import { CareScheduleSheet } from './CareScheduleSheet';
import { NewCareActivityModal } from './NewCareActivityModal';

interface CareScheduleViewProps {
  activities: CareActivity[];
  alerts: CareAlert[];
  customers: Customer[];
  policies: Policy[];
  onToggleActivityStatus: (id: string) => void;
  onDeleteActivity: (id: string) => void;
  onAddActivity: (activity: Omit<CareActivity, 'id' | 'createdAt'>) => void;
  onSelectCustomer?: (customerId: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export const CareScheduleView: React.FC<CareScheduleViewProps> = ({
  activities,
  alerts,
  customers,
  policies,
  onToggleActivityStatus,
  onDeleteActivity,
  onAddActivity,
  onSelectCustomer,
  isCreateModalOpen,
  setIsCreateModalOpen,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Upcoming Events & Alerts Hub Widget */}
      <UpcomingEventsWidget
        alerts={alerts}
        onSelectCustomer={onSelectCustomer}
      />

      {/* 2. Interactive Care Schedule Spreadsheet */}
      <CareScheduleSheet
        activities={activities}
        onToggleStatus={onToggleActivityStatus}
        onDelete={onDeleteActivity}
        onSelectCustomer={onSelectCustomer}
        onOpenNew={() => setIsCreateModalOpen(true)}
      />

      {/* 3. New Activity Modal */}
      <NewCareActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        customers={customers}
        policies={policies}
        onSubmit={onAddActivity}
      />
    </div>
  );
};
