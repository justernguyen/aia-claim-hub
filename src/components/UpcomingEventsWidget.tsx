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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Trung Tâm Cảnh Báo & Sự Kiện Sắp Tới
            </h3>
            <p className="text-xs text-slate-500">
              Tự động quét sinh nhật, hạn đóng phí và lịch chăm sóc sau bồi thường
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              filterType === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Tất cả ({alerts.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('birthday')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              filterType === 'birthday' ? 'bg-white shadow-xs text-rose-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Cake className="w-3.5 h-3.5" />
            <span>Sinh nhật ({birthdayAlerts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('premium')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              filterType === 'premium' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Hạn nộp phí ({premiumAlerts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterType('claim')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              filterType === 'claim' ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Sau Claim ({postClaimAlerts.length})</span>
          </button>
        </div>
      </div>

      {/* Alert List */}
      {displayAlerts.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs">
          Không có sự kiện hoặc cảnh báo nào trong thời gian này.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayAlerts.map((alert) => {
            const isBirthday = alert.type === 'birthday';
            const isGrace = alert.type === 'grace_period';
            const isPremium = alert.type === 'premium_due';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all ${
                  alert.severity === 'urgent'
                    ? 'bg-rose-50/60 border-rose-200 shadow-xs'
                    : isBirthday
                    ? 'bg-rose-50/30 border-rose-100 hover:border-rose-300'
                    : isGrace
                    ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isBirthday ? (
                      <div className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
                        <Cake className="w-4 h-4" />
                      </div>
                    ) : isGrace ? (
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 animate-pulse">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    ) : isPremium ? (
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                        <Calendar className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <h4
                        onClick={() => onSelectCustomer?.(alert.customerId)}
                        className="text-xs font-bold text-slate-900 hover:text-aia-red cursor-pointer transition-colors"
                      >
                        {alert.customerName}
                      </h4>
                      {alert.policyId && (
                        <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-aia-red" />
                          <span>{alert.policyId}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      alert.severity === 'urgent'
                        ? 'bg-rose-600 text-white'
                        : alert.severity === 'warning'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {alert.daysRemaining <= 0
                      ? 'Hôm nay!'
                      : `Còn ${alert.daysRemaining} ngày`}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-800 mt-2">{alert.title}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{alert.description}</p>

                {/* Quick actions for each alert */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Hạn: {alert.dueDate}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {alert.customerPhone && (
                      <>
                        <a
                          href={`tel:${alert.customerPhone.replace(/\s+/g, '')}`}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors shadow-2xs"
                          title={`Gọi điện ${alert.customerPhone}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://zalo.me/${alert.customerPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-cyan-600 hover:border-cyan-300 transition-colors shadow-2xs"
                          title="Nhắn Zalo"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
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
