import React from 'react';
import { ShieldCheck, Coins, PieChart, AlertCircle } from 'lucide-react';
import { Policy } from '../types/crm';
import { formatCurrencyVND } from '../utils/formatters';

interface PolicyStatusDistributionProps {
  policies: Policy[];
}

export const PolicyStatusDistribution: React.FC<PolicyStatusDistributionProps> = ({ policies }) => {
  const totalPolicies = policies.length;
  const inForcePolicies = policies.filter((p) => p.status === 'in_force');
  const pendingPolicies = policies.filter((p) => p.status === 'pending_payment');
  const lapsedPolicies = policies.filter((p) => p.status === 'lapsed');

  const inForceCount = inForcePolicies.length;
  const pendingCount = pendingPolicies.length;
  const lapsedCount = lapsedPolicies.length;

  const inForcePct = totalPolicies > 0 ? Math.round((inForceCount / totalPolicies) * 100) : 0;
  const pendingPct = totalPolicies > 0 ? Math.round((pendingCount / totalPolicies) * 100) : 0;
  const lapsedPct = totalPolicies > 0 ? Math.round((lapsedCount / totalPolicies) * 100) : 0;

  // Premium Calculations
  // FYP: HĐ phát hành sau 2025-09-01
  const fypAmount = policies
    .filter((p) => p.status === 'in_force' && p.issueDate >= '2025-09-01')
    .reduce((sum, p) => sum + p.premiumAmount, 0);

  // RYP: HĐ phát hành trước 2025-09-01
  const rypAmount = policies
    .filter((p) => p.status === 'in_force' && p.issueDate < '2025-09-01')
    .reduce((sum, p) => sum + p.premiumAmount, 0);

  // Pending Premium
  const pendingAmount = pendingPolicies.reduce((sum, p) => sum + p.premiumAmount, 0);
  const totalAnnualPremium = fypAmount + rypAmount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Cơ Cấu Hợp Đồng & Doanh Số Phí Bảo Hiểm
            </h4>
            <p className="text-xs text-slate-500">
              Phân bổ tình trạng hợp đồng và tỷ trọng phí năm đầu (FYP) / tái tục (RYP)
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400 block">Tỷ lệ duy trì K1</span>
          <span className="text-sm font-extrabold text-slate-900 font-mono">92.4%</span>
        </div>
      </div>

      {/* 1. Policy Status Segmented Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-slate-700">Tỷ trọng Hợp đồng theo Trạng thái</span>
          <span className="text-slate-400 font-normal">Tổng {totalPolicies} hợp đồng</span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
          <div
            className="bg-slate-800 transition-all duration-500"
            style={{ width: `${inForcePct}%` }}
            title={`Hiệu lực: ${inForceCount} (${inForcePct}%)`}
          />
          <div
            className="bg-rose-400 transition-all duration-500"
            style={{ width: `${pendingPct}%` }}
            title={`Chờ nộp phí: ${pendingCount} (${pendingPct}%)`}
          />
          <div
            className="bg-slate-300 transition-all duration-500"
            style={{ width: `${lapsedPct}%` }}
            title={`Mất hiệu lực: ${lapsedCount} (${lapsedPct}%)`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-slate-800" />
              <span>Đang hiệu lực</span>
            </div>
            <p className="text-base font-extrabold font-mono text-slate-900 mt-1">
              {inForceCount} <span className="text-xs font-medium">({inForcePct}%)</span>
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="flex items-center gap-1.5 font-bold text-aia-red">
              <span className="w-2 h-2 rounded-full bg-aia-red" />
              <span>Chờ nộp phí</span>
            </div>
            <p className="text-base font-extrabold font-mono text-aia-red mt-1">
              {pendingCount} <span className="text-xs font-medium">({pendingPct}%)</span>
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Mất hiệu lực</span>
            </div>
            <p className="text-base font-extrabold font-mono text-slate-800 mt-1">
              {lapsedCount} <span className="text-xs font-medium">({lapsedPct}%)</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Premium Analytics Grid */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-aia-red" />
          <span>Cơ cấu Doanh số Phí Bảo hiểm (VND)</span>
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* FYP */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block font-medium">
              Phí Năm Đầu (FYP - HĐ Mới)
            </span>
            <span className="text-base font-extrabold text-blue-700 font-mono mt-0.5 block">
              {formatCurrencyVND(fypAmount)}
            </span>
            <span className="text-[10px] text-slate-400">Doanh số khai thác năm 2025-2026</span>
          </div>

          {/* RYP */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block font-medium">
              Phí Tái Tục (RYP - Năm 2+)
            </span>
            <span className="text-base font-extrabold text-slate-900 font-mono mt-0.5 block">
              {formatCurrencyVND(rypAmount)}
            </span>
            <span className="text-[10px] text-slate-400">Khách hàng đóng phí định kỳ</span>
          </div>

          {/* Pending Premium */}
          <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-200">
            <span className="text-aia-red text-[11px] block font-medium">
              Phí Đang Chờ Thu (Gia hạn)
            </span>
            <span className="text-base font-extrabold text-aia-red font-mono mt-0.5 block">
              {formatCurrencyVND(pendingAmount)}
            </span>
            <span className="text-[10px] text-aia-red/80 font-medium">Cần hoàn tất trong 60 ngày</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Tổng phí bảo hiểm thường niên quản lý (APE):</span>
          <span className="font-mono text-base font-extrabold text-white">
            {formatCurrencyVND(totalAnnualPremium)}
          </span>
        </div>
      </div>
    </div>
  );
};
