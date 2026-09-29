import React from 'react';
import { Coins, Award, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { AggregatedKPIs, AnalyticsSubTab } from './types';
import { formatCurrencyVND, formatShortCurrency } from '../../utils/formatters';

interface ExecutiveCommandStripProps {
  kpis: AggregatedKPIs;
  onNavigateTab?: (tab: AnalyticsSubTab) => void;
}

export const ExecutiveCommandStrip: React.FC<ExecutiveCommandStripProps> = ({
  kpis,
  onNavigateTab,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* KPI 1: Doanh số phí APE */}
      <div
        onClick={() => onNavigateTab?.('overview')}
        className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all cursor-pointer group min-w-0"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Doanh Số Phí APE
          </p>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-200 transition-colors">
            <Coins className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2 min-w-0">
          <p
            className="text-2xl font-bold text-slate-900 font-numeric truncate tracking-tight"
            title={formatCurrencyVND(kpis.totalAnnualPremium)}
          >
            {formatShortCurrency(kpis.totalAnnualPremium)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal mt-0.5 truncate">
            <span className="font-semibold text-emerald-700">FYP: {formatShortCurrency(kpis.fypAmount)}</span>
            <span className="text-slate-300">•</span>
            <span>RYP: {formatShortCurrency(kpis.rypAmount)}</span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>Phí thường niên quản lý</span>
          <span className="font-numeric font-bold text-slate-800 group-hover:text-aia-red transition-colors">
            Chi tiết &rarr;
          </span>
        </div>
      </div>

      {/* KPI 2: Tiến Độ Chỉ Tiêu MDRT 2026 */}
      <div
        onClick={() => onNavigateTab?.('overview')}
        className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all cursor-pointer group min-w-0"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Chỉ Tiêu MDRT 2026
          </p>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors">
            <Award className="w-4 h-4 text-aia-red" />
          </div>
        </div>

        <div className="mt-2 min-w-0">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 font-numeric tracking-tight">
              {kpis.mdrtProgressPct}%
            </p>
            <span className="text-xs font-medium text-slate-500">/ 750 Tr ₫</span>
          </div>

          {/* Progress bar mini */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-gradient-to-r from-aia-red to-rose-500 rounded-full transition-all duration-700"
              style={{ width: `${kpis.mdrtProgressPct}%` }}
            />
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-medium truncate">
          {kpis.mdrtRemaining === 0 ? (
            <span className="text-emerald-700 font-bold">Đã đạt chuẩn MDRT</span>
          ) : (
            <span className="text-slate-600 truncate">
              Thiếu: <strong className="text-slate-900 font-bold font-numeric">{formatShortCurrency(kpis.mdrtRemaining)}</strong>
            </span>
          )}
          <span className="font-numeric font-bold text-slate-800 group-hover:text-aia-red transition-colors">
            Lộ trình &rarr;
          </span>
        </div>
      </div>

      {/* KPI 3: Tiền AIA Đã Chi Trả */}
      <div
        onClick={() => onNavigateTab?.('claims')}
        className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all cursor-pointer group min-w-0"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Tiền AIA Đã Chi Trả
          </p>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
        </div>

        <div className="mt-2 min-w-0">
          <p
            className="text-2xl font-bold text-emerald-700 font-numeric truncate tracking-tight"
            title={formatCurrencyVND(kpis.totalApprovedAmount)}
          >
            {formatShortCurrency(kpis.totalApprovedAmount)}
          </p>
          <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
            Duyệt <strong className="text-slate-700 font-semibold font-numeric">{kpis.approvedClaimsCount}/{kpis.totalClaimsCount}</strong> ca ({kpis.approvalRate}%)
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>Tỷ lệ bồi hoàn: <strong className="text-emerald-800 font-bold font-numeric">{kpis.payoutRatio}%</strong></span>
          <span className="font-numeric font-bold text-slate-800 group-hover:text-aia-red transition-colors">
            Đối soát &rarr;
          </span>
        </div>
      </div>

      {/* KPI 4: Tỷ Lệ Duy Trì K1 */}
      <div
        onClick={() => onNavigateTab?.('portfolio')}
        className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all cursor-pointer group min-w-0"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
            Tỷ Lệ Duy Trì K1
          </p>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
          </div>
        </div>

        <div className="mt-2 min-w-0">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-slate-900 font-numeric tracking-tight">
              {kpis.k1PersistencyRate}%
            </p>
            <span className="text-xs font-semibold text-emerald-700">Đạt chuẩn K1</span>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
            <strong className="text-slate-700 font-semibold font-numeric">{kpis.inForceCount}</strong> / {kpis.totalPoliciesCount} HĐ đang hiệu lực
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
          {kpis.pendingCount > 0 ? (
            <span className="text-rose-700 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>{kpis.pendingCount} HĐ chờ nộp</span>
            </span>
          ) : (
            <span className="text-slate-500 font-medium">Không có nợ phí</span>
          )}
          <span className="font-numeric font-bold text-slate-800 group-hover:text-aia-red transition-colors">
            Xem danh mục &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
