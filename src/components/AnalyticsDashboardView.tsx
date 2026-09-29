import React from 'react';
import {
  BarChart3,
  FileSpreadsheet,
  Coins,
  TrendingUp,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Customer, Policy } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { MonthlyGrowthChart } from './MonthlyGrowthChart';
import { PolicyStatusDistribution } from './PolicyStatusDistribution';
import { ClaimSettlementAnalytics } from './ClaimSettlementAnalytics';
import { BenefitUtilizationReport } from './BenefitUtilizationReport';
import { formatCurrencyVND, formatShortCurrency } from '../utils/formatters';

interface AnalyticsDashboardViewProps {
  customers: Customer[];
  policies: Policy[];
  claims: ClaimItem[];
  onSelectCustomer?: (customerId: string) => void;
  onExportCSV?: () => void;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  customers,
  policies,
  claims,
  onSelectCustomer,
  onExportCSV,
}) => {
  // Aggregate KPIs
  const totalApproved = claims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);
  const totalClaims = claims.length;
  const approvedCount = claims.filter((c) => c.status === 'approved' || c.status === 'paid').length;
  const approvalRate = totalClaims > 0 ? Math.round((approvedCount / totalClaims) * 100) : 0;

  const totalAnnualPremium = policies
    .filter((p) => p.status === 'in_force')
    .reduce((sum, p) => sum + p.premiumAmount, 0);

  return (
    <div className="space-y-6">
      {/* Zone 1: Standard Executive Sub-Header & Report Export */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-aia-red flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Trung Tâm Thống Kê & Báo Cáo Hiệu Quả Nghiệp Vụ
            </h3>
            <p className="text-xs text-slate-500">
              Tổng hợp khai thác hợp đồng, tỷ lệ duyệt claim và hạn mức thẻ sức khỏe
            </p>
          </div>
        </div>

        {onExportCSV && (
          <button
            type="button"
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer self-end sm:self-center"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Xuất Báo Cáo Excel (CSV)</span>
          </button>
        )}
      </div>

      {/* Zone 2: Standardized 4-Zone KPI Highlight Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Doanh số phí APE */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
              Tổng Doanh Số Phí APE
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric truncate" title={formatCurrencyVND(totalAnnualPremium)}>
              {formatShortCurrency(totalAnnualPremium)}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5 truncate">
              Phí thường niên quản lý
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Tiền AIA Đã Chi Trả */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
              Tiền AIA Đã Chi Trả
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1 font-numeric truncate" title={formatCurrencyVND(totalApproved)}>
              {formatShortCurrency(totalApproved)}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              Quyền lợi về tay khách hàng
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-700 hidden sm:flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3: Tỷ lệ duyệt claim */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
              Tỷ Lệ Duyệt Claim
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric">
              {approvalRate}%
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              Đã duyệt {approvedCount}/{totalClaims} hồ sơ
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 hidden sm:flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Quy mô khách hàng */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
              Quy Mô Khách Hàng
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-numeric truncate">
              {customers.length} khách
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              {policies.length} Hợp đồng hiệu lực
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-rose-50 text-aia-red hidden sm:flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Row 1: Charts (Monthly Growth + Policy Distribution) - Fully responsive with min-w-0 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <MonthlyGrowthChart customers={customers} />
        <PolicyStatusDistribution policies={policies} />
      </div>

      {/* Row 2: Claim Settlement Analytics */}
      <div className="min-w-0">
        <ClaimSettlementAnalytics claims={claims} />
      </div>

      {/* Row 3: Health Card Quota Utilization Report */}
      <div className="min-w-0">
        <BenefitUtilizationReport
          policies={policies}
          onSelectCustomer={onSelectCustomer}
        />
      </div>
    </div>
  );
};
