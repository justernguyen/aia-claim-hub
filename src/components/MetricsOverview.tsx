import React from 'react';
import {
  FileText,
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { formatShortCurrency } from '../utils/formatters';
import { ClaimStatus } from '../types/claim';

interface MetricsOverviewProps {
  stats: {
    totalCases: number;
    intakeCount: number;
    pendingDocsCount: number;
    underwritingCount: number;
    approvedCount: number;
    paidCount: number;
    rejectedCount: number;
    totalClaimed: number;
    totalApproved: number;
    overdueSlaCount: number;
    approvalRate: number;
  };
  onFilterStatus: (status: ClaimStatus | 'all') => void;
  activeStatus: ClaimStatus | 'all';
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  stats,
  onFilterStatus,
  activeStatus,
}) => {
  return (
    <div className="space-y-4">
      {/* SLA Alert Banner - Refined AIA Luxury Style */}
      {stats.overdueSlaCount > 0 && (
        <div className="bg-white border border-rose-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 text-aia-red rounded-xl shrink-0">
              <AlertTriangle className="w-5 h-5 text-aia-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Cảnh báo SLA Thẩm định AIA: Có {stats.overdueSlaCount} hồ sơ đã vượt quá 5 ngày làm việc</span>
                <span className="text-xs bg-aia-red text-white font-extrabold px-2.5 py-0.5 rounded-full">
                  Ưu tiên xử lý
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Quy chuẩn dịch vụ AIA cam kết phản hồi kết quả trong vòng 5 ngày làm việc kể từ lúc tiếp nhận đủ chứng từ y tế.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onFilterStatus('underwriting')}
            className="px-3.5 py-1.5 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 self-end sm:self-center cursor-pointer"
          >
            <span>Lọc ca đang thẩm định</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Grid of 4 Key KPI Metric Cards - Standardized with Tab 1 Luxury Format */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Tổng hồ sơ */}
        <div
          onClick={() => onFilterStatus('all')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs flex items-center justify-between gap-2 ${
            activeStatus === 'all'
              ? 'border-aia-red ring-2 ring-aia-red/10 shadow-sm bg-gradient-to-b from-white to-rose-50/10'
              : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Tổng hồ sơ phụ trách
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-xl sm:text-2xl font-black text-slate-900 font-numeric">
                {stats.totalCases}
              </p>
              <span className="text-xs font-bold text-slate-700 font-numeric">
                ({formatShortCurrency(stats.totalClaimed)})
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
              Tiếp nhận: <strong className="text-slate-900 font-bold">{stats.intakeCount} ca</strong>
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Chờ bổ sung chứng từ */}
        <div
          onClick={() => onFilterStatus('pending_docs')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs flex items-center justify-between gap-2 ${
            activeStatus === 'pending_docs'
              ? 'border-aia-red ring-2 ring-aia-red/10 shadow-sm bg-gradient-to-b from-white to-rose-50/10'
              : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Cần bổ sung chứng từ
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-xl sm:text-2xl font-black text-slate-900 font-numeric">
                {stats.pendingDocsCount}
              </p>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                Cần bổ sung
              </span>
            </div>
            <p className="text-xs text-amber-800 font-semibold mt-0.5 truncate">
              Thiếu bảng kê / giấy viện
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 text-amber-700 hidden sm:flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: AIA Đang thẩm định */}
        <div
          onClick={() => onFilterStatus('underwriting')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs flex items-center justify-between gap-2 ${
            activeStatus === 'underwriting'
              ? 'border-aia-red ring-2 ring-aia-red/10 shadow-sm bg-gradient-to-b from-white to-rose-50/10'
              : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              AIA Đang thẩm định
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-xl sm:text-2xl font-black text-slate-900 font-numeric">
                {stats.underwritingCount}
              </p>
              {stats.overdueSlaCount > 0 ? (
                <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                  {stats.overdueSlaCount} trễ hạn
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Trong hạn SLA
                </span>
              )}
            </div>
            <p className={`text-xs font-semibold mt-0.5 truncate ${stats.overdueSlaCount > 0 ? 'text-rose-700 font-bold' : 'text-slate-600'}`}>
              {stats.overdueSlaCount > 0 ? 'Có hồ sơ vượt 5 ngày' : 'Đang xét duyệt bồi thường'}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-aia-red hidden sm:flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Đã chi trả thành công */}
        <div
          onClick={() => onFilterStatus('paid')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs flex items-center justify-between gap-2 ${
            activeStatus === 'paid'
              ? 'border-aia-red ring-2 ring-aia-red/10 shadow-sm bg-gradient-to-b from-white to-rose-50/10'
              : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider truncate">
              Đã duyệt & Chi trả
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-xl sm:text-2xl font-black text-slate-900 font-numeric truncate">
                {formatShortCurrency(stats.totalApproved)}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full font-numeric border border-emerald-300">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{stats.approvalRate}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
              Hoàn tất: <strong className="text-slate-900 font-bold">{stats.approvedCount + stats.paidCount}</strong> • Từ chối: <strong className="text-slate-800 font-bold">{stats.rejectedCount}</strong>
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-700 hidden sm:flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
