import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Coins,
  Receipt,
  FileSpreadsheet,
  Download,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Customer, Policy } from '../types/crm';
import { ClaimItem } from '../types/claim';
import { MonthlyGrowthChart } from './MonthlyGrowthChart';
import { PolicyStatusDistribution } from './PolicyStatusDistribution';
import { ClaimSettlementAnalytics } from './ClaimSettlementAnalytics';
import { BenefitUtilizationReport } from './BenefitUtilizationReport';
import { formatCurrencyVND } from '../utils/formatters';

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
      {/* Top Banner & Quick Report Action */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-aia-red rounded-lg text-white">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold">Trung Tâm Thống Kê & Báo Cáo Hiệu Quả Nghiệp Vụ</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Báo cáo tổng hợp hiệu quả khai thác hợp đồng, quản lý dòng tiền phí bảo hiểm, tỷ lệ phê duyệt chi trả claim và đối chiếu quyền lợi thẻ sức khỏe của tư vấn viên Dương Như Ý.
          </p>
        </div>

        {onExportCSV && (
          <button
            type="button"
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Báo Cáo Excel (CSV)</span>
          </button>
        )}
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng Doanh Số Phí APE</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1 font-mono">{formatCurrencyVND(totalAnnualPremium)}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Phí thường niên quản lý</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiền AIA Đã Chi Trả</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1 font-mono">{formatCurrencyVND(totalApproved)}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Tiền về tài khoản khách hàng</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tỷ Lệ Duyệt Claim</p>
          <p className="text-xl font-extrabold text-blue-600 mt-1 font-mono">{approvalRate}%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Duyệt {approvedCount}/{totalClaims} hồ sơ</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng Quy Mô Khách Hàng</p>
          <p className="text-xl font-extrabold text-aia-red mt-1 font-mono">{customers.length} khách hàng</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{policies.length} Hợp đồng bảo hiểm</p>
        </div>
      </div>

      {/* Row 1: Charts (Monthly Growth + Policy Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyGrowthChart customers={customers} />
        <PolicyStatusDistribution policies={policies} />
      </div>

      {/* Row 2: Claim Settlement Analytics */}
      <ClaimSettlementAnalytics claims={claims} />

      {/* Row 3: Health Card Quota Utilization Report */}
      <BenefitUtilizationReport
        policies={policies}
        onSelectCustomer={onSelectCustomer}
      />
    </div>
  );
};
