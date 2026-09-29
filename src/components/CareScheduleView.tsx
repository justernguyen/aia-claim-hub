import React from 'react';
import { Customer, Policy, CareActivity, CareAlert } from '../types/crm';
import { UpcomingEventsWidget } from './UpcomingEventsWidget';
import { CareScheduleSheet } from './CareScheduleSheet';
import { NewCareActivityModal } from './NewCareActivityModal';
import {
  Clock,
  Cake,
  Calendar,
  HeartHandshake,
} from 'lucide-react';

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
  const birthdayAlerts = alerts.filter((a) => a.type === 'birthday');
  const premiumAlerts = alerts.filter((a) => a.type === 'premium_due' || a.type === 'grace_period');
  const postClaimAlerts = alerts.filter((a) => a.type === 'post_claim_care');
  const completedCount = activities.filter((a) => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* 1. Standardized 4-Zone KPI Strip for Tab 3 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Tổng việc cần xử lý */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Tổng Sự Kiện Cần Xử Lý
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-numeric">
              {alerts.length}
            </p>
            <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
              Cảnh báo & nhắc lịch tự động
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Sinh nhật sắp tới */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Sinh Nhật Trong Tháng
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-numeric">
              {birthdayAlerts.length}
            </p>
            <p className="text-xs text-rose-700 font-bold mt-0.5 truncate">
              Chuẩn bị thiệp & quà tặng
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-aia-red hidden sm:flex items-center justify-center shrink-0">
            <Cake className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Hạn nộp phí & Gia hạn */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Hạn Đóng Phí & Gia Hạn
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-numeric">
              {premiumAlerts.length}
            </p>
            <p className="text-xs text-amber-800 font-bold mt-0.5 truncate">
              Nhắc phí tránh mất hiệu lực
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 text-amber-700 hidden sm:flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Chăm sóc sau claim & hoàn tất */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Chăm Sóc Sau Claim
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-numeric">
              {postClaimAlerts.length}
            </p>
            <p className="text-xs text-emerald-800 font-bold mt-0.5 truncate">
              Đã hoàn tất {completedCount} tương tác
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-700 hidden sm:flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Upcoming Events & Alerts Hub Widget - Anti-Slop Professional Redesign */}
      <UpcomingEventsWidget
        alerts={alerts}
        onSelectCustomer={onSelectCustomer}
      />

      {/* 3. Interactive Care Schedule Spreadsheet */}
      <CareScheduleSheet
        activities={activities}
        onToggleStatus={onToggleActivityStatus}
        onDelete={onDeleteActivity}
        onSelectCustomer={onSelectCustomer}
        onOpenNew={() => setIsCreateModalOpen(true)}
      />

      {/* 4. New Activity Modal */}
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
