import React, { useState } from 'react';
import {
  Cake,
  Calendar,
  AlertTriangle,
  HeartHandshake,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { CareAlert } from '../types/crm';

interface UpcomingEventsWidgetProps {
  alerts: CareAlert[];
  onSelectCustomer?: (customerId: string) => void;
}

export const UpcomingEventsWidget: React.FC<UpcomingEventsWidgetProps> = ({
  alerts,
  onSelectCustomer,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'birthday' | 'premium' | 'claim'>('all');

  const birthdayAlerts = alerts.filter((a) => a.type === 'birthday');
  const premiumAlerts = alerts.filter((a) => a.type === 'premium_due' || a.type === 'grace_period');
  const postClaimAlerts = alerts.filter((a) => a.type === 'post_claim_care');

  const displayAlerts = alerts.filter((a) => {
    if (filterType === 'birthday') return a.type === 'birthday';
    if (filterType === 'premium') return a.type === 'premium_due' || a.type === 'grace_period';
    if (filterType === 'claim') return a.type === 'post_claim_care';
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-aia-red" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Trung Tâm Cảnh Báo & Sự Kiện Cần Xử Lý
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
              Tự động rà soát sinh nhật, kỳ gia hạn đóng phí và chăm sóc sau bồi thường
            </p>
          </div>
        </div>

        {/* Filter Pills - Unified Design System */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none border border-slate-200/70">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all select-none whitespace-nowrap cursor-pointer ${
              filterType === 'all'
                ? 'bg-white shadow-xs text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả ({alerts.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('birthday')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 select-none whitespace-nowrap cursor-pointer ${
              filterType === 'birthday'
                ? 'bg-white shadow-xs text-aia-red font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cake className="w-4 h-4 text-aia-red" />
            <span>Sinh nhật ({birthdayAlerts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('premium')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 select-none whitespace-nowrap cursor-pointer ${
              filterType === 'premium'
                ? 'bg-white shadow-xs text-amber-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Hạn nộp phí ({premiumAlerts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('claim')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 select-none whitespace-nowrap cursor-pointer ${
              filterType === 'claim'
                ? 'bg-white shadow-xs text-emerald-700 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Sau Claim ({postClaimAlerts.length})</span>
          </button>
        </div>
      </div>

      {/* Alert List - Clean Executive Cards */}
      {displayAlerts.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-sm">
          Không có sự kiện hoặc cảnh báo nào trong danh mục này.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
          {displayAlerts.map((alert) => {
            const isBirthday = alert.type === 'birthday';
            const isGrace = alert.type === 'grace_period';
            const isPremium = alert.type === 'premium_due';

            return (
              <div
                key={alert.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isBirthday ? (
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0">
                          <Cake className="w-5 h-5" />
                        </div>
                      ) : isGrace ? (
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                      ) : isPremium ? (
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <HeartHandshake className="w-5 h-5" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4
                          onClick={() => onSelectCustomer?.(alert.customerId)}
                          className="text-sm sm:text-base font-bold text-slate-900 hover:text-aia-red cursor-pointer transition-colors truncate leading-snug"
                          title={alert.customerName}
                        >
                          {alert.customerName}
                        </h4>
                        {alert.policyId && (
                          <p className="text-xs text-slate-500 font-mono font-medium flex items-center gap-1.5 mt-0.5 truncate">
                            <ShieldCheck className="w-3.5 h-3.5 text-aia-red shrink-0" />
                            <span>{alert.policyId}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        alert.severity === 'urgent'
                          ? 'bg-aia-red text-white shadow-2xs'
                          : alert.severity === 'warning'
                          ? 'bg-amber-50 text-amber-800 border border-amber-300 font-extrabold'
                          : 'bg-slate-100 text-slate-700 border border-slate-200/70'
                      }`}
                    >
                      {alert.daysRemaining <= 0
                        ? 'Hôm nay!'
                        : `Còn ${alert.daysRemaining} ngày`}
                    </span>
                  </div>

                  <p className="text-sm sm:text-[14.5px] font-bold text-slate-900 mt-3 leading-snug">
                    {alert.title}
                  </p>
                  <p className="text-[13px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                    {alert.description}
                  </p>
                </div>

                {/* Quick actions for each alert */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-xs text-slate-500 font-mono font-medium">
                    Hạn: <span className="font-semibold text-slate-700">{alert.dueDate}</span>
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    {alert.customerPhone && (
                      <>
                        <a
                          href={`tel:${alert.customerPhone.replace(/\s+/g, '')}`}
                          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors shadow-2xs cursor-pointer"
                          title={`Gọi điện ${alert.customerPhone}`}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://zalo.me/${alert.customerPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-2xs cursor-pointer"
                          title="Nhắn tin Zalo"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
