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
      {/* SLA Alert Banner if there are overdue cases - Clean & Professional */}
      {stats.overdueSlaCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                <span>Cảnh báo SLA Thẩm định AIA: Có {stats.overdueSlaCount} hồ sơ đã vượt quá 5 ngày làm việc</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                  Ưu tiên xử lý
                </span>
              </h4>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Quy chuẩn dịch vụ AIA cam kết phản hồi kết quả trong vòng 5 ngày làm việc kể từ lúc tiếp nhận đủ chứng từ y tế.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onFilterStatus('underwriting')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1.5 self-end sm:self-center cursor-pointer"
          >
            <span>Lọc ca đang thẩm định</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Grid of 4 Key KPI Metric Cards - Standardized 4-Zone Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Tổng hồ sơ */}
        <div
          onClick={() => onFilterStatus('all')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs ${
            activeStatus === 'all'
              ? 'border-aia-red ring-2 ring-aia-red/10 shadow-sm'
              : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
              Tổng hồ sơ phụ trách
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-1">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-numeric">
              {stats.totalCases} <span className="text-xs font-normal text-slate-500 font-sans">ca</span>
            </div>
            <div className="text-xs font-bold text-slate-600 font-numeric truncate">
              {formatShortCurrency(stats.totalClaimed)}
            </div>
          </div>
          <div className="mt-1.5 sm:mt-2 text-[11px] text-slate-500 flex items-center justify-between gap-1 truncate">
            <span>Tiếp nhận: <strong className="text-slate-800">{stats.intakeCount}</strong></span>
            <span className="text-slate-400 hidden sm:inline">Tổng yêu cầu</span>
          </div>
        </div>

        {/* Card 2: Chờ bổ sung chứng từ */}
        <div
          onClick={() => onFilterStatus('pending_docs')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs ${
            activeStatus === 'pending_docs'
              ? 'border-amber-500 ring-2 ring-amber-500/10 shadow-sm'
              : 'border-slate-200/90 hover:border-amber-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-semibold text-amber-800 uppercase tracking-wider truncate">
              Cần bổ sung chứng từ
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 hidden sm:flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-1">
            <div className="text-xl sm:text-2xl font-extrabold text-amber-900 tracking-tight font-numeric">
              {stats.pendingDocsCount} <span className="text-xs font-normal text-amber-700 font-sans">hồ sơ</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-full truncate">
              Cần bổ sung
            </span>
          </div>
          <p className="mt-1.5 sm:mt-2 text-[11px] text-amber-700/90 truncate">
            Thiếu bảng kê hoặc giấy ra viện
          </p>
        </div>

        {/* Card 3: AIA Đang thẩm định */}
        <div
          onClick={() => onFilterStatus('underwriting')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs ${
            activeStatus === 'underwriting'
              ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-sm'
              : 'border-slate-200/90 hover:border-blue-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-semibold text-blue-800 uppercase tracking-wider truncate">
              AIA Đang thẩm định
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 hidden sm:flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-1">
            <div className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight font-numeric">
              {stats.underwritingCount} <span className="text-xs font-normal text-blue-700 font-sans">hồ sơ</span>
            </div>
            {stats.overdueSlaCount > 0 ? (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200 truncate">
                {stats.overdueSlaCount} trễ hạn
              </span>
            ) : (
              <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full truncate">
                Trong hạn SLA
              </span>
            )}
          </div>
          <p className="mt-1.5 sm:mt-2 text-[11px] text-blue-700/80 truncate">
            Đang xét duyệt bồi thường
          </p>
        </div>

        {/* Card 4: Đã chi trả thành công */}
        <div
          onClick={() => onFilterStatus('paid')}
          className={`bg-white p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none min-w-0 shadow-xs ${
            activeStatus === 'paid'
              ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-sm'
              : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-800 uppercase tracking-wider truncate">
              Đã duyệt & Chi trả
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hidden sm:flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-1">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 tracking-tight font-numeric">
              {formatShortCurrency(stats.totalApproved)}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full font-numeric">
              <TrendingUp className="w-3 h-3" />
              <span>{stats.approvalRate}%</span>
            </div>
          </div>
          <div className="mt-1.5 sm:mt-2 text-[11px] text-emerald-700/90 flex items-center justify-between gap-1 truncate">
            <span>Hoàn tất: <strong>{stats.approvedCount + stats.paidCount}</strong></span>
            <span>Từ chối: {stats.rejectedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
